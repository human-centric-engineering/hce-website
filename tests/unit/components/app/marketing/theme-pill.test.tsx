// @vitest-environment happy-dom

/**
 * ThemePill — the holding page's theme toggle.
 *
 * Verifies it drives Sunrise's native `useTheme` (flips light <-> dark) and that
 * both labels are always in the DOM (the design shows the current theme via CSS
 * `.dark` visibility, not by re-rendering from the `theme` value — which keeps
 * server and client markup identical and avoids a hydration mismatch).
 *
 * @see components/app/marketing/theme-pill.tsx
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { ThemePill } from '@/components/app/marketing/theme-pill';

// Mutable theme state shared with the mocked hook (hoisted above vi.mock).
const themeState = vi.hoisted((): { current: 'light' | 'dark' } => ({ current: 'light' }));
const setTheme = vi.hoisted(() => vi.fn());

vi.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({ theme: themeState.current, setTheme }),
}));

afterEach(() => {
  themeState.current = 'light';
  setTheme.mockClear();
});

describe('ThemePill', () => {
  it('renders a labelled toggle with both theme labels present for CSS to switch', () => {
    render(React.createElement(ThemePill));

    expect(screen.getByRole('button', { name: 'Toggle colour theme' })).toBeInTheDocument();
    // Both labels exist in the DOM; CSS shows the right one per `.dark`.
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('switches to dark when currently light', () => {
    themeState.current = 'light';
    render(React.createElement(ThemePill));

    fireEvent.click(screen.getByRole('button', { name: 'Toggle colour theme' }));

    expect(setTheme).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('switches to light when currently dark', () => {
    themeState.current = 'dark';
    render(React.createElement(ThemePill));

    fireEvent.click(screen.getByRole('button', { name: 'Toggle colour theme' }));

    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
