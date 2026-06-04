"""
humanize_vocals.py — Make AI-generated vocals sound more human.

Processing chain:
  1. Cleanup + EQ   (high-shelf cut, sibilance reduction, metal vocal tonal shaping)
  2. Compression    (peak-follower: punch and presence)
  3. Saturation     (soft-clip drive: adds harmonic character and uniqueness)
  4. Pitch          (subtle micro-variations, 2s windows — no OLA chunk artifacts)
  5. Amplitude      (slow breath-support envelope)
  6. Breath noise   (bandpass-filtered noise, voice-gated)
  7. Normalize      (−1 dBFS limiter)

Usage:
    python3 humanize_vocals.py input.wav [output.wav] [options]

    --intensity 0.0-1.0   master effect depth (default 0.3)
    --no-eq               skip EQ + cleanup
    --no-saturation       skip saturation
    --no-compression      skip compression
    --no-vibrato          skip vibrato
    --no-breath           skip breath noise
    --seed N              fixed random seed for reproducible output
    -v, --verbose         print stage timings
    --dry-run             print resolved params and exit without writing output

If output path is omitted the result is saved as <stem>_humanized.wav.
"""

from __future__ import annotations

import argparse
import sys
import time
from dataclasses import dataclass
from pathlib import Path

import numpy as np
import scipy.signal
import soundfile as sf

try:
    import pyrubberband as rb
    HAS_RUBBERBAND = True
except ImportError:
    HAS_RUBBERBAND = False

try:
    import librosa
    HAS_LIBROSA = True
except ImportError:
    HAS_LIBROSA = False

try:
    import pedalboard
    HAS_PEDALBOARD = True
except ImportError:
    HAS_PEDALBOARD = False

if not HAS_LIBROSA and not HAS_RUBBERBAND:
    sys.exit("ERROR: at least one of librosa or pyrubberband must be installed.")


# ─── Biquad filters (Audio EQ Cookbook) ──────────────────────────────────────

def _sos_low_shelf(freq: float, gain_db: float, sr: int, S: float = 0.707) -> np.ndarray:
    A = 10 ** (gain_db / 40)
    w0 = 2 * np.pi * freq / sr
    cos_w, sin_w = np.cos(w0), np.sin(w0)
    alpha = sin_w / 2 * np.sqrt((A + 1 / A) * (1 / S - 1) + 2)
    sqA = np.sqrt(A)
    b0 = A * ((A + 1) - (A - 1) * cos_w + 2 * sqA * alpha)
    b1 = 2 * A * ((A - 1) - (A + 1) * cos_w)
    b2 = A * ((A + 1) - (A - 1) * cos_w - 2 * sqA * alpha)
    a0 = (A + 1) + (A - 1) * cos_w + 2 * sqA * alpha
    a1 = -2 * ((A - 1) + (A + 1) * cos_w)
    a2 = (A + 1) + (A - 1) * cos_w - 2 * sqA * alpha
    return np.array([[b0 / a0, b1 / a0, b2 / a0, 1.0, a1 / a0, a2 / a0]])


def _sos_high_shelf(freq: float, gain_db: float, sr: int, S: float = 0.707) -> np.ndarray:
    A = 10 ** (gain_db / 40)
    w0 = 2 * np.pi * freq / sr
    cos_w, sin_w = np.cos(w0), np.sin(w0)
    alpha = sin_w / 2 * np.sqrt((A + 1 / A) * (1 / S - 1) + 2)
    sqA = np.sqrt(A)
    b0 = A * ((A + 1) + (A - 1) * cos_w + 2 * sqA * alpha)
    b1 = -2 * A * ((A - 1) + (A + 1) * cos_w)
    b2 = A * ((A + 1) + (A - 1) * cos_w - 2 * sqA * alpha)
    a0 = (A + 1) - (A - 1) * cos_w + 2 * sqA * alpha
    a1 = 2 * ((A - 1) - (A + 1) * cos_w)
    a2 = (A + 1) - (A - 1) * cos_w - 2 * sqA * alpha
    return np.array([[b0 / a0, b1 / a0, b2 / a0, 1.0, a1 / a0, a2 / a0]])


def _sos_peak(freq: float, gain_db: float, Q: float, sr: int) -> np.ndarray:
    A = 10 ** (gain_db / 40)
    w0 = 2 * np.pi * freq / sr
    alpha = np.sin(w0) / (2 * Q)
    b0 = 1 + alpha * A
    b1 = -2 * np.cos(w0)
    b2 = 1 - alpha * A
    a0 = 1 + alpha / A
    a1 = -2 * np.cos(w0)
    a2 = 1 - alpha / A
    return np.array([[b0 / a0, b1 / a0, b2 / a0, 1.0, a1 / a0, a2 / a0]])


