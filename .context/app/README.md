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
  Sunrise **v0.8.0** (`45e704d9`).
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

## What this is

The public marketing and content site for Human Centric Engineering — landing
page, product/service pages, and any lightweight content or contact flows. Built
as `app/(public)` pages on the Sunrise platform, taking auth, security headers,
rate limiting, email, and the `<FieldHelp>` / form conventions for free while
staying on the upgrade path via `upstream`.
