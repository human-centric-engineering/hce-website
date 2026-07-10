# Handoff: hce.studio Holding Page

## Overview

A single-screen (single-scroll), static holding page for **HCE Studio** that replaces the current site at `hce.studio` while the full site is decided. Its job: reposition the studio as _human-centric people building production-grade agentic software_, signal active momentum, hold the values, and give one clear way to get in touch. Low maintenance, no CMS, fast to load.

The page is one confident scroll: **hero → what we're doing now → what we believe → get in touch → footer**, with a light/dark theme toggle.

## About the Design Files

The files in this bundle are **design references created in HTML** — a prototype showing the intended look and behaviour, **not production code to copy directly**.

`HCE Holding Page.dc.html` is authored in a bespoke streaming "Design Component" format (a `<x-dc>` template with a `class Component` logic block and a `support.js` runtime). **Do not try to run or port this format.** Read it purely as a spec: the markup, inline styles, copy and the logic block tell you exactly what to build.

Your task is to **recreate this design in the target environment** — the Sunrise platform — using its established framework, patterns and component library. If the holding page ships as its own tiny static artefact (recommended in the brief: static HTML/CSS or a minimal static export, _not_ necessarily on Sunrise), plain semantic HTML + CSS is entirely sufficient and preferable. The contact form is the one piece intended to be wired to Sunrise's existing form capability.

## Fidelity

**High-fidelity (hifi).** Final colours, typography, spacing, copy and interactions. Recreate the UI faithfully. All exact values are in the Design Tokens section below.

## Screens / Views

This is a single responsive page. Sections top to bottom:

### 0. Global shell

- Full-viewport-width container, `min-height: 100vh`, page background token `--bg`, body text colour `--fg`.
- Theme is driven by CSS custom properties set on this root container (see Design Tokens → Theming). Default theme is **light**. A toggle in the header swaps to **dark**.
- All section horizontal padding is fluid: `clamp(24px, 6vw, 88px)`.
- Body font: **Hanken Grotesk**. Display serif: **Newsreader**. Mono (labels/kickers/chips): **JetBrains Mono**.

### 1. "First light" hairline (top of page)

- A 3px-tall full-width bar, the very first element.
- Background: `linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent)` with `background-size: 60% 100%`.
- Animated: keyframes `sweep` moving `background-position` from `-140% 0` to `240% 0`, `7s linear infinite`. Reads as a slow beam of dawn light sweeping across.

### 2. Header

- Flex row, `justify-content: space-between`, `align-items: center`, padding `24px clamp(24px,6vw,88px)`, `border-bottom: 1px solid var(--line)`.
- **Left:** wordmark logo, `height: 34px`. Light theme shows `assets/wordmark-ink.svg` (charcoal), dark theme shows `assets/wordmark-paper.svg` (white). (In the prototype both `<img>`s are present and toggled via `display`; in production just swap `src`/render conditionally on theme.)
- **Right:** theme toggle button — pill, `border: 1px solid var(--line)`, `border-radius: 999px`, padding `10px 15px`, transparent background. Contains an 8px accent-coloured dot + a JetBrains Mono label (`11px`, `letter-spacing: .14em`, uppercase) reading the **current** theme: "Light" or "Dark". Hover: border colour → `var(--accent)`.

### 3. Hero

- `position: relative; overflow: hidden;` padding `clamp(80px,12vw,130px) clamp(24px,6vw,88px) clamp(88px,12vw,132px)`.
- **Background glow** (subtle, no hard shapes): two layered radial gradients on the section background —
  `radial-gradient(115% 80% at 84% -12%, var(--hero1) 0%, transparent 54%), radial-gradient(85% 70% at -5% 118%, var(--hero2) 0%, transparent 50%)`.
- Content wrapper `max-width: 960px`.
- **Kicker:** "Human-Centric Engineering · Studio" — JetBrains Mono, `12px`, `letter-spacing: .24em`, uppercase, colour `var(--accent)`.
- **Headline (h1):** "Building experiences that weren't possible a year ago." — Newsreader, weight **300**, `font-size: clamp(40px, 7vw, 76px)`, `line-height: 1.04`, `letter-spacing: -.015em`, `max-width: 880px`, `text-wrap: balance`, `margin-top: 26px`.
- **Subhead (p):** Hanken Grotesk, `font-size: clamp(17px, 2.4vw, 21px)`, `line-height: 1.55`, colour `var(--muted)`, `max-width: 660px`, `margin-top: 30px`. Copy:

  > HCE is a human-centric engineering studio. We build agentic apps, websites, and tools on **Sunrise**, our open-sourced, production-ready foundation with AI orchestration built in. We move at AI speed without giving up craftsmanship.

  ("Sunrise" is a `<strong>` with `color: var(--fg)`, `font-weight: 600`.)

