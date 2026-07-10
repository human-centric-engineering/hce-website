/**
 * TermsPage — hce.studio website terms (adapted from the group's ConQuest terms).
 *
 * Verifies HCE branding + the All Too Human Ltd company block, and guards against
 * ConQuest SaaS content (accounts/questionnaires/waitlist) leaking through.
 * Brand strings come from env at module load, so each case stubs + re-imports.
 *
 * @see components/app/marketing/terms-page.tsx
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';

afterEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
});

async function renderTerms() {
  vi.resetModules();
  vi.stubEnv('NEXT_PUBLIC_APP_NAME', 'HCE Studio');
  vi.stubEnv('NEXT_PUBLIC_LEGAL_NAME', 'All Too Human Ltd');
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
    expect(
      screen.getByRole('link', { name: /legal@humancentricengineering\.com/ })
    ).toHaveAttribute('href', 'mailto:legal@humancentricengineering.com');
  });

  it('does not carry over ConQuest SaaS content', async () => {
    const { container } = await renderTerms();

    expect(container.textContent).not.toMatch(/ConQuest|questionnaire|respondent|waitlist/i);
  });
});
