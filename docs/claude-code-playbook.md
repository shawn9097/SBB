# Claude Code Playbook — Underdog City

> Plain-English guide to what Claude Code can do and how to use it to run this
> project with the least effort. Companion to `START-HERE.md`. If you only read
> one section, read **"Start with these 3."**

---

## The one-line mental model

Claude Code isn't a chatbot you ask questions. It's an **operator that can do
the work** — edit your site, research, write copy, build pages, and (the big
one) **run on a schedule without you sitting there.** You're going from
"assistant that answers" to "teammate that ships while you sleep."

You use it three ways, same account, work carries across:
- **Web** — claude.ai/code (full power, cloud machine, what we mostly use)
- **Phone app** — kick things off and read results from anywhere
- **CLI** — the terminal version (optional; you rarely need it)

---

## Start with these 3 (do these first)

These are the highest-leverage, lowest-effort moves. Everything else is bonus.

### 1. Fix the project memory (5 min, I can do it)
Right now `CLAUDE.md` describes the wrong product. Point it at Underdog City and
add your brand rules (voice, the no-buy-followers rule, disclose-AI, keep
"Stupid Little Bitch" off short-form, one-CTA-per-post). Then **every** session
and every automation is on-brand automatically, with zero re-explaining.

### 2. A daily "content coach" routine (kills the blank-page problem)
A **Routine** is a saved Claude Code job that runs on a schedule in the cloud —
no laptop, no you. Set one for every morning that reads the launch plan, checks
what day it is relative to July 31, and hands you **one ready-to-shoot post**:
hook, caption, which song, which visual template, one CTA. You wake up and the
hardest part (deciding what to make) is already done.
→ Set up at **claude.ai/code/routines** (or ask me to script it). Paste-in
prompt is in the "Routines" section below.

### 3. A `/post` skill (your repeatable content button)
A **skill** is a custom slash-command that encodes a job you do over and over.
`/post tiktok villain` → today's post in your voice, correct format, every time.
No more re-explaining what you want. (Others worth having: `/critique-song`,
`/caption`, `/lore`.)

---

## The full capability map (by your job)

### Job: Making content (your #1 pain)
| Capability | What it does | Underdog City use |
|---|---|---|
| **Routines** (scheduled) | Runs a prompt daily/weekly on its own | Daily "here's today's post" coach; launch-day auto-draft |
| **Skills** (`/post`, `/caption`) | One command = a repeatable job in your voice | `/post`, `/caption`, `/lore`, `/critique-song` |
| **Background agents** / **Workflows** | Do many things at once | Batch 20 captions or 30 days of hooks in one shot |
| **Deep research** (`/deep-research`) | Fans out web searches, returns a cited answer | "Which subreddits can I post AI-metal in without a ban?" |

### Job: Running the website
| Capability | What it does | Underdog City use |
|---|---|---|
| **Direct edits + auto-deploy** | I change code, it goes live | Already how we work — copy tweaks, new pages |
| **Background agents** | Parallel isolated work | 3 homepage variants at once, pick the winner |
| **Artifacts** | Live visual web pages on a private link | Launch dashboard, EPK/press kit, the content calendar |

### Job: Strategy & research
| Capability | What it does | Underdog City use |
|---|---|---|
| **Deep research** | Multi-source, fact-checked, cited | Competitor teardowns, playlist curators, platform norms |
| **Workflows** (`ultracode`) | Big multi-step jobs, verified | "30-day content plan, each idea checked against the calendar" |

### Job: Launch operations
| Capability | What it does | Underdog City use |
|---|---|---|
| **One-off scheduled routine** | Fire a job at a future date/time | "On Jul 30, draft the gates-open email + launch posts" |
| **Routines (GitHub trigger)** | React to repo changes | Auto-check the site after any change (links, pre-save, vault) |
| **Artifacts** | Shareable status pages | Live countdown + launch checklist you can pull up anywhere |

---

## Routines (the crown jewel) — how to use them

**What:** a saved job (prompt + this repo + connectors) that runs autonomously
in the cloud. Schedule (hourly min / daily / weekly / one-off), GitHub event, or
API trigger. Runs with no approval prompts. Set up at **claude.ai/code/routines**.

**The daily content-coach — paste this as the routine prompt:**

