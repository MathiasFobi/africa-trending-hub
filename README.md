# AfricaTrendingHub ⚡

> The intelligence network of modern Africa. Real-time data, in-depth reporting, and the stories shaping Africa's future.

A Next.js 16 + React 19 + Tailwind 4 publication tracking business, culture, innovation, sports, politics, and music across the African continent.

## Stack

- **Next.js 16.2.9** (App Router) — note: this is *not* the Next.js you know; see `AGENTS.md`
- **React 19.2.4** + **TypeScript 5**
- **Tailwind CSS 4** with custom palette (`midnight`, `ink-*`, `gold`, `emerald`, `ivory`)
- **lucide-react 1.17.0** — v1 dropped brand logos (Twitter → `X`, Github gone → `CodeXml`); rebuild your imports accordingly
- **clsx** + **tailwind-merge** for class composition
- **date-fns** for date math

## Local dev

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm start        # serve production build
```

## Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home (Pulse ticker, hero, sections, stat blocks)
│   ├── globals.css      # Tailwind 4 + custom theme tokens
│   └── favicon.ico
├── components/
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   ├── pulse-ticker.tsx
│   ├── section-header.tsx
│   ├── article-card.tsx
│   ├── stat-block.tsx
│   └── newsletter-cta.tsx
├── data/
│   ├── site.ts          # Site meta, categories, nav
│   ├── articles.ts      # Article fixtures
│   └── startups.ts      # Startup + funding trend fixtures
└── lib/
    └── utils.ts         # cn() helper + formatCompact()
```

## Adding content

- **Articles:** Append to `src/data/articles.ts`. Type the slug, category, author, publishedAt, etc. Use `featured: true` for the hero and `trending: true` for the pulse ticker.
- **Startups:** Append to `src/data/startups.ts` with funding, stage, momentum, investors, tags.
- **Categories:** Edit `src/data/site.ts → categories` array; colors map to Tailwind theme tokens.

## Deploy

Deployed on **Vercel** (CLI). See `AGENTS.md` for Next.js 16 caveats.

```bash
# First deploy
vercel

# Subsequent deploys
vercel --prod
```

## Brand palette

| Token | Use |
|-------|-----|
| `midnight` | Background base |
| `ink-{50..900}` | Surfaces, borders, dividers |
| `gold` | Accent / CTA / brand |
| `emerald` | Live status, positive |
| `ivory` | Headlines on dark |

Fonts: `font-display` (headlines) and `font-mono` (eyebrows, timestamps, tickers).
Production deploy: 2026-06-11 10:10 PT — Vercel GitHub auto-deploy wired
