// @vitest-environment happy-dom

/**
 * TermsPage — hce.studio website terms (adapted from the group's ConQuest terms).
 *
 * Verifies HCE branding + the All Too Human Ltd company block, and guards against
 * ConQuest SaaS content (accounts/questionnaires/waitlist) leaking through.
 * Brand strings come from the `lib/app/brand.ts` seam at module load (Sunrise
 * 0.11.0 removed the NEXT_PUBLIC_* brand vars), pinned per-file below.
 *
 * @see components/app/marketing/terms-page.tsx
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';

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

afterEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
});

async function renderTerms() {
  vi.resetModules();
  const { default: TermsPage } = await import('@/components/app/marketing/terms-page');
  return render(React.createElement(TermsPage));
}

describe('TermsPage', () => {
  it('renders HCE-branded England & Wales website terms with the company block', async () => {
    const { container } = await renderTerms();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Terms of Use');
    expect(container.textContent).toContain('All Too Human Ltd');
    expect(container.textContent).toContain('15336127');
    expect(container.textContent).toContain('England & Wales');
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
      'href',
      '/privacy'
    );
    expect(screen.getByRole('link', { name: /legal@hce\.studio/ })).toHaveAttribute(
      'href',
      'mailto:legal@hce.studio'
    );
  });

  it('does not carry over ConQuest SaaS content', async () => {
    const { container } = await renderTerms();

    expect(container.textContent).not.toMatch(/ConQuest|questionnaire|respondent|waitlist/i);
  });
});
