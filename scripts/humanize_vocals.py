"""
humanize_vocals.py — Make AI-generated vocals sound more human.

Applies a chain of DSP stages:
  1. Pitch micro-variations  (slow random wander ±N cents)
  2. Vibrato                 (sinusoidal ~5.5 Hz pitch oscillation)
  3. Formant variation       (slow vocal-tract movement, rubberband only)
  4. Amplitude variation     (breath-support envelope)
  5. Breath noise            (bandpass-filtered pink noise, voice-gated)
  6. Output normalization    (−1 dBFS limiter)

Usage:
    python3 humanize_vocals.py input.wav [output.wav] [options]

    --intensity 0.0-1.0   master knob controlling all effect depths (default 0.5)
    --no-vibrato          skip vibrato (useful for speech rather than singing)
    --no-breath           skip breath noise
    --no-formant          skip formant stage (saves ~30% processing time)
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

# ---------------------------------------------------------------------------
# Optional heavy dependencies
# ---------------------------------------------------------------------------
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

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
CHUNK_DUR_S   = 0.10   # OLA chunk length (seconds)
HOP_DUR_S     = 0.05   # OLA hop length  (seconds) — 50 % overlap

FORMANT_WIN_S = 0.50   # formant window length
FORMANT_HOP_S = 0.25   # formant hop (50 % overlap, cosine crossfade)

SILENCE_RMS_THRESHOLD = 1e-4   # below this → treat frame as silence
MIN_CHUNK_SAMPLES = 512        # minimum chunk for rubberband


# ---------------------------------------------------------------------------
# Parameters
# ---------------------------------------------------------------------------
@dataclass
class HumanizeParams:
    micro_pitch_cents:   float = 12.0
    vibrato_depth_cents: float = 18.0
    vibrato_rate_hz:     float = 5.5
    vibrato_jitter:      float = 0.3   # ± Hz random rate wobble
    amp_variation_db:    float = 2.0
    breath_level_db:     float = -44.0
    formant_variation_st: float = 0.3
    do_vibrato:  bool = True
    do_breath:   bool = True
    do_formant:  bool = True


def params_from_intensity(intensity: float, base: HumanizeParams | None = None) -> HumanizeParams:
    t = float(np.clip(intensity, 0.0, 1.0))
    p = base or HumanizeParams()
    p.micro_pitch_cents    = 3  + (25 - 3)  * t
    p.vibrato_depth_cents  = 5  + (30 - 5)  * t
    p.amp_variation_db     = 0.5 + (4.0 - 0.5) * t
    p.breath_level_db      = -55 + (-35 - -55) * t
    p.formant_variation_st = 0.1 + (0.6 - 0.1) * t
    return p


# ---------------------------------------------------------------------------
# LFO helpers
# ---------------------------------------------------------------------------
def _lpf_smooth(signal: np.ndarray, sr: int, cutoff_hz: float) -> np.ndarray:
    nyq = sr / 2.0
    if cutoff_hz >= nyq:
        return signal.copy()
    n_min = 9  # sosfiltfilt padlen for order-2 filter
    sos = scipy.signal.butter(2, cutoff_hz / nyq, btype="low", output="sos")
    if len(signal) < n_min:
        return scipy.signal.sosfilt(sos, signal)
    return scipy.signal.sosfiltfilt(sos, signal)


def generate_lfo_random_walk(n: int, sr: int, cutoff_hz: float,
                              scale: float, rng: np.random.Generator) -> np.ndarray:
    white = rng.standard_normal(n)
    lfo = _lpf_smooth(white, sr, cutoff_hz)
    peak = np.max(np.abs(lfo))
    if peak > 0:
        lfo /= peak
    return lfo * scale


def generate_vibrato_lfo(n: int, sr: int, rate_hz: float, depth_cents: float,
                          jitter: float, rng: np.random.Generator) -> np.ndarray:
    rate_noise = generate_lfo_random_walk(n, sr, cutoff_hz=0.5, scale=jitter, rng=rng)
    inst_rate = rate_hz + rate_noise
    phase = np.cumsum(2 * np.pi * inst_rate / sr)
    return np.sin(phase) * depth_cents


# ---------------------------------------------------------------------------
# Stage 1: pitch variations (micro-wander + vibrato via OLA)
# ---------------------------------------------------------------------------
def apply_pitch_variations(audio: np.ndarray, sr: int, total_cents: np.ndarray,
                            verbose: bool) -> np.ndarray:
    n = len(audio)
    chunk_size = max(MIN_CHUNK_SAMPLES, int(round(CHUNK_DUR_S * sr)))
    hop_size   = max(MIN_CHUNK_SAMPLES // 2, int(round(HOP_DUR_S * sr)))

    # very short file: single call with mean semitone value
    if n < chunk_size:
        semitones = float(np.mean(total_cents)) / 100.0
        if abs(semitones) < 0.001:
            return audio.copy()
        return _pitch_shift(audio, sr, semitones)

    hann = np.hanning(chunk_size)
    out  = np.zeros(n + chunk_size, dtype=np.float64)
    norm = np.zeros(n + chunk_size, dtype=np.float64)

    t0 = time.time()
    starts = range(0, n, hop_size)
    for start in starts:
        end = start + chunk_size
        chunk = np.zeros(chunk_size, dtype=np.float64)
        actual = min(chunk_size, n - start)
        chunk[:actual] = audio[start:start + actual]

        semitones = float(np.mean(total_cents[start:start + actual])) / 100.0
        if abs(semitones) < 0.001:
            processed = chunk
        else:
            processed = _pitch_shift(chunk, sr, semitones)

        out [start:end] += processed * hann
        norm[start:end] += hann

    result = (out[:n] / np.maximum(norm[:n], 1e-8)).astype(np.float32)
    if verbose:
        print(f"  [pitch OLA]  {len(list(starts))} chunks  {time.time()-t0:.2f}s")
    return result


def _pitch_shift(audio: np.ndarray, sr: int, n_steps: float) -> np.ndarray:
    arr = audio.astype(np.float32)
    if HAS_RUBBERBAND:
        return rb.pitch_shift(arr, sr, n_steps).astype(np.float64)
    # librosa fallback
    return librosa.effects.pitch_shift(arr, sr=sr, n_steps=n_steps).astype(np.float64)


# ---------------------------------------------------------------------------
# Stage 2: formant variation (rubberband two-pass; skipped without rubberband)
# ---------------------------------------------------------------------------
def apply_formant_variation(audio: np.ndarray, sr: int,
                             params: HumanizeParams,
                             formant_lfo: np.ndarray,
                             verbose: bool) -> np.ndarray:
    if not HAS_RUBBERBAND:
        if verbose:
            print("  [formant]    skipped (pyrubberband not available)")
        return audio

    n = len(audio)
    win_size = max(MIN_CHUNK_SAMPLES, int(round(FORMANT_WIN_S * sr)))
    hop_size = max(MIN_CHUNK_SAMPLES // 2, int(round(FORMANT_HOP_S * sr)))

    if n < win_size:
        if verbose:
            print("  [formant]    skipped (file too short)")
        return audio

    cos_w = 0.5 - 0.5 * np.cos(np.pi * np.arange(win_size) / win_size)
    out  = np.zeros(n + win_size, dtype=np.float64)
    norm = np.zeros(n + win_size, dtype=np.float64)

    t0 = time.time()
    starts = range(0, n, hop_size)
    for start in starts:
        end = start + win_size
        chunk = np.zeros(win_size, dtype=np.float32)
        actual = min(win_size, n - start)
        chunk[:actual] = audio[start:start + actual].astype(np.float32)

        F = float(np.mean(formant_lfo[start:start + actual]))
        if abs(F) < 0.001:
            processed = chunk.astype(np.float64)
        else:
            # two-pass: shift pitch+formants up by F, then shift pitch back down
            # with formant-lock → net formant = +F, net pitch = 0
            step1 = rb.pitch_shift(chunk, sr, n_steps=F)
            step2 = rb.pitch_shift(
                step1.astype(np.float32), sr, n_steps=-F,
                rbargs={"--formant": ""}
            )
            processed = step2.astype(np.float64)

        out [start:end] += processed * cos_w
        norm[start:end] += cos_w

    result = (out[:n] / np.maximum(norm[:n], 1e-8)).astype(np.float32)
    if verbose:
        print(f"  [formant]    {len(list(starts))} windows  {time.time()-t0:.2f}s")
    return result


# ---------------------------------------------------------------------------
# Stage 3: amplitude variation
# ---------------------------------------------------------------------------
def apply_amplitude_variation(audio: np.ndarray, sr: int,
                               amp_lfo_db: np.ndarray,
                               verbose: bool) -> np.ndarray:
    gain_linear = (10.0 ** (amp_lfo_db / 20.0)).astype(np.float32)
    result = audio * gain_linear
    if verbose:
        print(f"  [amplitude]  ±{float(np.max(np.abs(amp_lfo_db))):.1f} dB peak variation")
    return result


# ---------------------------------------------------------------------------
# Stage 4: breath noise
# ---------------------------------------------------------------------------
def _generate_pink_noise(n: int, rng: np.random.Generator) -> np.ndarray:
    white = rng.standard_normal(n)
    sos = scipy.signal.butter(
        1, [0.02, 0.9], btype="bandpass", output="sos"  # approx pink via tilt
    )
    # simple pink-ish approximation with IIR
    b0 = b1 = b2 = 0.0
    pink = np.empty(n, dtype=np.float64)
    for i in range(n):
        w = white[i]
        b0 = 0.99765 * b0 + w * 0.0990460
        b1 = 0.96300 * b1 + w * 0.2965164
        b2 = 0.57000 * b2 + w * 1.0526913
        pink[i] = (b0 + b1 + b2 + w * 0.1848) * 0.1628
    return pink


def apply_breath_noise(audio: np.ndarray, sr: int, params: HumanizeParams,
                        rng: np.random.Generator, verbose: bool) -> np.ndarray:
    n = len(audio)
    pink = _generate_pink_noise(n, rng)

    # bandpass to breath range
    nyq = sr / 2.0
    lo, hi = 300.0 / nyq, min(8000.0 / nyq, 0.99)
    sos = scipy.signal.butter(4, [lo, hi], btype="bandpass", output="sos")
    breath = scipy.signal.sosfilt(sos, pink).astype(np.float32)

    # RMS envelope gate
    frame = max(1, int(0.010 * sr))
    kernel = np.ones(frame) / frame
    rms_sq = np.convolve(audio.astype(np.float64) ** 2, kernel, mode="same")
    rms_env = np.sqrt(np.maximum(rms_sq, 0)).astype(np.float32)

    # asymmetric IIR smoothing (10ms attack, 50ms release)
    alpha_a = 1.0 - np.exp(-1.0 / (0.010 * sr))
    alpha_r = 1.0 - np.exp(-1.0 / (0.050 * sr))
    gate = np.empty(n, dtype=np.float32)
    g = 0.0
    raw = (rms_env > SILENCE_RMS_THRESHOLD).astype(np.float32)
    for i in range(n):
        alpha = alpha_a if raw[i] > g else alpha_r
        g += alpha * (raw[i] - g)
        gate[i] = g

    peak_vocal = float(np.max(np.abs(audio)))
    if peak_vocal < 1e-8:
        return audio
    breath_gain = peak_vocal * (10.0 ** (params.breath_level_db / 20.0))

    result = audio + breath * gate * breath_gain
    if verbose:
        print(f"  [breath]     level {params.breath_level_db:.0f} dBFS relative to vocal peak")
    return result


# ---------------------------------------------------------------------------
# Stage 5: normalization
# ---------------------------------------------------------------------------
def normalize_output(audio: np.ndarray, target_db: float = -1.0) -> np.ndarray:
    if HAS_PEDALBOARD:
        limiter = pedalboard.Pedalboard([
            pedalboard.Limiter(threshold_db=target_db, release_ms=250.0)
        ])
        mono = audio.ndim == 1
        arr = audio[np.newaxis, :] if mono else audio.T
        out = limiter(arr.astype(np.float32), sample_rate=44100)
        return out[0] if mono else out.T
    # fallback: peak normalize
    peak = float(np.max(np.abs(audio)))
    if peak > 0:
        target_linear = 10.0 ** (target_db / 20.0)
        audio = audio * (target_linear / peak)
    return audio


# ---------------------------------------------------------------------------
# Master pipeline
# ---------------------------------------------------------------------------
def humanize(audio: np.ndarray, sr: int, params: HumanizeParams,
             verbose: bool = False, seed: int | None = None) -> np.ndarray:
    rng = np.random.default_rng(seed)
    n = len(audio)

    if verbose:
        print(f"Input: {n} samples @ {sr} Hz  ({n/sr:.2f}s)")

    # pre-check: warn if clipping
    peak = float(np.max(np.abs(audio)))
    if peak > 1.0:
        print(f"WARNING: input is clipping (peak={peak:.3f}), normalizing before processing.")
        audio = audio / peak * 0.99

    # --- LFO generation (all from same RNG state for determinism) ---
    micro_cents = generate_lfo_random_walk(n, sr, cutoff_hz=2.0,
                                            scale=params.micro_pitch_cents, rng=rng)

    if params.do_vibrato:
        vibrato_cents = generate_vibrato_lfo(n, sr,
                                              rate_hz=params.vibrato_rate_hz,
                                              depth_cents=params.vibrato_depth_cents,
                                              jitter=params.vibrato_jitter, rng=rng)
    else:
        vibrato_cents = np.zeros(n)

    total_cents = micro_cents + vibrato_cents

    formant_lfo = generate_lfo_random_walk(n, sr, cutoff_hz=0.08,
                                            scale=params.formant_variation_st, rng=rng)

    amp_lfo_db = generate_lfo_random_walk(n, sr, cutoff_hz=0.2,
                                           scale=params.amp_variation_db, rng=rng)

    # --- Stage 1: pitch variations ---
    t0 = time.time()
    audio = apply_pitch_variations(audio, sr, total_cents, verbose)
    if verbose:
        print(f"  [pitch total] {time.time()-t0:.2f}s")

    # --- Stage 2: formant variation ---
    if params.do_formant:
        audio = apply_formant_variation(audio, sr, params, formant_lfo, verbose)

    # --- Stage 3: amplitude variation ---
    audio = apply_amplitude_variation(audio, sr, amp_lfo_db, verbose)

    # --- Stage 4: breath noise ---
    if params.do_breath:
        audio = apply_breath_noise(audio, sr, params, rng, verbose)

    # --- Stage 5: normalize ---
    audio = normalize_output(audio)

    return audio.astype(np.float32)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------
def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="Humanize AI-generated vocals with DSP.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    p.add_argument("input",  help="Input audio file (WAV, FLAC, AIFF, MP3)")
    p.add_argument("output", nargs="?", default=None,
                   help="Output WAV path (default: <stem>_humanized.wav)")

    p.add_argument("--intensity", type=float, default=0.5,
                   help="Master effect depth 0.0–1.0 (default: 0.5)")
    p.add_argument("--micro-pitch-cents", type=float, default=None)
    p.add_argument("--vibrato-depth",     type=float, default=None)
    p.add_argument("--vibrato-rate",      type=float, default=None)
    p.add_argument("--amp-variation",     type=float, default=None)
    p.add_argument("--breath-level",      type=float, default=None)
    p.add_argument("--formant-variation", type=float, default=None)

    p.add_argument("--no-vibrato", action="store_true")
    p.add_argument("--no-breath",  action="store_true")
    p.add_argument("--no-formant", action="store_true")

    p.add_argument("--seed",    type=int, default=None)
    p.add_argument("--dry-run", action="store_true",
                   help="Print params and exit without processing")
    p.add_argument("-v", "--verbose", action="store_true")
    return p.parse_args()


def main() -> None:
    args = parse_args()

    params = params_from_intensity(args.intensity)

    # per-effect overrides
    if args.micro_pitch_cents is not None: params.micro_pitch_cents   = args.micro_pitch_cents
    if args.vibrato_depth     is not None: params.vibrato_depth_cents = args.vibrato_depth
    if args.vibrato_rate      is not None: params.vibrato_rate_hz     = args.vibrato_rate
    if args.amp_variation     is not None: params.amp_variation_db    = args.amp_variation
    if args.breath_level      is not None: params.breath_level_db     = args.breath_level
    if args.formant_variation is not None: params.formant_variation_st = args.formant_variation

    params.do_vibrato = not args.no_vibrato
    params.do_breath  = not args.no_breath
    params.do_formant = not args.no_formant

    # rubberband availability notice
    if not HAS_RUBBERBAND and args.verbose:
        print("NOTE: pyrubberband not found — using librosa fallback; formant stage disabled.")
        print("      Install: sudo apt install rubberband-cli && pip install pyrubberband")

    if args.dry_run:
        print("=== Dry run — resolved parameters ===")
        print(f"  intensity            : {args.intensity}")
        print(f"  micro_pitch_cents    : {params.micro_pitch_cents:.1f}")
        print(f"  vibrato_depth_cents  : {params.vibrato_depth_cents:.1f}")
        print(f"  vibrato_rate_hz      : {params.vibrato_rate_hz:.1f}")
        print(f"  amp_variation_db     : {params.amp_variation_db:.1f}")
        print(f"  breath_level_db      : {params.breath_level_db:.1f}")
        print(f"  formant_variation_st : {params.formant_variation_st:.2f}")
        print(f"  do_vibrato           : {params.do_vibrato}")
        print(f"  do_breath            : {params.do_breath}")
        print(f"  do_formant           : {params.do_formant}")
        print(f"  rubberband available : {HAS_RUBBERBAND}")
        print(f"  pedalboard available : {HAS_PEDALBOARD}")
        print(f"  seed                 : {args.seed}")
        return

    # resolve output path
    in_path = Path(args.input)
    if args.output:
        out_path = Path(args.output)
    else:
        out_path = in_path.with_name(in_path.stem + "_humanized.wav")

    # load audio
    try:
        audio, sr = sf.read(str(in_path), dtype="float32", always_2d=False)
    except Exception:
        if HAS_LIBROSA:
            audio, sr = librosa.load(str(in_path), sr=None, mono=False)
            if audio.ndim == 2:
                audio = audio.T  # librosa returns (channels, samples); sf uses (samples, channels)
        else:
            sys.exit(f"ERROR: cannot load {in_path} — install librosa for MP3 support.")

    stereo = audio.ndim == 2
    if stereo:
        channels = [audio[:, c] for c in range(audio.shape[1])]
    else:
        channels = [audio]

    t_start = time.time()
    processed_channels = []
    for c, ch in enumerate(channels):
        if args.verbose and stereo:
            print(f"\n--- Channel {c} ---")
        processed_channels.append(humanize(ch, sr, params,
                                            verbose=args.verbose,
                                            seed=args.seed))

    result = np.stack(processed_channels, axis=1) if stereo else processed_channels[0]

    sf.write(str(out_path), result, sr, subtype="FLOAT")
    total = time.time() - t_start
    dur = len(channels[0]) / sr
    print(f"Done: {out_path}  ({dur:.1f}s audio in {total:.1f}s, {dur/total:.1f}x realtime)")


if __name__ == "__main__":
    main()
