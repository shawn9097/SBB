# START HERE — Underdog City Project Guide

*Plain-English map of everything. If you're a new chat/assistant: read this first,
then work on the `main` branch. If you're future Shawn feeling lost: this is your
reset button.*

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
| **Canva** | graphics (brand kit, banners) | canva.com |
| **Suno** | makes the music | suno.com |
| **CapCut** | edits the short videos | phone app |

## How website changes go live

1. Code gets changed in `underdog-city/` and pushed to GitHub.
2. Vercel notices and builds the site automatically.
3. If the change is on the **main branch**, it goes straight to
   theunderdogcity.com. (If it's on a draft branch, it's a "preview" and needs
   **Promote to Production** in Vercel → Deployments → newest → ⋯ menu.)

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
| `Underdog_City_Songbook.md` equivalents | lyrics live in uploaded songbook files/chats |

## Key facts (so nothing gets re-decided by accident)

- **Artist name:** Underdog City · fans are **The Underdogs** / "tenants"
- **Manifesto:** *We all rule down here. There's only one rule in Underdog City:
  turn that shit up loud.*
- **Album:** *Throne at the Bottom*, 14 tracks, **July 31, 2026** via DistroKid
- **Lead single / focus track:** *Came Back Wrong*
- **The mask image** = the brand's face everywhere (site hero, all social PFPs)
- **Site jobs:** capture emails ("Claim Your Key") + tease the album. The novel
  section was deliberately removed for now (content saved in `src/content/novel.ts`
  and the story bible) — music first, book later.
- **Strategy in one line:** build mystery + email list before July 31 → drop the
  album as an event → grind Shorts (1–3/day) so the catalog compounds after.

## Rules of thumb

- Keep Underdog City work in **one ongoing chat**; start any new chat with
  "Read START-HERE.md in the SBB repo first."
- Never post from the main accounts anything off-brand; the mask stays on.
- Music clips in Shorts: **under 60 seconds**, no TikTok watermark, AI toggle on.
- Never buy streams/followers. Always disclose AI where platforms ask.