- **CTA row** (`margin-top: 40px`, flex, `gap: 14px`, wraps):
  - **Primary:** "Get in touch →" — filled `var(--accent)`, white text, Hanken 600 16px, padding `17px 26px`, `border-radius: 999px`. Hover `filter: brightness(1.07)`. Links to **`/contact`**.
  - **Secondary:** "Explore Sunrise ↗" — transparent, `border: 1px solid var(--line)`, `var(--fg)` text, same padding/radius; the ↗ is `var(--accent)`. Hover: border → `var(--accent)`. Links to the Sunrise repo (see Assets/Links).

### 4. What we're doing now

- Section, `border-top: 1px solid var(--line)`, padding `clamp(64px,10vw,96px) clamp(24px,6vw,88px)`.
- **Section label:** "What we're doing now" — JetBrains Mono, `12px`, `letter-spacing: .22em`, uppercase, `var(--muted)`, `margin-bottom: 52px`.
- **3-column grid:** `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`, `gap: 48px`. Each card is a flex column so its action pins to the bottom (`margin-top: auto` on the action wrapper → actions align across cards).
  - Each card: mono index label (`13px`, `var(--accent)`, `margin-bottom: 16px`), a Newsreader 500 `24px`/1.25 `h2` title, and a Hanken `16px`/1.6 `var(--muted)` paragraph.

  **01 / Sunrise — "The foundation"**

  > Our open-source, production-ready base for agentic software. Agents, capabilities, knowledge, workflows, evaluation and governance, with orchestration built in.

  Action: **"Fork on GitHub"** link — pill, `border: 1px solid var(--line)`, `border-radius: 999px`, padding `10px 15px`, Hanken 600 13px, `var(--fg)` text, with a 16px GitHub mark (inline SVG, `fill: currentColor`) to its left. Hover: border → `var(--accent)`. Links to the Sunrise repo.

  **02 / ConQuest — "Conversation, not forms"**

  > A conversational questionnaire platform. A natural dialogue in place of form-filling. An agent extracts, infers and synthesises answers, with confidence and provenance.

  Status chip (non-interactive): **"Coming soon"** — JetBrains Mono `11px`, `letter-spacing: .12em`, uppercase, `var(--muted)`, `border: 1px solid var(--line)`, `border-radius: 999px`, padding `11px 15px`, with a 7px `var(--accent2)` dot.

  **03 / Expert-led journeys — "Guided, personal experiences"**

  > A framework that turns the foundation's primitives into guided, personalised, expert-led apps. First in genre, a coaching journey built with a partner venture.

  Status chip: **"In development"** — same style as the "Coming soon" chip.

  > **Confidential naming note:** item 03's framework is internally called "Daybreak" — **never name it publicly**; describe by capability only. The partner venture (Lelanea) is referred to only as "a partner venture" — do not over-claim it.

- **Frontier line** (below the grid, `margin-top: 60px`, `padding-top: 36px`, `border-top: 1px solid var(--line)`): a short accent rule (40px × 3px `var(--accent)` block) beside a Newsreader `clamp(21px,3vw,26px)`/1.45 paragraph, `max-width: 900px`:
  > We're building things that weren't possible a year ago, on a foundation that's production-ready from day one. The possibilities on top of it are effectively endless.

### 5. What we believe

- Section, `background: var(--soft)`, padding `clamp(64px,9vw,80px) clamp(24px,6vw,88px)`.
- **Header row** (flex, space-between, align-end, wraps, `margin-bottom: 44px`):
  - Label "What we believe" — mono `12px`, `.22em`, uppercase, `var(--muted)`.
  - Link "Read the whitepaper ↗" — Hanken 600 14px, `var(--fg)`, `border-bottom: 1px solid var(--accent)`, `padding-bottom: 3px`; ↗ in `var(--accent)`. Links to the whitepaper (see Assets/Links).
