/**
 * PrivacyPage — hce.studio website privacy policy (adapted from ConQuest's).
 *
 * Verifies HCE branding + the All Too Human Ltd company block, the cookies /
 * ICO sections, and guards against ConQuest SaaS content leaking through. Brand
 * strings come from env at module load, so each case stubs + re-imports.
 *
 * @see components/app/marketing/privacy-page.tsx
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';

afterEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
});

async function renderPrivacy() {
  vi.resetModules();
  vi.stubEnv('NEXT_PUBLIC_APP_NAME', 'HCE Studio');
  vi.stubEnv('NEXT_PUBLIC_LEGAL_NAME', 'All Too Human Ltd');
  const { default: PrivacyPage } = await import('@/components/app/marketing/privacy-page');
  return render(React.createElement(PrivacyPage));
}

describe('PrivacyPage', () => {
  it('renders the HCE-branded UK GDPR policy with the company block and key sections', async () => {
    const { container } = await renderPrivacy();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Privacy Policy');
    expect(container.textContent).toContain('All Too Human Ltd');
    expect(container.textContent).toContain('15336127');
    expect(container.textContent).toContain('UK GDPR');
    expect(
      screen.getByRole('heading', { name: /Cookies and similar technologies/ })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'ico.org.uk' })).toHaveAttribute(
      'href',
      'https://ico.org.uk'
    );
    const emailLinks = screen.getAllByRole('link', {
      name: /privacy@humancentricengineering\.com/,
    });
    expect(emailLinks.length).toBeGreaterThan(0);
    emailLinks.forEach((link) =>
      expect(link).toHaveAttribute('href', 'mailto:privacy@humancentricengineering.com')
    );
  });

  it('is scoped to the site + contact form, not the ConQuest product', async () => {
    const { container } = await renderPrivacy();

    expect(container.textContent).not.toMatch(/ConQuest|questionnaire|respondent|waitlist/i);
    // The contact form is the collection point it should describe.
    expect(container.textContent).toMatch(/contact form/i);
  });
});
