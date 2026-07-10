import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand';

const metaDescription =
  'How hce.studio collects, uses, shares and protects your personal data, and the rights you have under UK data protection law.';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: metaDescription,
  openGraph: { title: `Privacy Policy · ${BRAND.name}`, description: metaDescription },
};

// ---------------------------------------------------------------------------
// Company details — CONFIRM before publishing, and have a solicitor review the
// full policy. The legal entity name comes from NEXT_PUBLIC_LEGAL_NAME (BRAND.
// legalName, "All Too Human Ltd"); these are the remaining facts the code can't
// derive. Confirm the privacy@ mailbox exists and set LAST_UPDATED to the
// publish date.
// ---------------------------------------------------------------------------
const COMPANY = {
  registeredAddress: '15 Hawkins Grove, Church Crookham, Fleet, GU51 5TX',
  companyNumber: '15336127',
  privacyEmail: 'privacy@humancentricengineering.com',
} as const;

const LAST_UPDATED = '10 July 2026';

/**
 * Privacy Policy — hce.studio.
 *
 * UK GDPR / PECR-oriented policy grounded in what this Site actually collects: a
 * contact form (name/email/subject/message), server logs and cookies. No user
 * accounts, questionnaires or user-facing AI on this domain — so this is the
 * website version, adapted from the group's fuller ConQuest policy.
 *
 * Not legal advice — review with a solicitor before relying on it.
 *
 * Rendered via a thin-shim re-export from app/(public)/privacy/page.tsx.
 */
export default function PrivacyPage() {
  return (
    <section className="legal-page">
      <div className="legal-page__inner">
        <p className="kicker">Legal</p>
        <h1 className="legal-page__title">Privacy Policy</h1>
        <p className="legal-page__updated">Last updated: {LAST_UPDATED}</p>

        <div className="legal-prose">
          <h2>Who we are</h2>
          <p>
            The hce.studio website is operated by {BRAND.legalName} (“{BRAND.name}”, “we”, “us” or
            “our”), a company registered in England &amp; Wales (company number{' '}
            {COMPANY.companyNumber}) with its registered office at {COMPANY.registeredAddress}.
          </p>
          <p>
            For the purposes of UK data protection law — the UK General Data Protection Regulation
            (“UK GDPR”) and the Data Protection Act 2018 — we are the “data controller” for the
            personal data described in this policy.
          </p>

          <h2>The personal data we collect</h2>
          <h3>Messages you send us</h3>
          <p>
            When you contact us through the contact form, we collect your name, email address,
            subject and message so we can read and respond to your enquiry.
          </p>
          <h3>Technical and usage data</h3>
          <p>
            Like most websites, our servers automatically record technical information such as a
            timestamp, the pages requested, a signed visitor identifier (see{' '}
            <a href="#cookies">Cookies</a>), and diagnostic logs. We use this for security, to keep
            the Site running, and to understand usage in aggregate.
          </p>

          <h2>How we use your data and our lawful bases</h2>
          <p>Under UK GDPR we must have a lawful basis for processing your personal data:</p>
          <ul>
            <li>
              <strong>Consent</strong> — setting non-essential cookies. You can withdraw consent at
              any time.
            </li>
            <li>
              <strong>Legitimate interests</strong> — responding to enquiries you send us, securing
              the Site, preventing abuse, maintaining essential cookies, and improving the Site,
              where these interests are not overridden by your rights.
            </li>
            <li>
              <strong>Legal obligation</strong> — complying with the law, including responding to
              lawful requests and meeting our accountability duties.
            </li>
          </ul>

          <h2>Who we share your data with</h2>
          <p>
            We do not sell your personal data. We share it only with the categories of recipient
            needed to run the Site:
          </p>
          <ul>
            <li>
              <strong>Cloud hosting and infrastructure providers</strong> who store and serve the
              website.
            </li>
            <li>
              <strong>Email delivery providers</strong> who deliver the messages you send us through
              the contact form.
            </li>
            <li>
              <strong>Analytics or product-measurement providers</strong>, where you have consented
              to non-essential analytics.
            </li>
            <li>
              <strong>Professional advisers, authorities and acquirers</strong> — where required by
              law, to enforce our terms, or in connection with a business sale or reorganisation.
            </li>
          </ul>
          <p>
            We require our service providers to process personal data only on our instructions and
            to keep it secure. A current list of the specific providers we use is available on
            request from <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>.
          </p>

          <h2>International transfers</h2>
          <p>
            Some of our service providers may process personal data outside the UK. Where they do,
            we rely on appropriate safeguards recognised under UK data protection law — such as UK
            adequacy regulations or the International Data Transfer Agreement / Addendum to the EU
            Standard Contractual Clauses — so that your data remains protected.
          </p>

          <h2 id="cookies">Cookies and similar technologies</h2>
          <p>We use two categories of cookie and similar technology:</p>
          <ul>
            <li>
              <strong>Essential</strong> (always active) — needed for the Site to work, including
              security and remembering your theme preference. This includes a signed visitor
              identifier cookie used for security and aggregated, non-identifying analytics in our
              server logs; it contains no personal data and lasts around 180 days.
            </li>
            <li>
              <strong>Optional</strong> (consent required) — analytics and other non-essential
              cookies, set only if you agree.
            </li>
          </ul>
          <p>
            You can review and change your choices at any time using the{' '}
            <strong>Cookie Preferences</strong> link in the site footer.
          </p>

          <h2>How long we keep your data</h2>
          <p>
            We keep personal data only for as long as we need it. Messages you send us are retained
            until your enquiry has been dealt with and for a reasonable period afterwards, unless we
            need to keep them longer to meet a legal obligation. Diagnostic logs are kept for a
            limited period and then purged.
          </p>

          <h2>Your rights</h2>
          <p>Under UK GDPR you have the right to:</p>
          <ul>
            <li>access a copy of the personal data we hold about you;</li>
            <li>have inaccurate data corrected;</li>
            <li>have your data erased in certain circumstances;</li>
            <li>restrict or object to our processing in certain circumstances;</li>
            <li>receive certain data in a portable format; and</li>
            <li>withdraw consent where we rely on it.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{' '}
            <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>. We will respond
            within the time limits required by law.
          </p>
          <p>
            If you are unhappy with how we have handled your data, you can complain to the
            Information Commissioner’s Office (ICO) at{' '}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
              ico.org.uk
            </a>
            . We would, however, appreciate the chance to address your concerns first.
          </p>

          <h2>Children</h2>
          <p>
            This Site is not directed to children under 16, and we do not knowingly collect their
            personal data. If you believe a child has provided us with personal data, please contact
            us so we can remove it.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. When we do, we will revise the “Last
            updated” date above and, where the changes are significant, take reasonable steps to let
            you know.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have any questions about this Privacy Policy or how we handle your data, contact
            us at <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>, or write to
            us at {BRAND.legalName}, {COMPANY.registeredAddress}.
          </p>
        </div>
      </div>
    </section>
  );
}