# ─── Parameters ──────────────────────────────────────────────────────────────

@dataclass
class HumanizeParams:
    saturation_drive:    float = 1.3
    comp_threshold_db:   float = -18.0
    comp_ratio:          float = 4.0
    comp_makeup_db:      float = 3.0
    micro_pitch_cents:   float = 5.0
    vibrato_depth_cents: float = 8.0
    vibrato_rate_hz:     float = 5.5
    vibrato_jitter:      float = 0.3
    amp_variation_db:    float = 1.5
    breath_level_db:     float = -52.0
    do_eq:               bool = True
    do_compression:      bool = True
    do_saturation:       bool = True
    do_vibrato:          bool = True
    do_breath:           bool = True


def params_from_intensity(t: float) -> HumanizeParams:
    t = float(np.clip(t, 0.0, 1.0))
    p = HumanizeParams()
    p.saturation_drive    = 1.0 + t * 1.0           # 1.0 → 2.0
    p.comp_threshold_db   = -12.0 + t * -12.0       # -12 → -24 dBFS
    p.comp_ratio          = 1.5 + t * 6.5            # 1.5:1 → 8:1
    p.comp_makeup_db      = t * 6.0                  # 0 → 6 dB
    p.micro_pitch_cents   = 1.0 + t * 9.0           # 1 → 10 cents
    p.vibrato_depth_cents = t * 15.0                 # 0 → 15 cents
    p.amp_variation_db    = 0.3 + t * 2.7            # 0.3 → 3.0 dB
    p.breath_level_db     = -60.0 + t * 16.0         # -60 → -44 dBFS
    return p


# ─── LFO helpers ─────────────────────────────────────────────────────────────

def _lpf_smooth(signal: np.ndarray, sr: int, cutoff_hz: float) -> np.ndarray:
    nyq = sr / 2.0
    if cutoff_hz >= nyq:
        return signal.copy()
    sos = scipy.signal.butter(2, cutoff_hz / nyq, btype="low", output="sos")
    if len(signal) < 9:
        return scipy.signal.sosfilt(sos, signal)
    return scipy.signal.sosfiltfilt(sos, signal)


def _random_walk_lfo(n: int, sr: int, cutoff_hz: float, scale: float,
                     rng: np.random.Generator) -> np.ndarray:
    white = rng.standard_normal(n)
    lfo = _lpf_smooth(white, sr, cutoff_hz)
    peak = np.max(np.abs(lfo))
    return lfo / peak * scale if peak > 0 else lfo


def _vibrato_lfo(n: int, sr: int, rate_hz: float, depth_cents: float,
                 jitter: float, rng: np.random.Generator) -> np.ndarray:
    rate_noise = _random_walk_lfo(n, sr, 0.5, jitter, rng)
    phase = np.cumsum(2 * np.pi * (rate_hz + rate_noise) / sr)
    return np.sin(phase) * depth_cents


# ─── Stage 1+2: EQ (cleanup + tonal shaping) ─────────────────────────────────

def apply_eq(audio: np.ndarray, sr: int, verbose: bool) -> np.ndarray:
    sections = np.vstack([
        # Cleanup: remove Suno's compressed "static" (harsh high-frequency artifacts)
        _sos_high_shelf(10_000, -3.0, sr),       # -3 dB shelf above 10 kHz
        _sos_peak(8_000, -2.0, 1.5, sr),         # -2 dB at 8 kHz (harsh sibilance)
        # Tonal identity: metal vocal character
        _sos_low_shelf(200, +2.0, sr),            # +2 dB warmth/chest
        _sos_peak(800, -3.0, 1.5, sr),            # -3 dB nasal/boxy AI quality
        _sos_peak(2_500, -2.0, 2.0, sr),          # -2 dB glassy AI midrange
        _sos_peak(5_000, +3.0, 1.0, sr),          # +3 dB presence/cut-through
    ])
    result = scipy.signal.sosfilt(sections, audio.astype(np.float64)).astype(np.float32)
    if verbose:
        print("  [eq]         cleanup + metal vocal curve")
    return result


# ─── Stage 3: Compression ─────────────────────────────────────────────────────

