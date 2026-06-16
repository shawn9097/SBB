# Songwriting Craft — Sleep Token-Tier Reference

Synthesized from two parallel deep research passes (internal analysis + Gemini deep research).
Covers: production engineering, vocal acoustics, arrangement architecture, hook science, melodic writing, lyric craft.

---

## 1. Frequency & Production Engineering

### Carving Space for Vocals Over Heavy Guitars

Modern downtuned guitars (drop-B, drop-C, 7/8-string) occupy 80 Hz–8 kHz with the distortion presence peak at 2–4 kHz — the same range as vocal intelligibility. Without surgical carving, the vocal disappears.

**Rhythm guitar EQ protocol:**
- High-pass filter at 80–120 Hz (24 dB/octave slope) — strips low-end rumble, clears headroom for bass and kick
- Broad +1–2 dB boost around 250 Hz (low Q) — preserves warmth without mud
- –1–2 dB at 500 Hz — removes boxiness
- –1–2 dB at 800–1000 Hz — eliminates midrange "wonkiness"
- **–2–4 dB scoop at 2–4 kHz** — this is the critical move; it carves the center image for the vocal presence zone
- Double-track and pan hard left/right — clears the center stereo field for the vocal

**Lead vocal EQ protocol:**
- High-pass at 80–120 Hz (clean vocals), 100–150 Hz (screams/aggressive delivery)
- Surgical cuts at 250–500 Hz — removes boxiness and throat resonances
- +boost at 3–5 kHz — vocal bite and articulation
- High-shelf +boost at 10–12 kHz — "air," perceived clarity

**Dynamics chain (staged, not single-compressor):**
A single compressor on dense heavy mixes causes audible pumping. Use multiple staged gain reduction:
1. Clip gain / pre-gain trim at the region level
2. Fast-attack tracking compressor (catches transients)
3. Bus compression (glue)
This keeps the vocal upfront and consistent without fighting the guitars for headroom.

### What Cuts Through and What Gets Buried

| Vocal Register | Frequency Range | Behavior Over Heavy Guitars |
|---|---|---|
| Deep chest voice | 200–500 Hz | Conflicts directly with rhythm guitar fundamentals — gets buried |
| Midrange tone | 500–1000 Hz | Densest harmonic content in distorted guitars — disappears |
| Upper chest / head voice | 800–4000 Hz | Sits above guitar fundamentals — cuts through |
| Falsetto | 2000–6000 Hz | Counterintuitively piercing over dense mixes |
| Articulated consonants (T, K, S) | 4000–8000 Hz | Transient bursts — always audible, carry intelligibility |

**Practical rule:** The most important lyrical phrases need to land in the upper register. If the chorus title is sung at the bottom of your range, nobody is hearing the words. Falsetto and head voice are mixing tools, not just emotional choices.

**The space trick:** Vessel sings between guitar hits, not over them. Production has rhythmic gaps; the voice lives in those spaces. This is arrangement-level thinking, not just mixing.

---

## 2. Vocal Acoustics & Technique

### Formant Tuning (How Projection Works Physically)

The voice produces a fundamental frequency (f₀) plus overtones. The vocal tract — modeled as a tube closed at the glottis, open at the lips — filters this raw signal through resonance zones called **formants** (F₁, F₂, etc.).

**F₁-f₀ coupling:** When the first formant frequency (F₁) aligns with the fundamental pitch being sung, the vocal tract naturally amplifies the sound wave. This allows high-intensity projection without increasing breath pressure or tightening the throat. It's acoustic physics, not effort.

**Vowel impact on formants:**
- Open vowels (AH, AW, AY) → high F₁ → easier resonance coupling at high pitches → more power with less strain
- Closed vowels (EE, OO) → low F₁ → resonance coupling breaks down at high pitches → physical barrier

**Practical consequence:** Open vowels at peak notes aren't just about sound — they're about physical efficiency. A closed vowel on a high belted note requires dramatically more effort to project and risks vocal fatigue and inconsistency.

**Vowel modification:** As pitch ascends, singers shift closed vowels toward open variants (OO → AH, EE → AY). Lowering the jaw widens the oral cavity and raises F₁. If the mouth doesn't open enough, throat tension spikes. Over-opened, the vowel shape disintegrates and lyrics become unintelligible — balance required.

