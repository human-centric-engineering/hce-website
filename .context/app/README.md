# hce-website — fork playbook

**hce-website** is Human Centric Engineering's public-facing website, built as a
**leaf-app fork** of [Sunrise](https://github.com/human-centric-engineering/sunrise).
This directory (`.context/app/`) is hce-website's own documentation tree — Sunrise
reserves it and never writes to it, so nothing here ever conflicts on an upstream
merge.

> This file is the fork's operating manual. The `CLAUDE.md` banner is the short
> version; this is the long version.

## The fork model

- **Independent repo, shared history.** hce-website is its own repository
  (`human-centric-engineering/hce-website`) that shares Sunrise's full git history.
  It was forked at Sunrise **v0.7.0** (`b86d9d35`) and is currently synced to
  Sunrise **v0.9.0** (`a4f789c2`).
- **Remotes.** `origin` = hce-website, `upstream` = Sunrise. hce-website keeps its
  own tag namespace; Sunrise's tags are not pushed to `origin`.
- **Two tiers: Sunrise → app.** hce-website lives entirely in the reserved
  **`/app`** tier. The middle **`/framework`** tier is for framework-layer forks
  (e.g. Daybreak); hce-website does not use it.

## Ownership boundary

**hce-website-owned (edit freely):**

| Surface                                         | Notes                                                                                                                   |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `lib/app/*`                                     | Fork-owned scaffolds Sunrise ships empty. Register into Sunrise's seams from here, driven by `initApp()`.               |
| `prisma/schema/app.prisma` + `app_…` migrations | Your models; migrations must touch only `app_*` tables.                                                                 |
| `.context/app/`                                 | This tree — hce-website's own docs.                                                                                     |
| `app/brand-theme.css`                           | Per-surface theming.                                                                                                    |
| Identity                                        | `package.json`, `README.md`, `CUSTOMIZATION.md`, `.env*`, brand env (`NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_LEGAL_NAME`). |
| New app files anywhere                          | Marketing pages under `app/(public)`, API routes, `components/`.                                                        |

**Sunrise-owned (do NOT edit — extend through a seam):** core `lib/`, core
`app/api/v1`, core `components/`, `proxy.ts` + `lib/security/**`,
`lib/sunrise-version.ts`, `VERSIONING.md`, `CHANGELOG.md`, and `.context/**`
except `.context/app/`, plus the SQL of any Sunrise migration. If you must change
platform behaviour and no seam exists, keep the edit minimal (a one-line "keep
mine" is a cheap merge; a rewritten platform file is not) and file a follow-up to
add the seam upstream.

## The seams hce-website builds on

A public website leans on the presentation and content seams rather than the
orchestration layer. The fork-owned registration points most relevant here:

- `lib/app/public-nav.ts` — the public site's navigation links.
- `lib/app/protected-routes.ts` — which route prefixes require a session (a
  marketing site is mostly public; add prefixes only for any gated area).
- `app/brand-theme.css` + brand env (`NEXT_PUBLIC_APP_NAME`,
  `NEXT_PUBLIC_LEGAL_NAME`) — HCE identity, colours, and legal name in footers.
- `lib/app/bootstrap.ts` → `initApp()` — one-time server boot, if any is needed.
- New marketing pages under `app/(public)` and shared `components/` — the bulk of
  the site.

Sunrise's orchestration/admin surfaces (agents, workflows, knowledge base,
`/admin/orchestration`) ship enabled but dormant. A public website will likely
**trim** most of them via the folder convention — see
[`CUSTOMIZATION.md`](../../CUSTOMIZATION.md) §6 (remove default public pages /
make an auth-only app) rather than deleting platform code.

## Version model

`package.json.version` is **hce-website's** app version (surfaced via
`lib/app-version.ts` → `/api/health` `version`), starting at `0.1.0`.
`lib/sunrise-version.ts` is the **Sunrise platform** version hce-website forked
from — merged through on upstream syncs, never edited directly. hce-website's own
changelog, when it releases, is a separate `CHANGELOG.hce-website.md`, never
Sunrise's `CHANGELOG.md`.

