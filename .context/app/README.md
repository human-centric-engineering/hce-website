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

### Platform files hce-website deliberately keeps its own version of

Four Sunrise-owned files carry a local edit. Each is marked in-file with an
`app:` comment saying what to do on merge, so a conflict here is a one-line
"keep mine" rather than a re-derivation. Listed so a future merge does not have
to rediscover the reasoning:

| File                                     | Marker                                       | Why                                                                                                                                                                                                       |
| ---------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/(public)/page.tsx`                  | `app:shim`                                   | Re-exports `components/app/marketing/home-page`. Same for `contact/`, `privacy/`, `terms/`.                                                                                                               |
| `app/(public)/layout.tsx`                | `app:chrome`, `app:description`              | Bespoke holding-page chrome instead of `AppHeader`/`PublicFooter`; a literal meta description instead of `BRAND.description`, so the snippet is right without a deploy-host env var.                      |
| `tests/unit/reserved-fork-tiers.test.ts` | `app:occupied-tiers`                         | Drops `components/app` and `.context/app` from the assert-empty rows — hce-website _is_ the fork those tiers are reserved for, so the rows can only fail here. The `/framework` rows stay live.           |
| `tests/unit/app/layout-metadata.test.ts` | `app:module-list`, `app:intentional-sunrise` | The module list drops the deleted `/about` and gains contact/privacy/terms; the brand-leak row exempts `(public)/layout` and `(public)/page`, whose metadata names Sunrise on purpose — HCE publishes it. |

The last two are new in Sunrise 0.10.0 and are the "core test a fork cannot
satisfy" shape that release set out to fix (#480 / #525 / #530 / #533). Both are
worth an upstream issue asking for a fork-side opt-out; until then the local
edit stands.

### The 0.10.0 test-environment change

Vitest now runs on `node` by default, with a DOM opted into per file via a
`// @vitest-environment happy-dom` directive on line 1. Upstream ships
directives for its own test files and none for a fork's, so every hce-website
component test failed on the first run after merging. `npm run fix:dom-tests`
migrated all seven under `tests/unit/components/app/marketing/` — it decides by
running each file, not by pattern-matching. Any _new_ component test needs the
directive; add it when the test dies on `document is not defined`, and do not
add it pre-emptively (over-declaring silently puts the file back on the client
env schema). See [`../testing/environments.md`](../testing/environments.md).

## What this is

The public marketing and content site for Human Centric Engineering — landing
page, product/service pages, and any lightweight content or contact flows. Built
as `app/(public)` pages on the Sunrise platform, taking auth, security headers,
rate limiting, email, and the `<FieldHelp>` / form conventions for free while
staying on the upgrade path via `upstream`.