def apply_compression(audio: np.ndarray, sr: int, params: HumanizeParams,
                      verbose: bool) -> np.ndarray:
    threshold = 10 ** (params.comp_threshold_db / 20)
    makeup = 10 ** (params.comp_makeup_db / 20)

    # 5ms analysis frames (fully vectorized RMS)
    frame_size = max(1, int(0.005 * sr))
    n = len(audio)
    n_full = n // frame_size
    frames = audio[:n_full * frame_size].reshape(n_full, frame_size)
    rms = np.sqrt(np.mean(frames ** 2, axis=1))
    if n % frame_size:
        tail_rms = np.sqrt(np.mean(audio[n_full * frame_size:] ** 2))
        rms = np.append(rms, tail_rms)
    n_frames = len(rms)

    # Attack/release envelope follower (frame-rate IIR)
    frame_rate = sr / frame_size
    alpha_a = np.exp(-1.0 / max(1e-6, 5.0 * 0.001 * frame_rate))    # 5ms attack
    alpha_r = np.exp(-1.0 / max(1e-6, 80.0 * 0.001 * frame_rate))   # 80ms release
    envelope = np.empty(n_frames)
    e = 0.0
    for i in range(n_frames):
        alpha = alpha_a if rms[i] > e else alpha_r
        e = alpha * e + (1 - alpha) * rms[i]
        envelope[i] = e

    # Gain per frame
    gain_frames = np.where(
        envelope > threshold,
        (threshold / np.maximum(envelope, 1e-10)) ** (1.0 - 1.0 / params.comp_ratio),
        1.0,
    ) * makeup

    # Interpolate gain to sample resolution
    centers = np.arange(n_frames) * frame_size + frame_size / 2
    gain = np.interp(np.arange(n), centers, gain_frames).astype(np.float32)

    if verbose:
        raw_gr = gain_frames / makeup
        peak_gr_db = -20 * np.log10(np.max(np.minimum(raw_gr, 1.0)))
        print(f"  [compress]   {params.comp_ratio:.1f}:1 @ {params.comp_threshold_db:.0f} dBFS  "
              f"peak GR ≈{peak_gr_db:.1f} dB  makeup +{params.comp_makeup_db:.1f} dB")

    return (audio * gain).astype(np.float32)


# ─── Stage 4: Saturation ──────────────────────────────────────────────────────

def apply_saturation(audio: np.ndarray, params: HumanizeParams,
                     verbose: bool) -> np.ndarray:
    drive = params.saturation_drive
    if drive <= 1.0 + 1e-4:
        return audio
    result = (np.tanh(audio * drive) / np.tanh(drive)).astype(np.float32)
    if verbose:
        print(f"  [saturate]   drive={drive:.2f}")
    return result


# ─── Stage 5: Pitch variations (2s windows, cosine crossfade) ────────────────

_PITCH_WIN_S  = 2.0
_PITCH_HOP_S  = 1.0
_PITCH_FADE_S = 0.25


def _pitch_shift_segment(audio: np.ndarray, sr: int, n_steps: float) -> np.ndarray:
    arr = audio.astype(np.float32)
    if HAS_RUBBERBAND:
        return rb.pitch_shift(arr, sr, n_steps).astype(np.float64)
    return librosa.effects.pitch_shift(arr, sr=sr, n_steps=n_steps).astype(np.float64)