- **3-column grid:** `repeat(auto-fit, minmax(240px, 1fr))`, `gap: clamp(32px,4vw,56px)`. Each belief is a block with `border-top: 1px solid var(--line)`, `padding-top: 22px`:
  - Mono index label (`12px`, `.06em`, `var(--accent)`, `margin-bottom: 18px`) + Newsreader `22px`/1.4 statement.
  - **01 / Human** — "Software engineering is a deeply human endeavour."
  - **02 / Symbiotic** — "Humans and AI, working symbiotically."
  - **03 / Craft** — "Fast iteration, without giving up craft."

### 6. Get in touch

- Section, `text-align: center`, padding `clamp(88px,12vw,112px) clamp(24px,6vw,88px) clamp(72px,10vw,96px)`.
- **Heading (h2):** "Let's build something." — Newsreader 300, `clamp(40px,6vw,58px)`/1.08, `letter-spacing: -.01em`, `margin-bottom: 22px`.
- **Subhead:** "Have an idea? We'd like to hear from you." — Hanken `clamp(17px,2.2vw,19px)`/1.55, `var(--muted)`, `max-width: 560px`, centered, `margin-bottom: 36px`.
- **Primary CTA:** "Get in touch →" — same as hero primary, padding `18px 30px`. Links to **`/contact`**.
- **Founder line** (`margin-top: 44px`, Hanken 15px, `var(--muted)`): "A studio by **Simon Holmes** & **John Durrant**." Each name links to their LinkedIn (see Assets/Links), styled with `border-bottom: 1px solid var(--line)` and `color: var(--fg)`. _This line is behind a `showFounders` flag (default on) in the prototype — keep it, but it's optional to make configurable._

### 7. Footer

- Flex row, space-between, align-center, wraps, `gap: 18px`, padding `30px clamp(24px,6vw,88px)`, `border-top: 1px solid var(--line)`.
- **Left:** wordmark logo `height: 24px` (theme-swapped like the header).
- **Right:** "© 2026 HCE Studio · hce.studio" — JetBrains Mono `12px`, `.06em`, `var(--muted)`.

## Interactions & Behavior

- **Theme toggle:** header button switches the whole page between light and dark by re-setting the CSS custom properties on the root container. Persist choice (e.g. `localStorage`) and/or honour `prefers-color-scheme` for the initial value — the prototype simply defaults to light. Logos and the toggle label update with the theme.
- **Hover states:** primary buttons `filter: brightness(1.07)`; bordered pills/links change `border-color` to `var(--accent)`; the whitepaper and founder links are underline-on-accent already.
- **Motion:** the only ambient animation is the top "first light" hairline `sweep` (7s linear infinite). Everything else is static. Honour `prefers-reduced-motion` by disabling the sweep.
- **Responsive:** fully fluid via `clamp()` for padding and type; the two 3-column grids collapse automatically (`auto-fit`/`minmax(240px,1fr)`) to 2 then 1 column on narrow viewports. No fixed widths anywhere. Mobile-first is fine.
- **Links open behaviour:** external links (Sunrise repo, whitepaper, LinkedIn) use `target="_blank" rel="noopener"`. Internal `/contact` navigates in place.

## Contact form (the one dynamic piece)

- The CTAs link to **`/contact`**. Build a contact page/route with fields matching the existing Sunrise contact form: **name, email, subject, message**. Reference implementation: `https://sunrise-hce-studio.vercel.app/contact`.
- Wire submissions to the Sunrise form capability, delivering to the correct `hce.studio` inbox (tied to the email migration — confirm the destination address before launch).
- **No email addresses in the page source; no `mailto:`.** First cut may link out to a hosted form and swap to the Sunrise-backed one later.

## State Management

Minimal. Only one piece of client state:

- `theme: 'light' | 'dark'` — toggled by the header button; drives the root CSS custom properties, the logo variant, and the toggle label. Persist to `localStorage`; optionally seed from `prefers-color-scheme`.

No data fetching on the holding page itself (the contact form submission is the only network action, handled on the `/contact` route).

## Design Tokens

### Theming

The page sets these custom properties on the root container; every value below references them. Recreate as two theme maps (light default / dark).

