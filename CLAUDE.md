# CLAUDE.md — AI Assistant Guide for Warmside

This file is the authoritative guide for AI assistants (Claude Code and similar tools) working in this repository. Keep it up to date as the project evolves.

---

## Project Overview

**Warmside** is an automated estimate follow-up SaaS for residential contractors (roofers, HVAC, painters, landscapers, fence builders, kitchen/bath remodelers). When a contractor sends an estimate to a prospect, they BCC a unique Warmside address — this triggers a 5-touch SMS+email sequence over 21 days, written in the contractor's voice, that runs on autopilot until the prospect replies. The moment they reply, Warmside stops and forwards the message to the contractor's phone.

Warmside is the first product under **Vigil**, a Vigil ecosystem of tools for service-based businesses owned by Tom Walker LLC. The core philosophy: Vigil only profits when the client profits.

| Field | Value |
|---|---|
| Product name | Warmside |
| Parent brand | Vigil (Tom Walker LLC) |
| Status | Active development — Phase 1 scaffold complete |
| Pricing | $129/mo (Standard) · $249/mo (Volume) |
| Live URL | _TBD_ |
| Owner | shawn9097 |

---

## Repository Structure

```
SBB/
├── CLAUDE.md                        ← This file
├── package.json                     ← "warmside" npm package
├── next.config.ts
├── tsconfig.json
├── vercel.json                      ← Cron job config (daily at 9am UTC)
├── .env.example                     ← All required env vars with descriptions
├── src/
│   ├── app/
│   │   ├── page.tsx                 ← Marketing landing page
│   │   ├── signup/                  ← Onboarding + Stripe checkout
│   │   ├── onboarding/              ← Voice Twin intake form
│   │   ├── dashboard/               ← Contractor dashboard
│   │   └── api/
│   │       ├── inbound-email/       ← Postmark BCC webhook → creates prospect + campaign
│   │       ├── inbound-sms/         ← Twilio webhook → classifies reply, updates campaign
│   │       ├── stripe/              ← Stripe subscription lifecycle webhooks
│   │       ├── cron/                ← Daily touchpoint sender (Vercel Cron)
│   │       └── close-job/           ← Contractor marks job closed → Touchstone Receipt
│   ├── components/                  ← Reusable UI components
│   ├── lib/
│   │   ├── supabase.ts              ← DB client (browser + admin)
│   │   ├── stripe.ts                ← Stripe client + price IDs
│   │   ├── twilio.ts                ← SMS sender + reply forwarder
│   │   ├── resend.ts                ← Email sender
│   │   ├── claude.ts                ← Voice Twin + niche detection + reply classification
│   │   ├── sequences.ts             ← All 6 trade sequence templates + variable substitution
│   │   └── voice-twin.ts            ← (future) Voice DNA helpers
│   └── types/
│       └── index.ts                 ← All shared TypeScript types
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql   ← Run this first in Supabase SQL editor
```

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Language | TypeScript | Strict mode enabled |
| Runtime / Framework | Next.js 15 (App Router) | API routes + frontend in one repo |
| Database + Auth | Supabase (Postgres) | RLS enabled; admin client server-only |
| Payments | Stripe | $129/mo Standard, $249/mo Volume |
| Email (outbound) | Resend | Sequence follow-up emails |
| SMS (outbound) | Twilio | Sequence follow-up texts + reply forwarding |
| Inbound email | Postmark Inbound | Receives BCC'd estimate emails, fires webhook |
| AI | Claude API (Anthropic) | Voice Twin personalisation + niche detection + reply classification |
| Deployment | Vercel | Cron via vercel.json (daily 9am UTC) |

---

## Development Setup

### Prerequisites

- Node.js >= 20
- npm >= 10
- A Supabase project (free tier works for dev)
- A Stripe account with test keys
- A Twilio account with a phone number
- A Resend account
- A Postmark account (for inbound email)
- An Anthropic API key

### Install

```sh
npm install
```

### Environment Variables

```sh
cp .env.example .env
# Fill in all values — see .env.example for descriptions
```

### Run DB migrations

Open your Supabase project → SQL Editor → paste and run `supabase/migrations/001_initial_schema.sql`.

### Run Locally

```sh
npm run dev
# App available at http://localhost:3000
```

---

## Common Commands

| Task | Command |
|---|---|
| Install deps | `npm install` |
| Start dev server | `npm run dev` |
| Type check | `npx tsc --noEmit` |
| Lint | `npm run lint` |
| Build for production | `npm run build` |
| Run DB migrations | Paste SQL file into Supabase SQL Editor |
| Test inbound email | POST to `/api/inbound-email` with a Postmark-shaped payload |
| Test cron manually | `GET /api/cron` with header `x-cron-secret: <CRON_SECRET>` |