## Pulling upstream Sunrise

Sunrise is the `upstream` remote. To adopt a release:

```bash
git fetch upstream --tags
git merge vX.Y.Z            # ordinary 3-way merge; keep-mine on any platform-file conflict
npm ci
npm run db:migrate:status  # then db:migrate:dev to apply newly-merged Sunrise migrations
```

### Brand identity

hce-website's brand lives in **`lib/app/brand.ts`** (Sunrise 0.11.0) as committed
code — `appBrandName` "HCE Studio", `appBrandLegalName` "All Too Human Ltd",
`appBrandDescription` the studio sentence. It feeds page titles, both footers'
copyright line, the header `<BrandMark>`, the root meta description and every
transactional email.

Do **not** reintroduce `NEXT_PUBLIC_APP_NAME` / `NEXT_PUBLIC_LEGAL_NAME` /
`NEXT_PUBLIC_APP_DESCRIPTION`. They were removed in 0.11.0 because they were
inlined at build time and reached no container build, so a fork with its brand
correctly configured still shipped as "Sunrise" (sunrise#661). Setting them again
does nothing but raise a boot warning.

### Reserved tiers

hce-website occupies `components/app` and `.context/app`, declared in
**`lib/app/reserved-tiers.ts`**. `tests/unit/reserved-fork-tiers.test.ts`
subtracts what is declared before asserting the rest are empty, so the tiers this
fork does _not_ use keep guarding. Add a tier here before putting files in it.

### Platform files hce-website keeps its own version of

Two Sunrise-owned files carry a local edit, each marked in-file with an `app:`
comment saying what to do on merge:

| File                      | Marker       | Why                                                                                                                                  |
| ------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `app/(public)/page.tsx`   | `app:shim`   | Re-exports `components/app/marketing/home-page`. Same for `contact/`, `privacy/`, `terms/`.                                          |
| `app/(public)/layout.tsx` | `app:chrome` | Bespoke holding-page chrome instead of `AppHeader`/`PublicFooter`; the swapped-in components live under `components/app/marketing/`. |

Plus two **pinned rows** in `tests/unit/lib/app/defaults.test.ts` (`app:pin`),
which asserts every `lib/app/*` seam ships empty. Filling a seam is expected to
fail its row — pin the new value rather than deleting the row, or the seams you
have _not_ filled lose their protection. hce-website pins `lib/app/brand.ts` and
`lib/app/reserved-tiers.ts`; if you change a brand value, change it in both
places.

> Sunrise 0.10.0 also needed local edits to `tests/unit/reserved-fork-tiers.test.ts`
> and `tests/unit/app/layout-metadata.test.ts`. **Both were reverted in the 0.11.0
> merge** — upstream made those tests fork-aware (sunrise#660), so the fork now
> declares its shape through the seams above instead of maintaining copies of two
> platform tests.

### Testing notes

**DOM is opt-in.** Vitest runs on `node`; a component test needs
`// @vitest-environment happy-dom` on line 1. Add it when a test dies on
`document is not defined` — never pre-emptively, since over-declaring silently
puts the file back on the client env schema. `npm run fix:dom-tests` migrates by
running, not by pattern. See [`../testing/environments.md`](../testing/environments.md).

**Brand is pinned to null suite-wide.** `tests/setup.ts` mocks `@/lib/app/brand`
to null in every test file, so no core test reads a fork's brand. A test that
needs a real brand value declares its own hoisted `vi.mock('@/lib/app/brand', …)`
— the three under `tests/unit/components/app/marketing/` that assert the
copyright and legal blocks do exactly this. Never `vi.unmock` / `vi.doUnmock` the
seam: that removes the pin instead of restoring it, and `defaults.test.ts` fails
any file that does.

## What this is

The public marketing and content site for Human Centric Engineering — landing
page, product/service pages, and any lightweight content or contact flows. Built
as `app/(public)` pages on the Sunrise platform, taking auth, security headers,
rate limiting, email, and the `<FieldHelp>` / form conventions for free while
staying on the upgrade path via `upstream`.
