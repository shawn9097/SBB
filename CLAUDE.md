# CLAUDE.md — AI Assistant Guide for SBB

This file is the authoritative guide for AI assistants (Claude Code and similar tools) working in this repository. Keep it up to date as the project evolves.

---

## Project Overview

> **TODO:** Replace this section with a 2–3 sentence description of what this project does, who it's for, and what problem it solves.

| Field | Value |
|---|---|
| Project name | SBB |
| Status | Early development |
| Live URL | _TBD_ |
| Docs / Wiki | _TBD_ |
| Owner | shawn9097 |

---

## Repository Structure

> **TODO:** Update this tree once the initial directory layout is established.

```
SBB/
├── CLAUDE.md          ← This file
├── README.md          ← Human-facing project README (create separately)
└── ...                ← Source dirs will be documented here
```

Describe each top-level directory's purpose as it is added.

---

## Tech Stack

> **TODO:** Fill in the chosen stack once decided.

| Layer | Choice | Notes |
|---|---|---|
| Language | _TBD_ | |
| Runtime / Framework | _TBD_ | |
| Database | _TBD_ | |
| Cache | _TBD_ | |
| Auth | _TBD_ | |
| Infrastructure | _TBD_ | |
| CI/CD | _TBD_ | |

---

## Development Setup

### Prerequisites

> **TODO:** List required tooling (e.g., Node >= 20, Python >= 3.12, Docker, etc.)

### Install

```sh
# TODO: add install steps, e.g.:
# npm install
# pip install -e ".[dev]"
```

### Environment Variables

Copy the example env file and fill in values:

```sh
cp .env.example .env
```

See the [Environment Variables](#environment-variables) section for all required variables.

### Run Locally

```sh
# TODO: add the command to start the dev server, e.g.:
# npm run dev
# uvicorn app.main:app --reload
```

---

## Common Commands

> **TODO:** Fill in real commands once the project toolchain is set.

| Task | Command |
|---|---|
| Install deps | `TODO` |
| Start dev server | `TODO` |
| Run all tests | `TODO` |
| Run a single test | `TODO` |
| Lint | `TODO` |
| Format | `TODO` |
| Type check | `TODO` |
| Build for production | `TODO` |
| Run DB migrations | `TODO` |
| Seed database | `TODO` |

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