def apply_pitch_variations(audio: np.ndarray, sr: int, total_cents: np.ndarray,
                            verbose: bool) -> np.ndarray:
    n = len(audio)
    win_size  = int(_PITCH_WIN_S * sr)
    hop_size  = int(_PITCH_HOP_S * sr)
    fade_size = min(int(_PITCH_FADE_S * sr), win_size // 4)

    if n < win_size:
        st = float(np.mean(total_cents)) / 100.0
        if abs(st) < 0.001:
            return audio.copy()
        return _pitch_shift_segment(audio, sr, st).astype(np.float32)

    fade = 0.5 - 0.5 * np.cos(np.pi * np.arange(fade_size) / fade_size)
    window = np.ones(win_size)
    window[:fade_size]  = fade
    window[-fade_size:] = fade[::-1]

    out  = np.zeros(n + win_size, dtype=np.float64)
    norm = np.zeros(n + win_size, dtype=np.float64)

    starts = list(range(0, n, hop_size))
    t0 = time.time()
    n_shifted = 0

    for start in starts:
        end = start + win_size
        chunk = np.zeros(win_size, dtype=np.float32)
        actual = min(win_size, n - start)
        chunk[:actual] = audio[start:start + actual]

        st = float(np.mean(total_cents[start:start + actual])) / 100.0
        if abs(st) < 0.001:
            processed = chunk.astype(np.float64)
        else:
            processed = _pitch_shift_segment(chunk, sr, st)
            n_shifted += 1

        out [start:end] += processed * window
        norm[start:end] += window

    result = (out[:n] / np.maximum(norm[:n], 1e-8)).astype(np.float32)
    if verbose:
        print(f"  [pitch]      {len(starts)} windows ({n_shifted} shifted)  {time.time() - t0:.2f}s")
    return result


# ─── Stage 6: Amplitude variation ────────────────────────────────────────────

def apply_amplitude_variation(audio: np.ndarray, amp_lfo_db: np.ndarray,
                               verbose: bool) -> np.ndarray:
    gain = (10.0 ** (amp_lfo_db / 20.0)).astype(np.float32)
    if verbose:
        print(f"  [amplitude]  ±{float(np.max(np.abs(amp_lfo_db))):.1f} dB peak variation")
    return audio * gain


# ─── Stage 7: Breath noise ────────────────────────────────────────────────────

def apply_breath_noise(audio: np.ndarray, sr: int, params: HumanizeParams,
                       rng: np.random.Generator, verbose: bool) -> np.ndarray:
    n = len(audio)
    white = rng.standard_normal(n)
    nyq   = sr / 2.0
    sos   = scipy.signal.butter(4, [300 / nyq, min(8000 / nyq, 0.99)],
                                btype="bandpass", output="sos")
    breath = scipy.signal.sosfilt(sos, white).astype(np.float32)

    # Voice-presence gate from vocal RMS (vectorized)
    frame = max(1, int(0.010 * sr))
    kernel = np.ones(frame) / frame
    rms_env = np.sqrt(np.maximum(
        np.convolve(audio.astype(np.float64) ** 2, kernel, mode="same"), 0
    )).astype(np.float32)
    gate = np.clip(rms_env / max(float(np.max(rms_env)), 1e-8), 0.0, 1.0)

    peak = float(np.max(np.abs(audio)))
    if peak < 1e-8:
        return audio
    breath_gain = peak * (10.0 ** (params.breath_level_db / 20.0))
    result = audio + breath * gate * breath_gain

    if verbose:
        print(f"  [breath]     level {params.breath_level_db:.0f} dBFS relative to vocal peak")
    return result


# ─── Normalize ────────────────────────────────────────────────────────────────

def normalize_output(audio: np.ndarray, target_db: float = -1.0) -> np.ndarray:
    if HAS_PEDALBOARD:
        limiter = pedalboard.Pedalboard([
            pedalboard.Limiter(threshold_db=target_db, release_ms=250.0)
        ])
        mono = audio.ndim == 1
        arr = audio[np.newaxis, :] if mono else audio.T
        out = limiter(arr.astype(np.float32), sample_rate=44100)
        return out[0] if mono else out.T
    peak = float(np.max(np.abs(audio)))
    if peak > 0:
        audio = audio * (10.0 ** (target_db / 20.0) / peak)
    return audio


# ─── Master pipeline ──────────────────────────────────────────────────────────

def humanize(audio: np.ndarray, sr: int, params: HumanizeParams,
             verbose: bool = False, seed: int | None = None) -> np.ndarray:
    rng = np.random.default_rng(seed)
    n = len(audio)

    if verbose:
        print(f"Input: {n} samples @ {sr} Hz  ({n / sr:.2f}s)")

    peak = float(np.max(np.abs(audio)))
    if peak > 1.0:
        print(f"WARNING: input clipping (peak={peak:.3f}), normalizing before processing.")
        audio = audio / peak * 0.99

    # LFO generation
    micro = _random_walk_lfo(n, sr, 2.0, params.micro_pitch_cents, rng)
    vibrato = (
        _vibrato_lfo(n, sr, params.vibrato_rate_hz, params.vibrato_depth_cents,
                     params.vibrato_jitter, rng)
        if params.do_vibrato else np.zeros(n)
    )
    total_cents  = micro + vibrato
    amp_lfo_db   = _random_walk_lfo(n, sr, 0.2, params.amp_variation_db, rng)

    if params.do_eq:
        audio = apply_eq(audio, sr, verbose)

    if params.do_compression:
        audio = apply_compression(audio, sr, params, verbose)

    if params.do_saturation:
        audio = apply_saturation(audio, params, verbose)

    audio = apply_pitch_variations(audio, sr, total_cents, verbose)
    audio = apply_amplitude_variation(audio, amp_lfo_db, verbose)

    if params.do_breath:
        audio = apply_breath_noise(audio, sr, params, rng, verbose)

    audio = normalize_output(audio)
    return audio.astype(np.float32)


# ─── CLI ──────────────────────────────────────────────────────────────────────

def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="Humanize AI-generated vocals with DSP.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    p.add_argument("input",  help="Input audio file (WAV, FLAC, AIFF, MP3 via librosa)")
    p.add_argument("output", nargs="?", default=None,
                   help="Output WAV path (default: <stem>_humanized.wav)")

    p.add_argument("--intensity",       type=float, default=0.3,
                   help="Master effect depth 0.0–1.0 (default: 0.3)")
    p.add_argument("--no-eq",           action="store_true", help="Skip EQ + cleanup")
    p.add_argument("--no-saturation",   action="store_true", help="Skip saturation")
    p.add_argument("--no-compression",  action="store_true", help="Skip compression")
    p.add_argument("--no-vibrato",      action="store_true", help="Skip vibrato")
    p.add_argument("--no-breath",       action="store_true", help="Skip breath noise")

    # Per-effect overrides
    p.add_argument("--micro-pitch-cents", type=float, default=None)
    p.add_argument("--vibrato-depth",     type=float, default=None)
    p.add_argument("--vibrato-rate",      type=float, default=None)
    p.add_argument("--amp-variation",     type=float, default=None)
    p.add_argument("--breath-level",      type=float, default=None)

    # Legacy no-ops (formant stage removed)
    p.add_argument("--no-formant",       action="store_true", help=argparse.SUPPRESS)
    p.add_argument("--formant-variation", type=float, default=None, help=argparse.SUPPRESS)

    p.add_argument("--seed",    type=int, default=None)
    p.add_argument("--dry-run", action="store_true",
                   help="Print resolved params and exit without processing")
    p.add_argument("-v", "--verbose", action="store_true")
    return p.parse_args()


def main() -> None:
    args = parse_args()
    params = params_from_intensity(args.intensity)

    if args.micro_pitch_cents is not None: params.micro_pitch_cents   = args.micro_pitch_cents
    if args.vibrato_depth     is not None: params.vibrato_depth_cents = args.vibrato_depth
    if args.vibrato_rate      is not None: params.vibrato_rate_hz     = args.vibrato_rate
    if args.amp_variation     is not None: params.amp_variation_db    = args.amp_variation
    if args.breath_level      is not None: params.breath_level_db     = args.breath_level

    params.do_eq          = not args.no_eq
    params.do_compression = not args.no_compression
    params.do_saturation  = not args.no_saturation
    params.do_vibrato     = not args.no_vibrato
    params.do_breath      = not args.no_breath

    if not HAS_RUBBERBAND and args.verbose:
        print("NOTE: pyrubberband not found — using librosa fallback.")

    if args.dry_run:
        print("=== Dry run — resolved parameters ===")
        for k, v in vars(params).items():
            print(f"  {k:25s}: {v}")
        print(f"  {'rubberband':25s}: {HAS_RUBBERBAND}")
        print(f"  {'pedalboard':25s}: {HAS_PEDALBOARD}")
        return

    in_path  = Path(args.input)
    out_path = Path(args.output) if args.output else in_path.with_name(in_path.stem + "_humanized.wav")

    try:
        audio, sr = sf.read(str(in_path), dtype="float32", always_2d=False)
    except Exception:
        if HAS_LIBROSA:
            audio, sr = librosa.load(str(in_path), sr=None, mono=False)
            if audio.ndim == 2:
                audio = audio.T
        else:
            sys.exit(f"ERROR: cannot load {in_path} — install librosa for MP3 support.")

    stereo   = audio.ndim == 2
    channels = [audio[:, c] for c in range(audio.shape[1])] if stereo else [audio]

    t_start = time.time()
    processed = []
    for c, ch in enumerate(channels):
        if args.verbose and stereo:
            print(f"\n--- Channel {c} ---")
        processed.append(humanize(ch, sr, params, verbose=args.verbose, seed=args.seed))

    result = np.stack(processed, axis=1) if stereo else processed[0]
    sf.write(str(out_path), result, sr, subtype="FLOAT")

    dur   = len(channels[0]) / sr
    total = time.time() - t_start
    print(f"Done: {out_path}  ({dur:.1f}s audio in {total:.1f}s, {dur / total:.1f}x realtime)")


if __name__ == "__main__":
    main()
