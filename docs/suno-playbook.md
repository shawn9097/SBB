# Sacred Vow — Suno v5.5 Prompt Playbook

**One clean vocalist. Full dynamic range.**

The clean voice covers everything — whispered intimacy to belted anthemic to low spoken-tone breakdowns — through performance intensity and arrangement contrast, not vocal-type switching. This eliminates the hardest Suno engineering problem (aggression bleed from a second harsh voice) and replaces it with a simpler, more controllable challenge: building dynamic range through *arrangement density* and *per-section tag intensity*.

---

## 1. Style Box Template

**Rule:** bracket-free, 4–7 descriptors, front-load the dominant genre, describe vocal range positively, keep aggression words out entirely.

```
cinematic progressive metalcore, djent, ~150 BPM, drop-tuned 8-string chugging riffs, atmospheric synth pads, dynamic clean vocals from whispered to belted, polished modern metal production, dark and cathartic
```

**Swap the last two slots** for mood variants:
- Atmospheric/vulnerable: `...spacious mix, dark and introspective`
- Heavier/driving: `...scooped mids, high gain, relentless and cathartic`
- Epic/cinematic: `...orchestral layers, grand and cathartic`

**What to keep out of the Style box:**
- "aggressive," "angry," "screaming," "harsh" — these bleed intensity into every section
- Artist names — filtered and unreliable; use descriptive equivalents
- Bracket tags — keep the Style box bracket-free to avoid glitching generation
- Technical mixing terms ("sidechain the kick")

**Heaviness without aggression words:**
`downtuned, crushing, low-end heavy, chugging, scooped mids, high gain, double bass, blast beats, Drop C/B, ultra-low tuning, 8-string`

---

## 2. Section Tag Map

Tags live in the **Lyrics field only**. Each tag controls the *arrangement density and vocal intensity* for that section — since the voice is always clean, the contrast is built through what's around it.

Place each tag on its own line with a blank line before the lyrics beneath it.

### Full Song Skeleton

```
[Intro: ambient pads, clean guitar swell, building tension]

[Verse 1: hushed clean vocals, intimate, sparse arrangement, palm-muted chugs]
(lyrics here — strongest image first)

[Pre-Chorus: rising intensity, layering guitars and bass, vocals building]
(2 lines of rising tension)

[Chorus: belted clean vocals, stacked harmonies, full band, anthemic lift]
(2–4 line hook — strongest line first — repeat it verbatim)

[Verse 2: clean vocals, slightly heavier groove, advancing the story]
(lyrics — shift POV or scene from verse 1)

[Chorus: belted clean vocals, stacked harmonies, full band, anthemic lift]
(same hook lyrics as Chorus 1)

[Breakdown: halftime, low spoken-tone clean vocals, gang chant, heavy chugging]
(short repeated phrase)
(gang vocals)

[Bridge: stripped, intimate clean vocals, acoustic guitar or piano, the turn]
(the reframe — new perspective or revelation that recontextualizes everything)

[Final Chorus: clean vocals, layered harmonies, maximum energy, biggest moment]
(same hook — this is the payoff)

[Outro: fade out, ambient reprise]
[End]
```

### Tag Reference

| Section | Purpose | Intensity descriptors |
|---|---|---|
| `[Intro]` | Establish atmosphere | `ambient pads`, `clean guitar swell`, `building tension` |
| `[Verse 1]` / `[Verse 2]` | Tell the story | `hushed clean vocals`, `intimate`, `sparse`, `whispered` |
| `[Pre-Chorus]` | Launchpad — build or pull back | `rising`, `building intensity`, `layering guitars` |
| `[Chorus]` | Emotional peak | `belted clean vocals`, `soaring`, `anthemic`, `stacked harmonies`, `full band` |
| `[Post-Chorus]` | Secondary hook / sustain energy | `clean vocal tag`, `whoa-oh`, `synth riff` |
| `[Breakdown]` | Rhythmic/production hook | `halftime`, `low spoken-tone`, `gang chant`, `heavy chugging` |
| `[Bridge]` | The turn — stripped vulnerability | `stripped`, `intimate`, `piano`, `acoustic`, `vulnerable` |
| `[Final Chorus]` | Biggest payoff | `layered harmonies`, `maximum energy`, `key change` |
| `[Outro]` | Wind down | `fade out`, `ambient reprise`, `reverb tail` |

**Parentheses = background texture.** Words in `(parentheses)` are backing layers behind the lead — use for gang-vocal answers, a harmony stack, a repeated ad-lib phrase:
```
(hold on)
(we carry this)
```

