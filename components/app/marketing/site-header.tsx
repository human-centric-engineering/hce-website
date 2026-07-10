import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@/lib/brand';
import { ThemePill } from '@/components/app/marketing/theme-pill';

/**
 * SiteHeader — bespoke header for the hce.studio holding page.
 *
 * Wordmark (charcoal on light, white on dark, swapped via `.dark` CSS so there's
 * no hydration flash) + the theme pill. Deliberately carries no auth / nav UI:
 * this is what "hide login for the holding phase" resolves to. SVGs render
 * `unoptimized` to skip the image optimizer (no next.config change needed).
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="site-header__brand" aria-label={`${BRAND.name} home`}>
        <Image
          src="/brand/wordmark-ink.svg"
          alt={BRAND.name}
          width={165}
          height={34}
          priority
          unoptimized
          className="brand-wordmark block dark:hidden"
        />
        <Image
          src="/brand/wordmark-paper.svg"
          alt={BRAND.name}
          width={165}
          height={34}
          priority
          unoptimized
          className="brand-wordmark hidden dark:block"
        />
      </Link>
      <ThemePill />
    </header>
  );
}
