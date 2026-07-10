'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@/lib/brand';
import { useConsent } from '@/lib/consent';

/**
 * SiteFooter — bespoke footer for the hce.studio holding page.
 *
 * Design footer is wordmark + copyright; per the brief we also keep the legal
 * cluster (Terms, Privacy, and the platform Cookie Preferences consent control)
 * in the footer during the holding phase. Copyright attributes to
 * `BRAND.legalName` (the registered entity when it differs from the product).
 */
export function SiteFooter() {
  const { openPreferences } = useConsent();
  // Static: the holding page ships a fixed launch year, and `new Date()` in a
  // Server Component would tie this file to render time for no benefit.
  const year = 2026;

  return (
    <footer className="site-footer">
      <Link href="/" aria-label={`${BRAND.name} home`}>
        <Image
          src="/brand/wordmark-ink.svg"
          alt={BRAND.name}
          width={117}
          height={24}
          unoptimized
          className="brand-logo brand-logo--footer brand-logo--light"
        />
        <Image
          src="/brand/wordmark-paper.svg"
          alt={BRAND.name}
          width={117}
          height={24}
          unoptimized
          className="brand-logo brand-logo--footer brand-logo--dark"
        />
      </Link>

      <div className="site-footer__meta">
        <nav className="site-footer__links" aria-label="Legal">
          <Link href="/terms" className="site-footer__link">
            Terms
          </Link>
          <Link href="/privacy" className="site-footer__link">
            Privacy
          </Link>
          <button type="button" onClick={openPreferences} className="site-footer__link">
            Cookie Preferences
          </button>
        </nav>
        <span className="site-footer__copyright">
          © {year} {BRAND.legalName} · hce.studio
        </span>
      </div>
    </footer>
  );
}
