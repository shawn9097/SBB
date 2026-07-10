# CLAUDE.md — AI Assistant Guide

This file auto-loads into every Claude Code session. It is the first thing an AI
assistant reads. Keep it accurate and short.

## ⚠️ This repo holds TWO apps — know which one is active

| | **Underdog City** (ACTIVE) | **Warmside** (DORMANT) |
|---|---|---|
| Where | `underdog-city/` | root `src/` + `supabase/` |
| What | Masked dark-fantasy AI-music project + site | Estimate follow-up SaaS (earlier scaffold) |
| Live | theunderdogcity.com | not deployed |
| Work here? | **Yes — default to this** | Only if explicitly asked |

**Unless told otherwise, all work is Underdog City in `underdog-city/`.** The
full original Warmside guide lives in git history (before this rewrite) if it's
ever needed again.

---

# UNDERDOG CITY — the active project

A masked/anonymous **dark-fantasy AI-music project**. Debut album **"Throne at
the Bottom"** (14 tracks) drops **July 31, 2026** via DistroKid as one moment
(no early single). The world is the product: fans are **"tenants"** who claim a
**"key"** (email signup) to unlock **"transmissions."** Thesis: rock bottom
isn't defeat — it's a throne. *We all rule down here.* 👑

Orientation doc for humans: **`START-HERE.md`.** This section is the AI's brief.

## Locked facts

| Field | Value |
|---|---|
| Album | Throne at the Bottom — 14 tracks, out **July 31, 2026** |
| Release model | Full album, one drop, no early single |
| Focus track (editorial / Release Radar) | **Lights Go Low** (aka Sinners) |
| Email-vault reward | Title track, at `/vault/first-key-e8b84b` |
| Pre-save link | `https://distrokid.com/hyperfollow/underdogcity/throne-at-the-bottom/` |
| Site | theunderdogcity.com (Cloudflare domain → Vercel hosting) |
| Email | Beehiiv (free tier: double opt-in + manual broadcasts) |
| Socials | YouTube, TikTok, Instagram, Facebook |
| Content studio | Canva (not CapCut) · songs via Suno |
| Tech | Next.js 16 (App Router) · React 19 · TS 6 · Tailwind v4, on Vercel (root dir `underdog-city`) |

## App structure (`underdog-city/`)

- **Pages** (App Router, `src/app/`): `/` (`page.tsx` — portal + email capture),
  `/music` (redacted "transmissions"), `/vault/first-key-e8b84b` (hidden,
  `noindex` — the reward the emailed key unlocks). Plus `robots.ts`, `sitemap.ts`,
  and metadata image routes (`icon.png`, `apple-icon.png`, `opengraph-image.png`).
- **API**: `POST /api/subscribe` → Beehiiv (rate-limited + honeypot; returns 503
  when env vars unset). No `lib/` dir — helpers live inline and in `src/content/`.
- **Content** (`src/content/`, plain TS, no CMS): `music.ts` — the 14 redacted
  `transmissions` + `socials` (**edit music-page data and social links here**);
  `novel.ts` — staged prose with **no route yet** (planned "The Story" reader).
- **Components** (`src/components/`): `EmailCapture.tsx`, `Countdown.tsx`, `Nav.tsx`.
- **Styling**: Tailwind v4 — **no `tailwind.config`**; theme tokens live in
  `src/app/globals.css` via `@theme inline`. Also **no `vercel.json`** (deploy
  config is in the Vercel dashboard).

## Brand voice

Dark-fantasy, gothic, ominous, mysterious — aesthetic-first (the Sleep Token /
Bad Omens crowd). Core motifs: tenants, keys, the vault, redacted transmissions,
kintsugi gold (crown of thorns turned to gold). Palette: near-black, tarnished/
antique gold, gild-glow, aged bone-white. Channel tone: **TikTok/IG** cinematic
+ lore · **YouTube** heaviness + hook · **Facebook/Reddit** community.

## Hard rules (never break — applies to every session AND every routine)

- **One CTA per post** — pre-save **or** email key, never both in one breath.
- **Be honest about AI** — it's an AI music project; lean into "one person built
  a whole city." Never hide it.
- **Never buy** followers, streams, or plays. Organic only.
- **Keep "Stupid Little Bitch" OFF short-form/ads** — album/DSP only (brand
  safety). Lead discovery with **Villain, Down Here, Who TF**.
- **Reddit:** never lead with a raw link; contribute first; a fresh AI-music
  account is fragile — one sub at a time.
- **Secrets never go in the repo** — the Beehiiv API key etc. live only in
  Vercel env vars. Never commit `.env` or keys.
- **Right-size it** — the operator is solo and building the content muscle.
  Simpler and shipped beats elaborate and frozen. Push back on scope creep.

## How changes ship

- Default/production branch: **`claude/claude-md-docs-3cujp`**. Pushing there
  **auto-deploys to production** (no promote step).
- Standing permission (given July 2026): commit and push website/doc changes
  **directly to that branch** — no PRs, no promote.

## Dev gotchas (learned the hard way)

- The active app is `underdog-city/`. **Run `npm run build` from inside it**,
  but **always `cd /home/user/SBB` before git commands** (cwd persists between
  Bash calls; git from inside the subfolder fails pathspec).
- The build mutates `underdog-city/tsconfig.json` — run
  `git checkout underdog-city/tsconfig.json` before committing.
- Fresh containers may lack deps → `cd underdog-city && npm install`.
- `sharp` is **not** a package.json dependency — it's only used by the one-off
  `scripts/make-assets.mjs` asset generator (run ad hoc, e.g. via `npx`).

## Docs index (in `docs/`)

**Launch / strategy**
- `underdog-city-launch-plan.md` — master release plan (phases + checklists)
- `launch-rollout.md` — **canonical** dated rollout (July 9 → 31)
- `music-release-playbook.md`, `youtube-launch-playbook.md` — deep-research playbooks
- `tease-content-calendar.md` — day-by-day social calendar
- `content-log.md` — shared log of posts drafted by the `/post` skill

**World / craft**
- `story-bible.md` — the world, castes, MC, Season 1 arc
- `throne-at-the-bottom-tracklist.md` — final 14-track sequence + arc
- `song-themes.md`, `songwriting-craft.md` — lyric themes + how to write them
- `suno-playbook.md` — how to prompt Suno · `anime-visual-kit.md` — image/video prompts

**Ops / copy**
- `claude-code-playbook.md` — how to use Claude Code to run this project
- `welcome-email-sequence.md` — the 3 Beehiiv welcome emails

## Skills (in `.claude/`)

- `/post [platform] [theme]` (`.claude/skills/post/SKILL.md`) — drafts one
  ready-to-shoot short-form post (hook · visual · caption · single CTA), tuned to
  the launch calendar and hard rules, and logs it to `docs/content-log.md`.

---

# WARMSIDE — dormant scaffold (root `src/`, `supabase/`)

An earlier, unrelated product (automated estimate follow-up SaaS for
contractors: Postmark BCC → 5-touch SMS+email sequence, Stripe billing, Supabase
DB). **Not active, not deployed.** Leave it alone unless explicitly asked to work
on it. Full historical guide: git history before this file was rewritten.

---

# General AI assistant rules

- Read `START-HERE.md` and this file at session start.
- Prefer editing existing files over creating new ones; keep changes minimal and
  scoped; commit frequently with clear messages.
- No secrets/keys in source. Validate user input at boundaries. No `console.log`
  debug cruft or commented-out code in commits.
- Ask before irreversible actions (force-push, deleting files, dropping tables).
- Never use `--no-verify` or disable TLS / unset the proxy.