**Do not use:** `[Harsh Vocals]`, `[Scream]`, `[Growl]`, `[Guttural]`, `[Aggressive Vocals]` — the voice is always clean. Naming harsh tags even once can pull the whole section out of clean territory.

---

## 3. Songwriting Craft

### The hierarchy

1. **Prosody first.** Decide the single emotion before writing a word. Every element — structure, rhyme, section length, image — should serve that one idea.
2. **Show, don't tell.** "The bathroom light stayed on at three AM, my jacket smelled like gasoline and your goodbye" beats "I was heartbroken." Replace stated emotion with Action + Imagery + Detail (one object, one action, one moment in time per verse).
3. **Object writing warm-up.** 10 minutes, free-form, all seven senses: sight, hearing, smell, taste, touch, organic (heartbeat, breath, muscle tension), kinesthetic (falling, spinning, feeling trapped). The organic and kinesthetic senses are especially powerful for metal.

### Rhyme

- **Verses:** slant/family rhyme for tension and forward motion. Family rhyme = same vowel, consonants from the same phonetic family (plosives with plosives). Feels unresolved — right for storytelling.
- **Hook:** perfect rhyme for closure and lock. This is the one place where full resolution earns its place.
- Don't over-rhyme. Forced perfect rhyme produces inverted, unnatural lines that sing badly and Suno renders badly.

### Structure jobs

| Section | Job |
|---|---|
| Verse | Lower, speech-like register; pulls the listener in with specific story |
| Pre-Chorus | Rising tension; moves away from the home key; ends unresolved |
| Chorus | Emotional peak; generalizes the verse story; delivers the title |
| Bridge | Resets/turns — new perspective, time, or speaker; recontextualizes everything |
| Final Chorus | Pays off the whole arc; should feel earned, not just louder |

### The turn (most important element)

The strongest songs hinge on a surprise or reframe. Plant a detail early (a specific object, a repeated image) — the bridge reveals what it actually meant. Plant foreshadowing in verse 1; pay it off in the bridge.

### Singability test

Read lyrics aloud and clap the syllables. If a line feels awkward to say, it will sing worse — and Suno renders it worse. Stressed syllables should land on strong beats (beats 1 and 3 in 4/4).

---

## 4. Hook & Chorus Engineering

### The earworm formula (empirical)

Familiar melodic contour (rise-then-fall arc) + **one** surprising element (an ascending leap, a repeated note, a syncopation) + up-tempo feel. This is the most evidence-backed melodic move available.

### Writing the hook

- Write the chorus **first**, then build verses that pay it off.
- 2–4 lines, title-forward, strongest line first.
- Key line: under 7 words, ending on an open vowel (ah, oh, ay) — easier to belt, easier for a crowd to sing, cuts through a heavy mix.
- One ascending leap (a 5th or larger) into the chorus downbeat or pickup.
- One peak note, hit once, on a strong beat — the "money note." Put the most open vowel there.
- Repeat identical chorus lyrics across every occurrence to lock the melody.

### The lift (verse → chorus contrast)

A chorus lands when it lifts in **multiple dimensions simultaneously:**
- Register: higher melody
- Density: more instruments, wider vocal stacks
- Rhythm: straighter or busier
- Energy: louder/wider stereo field

For one clean voice: the lift is the arrangement doing the heavy lifting, not a vocal type change. Hold back everything in the verse — ambient pads, clean guitar, minimal drums — so the full-band chorus detonates by contrast.

### Pre-chorus as launchpad

Change at least two elements from the verse (chord movement, register, rhythmic feel). Either ramp energy *up* or pull it *back* (thinning drums/bass) so the chorus explodes by contrast. End on an unresolved/leading harmony.

### Repetition with variation

State a 1–2 bar motif, repeat it, then on the 3rd/4th pass change one note, extend the rhythm, or shift the ending. Variation makes repetition feel intentional rather than lazy.

### Post-chorus

A short "whoa-oh" / synth riff after the main chorus often out-sticks the hook and sustains energy. Tag it: `[Post-Chorus: clean vocal hook, gang vocals answering, synth riff]`.

### Front-loading

Get a hook signal into the first 7–15 seconds. Skip decisions happen in the first 5 seconds. A short atmospheric intro leading into a vocal or a chorus-fragment opener earns the listen.

---

## 5. Creative Sliders