```
You are my Underdog City content coach. Read docs/launch-rollout.md,
docs/throne-at-the-bottom-tracklist.md, and START-HERE.md for context.
Today is a new day in the July 31 album launch.

Give me ONE short-form post I can shoot today:
- Platform (pick the best single one for today)
- The first-2-seconds hook (on-screen text)
- The caption
- Which song/lyric or lore beat it uses
- Which visual template (masked king / gold-crack text / transmission static)
- ONE call to action (pre-save OR email key — never both)

Rules: stay in the dark-fantasy "tenants/keys" voice; keep "Stupid Little
Bitch" off short-form; never suggest buying followers/streams; be honest
about AI when it comes up. Keep it dead simple — I'm one person and I freeze
on complicated. Append the idea to docs/content-log.md so you don't repeat
yourself, and commit it.
```

Schedule it **daily**. You'll wake up to a ready post and a running log.

**Other routines worth setting:**
- **Weekly review (Fridays):** "Read content-log.md, tell me what to double down
  on and what to kill." → keeps you honest, catches what's working.
- **Link health (daily):** "Verify theunderdogcity.com is up, the pre-save link
  resolves, and /vault/first-key-e8b84b loads. Flag anything broken." → you'll
  never launch to a dead link.
- **One-off, Jul 30:** "Draft email #3 'gates open tomorrow' + 3 launch-day
  posts." → future-you is covered.

**Note:** routines use the connectors on your claude.ai account — so a routine
may be able to drive **Canva** even though the connector won't switch on inside
a coding chat. Worth a test.

---

## Skills (your repeatable buttons)

A skill is a folder `.claude/skills/<name>/SKILL.md` with instructions Claude
loads when you type `/name`. Build once, reuse forever. Candidates for you:

- **`/post [platform] [theme]`** — today's post, your format, your voice.
- **`/critique-song`** — paste lyrics, get the structured critique you keep
  asking me for (hooks, weak lines, brand fit, what to cut).
- **`/caption`** — song snippet + vibe → 3 caption options + hooks.
- **`/lore`** — an on-brand transmission / lore fragment for the ARG.

Ask me to build any of these — each is one small file.

---

## Connectors (Claude's hands into other tools)

Add at **claude.ai/customize/connectors** — click, sign in, done. Available in
web + routines automatically.
- **GitHub** — already wired (that's how the site ships).
- **Canva** — design generation. Flaky inside coding chats; works in the normal
  app and *may* work in routines.
- **Zapier** — the bridge to everything without a native connector (could reach
  Beehiiv, sheets, etc.). Optional, only if a workflow needs it.

Most of your stack (Beehiiv, DistroKid, Spotify for Artists, Suno) has **no
native connector** — those stay manual or go through Zapier. Don't overbuild
this; GitHub + Canva is plenty for now.

---

## Memory: CLAUDE.md (so Claude always knows the brand)

`CLAUDE.md` loads into every session automatically. Yours currently describes
the wrong product. Fixed, it should hold: what Underdog City is, the launch
date, the brand voice, and the hard rules (one CTA per post, disclose AI,
never buy followers/streams, keep the venom track off short-form). Do this once
and consistency stops being your job.

---

## Artifacts (visual pages on a private link)

Ask me to "make an artifact" and you get a real, shareable web page (not code).
Good fits:
- **Launch command center** — live countdown, the checklist, every link in one
  place, "what to post today." Pull it up on your phone.
- **EPK / press kit** — one link for playlist curators, blogs, collabs.
- **The content calendar** — the rollout as a scannable page instead of a doc.

---

## Command cheat sheet

| Type this | Get this |
|---|---|
| `/deep-research <question>` | Cited, multi-source research report |
| `/post ...` (after we build it) | Today's ready-to-shoot post |
| `/schedule <plain english>` | Create a routine by describing it |
| `ultracode` in a prompt | Fires a big multi-agent job for one hard task |
| "make an artifact that ..." | A live visual page on a private link |
| "spin up background agents to ..." | Several jobs running in parallel |

---

## What NOT to bother with (avoid the rabbit holes)

- Deep MCP/connector plumbing for tools that have no native connector — manual
  is fine at your scale.
- Complex multi-hook setups — you don't need them yet.
- Turning every task into a workflow — save `ultracode`/workflows for genuinely
  big batch jobs.

Keep it to the **Start with these 3.** That's where 90% of the leverage is.
