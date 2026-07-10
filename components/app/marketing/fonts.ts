/**
 * Holding-page typefaces (fork-owned).
 *
 * The three families the hce.studio design calls for, loaded via `next/font/google`
 * so they self-host, subset, and avoid layout shift — no `<link>` to Google, no
 * edit to the platform `app/layout.tsx`. Each exposes a CSS variable; the marketing
 * layout applies `${display.variable} ${body.variable} ${mono.variable}` to its
 * wrapper, and `app/brand-theme.css` maps them onto the design's font tokens.
 *
 * Lives under `components/app/**` (not `lib/app/**`) because `next/font` is a
 * `next/*` import, which the `lib/app/**` framework-agnostic boundary forbids.
 *
 * Weights track the handoff spec:
 *   Newsreader     300/400/500/600 — display serif (headlines, section h2s, beliefs)
 *   Hanken Grotesk 400/500/600/700 — body / UI
 *   JetBrains Mono 400/500/600     — kickers, labels, chips, footer, toggle
 */
import { Newsreader, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';

export const display = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-display',
});

export const body = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
});

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono-brand',
});

/** Convenience: all three variable classes, space-joined, for a wrapper element. */
export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