| Slider | Setting | Why |
|---|---|---|
| Weirdness | Low (0.2–0.3) | Structural precision for djent/prog |
| Style Influence | High (0.7–0.9) | Consistent sound-world |
| Weirdness (bridge) | Medium (0.5) | Experimental passages only |

One Voice/Persona (Clean) with high Style Influence. No second persona needed. Build a Custom Model from ≥6 consistent Sacred Vow tracks once they exist — locks production DNA across the album.

---

## 6. Full Workflow Per Song

1. **Find the one idea.** Decide the single emotion. Do a 10-minute object write to mine sense-bound images.
2. **Draft the human lyric.** Show-don't-tell verses (3 concrete details each), a contrast-driven chorus with a 4–10-syllable hook, a bridge that turns. Read aloud for singability.
3. **Architect for Suno (over-label).** Add a structure tag every section; specify vocal intensity per section; use parentheses for backing layers; add dynamics tags (`[Build]`, `[Crescendo]`); end with `[Outro]` / `[End]`.
4. **Set the Style box.** Bracket-free, 4–7 descriptors, dynamic clean vocals named, aggression words absent.
5. **Generate.** 4–6 variations; set Weirdness low / Style Influence high. Pick 1–2.
6. **Lock the chorus first.** Once a generation nails the chorus, freeze it (Replace Section / inpaint) and rebuild weaker verses around it rather than re-rolling the whole song.
7. **Finish in Studio.** Replace Section / inpaint the weak 10–20%; Remove FX for dry stems; EQ; export 12 stems to DAW for final mix/master.

---

## 7. Avoiding Common Failures

| Failure | Cause | Fix |
|---|---|---|
| Every section sounds the same intensity | No dynamic arc in the tags | Explicit `hushed` in verse, `belted anthemic` in chorus, `stripped` in bridge |
| Chorus doesn't lift | Verse already too dense | Pull verse back harder: muted guitars, minimal beat, no harmonies |
| Hook doesn't stick | Too many words, wrong vowels, uneven stress | Shorten to 4–7 syllables, end on open vowel, clap-test stress alignment |
| Melody is flat/generic | Even nursery-rhyme prosody | Add one ascending leap into the chorus downbeat; use slant rhyme in verses |
| Lyrics read generic | Telling not showing | Replace one stated emotion per section with a concrete object + action + moment |
| Suno flattens chorus melody | Chorus lyrics too long | Shorten to 2 lines; lower Weirdness further |

---

## 8. Paste-Ready Suno Prompt

### Style box
```
cinematic progressive metalcore, djent, ~150 BPM, drop-tuned 8-string chugging riffs, atmospheric synth pads, dynamic clean vocals from whispered to belted, polished modern metal production, dark and cathartic
```

### Lyrics field
```
[Intro: ambient pads, clean guitar swell, building tension]

[Verse 1: hushed clean vocals, intimate, sparse arrangement, palm-muted chugs]
(your show-don't-tell scene — one object, one action, one moment in time)

[Pre-Chorus: rising intensity, vocals and guitars layering, unresolved]
(2 lines lifting toward the hook)

[Chorus: belted clean vocals, stacked harmonies, full band, anthemic lift]
(4–10 syllable title hook — strongest line first — ends on open vowel)
(repeat the hook line)

[Verse 2: clean vocals, slightly heavier groove, advancing the scene]
(advance story or shift POV)

[Chorus: belted clean vocals, stacked harmonies, full band, anthemic lift]
(same hook lyrics)

[Breakdown: halftime, low spoken-tone clean vocals, gang chant, heavy chugging]
(short repeated phrase)
(gang vocals)

[Bridge: stripped, intimate clean vocals, acoustic guitar, the turn]
(the reframe — recontextualizes everything that came before)

[Final Chorus: clean vocals, layered harmonies, maximum energy, biggest moment]
(same hook)

[Outro: fade out, ambient reprise]
[End]
```

---

## 9. Benchmarks

| If this happens | Do this |
|---|---|
| Listeners can't recall the chorus after one listen | Simplify melody — more steps, fewer words, stronger single peak |
| Chorus doesn't lift | Increase verse contrast (pull verse energy *down*) rather than making chorus louder |
| Suno keeps flattening melody | Shorten chorus to 2 lines, lower Weirdness |
| Gang vocals come out inconsistent | Reinforce in Style box: "gang vocals, group chant"; accept iteration |
| Lyrics still generic after object writing | Rewrite one stated emotion per section into a concrete image |
| Single mixed generation nails the dynamic arc | Skip inpainting; go straight to Studio for stems |