| Token       | Light     | Dark      | Used for                 |
| ----------- | --------- | --------- | ------------------------ |
| `--bg`      | `#FBF6EF` | `#1A1714` | page background          |
| `--fg`      | `#26241F` | `#F4EEE4` | primary text             |
| `--muted`   | `#6E675C` | `#A79D8C` | secondary text           |
| `--card`    | `#FFFFFF` | `#23201A` | (reserved; surfaces)     |
| `--line`    | `#E9E0D0` | `#35301F` | borders / rules          |
| `--soft`    | `#F3EADB` | `#201C16` | "What we believe" bg     |
| `--accent`  | `#ED5A24` | `#ED5A24` | brand orange (constant)  |
| `--accent2` | `#F2A24C` | `#F4A85A` | dawn amber (glows, dots) |
| `--hero1`   | `#FFF4E8` | `#2A1F16` | hero glow stop 1         |
| `--hero2`   | `#FBDFC7` | `#3A2519` | hero glow stop 2         |

Brand orange `#ED5A24` is the primary accent. Alternate accent options explored: `#E4482A`, `#F2842E`, `#C74A2C`. `::selection` background is `#ED5A24` with white text.

### Typography

- **Display / serif:** Newsreader (Google Fonts), weights 300/400/500/600, optical sizing on. Used for headline, section h2s, beliefs, frontier line, contact heading.
- **Body / UI:** Hanken Grotesk (Google Fonts), weights 400/500/600/700.
- **Mono / labels:** JetBrains Mono (Google Fonts), weights 400/500/600. Used for kickers, section labels, index labels, status chips, footer, toggle.
- Key sizes: h1 `clamp(40px,7vw,76px)`/1.04 wght 300; section h2 24px/1.25 wght 500; body 16px/1.6; subhead `clamp(17px,2.4vw,21px)`/1.55; mono labels 11–13px with wide letter-spacing (`.06em`–`.24em`), uppercase.

### Spacing & shape

- Section vertical padding: `clamp(64–88px, 9–12vw, 80–132px)` per section (see each section above).
- Horizontal gutter: `clamp(24px, 6vw, 88px)` everywhere.
- Border radius: pills/buttons/chips `999px`. (No rounded corners on the page container itself — it's full-bleed.)
- Borders: hairlines are `1px solid var(--line)`. Top light beam is `3px`. Accent rule block is `40px × 3px`.
- No box-shadows on the live page (the prototype's artboard shadow is presentation-only — ignore).

### Motion

- `@keyframes sweep { 0%{background-position:-140% 0} 100%{background-position:240% 0} }`, applied to the top hairline, `7s linear infinite`. Disable under `prefers-reduced-motion`.
- Hover transitions: add a short `transition` (e.g. 150ms) on `border-color`/`filter` for polish (the prototype uses instant state styles).

## Assets

Brand assets are in `assets/` — cleaned, transparent-background SVGs cropped tight to the artwork (aspect ratio ~4.9:1 for the wordmark, 1:1 for the mark):

- `wordmark-ink.svg` — full "Human-Centric Engineering" wordmark + gear/person mark, **charcoal + orange**, for **light** backgrounds.
- `wordmark-paper.svg` — same wordmark, **white + orange**, for **dark** backgrounds.
- `mark-ink.svg` / `mark-paper.svg` — the gear/person **icon only** (charcoal / white + orange), e.g. for favicon or compact placements.

These derive from the studio's existing brand (orange `#ED5A24` + charcoal `#26241F`); reuse them, or substitute the equivalents from your brand system if it has them.

**GitHub mark** on the Sunrise card is an inline SVG (GitHub's octicon `mark-github`, `fill: currentColor`) — use your codebase's existing icon set if it has a GitHub glyph.

### Links used

- Sunrise repo (secondary CTA + "Fork on GitHub"): `https://github.com/human-centric-engineering/sunrise`
- Whitepaper: `https://hce.studio/whitepaper` (intended to redirect to the PDF `https://hce.studio/downloads/hce-studio-whitepaper.pdf`)
- Simon Holmes LinkedIn: `https://www.linkedin.com/in/simondholmes/`
- John Durrant LinkedIn: `https://www.linkedin.com/in/johndurrant/`
- Contact: `/contact` (same domain)

## Tone of voice (for any copy you touch)

Confident, calm, precise; human and warm, not corporate or hypey. **British English spelling.** No em dashes (the studio doesn't use them). Avoid AI-slop clichés and empty superlatives — show substance (production-ready, open-source, real experiences).

## Files

- `HCE Holding Page.dc.html` — the design reference (read as spec; do not run/port the format). All markup, inline styles, copy and the `class Component` logic block are the source of truth.
- `assets/*.svg` — brand logo/mark, both themes.
- `screenshots/holding-page-light.png` / `holding-page-dark.png` — full-page renders of the final design in both themes, for visual reference.
