---
name: post
description: Draft ONE ready-to-shoot Underdog City short-form post — hook, visual, caption, and a single CTA — tuned to the launch calendar and brand rules. Invoke explicitly as /post, optionally with a platform and/or theme, e.g. "/post tiktok villain" or just "/post".
---

# /post — the Underdog City content button

Produce **ONE** short-form post the operator can shoot **today**. One post, not a
menu of options. The operator is solo and freezes on complexity — so this is
dead simple, shootable in ~15 minutes on Canva, and decides *for* them.

## Arguments (both optional — parse from the invocation text)
- **platform**: `tiktok` | `instagram` | `youtube` | `facebook`. If omitted,
  pick the single best platform for today and say why in one clause.
- **theme**: a song or lore beat — e.g. `villain`, `down-here`, `who-tf`,
  `lights-go-low`, `vault`, `countdown`, `chaos`, `wear-it-better`, `tenants`.
  If omitted, choose based on where we are in the launch calendar.

## Steps
1. Read for context (use it — do NOT echo these files back to the user):
   - `CLAUDE.md` — brand voice + the hard rules
   - `docs/launch-rollout.md` — the phase / calendar / focus
   - `docs/throne-at-the-bottom-tracklist.md` — the songs + the arc
   - `docs/content-log.md` — what's already been suggested (do not repeat a hook)
2. Work out today's date and the number of days until **July 31, 2026**, and
   which launch phase that puts us in (Fill the Vault / Build the Siege / Storm
   the Gates / Sustain).
3. Pick platform + theme (honor anything the user passed).
4. Draft the post in the EXACT output format below — nothing extra.
5. Append a one-line entry to `docs/content-log.md` (create it if missing):
   `- [YYYY-MM-DD] [platform] — [theme] — "[hook, ~6 words]"`. Log that one line
   only, then stop.

## Output format (use this exactly)

🎬 **TODAY'S POST** — {date} · {N} days to launch · {phase}
**Platform:** {platform}{, one clause on why if you chose it}

**Hook** (first 2 seconds, on-screen text):
> {one scroll-stopping line in the voice}

**Visual:** {masked king / gold-crack text / transmission static / other} — {one shootable shot idea}

**Audio:** {song} — {which section or vibe}

**Caption:**
{1–3 lines, tenants/keys voice}
{3–6 hashtags}

**The one ask:** {pre-save OR email key — never both. Include the link if useful.}

**Why today:** {one line tying it to the calendar}

## Hard rules (non-negotiable — inherited from CLAUDE.md)
- **Exactly ONE CTA.** Pre-save *or* email key — never both in one post.
- **Never** put "Stupid Little Bitch" on short-form. Lead with Villain, Down
  Here, Who TF, or Lights Go Low.
- Be honest about the AI angle if the post touches it. Never suggest buying
  followers, streams, or plays.
- Match the CTA to the phase: pre-launch leans **email key / pre-save + follow**;
  launch week leans **stream/pre-save**. Still only one ask.
- Must be shootable in ~15 min on Canva. If it needs more, simplify it.
- No yes-man filler. If the user asks for a theme that's off-brand for
  short-form (e.g. the venom track), say so plainly and offer the closest safe
  swap instead of just complying.
