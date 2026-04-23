# Platewise

Photo-to-nutrition tracking for everyday meals. Snap your plate, see macros, get a friendlier suggestion for tomorrow.

**Status:** v0 skeleton — landing page + photo macro route. Real vision AI not yet wired.

**Landing:** https://platewise.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | v0 plate photo upload — select a photo, see mocked macros |
| `/api/waitlist` | `POST { email, product: "platewise" }` → forwards to waitlist-api-sigma |

## What's next

- Wire real vision AI (photo → nutrition) behind `/try`
- Per-user meal history and weekly pattern dashboard
- Auth + progress tracking
