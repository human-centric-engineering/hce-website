import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * HomePage — the hce.studio holding page.
 *
 * Bespoke single-scroll marketing page (hero -> what we're working on -> what we
 * believe -> get in touch). Rendered via a thin-shim re-export from
 * app/(public)/page.tsx; the chrome (header/footer/first-light hairline) comes
 * from app/(public)/layout.tsx. Styling lives in marketing.css on top of the
 * brand theme (app/brand-theme.css).
 *
 * Copy is British English, no em dashes. Deliberately directional: the
 * "working on" cards describe themes, never named projects, ventures or the
 * platform, and nothing links to source code. Nothing here is launched yet.
 */

const LINKEDIN_SIMON = 'https://www.linkedin.com/in/simondholmes/';
const LINKEDIN_JOHN = 'https://www.linkedin.com/in/johndurrant/';

const DESCRIPTION =
  'HCE is a human-centric venture studio building AI-native products with and for people.';

export const metadata: Metadata = {
  title: { absolute: 'HCE Studio · Human-Centric Engineering' },
  description: DESCRIPTION,
  openGraph: {
    title: 'HCE Studio · Human-Centric Engineering',
    description: DESCRIPTION,
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__inner">
          <p className="kicker">Human-Centric Engineering · Studio</p>
          <h1 className="hero__headline">Building what wasn’t possible a year ago.</h1>
          <p className="hero__subhead">
            HCE is a venture studio building AI-native products with and for people: our own
            ventures, joint ventures with domain experts, and platforms with partners. We move at AI
            speed without giving up craftsmanship.
          </p>
          <div className="cta-row">
            <Link href="/contact" className="cta cta--primary">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* What we're working on */}
      <section className="doing">
        <p className="section-label doing__label">What we’re working on</p>
        <div className="doing__grid">
          <article className="card">
            <p className="card__index">01 / Conversations</p>
            <h2 className="card__title">Conversations, not forms</h2>
            <p className="card__body">
              Replacing forms, scripts and fixed flows with real dialogue that understands what
              people mean, not just what they tick.
            </p>
          </article>

          <article className="card">
            <p className="card__index">02 / Expertise</p>
            <h2 className="card__title">Expertise, extended</h2>
            <p className="card__body">
              Turning what an expert knows into guided, personal experiences people can come back to
              any time.
            </p>
          </article>

          <article className="card">
            <p className="card__index">03 / Foundations</p>
            <h2 className="card__title">Production-ready from day one</h2>
            <p className="card__body">
              Everything we build runs on our own agentic platform, so an experiment can become a
              real product without starting again.
            </p>
          </article>
        </div>

        <div className="frontier">
          <span className="frontier__rule" aria-hidden="true" />
          <p className="frontier__text">
            Several things are in the studio right now. We’ll share more when they’re ready.
          </p>
        </div>
      </section>

      {/* What we believe */}
      <section className="believe">
        <div className="believe__header">
          <p className="section-label">What we believe</p>
          <a
            href="/whitepaper"
            target="_blank"
            rel="noopener noreferrer"
            className="whitepaper-link"
          >
            Read the whitepaper{' '}
            <span className="cta__arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
        <div className="believe__grid">
          <div className="belief">
            <p className="belief__index">01 / Change</p>
            <p className="belief__statement">
              Change is coming whether we like it or not and we can steer it if we embrace it.
            </p>
          </div>
          <div className="belief">
            <p className="belief__index">02 / Opportunity</p>
            <p className="belief__statement">
              Humanity can leverage AI to create better experiences and provide new value.
            </p>
          </div>
          <div className="belief">
            <p className="belief__index">03 / A better way</p>
            <p className="belief__statement">
              There’s a better, more human way to build products and run businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Get in touch */}
      <section className="contact-cta">
        <h2 className="contact-cta__heading">Got something that needs building?</h2>
        <p className="contact-cta__subhead">
          Bring us the problem and the know-how. We’ll build it with you.
        </p>
        <Link href="/contact" className="cta cta--primary cta--lg">
          Get in touch <span aria-hidden="true">→</span>
        </Link>
        <p className="founders">
          A studio by{' '}
          <a
            href={LINKEDIN_SIMON}
            target="_blank"
            rel="noopener noreferrer"
            className="founders__name"
          >
            Simon Holmes
          </a>{' '}
          &amp;{' '}
          <a
            href={LINKEDIN_JOHN}
            target="_blank"
            rel="noopener noreferrer"
            className="founders__name"
          >
            John Durrant
          </a>
          .
        </p>
      </section>
    </>
  );
}
