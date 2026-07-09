# Underdog City — Site

Standalone Next.js app (separate from the Warmside SaaS app in this repo) for the
Underdog City transmedia project: a pre-release portal with email capture, plus
`The Story` (web-serial reader) and `The Music` (release transmissions) sections.

## Stack

Next.js (App Router) + Tailwind v4, deployed on Vercel independently of the
Warmside app. Subtle gold-crack/flicker motion is CSS-only (respects
`prefers-reduced-motion`). Email goes to Beehiiv.

## Deployment

Deployed via Vercel (project `underdogcity`), Root Directory set to
`underdog-city`. Auto-deploys on push to the working branch.

## Setup

```sh
cd underdog-city
npm install
cp .env.example .env   # fill in the Beehiiv + site values
npm run dev
```

## Email capture (Beehiiv)

`POST /api/subscribe` creates a Beehiiv subscription via
`BEEHIIV_API_KEY` + `BEEHIIV_PUBLICATION_ID`. Double opt-in and the welcome
email are configured in Beehiiv itself. The route has a honeypot field and basic
rate limiting; until the env vars are set it returns 503.

## Environment

See `.env.example`. Key vars: `BEEHIIV_API_KEY`, `BEEHIIV_PUBLICATION_ID`,
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional),
`NEXT_PUBLIC_LAUNCH_DATE` (optional).

## Still needed before launch

- Real Beehiiv credentials + welcome automation copy
- Final domain wired in Vercel; set `NEXT_PUBLIC_SITE_URL`
- Canonical illustrated mask art → replace `app/icon.svg` + `app/opengraph-image.tsx`
- Real social links in `src/content/music.ts`
- Launch date (`NEXT_PUBLIC_LAUNCH_DATE`) once set
- Plausible domain (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`) once analytics is provisioned