**Navigating the passaggio (register break):**
At the vocal transition zone, F₁ interacts with the second harmonic (H₂). Inexperienced singers try to raise F₁ indefinitely as pitch climbs, which tightens the pharynx and causes strain or breaks. The correct move is to allow F₁ to drop below H₂ — historically called "covering" — which produces a smooth head voice or mixed voice transition. The timbre changes; the power doesn't.

### Vessel's Physical Technique (Sleep Token)

- Sings through clenched teeth and jaw tension on certain passages — creates unique roundness and resonance (audible on "Granite")
- Pharyngeal shift for nasal resonance in upper register
- Fluid falsetto-to-chest transitions, sometimes inverted (chest voice deployed in upper register for weight, falsetto in mid-range for texture)
- R&B-style melisma: short 2–4 note ornaments on a single syllable (not extended runs) — gives the voice a "liquid" quality over rigid rhythmic production
- Phrase compression: rushes a full sentence into fewer beats than expected, then holds the final word — urgency → stillness
- **Audible breath sounds are kept in production.** They signal effort, vulnerability, physicality. They're not cleaned out — they're an emotional tool.
- Production uses Autotune and vocoders as overt stylistic choices (not error correction): "DYWTYLM," "Ascensionism," "Take Me Back to Eden," "Emergence"

### Chester Bennington's Vocal Fry Scream

Bennington's screams were pitch-specific — he tracked the melodic contour of the music even while screaming. Distortion naturally emphasizes upper harmonics, so pitch-specific screaming generates a multiphonic effect: one voice sounds like multiple simultaneous notes.

The technique: **vocal fry scream** — diaphragmatic airflow control shapes the distortion within the larynx, minimizing physical tension on the vocal folds. The key is that the scream *rides the melody* rather than abandoning it.

**Note on tuning:** When Linkin Park moved from half-step-down tuning to standard pitch post-*Meteora*, Bennington's live vocal demands increased (same notes, higher pitch). This contributed to vocal strain across touring schedules.

### Chino Moreno's Color Notes (Deftones)

Rather than landing on stable chord tones (root, 3rd, 5th), Moreno targets **color notes** — the 2nd, major 7th, 9th — over slow, heavy guitar chords. These unstable scale degrees create harmonic tension against the guitar without dissonance that reads as "wrong."

**Example:** D# (the major 2nd) held over a C# chord in "Around the Fur" — rubbing against Stephen Carpenter's ringing major 7th. The friction is the identity.

**Application:** One note per 4-bar phrase that's unexpectedly dissonant against the underlying chord. This is the interval that makes people replay the song. Not wrong — *charged*.

---

## 3. Arrangement Architecture

### The Five-Movement Structure

Sleep Token songs don't follow verse-chorus-verse-chorus. They follow emotional arcs:

| Movement | Function | Production |
|---|---|---|
| I — The World | Establish sonic environment. No hooks yet. | Ambient, textural, near-silence |
| II — The Problem | First recognizable musical ideas. Sparse, understated. | Purposefully underwhelming |
| III — The Pressure | Tension accumulates: layering, harmonic suspension, rhythmic density. Extended — patience here pays dividends. | Gradual addition of elements |
| IV — The Release | The drop, chorus, or breakdown. Maximum density. Often rhythmically displaced (halftime or double-time). | Everything at once |
| V — The Aftermath | What happens after the peak. Single chord, melodic fragment, near-silence. This is where songs become *haunting* rather than merely heavy. | Stripping back |

### Delayed Gratification (Exponential Multiplier)

"The Offering" withholds the metal section until well past the midpoint of a 10+ minute song. The payoff when it arrives is not twice as powerful — it's ten times more powerful, because the listener has been building expectation for minutes.

**The principle:** Every second of unresolved tension is interest accumulating on the eventual release. Delayed gratification multiplies impact exponentially, not linearly.

**Practical:** Let a verse sit longer than feels comfortable. A 4-bar pre-chorus that almost resolves, then a 2-bar hold, THEN the drop. The first scream of the album should arrive later than expected.

### The Baseline Rule (The Lever)

If the verse is at 70% density, the chorus gets you a 30% lift. If the verse is at 20%, the chorus delivers a 5x lift.

