/**
 * HomePage — the hce.studio holding page body.
 *
 * Covers the section content, internal/external links, and — importantly — a
 * regression guard that the confidential framework name ("Daybreak") and partner
 * venture ("Lelanea") never appear in the rendered output.
 *
 * @see components/app/marketing/home-page.tsx
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import HomePage from '@/components/app/marketing/home-page';

describe('HomePage', () => {
  it('renders the hero, three "doing now" cards, and three beliefs', () => {
    const { container } = render(React.createElement(HomePage));

    // Structure, not exact copy — marketing prose is expected to change and
    // must not break CI. We assert the page renders its sections and the right
    // number of cards/beliefs, leaving wording free to evolve.
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(container.querySelectorAll('.card')).toHaveLength(3);
    expect(container.querySelectorAll('.belief')).toHaveLength(3);
  });

  it('never leaks the confidential framework name or partner venture', () => {
    const { container } = render(React.createElement(HomePage));

    expect(container.textContent).not.toMatch(/Daybreak/i);
    expect(container.textContent).not.toMatch(/Lelanea/i);
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
    render(React.createElement(HomePage));

    const sunrise = screen.getByRole('link', { name: /Explore Sunrise/i });
    expect(sunrise).toHaveAttribute('target', '_blank');
    const rel = sunrise.getAttribute('rel') ?? '';
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
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
