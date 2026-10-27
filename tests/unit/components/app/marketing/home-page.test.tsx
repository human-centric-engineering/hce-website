// @vitest-environment happy-dom

/**
 * HomePage — the hce.studio holding page body.
 *
 * Covers the section content, internal/external links, and — importantly — a
 * regression guard that no project, venture or platform name appears in the
 * rendered output, and that nothing links to source code.
 *
 * @see components/app/marketing/home-page.tsx
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import HomePage from '@/components/app/marketing/home-page';

describe('HomePage', () => {
  it('renders the hero, three "working on" cards, and three beliefs', () => {
    const { container } = render(React.createElement(HomePage));

    // Structure, not exact copy — marketing prose is expected to change and
    // must not break CI. We assert the page renders its sections and the right
    // number of cards/beliefs, leaving wording free to evolve.
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(container.querySelectorAll('.card')).toHaveLength(3);
    expect(container.querySelectorAll('.belief')).toHaveLength(3);
  });

  it('never names projects, ventures or the platform', () => {
    const { container } = render(React.createElement(HomePage));

    for (const name of [/Sunrise/i, /Daybreak/i, /ConQuest/i, /Lelanea/i, /Outcomes/i]) {
      expect(container.textContent).not.toMatch(name);
    }
  });

  it('never links to source code', () => {
    const { container } = render(React.createElement(HomePage));

    container.querySelectorAll('a').forEach((link) => {
      const { hostname } = new URL(link.getAttribute('href') ?? '', 'https://hce.studio');
      expect(hostname === 'github.com' || hostname.endsWith('.github.com')).toBe(false);
    });
  });

  it('points the primary CTAs at /contact and the whitepaper link at /whitepaper', () => {
    render(React.createElement(HomePage));

    const getInTouch = screen.getAllByRole('link', { name: /Get in touch/i });
    expect(getInTouch.length).toBeGreaterThan(0);
    getInTouch.forEach((link) => expect(link).toHaveAttribute('href', '/contact'));

    expect(screen.getByRole('link', { name: /Read the whitepaper/i })).toHaveAttribute(
      'href',
      '/whitepaper'
    );
  });

  it('opens external links safely (target=_blank + rel noopener noreferrer)', () => {
    const { container } = render(React.createElement(HomePage));

    const external = container.querySelectorAll('a[target="_blank"]');
    expect(external.length).toBeGreaterThan(0);
    external.forEach((link) => {
      const rel = link.getAttribute('rel') ?? '';
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    });
  });

  it('links both founders to their LinkedIn profiles', () => {
    render(React.createElement(HomePage));

    expect(screen.getByRole('link', { name: 'Simon Holmes' }).getAttribute('href')).toContain(
      'linkedin.com'
    );
    expect(screen.getByRole('link', { name: 'John Durrant' }).getAttribute('href')).toContain(
      'linkedin.com'
    );
  });
});
