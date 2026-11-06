# Platform divergences

Every edit hce-website carries to a file Sunrise owns. Read this before resolving
any conflict in a sync. The convention, and the steps that retire rows, are in
[`CUSTOMIZATION.md`](../../CUSTOMIZATION.md#the-divergence-ledger).

Left out on purpose, as that guide says: filled `lib/app/*` scaffolds, the
marketing-page shims in `app/(public)`, branding, `package.json` identity, the
Hub bootstrap in `CLAUDE.md`, and our own dev port in `.env.development`
([§1](../../CUSTOMIZATION.md#claiming-your-own-dev-port)).

| #   | File                                  | Change                                                                          | Why no seam could carry it                                                                                                                   | Merge action                                                                                                                             | Upstream | Delete when                                              |
| --- | ------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------- |
| 1   | `app/(public)/layout.tsx`             | Renders the holding-page `SiteHeader` / `SiteFooter`, fonts and `marketing.css` | The site's own frame, not a platform gap. `none` because a route group of our own would replace it, which needs no upstream change           | Keep mine: the `app:chrome` imports, and the `hce-site` wrapper with `SiteHeader` / `SiteFooter` in the JSX. Take theirs everywhere else | none     | The marketing pages move to a route group of their own   |
| 2   | `app/(public)/about/page.tsx`         | Deleted: the site has no About page                                             | Removing a default page is deleting its folder ([§6](../../CUSTOMIZATION.md#removing-default-public-pages)). `none` because it is our choice | Keep mine (deleted)                                                                                                                      | none     | The site gets an About page                              |
| 3   | `app/sitemap.ts`                      | Dropped the `/about` entry                                                      | The page list is hardcoded in this file. Goes with row 2, so `none`                                                                          | Keep mine: re-apply the removal, take theirs everywhere else                                                                             | none     | Row 2 retires, or the sitemap's page list becomes a seam |
| 4   | `.prettierignore`                     | Ignores `.context/app/design_handoff_holding_page/**`                           | Prettier reads one ignore file. The path is ours, so upstream has no reason to carry it                                                      | Keep both: our block stays at the end of the file                                                                                        | none     | The design handoff leaves the repo                       |
| 5   | `tests/unit/lib/app/defaults.test.ts` | Pins the `reserved-tiers` and `brand` rows to our values (marked `app:pin`)     | The test's own FORK NOTE asks for this: pin a seam you fill, don't delete its row                                                            | Keep the `app:pin` blocks; take theirs everywhere else                                                                                   | none     | We stop filling those seams                              |

Next row: 6