---

## Architecture & Key Conventions

> **TODO:** Document module boundaries, data flow, and key design decisions as they are made.

### Naming Conventions

> **TODO:** e.g., `camelCase` for variables, `PascalCase` for components/classes, `snake_case` for DB columns, `kebab-case` for file names.

### File Organization

> **TODO:** Describe where new files should be placed (e.g., "API route handlers go in `src/routes/`, business logic in `src/services/`").

### Key Invariants

> **TODO:** List any subtle rules that must always hold (e.g., "never access the DB directly from a route handler — always go through a service").

---

## Testing

> **TODO:** Update once a testing framework is chosen.

### Running Tests

```sh
# TODO: e.g., npm test / pytest / go test ./...
```

### What Needs Tests

- All public API endpoints
- All business-logic functions with branching paths
- Any utility with non-obvious edge cases

### Test File Placement

> **TODO:** e.g., co-located next to source (`foo.test.ts`) or in a top-level `tests/` directory.

### Mocking & Fixtures

> **TODO:** Describe the approach to test data and external service mocking.

---

## Code Style & Linting

> **TODO:** Update once a formatter and linter are configured.

| Tool | Config file | Run command |
|---|---|---|
| Formatter | _TBD_ | `TODO` |
| Linter | _TBD_ | `TODO` |
| Pre-commit hooks | _TBD_ | `TODO` |

### Style Rules (general)

- Prefer clarity over cleverness.
- Keep functions small and single-purpose.
- No commented-out code in commits — delete it or open an issue.
- No `console.log` / `print` debug statements in committed code.

---

## Git Workflow

### Branches

| Pattern | Purpose |
|---|---|
| `main` | Production-ready code only |
| `develop` | Integration branch (if used) |
| `feat/<short-description>` | New features |
| `fix/<short-description>` | Bug fixes |
| `chore/<short-description>` | Tooling, deps, infra |
| `docs/<short-description>` | Documentation only |

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<optional scope>): <short summary>

[optional body]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`

Examples:
```
feat(auth): add JWT refresh token rotation
fix(api): handle null user on profile endpoint
chore: upgrade dependencies to latest
```

### Pull Requests

- Keep PRs focused — one logical change per PR.
- Include a clear description of _what_ changed and _why_.
- All CI checks must pass before merging.
- At least one review required (once team grows).

---

## AI Assistant Guidelines

These rules apply to all Claude Code sessions and similar AI tools working in this repo.

### Always Do

- Read `CLAUDE.md` at the start of every session to pick up recent conventions.
- Prefer editing existing files over creating new ones.
- Run the test suite and linter before declaring a task complete (once configured).
- Use the patterns already established in the codebase — don't introduce new ones without discussion.
- Keep changes minimal and scoped to the task at hand.
- Commit frequently with descriptive messages.

### Never Do

- Introduce security vulnerabilities (SQL injection, XSS, command injection, hardcoded secrets, etc.).
- Add features, abstractions, or refactors that aren't required by the current task.
- Add comments that explain _what_ code does (good names do that) — only add comments for non-obvious _why_.
- Commit `.env` files, secrets, credentials, or API keys.
- Push directly to `main` — always use a feature branch.
- Delete or overwrite uncommitted user work without explicit confirmation.
- Use `--no-verify` or bypass pre-commit hooks.

### Security Checklist (before finishing any task)

- [ ] No secrets or tokens hardcoded in source files.
- [ ] All user input validated/sanitized at system boundaries.
- [ ] No new dependencies added without justification.
- [ ] No dangerous shell commands constructed from user input.

### When Unsure

- Ask before taking irreversible actions (force-push, drop table, delete files).
- Prefer doing less and checking with the user over doing too much autonomously.

---

## Environment Variables

> **TODO:** Add rows as env vars are introduced.

| Variable | Required | Default | Description |
|---|---|---|---|
| _TBD_ | — | — | — |

Store real values in `.env` (git-ignored). Use `.env.example` with placeholder values checked into the repo.

---

## Deployment

> **TODO:** Document staging and production deploy processes once infrastructure is set up.

### Staging

```sh
# TODO
```

### Production

```sh
# TODO
```

### Rollback

```sh
# TODO
```

---

## Updating This File

- Update `CLAUDE.md` whenever a new convention is established, a tool is added, or a significant architectural decision is made.
- Treat this file like code — changes should be reviewed and committed.
- Remove `TODO` placeholders as they are filled in; a complete CLAUDE.md with no TODOs is the goal.
