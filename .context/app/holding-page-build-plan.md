# hce.studio Holding Page — Build Plan

Working checklist for the lightweight holding page that replaces the current
site at `hce.studio` while the full site is decided. Lives in `.context/app/`
(fork-owned, never conflicts on Sunrise upstream merge). Update the checkboxes as
we go.

**Design source of truth:** `.context/app/design_handoff_holding_page/`
(`README.md` is the spec; `screenshots/` are the light/dark renders; `assets/`
are the brand SVGs). The `.dc.html` is a design reference only — read, don't port.

## Scope

One confident single-scroll page: **hero → what we're doing now → what we
believe → get in touch → footer**, light/dark toggle. Plus a re-skinned
`/contact` page and a downloadable whitepaper PDF. No sign-up / login for now
(hidden, not deleted). Low maintenance, no CMS, fast to load.

## Decisions locked (2026-07-10)

- **Chrome:** bespoke `SiteHeader`/`SiteFooter` (fork-owned). One minimal
  (~2-line, "keep-mine") edit to `app/(public)/layout.tsx` swaps out the platform
  `AppHeader`/`PublicFooter`. This is what removes the login UI everywhere.
- **Auth:** unlink only. Remove login/signup/admin links from chrome; routes stay
  live but undiscoverable. Fully reversible, no proxy/config change.
- **Contact form:** reuse existing `<ContactForm>` + `/api/v1/contact`
  **unchanged**. Destination inbox is configured in `.env.local` (env, not code).
- **Whitepaper:** PDF served at `public/downloads/hce-studio-whitepaper.pdf`
  (Simon provides the file). Add a `/whitepaper` route that **redirects** to it.
- **Legal:** keep Sunrise's default `/privacy` and `/terms` copy. "Cookies" = the
  existing always-rendered **Cookie Preferences** consent control.
- **Brand env:** `NEXT_PUBLIC_APP_NAME` and `NEXT_PUBLIC_LEGAL_NAME` are both
  already set in `.env.local`. The bespoke footer sets the visible copyright line
  directly regardless.

## Architecture notes (why, so future sessions don't re-derive)

- **Thin-shim pattern** (CUSTOMIZATION.md §6): reduce platform route files to a
  one-line re-export; keep all real content in new `components/app/marketing/*`
  files that never conflict on sync. Applies to `page.tsx` and `contact/page.tsx`.
- **Dark mode is native.** `.dark` class on `<html>`, seeded no-flash by an inline
  script in the root layout, flipped via `@/hooks/use-theme`. The bespoke pill
  toggle calls the same hook → persistence + no-flash for free. Do NOT add
  `next-themes` or a second toggle mechanism.
- **Theming.** Define the handoff's warm palette as theme-scoped CSS custom
  properties (light default + `.dark`) in fork-owned CSS. Keep the page's tokens
  self-contained (own `--bg`/`--fg`/`--accent`… names) rather than fighting the
  shadcn `--color-*` tokens. `app/brand-theme.css` is the sanctioned fork-owned
  CSS seam (cascades after globals).
- **Fonts.** Newsreader (display serif), Hanken Grotesk (body/UI), JetBrains Mono
  (labels) via `next/font/google`, applied through a wrapper className — avoids
  editing the platform `app/layout.tsx`.
- **Only platform-file touches:** two thin-shim re-exports + one layout swap. All
  trivial "keep-mine" merges.

## Phases

### Phase 1 — Foundations

- [x] Brand SVGs copied to `public/brand/` (wordmark + mark, ink + paper).
      Favicon = `app/icon.svg` (App Router convention, the HCE mark — no platform
      layout edit).
- [x] Design palette tokens added to `app/brand-theme.css` under
      `[data-surface='consumer']` (light) + `[data-surface='consumer'].dark`
      (dark), plus brand-orange `::selection`.
- [x] Three Google fonts wired in `components/app/marketing/fonts.ts`
      (`next/font/google`, CSS variables `--font-display`/`--font-body`/
      `--font-mono-brand`). Consumed by the marketing layout in Phase 2.
- [x] Brand env (`NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_LEGAL_NAME`) — already set
      in `.env.local`.

### Phase 2 — Bespoke chrome

- [x] `SiteHeader` (+ `ThemePill`) — themed wordmark (34px, `.dark` CSS swap, no
      flash) + pill toggle (accent dot + mono `LIGHT`/`DARK` label) wired to
      `use-theme`. No auth/nav UI (this is where login gets hidden).