Most bands instinctively over-produce verses. The correct move: make verses *genuinely* sparse. Too empty. Uncomfortable. The listener should feel the absence of things. Then the chorus is a different universe.

### The Texture Triangle

Verse and chorus should sit at opposite corners of three axes simultaneously:

| Axis | Verse | Chorus |
|---|---|---|
| Density | 2–3 elements maximum | Full band + electronics + stacked vocals |
| Register | Lower, intimate, narrow | Higher, wider frequency spread |
| Harmonic complexity | Extended chords (min9, maj7, sus2, add11) | Power chords OR single-function progressions |

**The paradox:** Choruses are harmonically *simpler* than verses but feel more powerful because density, register, and production all maximize simultaneously. Simplifying the harmony is what allows everything else to land. A single sustained note on an open vowel over a full band hits harder than complex melody over a complex chord.

### Genre-Stitching: How to Fuse Without Fracturing

Sleep Token blends R&B, neo-soul, jazz, ambient, and metal without sounding incoherent. The binding mechanism:

**The harmonic constant:** The same chord quality or interval appears in both clean and heavy sections, transformed by density. A minor 9th in the clean verse becomes a palm-muted root plus a high-string minor 9th tension in the breakdown. Same *idea*, different *density*.

**The preparation principle:** Never transition from clean to heavy without 8–16 bars of preparation. Embed the incoming element quietly under the existing texture before it dominates. The ear accepts guitar as part of this song's world before it takes over.

**The scream as continuity:** The scream should arrive on a note that was already part of the melodic material. The pitch is familiar; only the timbre changes. This makes extreme transitions feel *inevitable* rather than jarring.

**Genre transition rule:** Never change tempo AND texture AND dynamic level simultaneously. Change one element, let it settle, then change another.

---

## 4. Tension & Release Theory

Four simultaneous tension engines, each payable independently:

**Harmonic tension** — Unresolved chords, suspended harmonies, borrowed chords (♭VI, ♭VII, ♯IV). The brain wants resolution. The longer you withhold it, the more valuable the payoff.

**Rhythmic tension** — Syncopation, metric displacement, polymeter (guitar in 7 against drums in 4). Djent's contribution: rhythm itself becomes a tension source independent of harmonic content.

**Dynamic tension** — Very quiet passages prime the ear via the Fletcher-Munson effect (the brain compensates for quiet by increasing sensitivity). Everything following a quiet passage sounds louder than it actually is.

**Textural tension** — Adding layers one at a time makes each addition feel significant. The 3rd guitar track feels enormous if you've built to it through two previous additions. The first element after silence feels like an event.

### The Breakdown as Sacred Architecture

The halftime breakdown is one of the most technically sophisticated moves in heavy music. Done correctly:

1. The snare moves to beat 3 (or disappears) — tempo *feels* halved without changing
2. High-frequency content drops out — mid/low register takes the foreground
3. Kick and bass become the melody
4. Negative space (the gaps between riff hits) becomes compositional
5. Vocals descend to chest voice or spoken register

**The held moment (what most bands skip):** After the breakdown reaches maximum tension, don't immediately release into the final chorus. Hold 4–8 bars of near-nothing — just a bass note sustaining, or a single kick hit per bar. This held moment is where the listener's anticipation peaks. The return from *that* silence is exponentially more powerful than a return from the breakdown itself.

---

## 5. Hook & Earworm Science

### The Neuroscience (Jakubowski / FANTASTIC Analysis)

Involuntary Musical Imagery (INMI / earworms) research at Durham University identified measurable structural properties of hooks that trigger spontaneous mental replay:

- **Faster average tempo** than non-earworm songs
- **Rise-then-fall melodic contour** (arch shape) — the most universally recallable shape in Western music
- **Unexpected interval leaps** within otherwise familiar contours — cognitive surprise triggers replay
- **Longer note durations** and **smaller average pitch intervals** than typical — balance of simplicity and interest
- **"Melodic rhythm"** — the rhythmic pattern of the syllables is processed before pitch and is the primary driver of stickiness. A hook you can tap on a single note is already working.

