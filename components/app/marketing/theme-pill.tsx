'use client';

import { useTheme } from '@/hooks/use-theme';

/**
 * ThemePill — the holding page's theme toggle (design: pill + accent dot + mono
 * label reading the CURRENT theme).
 *
 * Drives Sunrise's native theme system (`useTheme` flips the `.dark` class on
 * <html>, persisted to localStorage, seeded no-flash by the root layout script).
 * The label is rendered as two spans shown/hidden via `.dark` CSS rather than
 * from the `theme` value, so server and client markup match (the provider seeds
 * `theme` from localStorage on the client only — reading it during render would
 * risk a hydration mismatch). The click handler reads `theme`, which is correct
 * once mounted.
 */
export function ThemePill() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-pill"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle colour theme"
    >
      <span className="theme-pill__dot" aria-hidden="true" />
      <span className="theme-pill__label">
        <span className="inline dark:hidden">Light</span>
        <span className="hidden dark:inline">Dark</span>
      </span>
    </button>
  );
}
