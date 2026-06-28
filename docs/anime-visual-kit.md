# Underdog City — Anime Visual Kit

Reusable prompt kit for the masked MC, the world, and the house style, plus a
shot-by-shot storyboard for the lead single **"Came Back Wrong."** Built for a
solo AI pipeline: **Midjourney (niji) for keyframes → Kling (or Runway/Hailuo)
for image-to-video → CapCut to cut to the music.**

> Workflow note: generate the masked MC **character sheet once**, upload it, and
> reuse its image URL as `--cref` on every prompt below so the character stays
> on-model across hundreds of clips. The mask is the logo — keep it identical.

---

## 0. House Style Anchor (append to everything)

Paste this fragment at the end of every image prompt so the whole world matches:

```
dark fantasy anime key art, gritty manhwa ink style, cinematic chiaroscuro, near-black background, tarnished gold and molten gold accents, cold neon blue and magenta rim light, painterly heavy shadow, high contrast, film grain, moody atmospheric --niji 6 --style raw
```

- Aspect ratio: **`--ar 9:16`** for Shorts; **`--ar 16:9`** for the full music video.
- Consistency: add **`--cref <your mask image URL>`** (character) and a fixed
  **`--sref <one style image URL>`** (style) once you've locked your first frames.
- Palette words that map to the brand: *near-black, tarnished gold, molten gold,
  bone white, cold neon blue, cold magenta, dried-blood crimson (rare).*
- Never pure/clean gold. Never bright daylight. The undercity is lit by gold
  cracks and cold neon, not sunlight.

---

## 1. The Masked MC — character kit

**Base character (the canonical look):**
```
masked figure, head and shoulders, matte black porcelain mask fractured kintsugi-style with veins of glowing molten gold, faint gold light leaking from behind the cracks, hollow dark eye sockets each with a single pinprick of cold gold light, broken asymmetric tarnished-gold crown fused at the brow, dark worn hood and high collar with grime texture, [HOUSE STYLE ANCHOR] --ar 9:16
```

**Character sheet (generate once, use as the master reference):**
```
character reference sheet of a masked anti-hero, multiple angles front side three-quarter back, several expressions, consistent matte black kintsugi-cracked mask with molten gold veins, broken gold crown, dark hood, full-body and head studies, neutral turnaround, model sheet layout, [HOUSE STYLE ANCHOR] --ar 16:9
```

**The four variant states** (same identity, different gold intensity — swap the
bracketed line into the base prompt):
- **Canonical** — `steady dim gold in the cracks, calm and watchful`
- **Gilding** — `cracks blazing with molten gold, light pouring out, power surging` (hype / chorus moments)
- **Hollow** — `gold dimmed to faint dying embers, cracks barely lit, vulnerable` (grief / quiet beats)
- **Crowned** — `reforged jagged gold crown blazing, seated on a dark throne, full kingdom-of-the-discarded energy` (finale / "Throne at the Bottom")

---

## 2. The World — location & motif kit

**Underdog City (the undercity):**
```
sprawling neon-and-garbage underworld city far below, towers of scrap and rusted steel, cold blue and magenta neon signs, mist and smoke, puddles reflecting neon, misfit crowds in shadow, grimy surreal Dorohedoro-meets-Edgerunners atmosphere, [HOUSE STYLE ANCHOR] --ar 16:9
```

**The Halo (above):**
```
a gleaming ring of cold white-gold light suspended high above the dark world, blinding clean architecture, distant and unreachable, a mile of steel and money below it, oppressive holy radiance, [HOUSE STYLE ANCHOR] --ar 16:9
```

**The service corridor (the prologue / death scene):**
```
a narrow grimy service corridor sixty levels under the Halo, flickering gold-to-white strip lights, wet concrete, pipes and steel, blood on the floor, claustrophobic and cold, [HOUSE STYLE ANCHOR] --ar 9:16
```

**Motifs:**
- **Kintsugi gold cracks:** `cracked black surface repaired with veins of glowing molten gold, kintsugi, light leaking from the fractures, macro detail`
- **The broken crown:** `a shattered asymmetric crown of tarnished gold, jagged and reforged, floating on near-black, single focal object`
- **A Sainted husk:** `a radiant hollow figure in white-gold robes, serene empty eyes, beautiful and wrong, an angel that used to be a person, [HOUSE STYLE ANCHOR]`
- **The discarded army:** `a shadow army of forgotten people and cast-off objects rising from the garbage and dark, dozens of dim silhouettes, the rejected answering a call, [HOUSE STYLE ANCHOR]`