**Neurological pathway:**
- Primary auditory cortex reactivates during imagined music (the brain's "internal MP3 player")
- Limbic system links melody to emotional state and autobiographical memory → spontaneous recall
- Dopaminergic system rewards repetitive pattern resolution → motivates the loop
- Neural resonance spreads to motor cortex, basal ganglia, cerebellum → involuntary physical movement (head nods, finger taps)

### The Hook Gap

A structural rest or pause immediately following a high-energy phrase allows working memory to process and internally replay the phrase. This gap cements the loop. The listener fills the silence by replaying the hook — they're doing the earworm work themselves.

**Application:** After the chorus title phrase, leave 1 beat of silence before the next line. The brain replays the title in that gap. That's the mechanism.

### Five Principles of a Metal Hook

**1. Open vowels at the peak note**
AH, AW, OH, AY on the highest or longest held note. Closed vowels (EE, OO) restrict the throat and cut projection. Every legendary metal hook title has this property.

**2. Arch contour**
Low → rise → peak → fall. The universally retained melodic shape. The speed of the rise (faster = aggressive), the size of the peak leap (larger = dramatic), and the fall point (full resolution or mid-fall suspension) are the variables.

**3. The gap-fill**
After a large ascending leap, move stepwise back down through the interval. Creates micro tension-release within the melodic line — the same physics as the macro arrangement structure, compressed to 2–3 notes.

**4. Repeated-note momentum**
Repeating the same pitch 3–4 times with rhythmic variation. All energy goes into rhythm rather than pitch. Hypnotic and direct. Blues, hip-hop, djent riffs all use this. One note with accelerating rhythm is often more intense than a wide melodic range.

**5. The color note**
One note per 4-bar phrase that doesn't sit comfortably against the underlying chord — a ♯4 (tritone), a ♭9, an unexpected major 7. This is the interval that makes people replay the song. The brain didn't fully process it on first hearing and goes back for it.

### Front-Loading the Signal

Skip decisions on streaming platforms happen in 7–15 seconds. The first sound that enters the song should be the most characteristic sound of *this specific song* — not a generic intro. The hook fragment, the production signature, the specific riff that defines this track's world. The listener must immediately know what emotional experience they're about to have.

---

## 6. Melodic Writing: Section-by-Section

### Phrasing Contrast Between Sections

**Front-loaded phrases** (starting on beat 1, declarative) → verse energy, certainty, aggression
**Back-loaded phrases** (syncopated, starting after the beat) → chorus energy, lift, momentum

Switching phrase entry points between sections signals the section change physically, before the production change registers. Alternating these throughout the song prevents monotony.

**Line length contrast:**
- Short paused lines with gaps in the verse → builds space and tension
- Long flowing phrases in the chorus → releases that tension through continuity

### The Spencer Sotelo Workflow (Periphery)

Map the full vocal melody, rhythmic values, and syllable count over the instrumental riff *before writing any lyrics*. Match literal words to a pre-established syllabic rhythm. This ensures the vocal syncopates correctly with shifting time signatures and polyrhythmic patterns.

**The principle:** Rhythm comes first, pitch second, words third. The syllabic pattern IS the hook.

### Chorus Lift Mechanics

For a chorus to feel like a genuine lift, these parameters should shift simultaneously:

| Parameter | Verse | Chorus |
|---|---|---|
| Vocal register | Low/mid | Upper — head voice, belt |
| Line length | Short, paused | Long, continuous |
| Harmonic density | Complex extensions | Simplified, driving |
| Rhythmic values | Varied, syncopated | Locked-in, driving |

When all four shift at once, the chorus lands like a different room.

---

## 7. Vocalist Reference

| Vocalist | Physiological Approach | Harmonic Choices | Genre Crossover | Production |
|---|---|---|---|---|
| Vessel (Sleep Token) | Jaw clenching, pharyngeal shift, formant tuning; audible breath kept in | High falsetto + chest belt; complex R&B melisma; color note targeting | R&B, gospel, ambient, metalcore, trap | Extreme compression; Autotune/vocoder as overt stylistic choice |
| Chino Moreno (Deftones) | Breathy whisper to soaring mixed-voice within same phrase; extreme dynamic range | Targets unstable color notes (2nds, maj7, 9ths) over static chords; modal mixture | Alternative rock, shoegaze, ethereal pop | High ambient reverb/delay; very dynamic mix |
| Chester Bennington (Linkin Park) | Vocal fry scream with diaphragmatic control, minimal throat tension; immediate transition to high belts | Pitch-specific screaming tracking the melodic contour; multiphonic from harmonic emphasis | Nu-metal, hip-hop crossover, pop/rock anthems | Double-tracked scream layers; high-end compression |
| Spencer Sotelo (Periphery) | Stylized pop delivery; controlled high tenor; "emo" nasality | Complex syncopated intervals over polyrhythmic riffs; syllabic map built before lyrics | Progressive metal, djent, contemporary pop | Staged multi-compressor dynamics; multi-layer tracking |
| Oli Sykes (BMTH) | Deathcore growls → soft pop-influenced clean vocals | Simple clean verse melodies; soaring stadium-anthem hooks | Pop-metal, electronicore, hip-hop, EDM | Heavy processing; vocoders; electronic vocal chops |

---

## 8. Lyric Craft

### The Specificity Test

The difference between a lyric that *describes* an emotion and a lyric that *is* the emotion is specificity of image.

- "I feel like I'm falling" → abstract, describes; listener told what to feel
- "I'm watching the ceiling while the floor goes away" → specific, spatial, physically felt

Every verse line should pass: **Can you see it? Can you feel it in your body?**

Abstract → rewrite. Physical → keep.

### Prosody: Consonant Weight Matching Emotional Weight

Heavy consonants (K, T, D, P, B, hard G) for aggressive lines.
Soft consonants (M, N, L, soft S, F) for intimate lines.

When consonant weight contradicts emotional content, the line doesn't land regardless of how good the words are. The mouth tells the story before the brain processes the meaning.

### The Turn (Bridge as Revelation)

The best bridges don't repeat the emotional content of the verses — they *recontextualize* it. One of three turn types:

**Temporal turn:** Shift the timeframe. Present-tense verses become past-tense in the bridge — the chorus becomes a memory responding to a loss already complete.

**POV turn:** Change the address. Verses to another person; bridge to self. Creates sudden intimacy and accountability.

**Revelation turn:** Something assumed in the verses is inverted. The protagonist is revealed to be complicit, victorious, or already gone. Everything that came before means something different now.

**Structural requirement:** The bridge should be the quietest moment in the song. Maximum vulnerability with minimum production. This serves double duty: emotional exposure AND the contrast that makes the final chorus hit exponentially harder.

### Read-Aloud Test

If a lyric is awkward to say out loud at normal speaking pace, it will be worse when sung over a beat. Suno renders awkward lyrics more awkwardly. Read every line aloud before finalizing.

---

## 9. Underdog City Application Checklist

### Arrangement
- [ ] Open with the most characteristic sound of this track, not a generic swell
- [ ] Verse genuinely sparse — if you're at 60% before the chorus, you have no room to move
- [ ] Engineer the "held moment" before every chorus drop — 2–4 bars of maximum tension, minimum release
- [ ] Prepare genre transitions 8–16 bars in advance by embedding the incoming element quietly

### Production / Mixing
- [ ] HPF guitars at 80–120 Hz; scoop 2–4 kHz in rhythm guitars to clear vocal pocket
- [ ] Stage compression — clip gain → fast-attack compressor → bus glue
- [ ] Double-track and hard-pan rhythm guitars; keep center stereo field for vocal
- [ ] Keep audible breath sounds — they're emotional content

### Topline / Melody
- [ ] Write the hook first — everything else serves it
- [ ] Check: open vowel at the highest/longest note (AH, AW, OH, AY)?
- [ ] Check: arch contour? Rise → peak → fall
- [ ] Add one color note per 4-bar phrase — the unexpected interval that makes people replay
- [ ] The hook gap: 1 beat of silence after the title phrase before the next line
- [ ] Build syllabic rhythm before writing words

### Lyrics
- [ ] Every verse line: can you see it? can you feel it? if abstract, rewrite
- [ ] Match consonant weight to emotional weight
- [ ] Bridge: temporal, POV, or revelation turn — recontextualize, don't recap
- [ ] Read aloud before finalizing

### Screams (Underdog City specific)
- [ ] Screams are rhythmic texture, not showcases — deploy sparingly
- [ ] The scream arrives on a note already in the melodic material
- [ ] One scream moment per song maximum unless the song is explicitly built around them
- [ ] The BLEGH is a punctuation mark, not a sentence
