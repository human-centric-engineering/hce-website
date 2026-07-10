import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand';

const metaDescription =
  'The terms for using the hce.studio website — acceptable use, intellectual property, disclaimers and our liability.';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: metaDescription,
  openGraph: { title: `Terms of Use · ${BRAND.name}`, description: metaDescription },
};

// ---------------------------------------------------------------------------
// Company details — CONFIRM before publishing, and have a solicitor review the
// full terms. The legal entity name comes from NEXT_PUBLIC_LEGAL_NAME (BRAND.
// legalName, "All Too Human Ltd"); these are the remaining facts the code can't
// derive. Confirm the legal@ mailbox exists and set LAST_UPDATED to the publish
// date.
// ---------------------------------------------------------------------------
const COMPANY = {
  registeredAddress: '15 Hawkins Grove, Church Crookham, Fleet, GU51 5TX',
  companyNumber: '15336127',
  legalEmail: 'legal@hce.studio',
} as const;

const LAST_UPDATED = '10 July 2026';

/**
 * Terms of Use — hce.studio.
 *
 * England & Wales terms for the HCE Studio website: a marketing/holding site
 * with a contact form. No user accounts, no paid service, no user-facing product
 * on this domain yet — so this is website terms of use, adapted from the group's
 * ConQuest terms rather than the fuller SaaS version.
 *
 * Not legal advice — review with a solicitor before relying on it.
 *
 * Rendered via a thin-shim re-export from app/(public)/terms/page.tsx.
 */
export default function TermsPage() {
  return (
    <section className="legal-page">
      <div className="legal-page__inner">
        <p className="kicker">Legal</p>
        <h1 className="legal-page__title">Terms of Use</h1>
        <p className="legal-page__updated">Last updated: {LAST_UPDATED}</p>

        <div className="legal-prose">
          <h2>Agreement to these terms</h2>
          <p>
            These Terms of Use (“Terms”) are a legal agreement between you and {BRAND.legalName}, a
            company registered in England &amp; Wales (company number {COMPANY.companyNumber}) with
            its registered office at {COMPANY.registeredAddress} (“{BRAND.name}”, “we”, “us” or
            “our”). By accessing or using the hce.studio website (the “Site”), you agree to these
            Terms. If you do not agree, please do not use the Site.
          </p>
          <p>
            How we handle your personal data is explained in our{' '}
            <a href="/privacy">Privacy Policy</a>.
          </p>

          <h2>About this website</h2>
          <p>
            {BRAND.name} is a human-centric engineering studio. This Site presents the studio and
            our work, and lets you get in touch with us. It is an evolving website: its content and
            the pages available may change, be added to, or be removed over time, and availability
            is not guaranteed.
          </p>

          <h2>Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>break the law, or infringe the rights of others, when using the Site;</li>
            <li>
              submit content through our contact form that is unlawful, harmful, defamatory,
              infringing, or that you have no right to share;
            </li>
            <li>
              attempt to gain unauthorised access to the Site or our systems, or interfere with
              their security or operation;
            </li>
            <li>
              introduce malware, scrape, overload, or place excessive automated demands on the Site;
              or
            </li>
            <li>use the contact form to send spam or unsolicited commercial communications.</li>
          </ul>

          <h2>Intellectual property</h2>
          <p>
            The Site, including its content, design and branding, is owned by us or our licensors
            and is protected by intellectual property laws. The name “{BRAND.name}”, “Human-Centric
            Engineering” and our logos are our trade marks and may not be used without our
            permission. This Site is built on Sunrise, our open-source foundation, which is licensed
            under its own terms; other third-party and open-source components are licensed under
            their respective licences.
          </p>

          <h2>External links</h2>
          <p>
            The Site links to third-party websites (for example our source code on GitHub and our
            profiles on LinkedIn). We provide these links for convenience and are not responsible
            for the content, policies or availability of sites we do not control.
          </p>

          <h2>Availability and changes</h2>
          <p>
            We aim to keep the Site available but do not guarantee that it will be uninterrupted,
            error-free or secure. We may modify, suspend or discontinue all or part of the Site at
            any time, including during maintenance.
          </p>

          <h2>Disclaimers</h2>
          <p>
            The Site is provided “as is” and “as available”. To the fullest extent permitted by law,
            we exclude all implied warranties, conditions and terms. Nothing in these Terms affects
            your statutory rights as a consumer that cannot be excluded under the law of England
            &amp; Wales.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            Nothing in these Terms limits or excludes our liability for death or personal injury
            caused by our negligence, for fraud or fraudulent misrepresentation, or for any other
            liability that cannot be limited or excluded by law.
          </p>
          <p>
            Subject to the above, we are not liable for loss of profits, loss of business, loss of
            goodwill, loss of data, or any indirect or consequential loss arising out of or in
            connection with your use of the Site, and our total liability to you is limited to £100.
            The Site is provided free of charge.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these Terms from time to time. When we do, we will revise the “Last
            updated” date above. Your continued use of the Site after changes take effect means you
            accept the updated Terms.
          </p>

          <h2>Governing law</h2>
          <p>
            These Terms, and any dispute arising out of or in connection with them or the Site, are
            governed by the law of England &amp; Wales and are subject to the exclusive jurisdiction
            of the courts of England &amp; Wales. If you are a consumer, you may also benefit from
            any mandatory protections of the law of the country in which you live.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have any questions about these Terms, contact us at{' '}
            <a href={`mailto:${COMPANY.legalEmail}`}>{COMPANY.legalEmail}</a>, or write to us at{' '}
            {BRAND.legalName}, {COMPANY.registeredAddress}.
          </p>
        </div>
      </div>
    </section>
  );
}