- [x] `SiteFooter` — wordmark (24px) + `© {year} {legalName} · hce.studio` (mono) + legal cluster: Terms · Privacy · Cookie Preferences (consent button).
- [x] Minimal `app/(public)/layout.tsx` swap → bespoke chrome, full-bleed,
      `hce-site` + font-variable wrapper. Edit region marked `app:chrome`.
- [x] "First light" hairline folded into the shared chrome here (top of layout)
      rather than Phase 3 — it's a site-wide chrome element. Sweep + reduced-motion
      guard live in `marketing.css`.

### Phase 3 — Holding page

- [ ] `components/app/marketing/home-page.tsx` (default export + `metadata`) with
      all sections. Thin-shim `app/(public)/page.tsx` → this module.
- [x] First-light hairline — done in Phase 2 (moved into shared chrome).
- [ ] Hero, "What we're doing now" (3 cards + frontier line), "What we believe"
      (3 beliefs on `--soft` bg), "Let's build something." CTA + founder line.
- [ ] Copy: British English, **no em dashes**. "Daybreak" (item 03's framework)
      **never named publicly** — describe by capability only. Partner venture
      (Lelanea) referred to only as "a partner venture". Founder LinkedIn links.

### Phase 4 — Contact page

- [ ] Thin-shim `app/(public)/contact/page.tsx` → `contact-page.tsx`, re-skinned,
      rendering the existing `<ContactForm>` (API untouched).

### Phase 5 — Whitepaper

- [ ] Place PDF at `public/downloads/hce-studio-whitepaper.pdf` (Simon provides).
- [ ] `/whitepaper` route → redirect to the PDF. Wire the "Read the whitepaper ↗"
      footer/section link.

### Phase 6 — Polish & validate

- [ ] Metadata / OG / title / favicon; `robots.ts`, `sitemap.ts`.
- [ ] Verify auth is fully unlinked (no login/signup/admin in chrome).
- [ ] Light + dark visual pass; reduced-motion; responsive (grids collapse
      3→2→1); `::selection` accent.
- [ ] `npm run validate` (type-check + lint + format); `/pre-pr`.

## Design tokens (from handoff README)

| Token       | Light     | Dark      | Used for                 |
| ----------- | --------- | --------- | ------------------------ |
| `--bg`      | `#FBF6EF` | `#1A1714` | page background          |
| `--fg`      | `#26241F` | `#F4EEE4` | primary text             |
| `--muted`   | `#6E675C` | `#A79D8C` | secondary text           |
| `--card`    | `#FFFFFF` | `#23201A` | reserved / surfaces      |
| `--line`    | `#E9E0D0` | `#35301F` | borders / rules          |
| `--soft`    | `#F3EADB` | `#201C16` | "What we believe" bg     |
| `--accent`  | `#ED5A24` | `#ED5A24` | brand orange (constant)  |
| `--accent2` | `#F2A24C` | `#F4A85A` | dawn amber (glows, dots) |
| `--hero1`   | `#FFF4E8` | `#2A1F16` | hero glow stop 1         |
| `--hero2`   | `#FBDFC7` | `#3A2519` | hero glow stop 2         |

- Horizontal gutter everywhere: `clamp(24px, 6vw, 88px)`. Pills/buttons/chips
  radius `999px`. Hairlines `1px solid var(--line)`. `::selection` = accent + white.
- Type: h1 `clamp(40px,7vw,76px)`/1.04 Newsreader wght 300; section h2 24px/1.25
  wght 500; body Hanken 16px/1.6; mono labels 11–13px, wide letter-spacing,
  uppercase. Full per-section values in the handoff README.

## External links (from handoff)

- Sunrise repo: `https://github.com/human-centric-engineering/sunrise`
- Whitepaper: `/whitepaper` → `/downloads/hce-studio-whitepaper.pdf`
- Simon Holmes LinkedIn: `https://www.linkedin.com/in/simondholmes/`
- John Durrant LinkedIn: `https://www.linkedin.com/in/johndurrant/`
- Contact: `/contact` (internal). External links: `target="_blank" rel="noopener"`.
- **No email addresses / `mailto:` in page source.**

## Tone of voice

Confident, calm, precise; human and warm, not corporate or hypey. British English.
No em dashes. Avoid AI-slop clichés and empty superlatives — show substance.