---

## 3. "Came Back Wrong" — storyboard

The song is the origin: the death from the prologue → the gilding → the monster
rising. Shots are mapped to a standard song structure and the prologue beats;
**once you share the final lyrics + section timings I'll lock each shot to exact
timestamps.** Each shot = one keyframe to generate, then animate 5–10s in Kling.

| # | Section | Beat | Image prompt (+ house anchor) | Animate (Kling) |
|---|---|---|---|---|
| 1 | Intro | **Misdirection.** Low angle: feet/ankles in a bloody corridor, a shadow slumping into someone's arms — reads as a killer over a victim. | `low angle shot, two figures' feet in a grimy blood-slicked service corridor, one figure slumping down into another's arms, ambiguous and ominous, backlit` | slow push-in, faint light flicker |
| 2 | Verse 1 | **The reverse.** It's HIM on his back, dying; X's hands pressed to the wound. Intimate, desperate. | `first-person-low view of a dying young man on his back in a service corridor, a figure's hands pressed to a wound on his chest, desperate, dim gold light` | shallow breaths, trembling hands |
| 3 | Verse 1 | **The bell, far above.** Through a mile of steel: the Halo ringing its victory bell, a man with very clean boots handed a medal in blinding light. | `The Halo location prompt + a silhouetted figure in clean boots receiving a medal in cold white-gold light, celebration, distant and cruel` | god-rays drift, slow zoom out |
| 4 | Pre-Chorus | **The object.** Something small and warm pressed into his hand, his fingers folding shut; X's tear-streaked face close. | `extreme close-up of a hand folding shut around a small glowing object being pressed into it by another hand, intimate, gold rim light` | fingers close, glow pulse |
| 5 | Chorus | **The fade.** Corridor lights slide gold→white→gone; her face pulling away, dissolving; the nothing. | `a face dissolving and pulling away into darkness, corridor lights sliding from gold to white to black, vision fading, ethereal dissolve` | edges blur, light drains to black |
| 6 | Verse 2 / Drop | **The gild ignites.** Behind the ribs, something gold and patient stirs in the dark; molten veins creep outward. | `in pitch darkness, molten gold light igniting and spreading like veins through black, something waking, kintsugi cracks forming, ominous power` | gold veins crawl outward, pulse |
| 7 | Build | **Eyes open.** Single gold pinpricks light in the hollow sockets of the forming mask. | `extreme close-up, hollow dark eye sockets of a black cracked mask, two pinpricks of cold gold light igniting in the dark, came back wrong` | eyes snap open, gold flares |
| 8 | Chorus | **He rises wrong.** Mask and broken crown forming, gold cracking across him; the discarded stir around him. | `Masked MC (Gilding state) rising from the dark in a corridor, broken gold crown forming, gold cracks blazing across the mask, discarded silhouettes stirring behind` | rise up, crown assembles, crack glow |
| 9 | Bridge | **The hole.** His open, empty hand — the object gone. The missing memory. A vulnerable beat. | `Masked MC (Hollow state) staring at his own open empty hand in the dark, gold dimmed to faint embers, grief and confusion, something lost` | slow, hand opens, embers dim |
| 10 | Final Chorus | **The monster they made.** Standing in the undercity, the discarded army behind him, gold blazing. Defiance. | `Masked MC (Gilding state) standing tall in neon Underdog City, a shadow army of the discarded massed behind him, gold blazing, anthemic hero-villain shot` | wind, army shifts, camera cranes up |
| 11 | Outro | **Throne seed.** Wide: he stands over Underdog City, broken crown on his brow. "I'll be the best one they ever made." | `Masked MC (Crowned state) overlooking the vast neon undercity from a high ledge, broken gold crown, king of the discarded, final wide establishing shot` | slow epic pull-back, neon flicker |

**Shorts mining:** shots **7 (eyes open), 8 (the rise), 10 (army reveal)** are your
strongest 8–15s hook clips — cut each to the catchiest musical moment, hook in the
first 2 seconds, under 60s, no watermark.

---

## 4. Production reminders
- Masked MC = no lip-sync needed. Favor mask close-ups, silhouettes, atmosphere.
- Keep clips 5–10s; use start-frame/end-frame control in Kling to direct motion.
- Generate 4+ variations per shot; pick the most on-model; never settle for a
  drifting mask.
- Export 9:16 for Shorts, 16:9 for the flagship; cut everything to the beat in CapCut.
