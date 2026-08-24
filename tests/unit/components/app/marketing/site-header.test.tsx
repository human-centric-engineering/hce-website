// @vitest-environment happy-dom

/**
 * SiteHeader — bespoke holding-page header.
 *
 * Verifies the home-linked themed wordmark (both light/dark variants rendered,
 * swapped via CSS), the theme toggle, and — the point of the holding-phase
 * chrome — that NO auth (login/signup) UI is present.
 *
 * @see components/app/marketing/site-header.tsx
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { SiteHeader } from '@/components/app/marketing/site-header';

// ThemePill (rendered by the header) consumes the theme hook.
vi.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

describe('SiteHeader', () => {
  it('links the wordmark home and renders both theme variants', () => {
    const { container } = render(React.createElement(SiteHeader));

    expect(screen.getByRole('link', { name: 'Sunrise home' })).toHaveAttribute('href', '/');

    const srcs = Array.from(container.querySelectorAll('img')).map((img) =>
      img.getAttribute('src')
    );
    expect(srcs.some((s) => s?.includes('wordmark-ink'))).toBe(true);
    expect(srcs.some((s) => s?.includes('wordmark-paper'))).toBe(true);
  });

  it('renders the theme toggle', () => {
    render(React.createElement(SiteHeader));
    expect(screen.getByRole('button', { name: 'Toggle colour theme' })).toBeInTheDocument();
  });

  it('surfaces no auth (login/signup) UI during the holding phase', () => {
    render(React.createElement(SiteHeader));

    expect(screen.queryByRole('link', { name: /log ?in|sign ?up|sign ?in/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /log ?in|sign ?up|sign ?in/i })).toBeNull();
  });
});
