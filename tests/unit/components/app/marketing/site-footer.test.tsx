// @vitest-environment happy-dom

/**
 * SiteFooter — bespoke holding-page footer.
 *
 * Verifies the legal cluster (Terms, Privacy, and the always-present Cookie
 * Preferences consent control), that the consent control is wired to
 * `useConsent().openPreferences`, and that the copyright attributes to
 * `BRAND.legalName` rather than the product name — the legal entity differs from
 * the product here, and it is a legal-attribution surface. Brand comes from the
 * `lib/app/brand.ts` seam (Sunrise 0.11.0 removed the NEXT_PUBLIC_* brand vars),
 * pinned per-file below.
 *
 * @see components/app/marketing/site-footer.tsx
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';

const openPreferences = vi.fn();

// hce-website's brand, for this file only. tests/setup.ts pins `@/lib/app/brand`
// to null across the whole suite (#661) so that no CORE test reads a fork's brand
// and fails for something the fork cannot fix. A test that needs a brand VALUE
// overrides that with its own hoisted `vi.mock` — the sanctioned escape. Never
// `vi.unmock`/`vi.doUnmock`: those REMOVE the pin rather than restoring it, and
// tests/unit/lib/app/defaults.test.ts fails any file that does.
vi.mock('@/lib/app/brand', () => ({
  appBrandName: 'HCE Studio',
  appBrandLegalName: 'All Too Human Ltd',
  appBrandDescription: null,
}));

vi.mock('@/lib/consent', () => ({
  useConsent: () => ({ openPreferences }),
}));

afterEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
  openPreferences.mockClear();
});

describe('SiteFooter', () => {
  it('renders the legal cluster and the configured copyright line', async () => {
    vi.resetModules();
    const { SiteFooter } = await import('@/components/app/marketing/site-footer');
    render(React.createElement(SiteFooter));

    expect(screen.getByRole('link', { name: 'Terms' })).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('button', { name: 'Cookie Preferences' })).toBeInTheDocument();
    // Copyright names the legal entity and the domain. This asserted
    // "© 2026 Sunrise" until Sunrise 0.11.0, when brand moved from build-time
    // NEXT_PUBLIC_* vars to the committed lib/app/brand.ts seam — the platform
    // default leaking into a configured fork's footer was the #661 defect, not
    // behaviour to pin.
    expect(screen.getByText(/hce\.studio/)).toHaveTextContent(
      '© 2026 All Too Human Ltd · hce.studio'
    );
  });

  it('does not surface any auth (login/signup) links', async () => {
    vi.resetModules();
    const { SiteFooter } = await import('@/components/app/marketing/site-footer');
    render(React.createElement(SiteFooter));

    expect(screen.queryByRole('link', { name: /log ?in|sign ?up|sign ?in/i })).toBeNull();
  });

  it('opens cookie preferences when the consent control is clicked', async () => {
    vi.resetModules();
    const { SiteFooter } = await import('@/components/app/marketing/site-footer');
    render(React.createElement(SiteFooter));

    fireEvent.click(screen.getByRole('button', { name: 'Cookie Preferences' }));
    expect(openPreferences).toHaveBeenCalledTimes(1);
  });

  it('attributes the copyright to the legal entity, not the product name', async () => {
    vi.resetModules();
    const { SiteFooter } = await import('@/components/app/marketing/site-footer');
    render(React.createElement(SiteFooter));

    // The two differ on purpose — product "HCE Studio" © "All Too Human Ltd" —
    // so asserting the product name is ABSENT is what makes this a real check
    // rather than one a single-name brand would pass either way.
    const copyright = screen.getByText(/hce\.studio/);
    expect(copyright).toHaveTextContent('All Too Human Ltd');
    expect(copyright).not.toHaveTextContent('HCE Studio');
  });
});
