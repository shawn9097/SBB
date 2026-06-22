# Underdog City — Phase 1 Site

Standalone Next.js app (separate from the Warmside SaaS app in this repo)
implementing the Phase 1 "coming soon" landing page from the Underdog City
master brief: hero/portal with manifesto + email capture, a lore tease, a
first-transmission/countdown section, a join CTA with socials, and a footer.

## Stack

Next.js (App Router) + Tailwind v4 + Framer Motion, deployable to Vercel
independently of the Warmside app.

## Setup

```sh
cd underdog-city
npm install
cp .env.example .env
npm run dev
```

## Email capture

`POST /api/subscribe` forwards `{ email }` to whatever ESP endpoint is
configured via `ESP_SUBSCRIBE_URL` / `ESP_API_KEY` (Beehiiv, ConvertKit,
Mailchimp double opt-in webhook). Wire up the real ESP before launch —
until then the form will return a 503.

## Still needed before launch

- Favicon / OG image using the locked masked-crown mark
- Real ESP credentials + welcome sequence copy
- Launch date for the countdown (`NEXT_PUBLIC_LAUNCH_DATE`)
- Social links (Instagram/TikTok/Spotify) in `src/app/page.tsx`
