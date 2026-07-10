import type { Metadata } from 'next';
// app:chrome — hce-website renders bespoke holding-page chrome instead of the
// platform AppHeader/PublicFooter. Keep this block on upstream merges ("keep
// mine"); the swapped-in components live under components/app/marketing/.
import { MaintenanceWrapper } from '@/components/maintenance-wrapper';
import { SiteHeader } from '@/components/app/marketing/site-header';
import { SiteFooter } from '@/components/app/marketing/site-footer';
import { fontVariables } from '@/components/app/marketing/fonts';
import { BRAND } from '@/lib/brand';
import '@/components/app/marketing/marketing.css';

export const metadata: Metadata = {
  title: {
    template: `%s - ${BRAND.name}`,
    default: BRAND.name,
  },
  description:
    'A production-ready Next.js starter template designed for rapid application development',
};

/**
 * Public Layout
 *
 * Layout for public pages (landing, about, contact, etc.)
 * Includes shared header with branding, navigation, and user actions.
 *
 * Phase 3.5: Landing Page & Marketing
 * Phase 4.4: Added maintenance mode support
 */
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MaintenanceWrapper>
      <div className={`hce-site ${fontVariables} flex min-h-screen flex-col`}>
        <div className="first-light" aria-hidden="true" />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </MaintenanceWrapper>
  );
}
