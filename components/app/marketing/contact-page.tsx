import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/contact-form';

/**
 * ContactPage — bespoke, on-brand contact page for the holding site.
 *
 * Renders Sunrise's existing <ContactForm> (name/email/subject/message +
 * honeypot, posting to /api/v1/contact — validation, rate limit, DB write and
 * admin email notification all unchanged; destination inbox is env-configured).
 * We only re-skin the page around it. No email address / mailto in source, per
 * the design brief. The form's shadcn controls inherit the brand theme.
 *
 * Rendered via a thin-shim re-export from app/(public)/contact/page.tsx.
 */

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with HCE Studio. Tell us about your idea and we will get back to you.',
  openGraph: {
    title: 'Contact · HCE Studio',
    description:
      'Get in touch with HCE Studio. Tell us about your idea and we will get back to you.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <section className="contact-page">
      <div className="contact-page__inner">
        <p className="kicker">Contact</p>
        <h1 className="contact-page__heading">Let’s build something.</h1>
        <p className="contact-page__subhead">
          Tell us about your idea. We read every message and reply personally.
        </p>
        <div className="contact-page__card">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
