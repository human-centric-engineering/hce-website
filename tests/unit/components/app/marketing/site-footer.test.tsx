/**
 * SiteFooter — bespoke holding-page footer.
 *
 * Verifies the legal cluster (Terms, Privacy, and the always-present Cookie
 * Preferences consent control), that the consent control is wired to
 * `useConsent().openPreferences`, and that the copyright attributes to
 * `BRAND.legalName` (read from `NEXT_PUBLIC_LEGAL_NAME` at module load, so the
 * env case re-imports fresh).
 *
 * @see components/app/marketing/site-footer.tsx
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';

const openPreferences = vi.fn();

vi.mock('@/lib/consent', () => ({
  useConsent: () => ({ openPreferences }),
}));

afterEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
  openPreferences.mockClear();
});

describe('SiteFooter', () => {
  it('renders the legal cluster and copyright, and defaults the name to Sunrise', async () => {
    vi.resetModules();
    const { SiteFooter } = await import('@/components/app/marketing/site-footer');
    render(React.createElement(SiteFooter));

    expect(screen.getByRole('link', { name: 'Terms' })).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('button', { name: 'Cookie Preferences' })).toBeInTheDocument();
    // Copyright names the legal entity and the domain.
    expect(screen.getByText(/hce\.studio/)).toHaveTextContent('© 2026 Sunrise · hce.studio');
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

  it('attributes the copyright to NEXT_PUBLIC_LEGAL_NAME', async () => {
    vi.resetModules();
    vi.stubEnv('NEXT_PUBLIC_APP_NAME', 'ConQuest');
    vi.stubEnv('NEXT_PUBLIC_LEGAL_NAME', 'All Too Human Ltd');
    const { SiteFooter } = await import('@/components/app/marketing/site-footer');
    render(React.createElement(SiteFooter));

    const copyright = screen.getByText(/hce\.studio/);
    expect(copyright).toHaveTextContent('All Too Human Ltd');
    expect(copyright).not.toHaveTextContent('ConQuest');
  });
});
