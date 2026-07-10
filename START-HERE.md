# START HERE — Underdog City Project Guide

*Plain-English map of everything. If you're a new chat/assistant: read this first,
then work on the default branch (see "How website changes go live" below). If
you're future Shawn feeling lost: this is your reset button.*

---

## What this repo is

One project folder holding everything for **Underdog City** — a masked,
anonymous dark-fantasy music project (debut album **Throne at the Bottom**,
out **July 31, 2026**).

- **`underdog-city/`** → the website code for **theunderdogcity.com**
- **`docs/`** → all strategy + creative documents (see index below)
- everything else in the root → an old unrelated project ("Warmside"). Ignore it.

## The services (each does ONE job)

| Service | Job | Where |
|---|---|---|
| **Cloudflare** | owns the domain theunderdogcity.com | cloudflare.com |
| **Vercel** | hosts the website (project: `underdogcity`) | vercel.com |
| **Beehiiv** | the email list ("tenants") — signups from the site land here | app.beehiiv.com |
| **DistroKid** | distributes the album to Spotify/Apple/etc. | distrokid.com |
| **GitHub** | stores this project folder (repo: `shawn9097/SBB`) | github.com |
| **Canva** | the content studio — graphics *and* short-form video edits | canva.com |
| **Suno** | makes the music | suno.com |

## How website changes go live

1. Code gets changed in `underdog-city/` and pushed to GitHub.
2. Vercel notices and builds the site automatically.
3. Changes on the repo's **default branch** (`claude/claude-md-docs-3cujp` —
   yes, weird name; it's this repo's "main") go **straight to
   theunderdogcity.com**, no clicking needed. Any other branch is just a
   preview.

> **For assistants:** Shawn gave standing permission (July 2026) to commit and
> push website/doc changes **directly to the default branch** — no PRs, no
> promote step. Work there.

## The docs index (`docs/`)

| File | What it is |
|---|---|
| `story-bible.md` | The world: three castes, Gild/Gilt magic, the MC, Season 1 arc |
| `throne-at-the-bottom-tracklist.md` | The album's 14 tracks + sequencing logic |
| `underdog-city-launch-plan.md` | The master release plan (phases, checklists) |
| `tease-content-calendar.md` | Day-by-day social content plan until July 31 |
| `welcome-email-sequence.md` | The 3 Beehiiv welcome emails, ready to paste |
| `song-themes.md` | 100 song themes to write from |
| `songwriting-craft.md` | How to write the songs (hooks, structure, prosody) |
| `suno-playbook.md` | How to prompt Suno (style boxes, section tags) |
| `anime-visual-kit.md` | Image/video prompts + the Came Back Wrong storyboard |
| `music-release-playbook.md` | Deep research: releasing music in 2026 |
| `youtube-launch-playbook.md` | Deep research: YouTube/Shorts strategy |
| `launch-rollout.md` | The canonical dated rollout (July 9 → 31) |
| `claude-code-playbook.md` | How to use Claude Code to run this project |
| `content-log.md` | Log of short-form posts drafted by the `/post` helper |
| *(lyrics)* | Live in your uploaded songbook files/chats — not in this repo |

## Key facts (so nothing gets re-decided by accident)

- **Artist name:** Underdog City · fans are **The Underdogs** / "tenants"
- **Manifesto:** *We all rule down here. There's only one rule in Underdog City:
  turn that shit up loud.*
- **Album:** *Throne at the Bottom*, 14 tracks, **July 31, 2026** via DistroKid
- **Lead single / flagship MV:** *Came Back Wrong* (the album opener + music-video story)
- **Editorial focus track (Spotify Release Radar):** *Lights Go Low* (aka *Sinners*)
- **The mask image** = the brand's face everywhere (site hero, all social PFPs)
- **Site jobs:** capture emails ("Claim Your Key") + tease the album. The novel
  section was deliberately removed for now (content saved in
  `underdog-city/src/content/novel.ts` and the story bible) — music first, book later.
- **Strategy in one line:** build mystery + email list before July 31 → drop the
  album as an event → grind Shorts (1–3/day) so the catalog compounds after.

## Rules of thumb

- Keep Underdog City work in **one ongoing chat**; start any new chat with
  "Read START-HERE.md in the SBB repo first."
- Never post from the main accounts anything off-brand; the mask stays on.
- Music clips in Shorts: **under 60 seconds**, no TikTok watermark, AI toggle on.
- Never buy streams/followers. Always disclose AI where platforms ask.
