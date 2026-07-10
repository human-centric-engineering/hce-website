import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * HomePage — the hce.studio holding page.
 *
 * Bespoke single-scroll marketing page (hero -> what we're doing now -> what we
 * believe -> get in touch). Rendered via a thin-shim re-export from
 * app/(public)/page.tsx; the chrome (header/footer/first-light hairline) comes
 * from app/(public)/layout.tsx. Styling lives in marketing.css on top of the
 * brand theme (app/brand-theme.css).
 *
 * Copy is British English, no em dashes. Confidentiality: item 03's framework is
 * internally "Daybreak" and is NEVER named publicly (described by capability
 * only); the partner venture is referred to only as "a partner venture".
 */

const SUNRISE_REPO = 'https://github.com/human-centric-engineering/sunrise';
const LINKEDIN_SIMON = 'https://www.linkedin.com/in/simondholmes/';
const LINKEDIN_JOHN = 'https://www.linkedin.com/in/johndurrant/';

export const metadata: Metadata = {
  title: { absolute: 'HCE Studio · Human-Centric Engineering' },
  description:
    'A human-centric engineering studio building agentic apps, websites, and tools on Sunrise, our open-sourced, production-ready foundation with AI orchestration built in.',
  openGraph: {
    title: 'HCE Studio · Human-Centric Engineering',
    description:
      'A human-centric engineering studio building agentic apps, websites, and tools on Sunrise, our open-sourced, production-ready foundation with AI orchestration built in.',
    type: 'website',
  },
};

/** GitHub octicon "mark-github" — fill inherits currentColor via CSS. */
function GitHubMark() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__inner">
          <p className="kicker">Human-Centric Engineering · Studio</p>
          <h1 className="hero__headline">Building experiences that weren’t possible a year ago.</h1>
          <p className="hero__subhead">
            HCE is a human-centric engineering studio. We build agentic apps, websites, and tools on{' '}
            <strong>Sunrise</strong>, our open-sourced, production-ready foundation with AI
            orchestration built in. We move at AI speed without giving up craftsmanship.
          </p>
          <div className="cta-row">
            <Link href="/contact" className="cta cta--primary">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
            <a
              href={SUNRISE_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="cta cta--secondary"
            >
              Explore Sunrise{' '}
              <span className="cta__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* What we're doing now */}
      <section className="doing">
        <p className="section-label doing__label">What we’re doing now</p>
        <div className="doing__grid">
          <article className="card">
            <p className="card__index">01 / Sunrise</p>
            <h2 className="card__title">The foundation</h2>
            <p className="card__body">
              Our open-source, production-ready base for agentic software. Agents, capabilities,
              knowledge, workflows, evaluation and governance, with orchestration built in.
            </p>
            <div className="card__action">
              <a href={SUNRISE_REPO} target="_blank" rel="noopener noreferrer" className="pill">
                <GitHubMark />
                Fork on GitHub
              </a>
            </div>
          </article>

          <article className="card">
            <p className="card__index">02 / ConQuest</p>
            <h2 className="card__title">Conversation, not forms</h2>
            <p className="card__body">
              A conversational questionnaire platform. A natural dialogue in place of form-filling.
              An agent extracts, infers and synthesises answers, with confidence and provenance.
            </p>
            <div className="card__action">
              <span className="chip">
                <span className="chip__dot" aria-hidden="true" />
                Coming soon
              </span>
            </div>
          </article>

          <article className="card">
            <p className="card__index">03 / Expert-led journeys</p>
            <h2 className="card__title">Guided, personal experiences</h2>
            <p className="card__body">
              A framework that turns the foundation’s primitives into guided, personalised,
              expert-led apps. First in genre, a coaching journey built with a partner venture.
            </p>
            <div className="card__action">
              <span className="chip">
                <span className="chip__dot" aria-hidden="true" />
                In development
              </span>
            </div>
          </article>
        </div>

        <div className="frontier">
          <span className="frontier__rule" aria-hidden="true" />
          <p className="frontier__text">
            We’re building things that weren’t possible a year ago, on a foundation that’s
            production-ready from day one. The possibilities on top of it are effectively endless.
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
            <p className="belief__index">01 / Human</p>
            <p className="belief__statement">Software engineering is a deeply human endeavour.</p>
          </div>
          <div className="belief">
            <p className="belief__index">02 / Symbiotic</p>
            <p className="belief__statement">Humans and AI, working symbiotically.</p>
          </div>
          <div className="belief">
            <p className="belief__index">03 / Craft</p>
            <p className="belief__statement">Fast iteration, without giving up craft.</p>
          </div>
        </div>
      </section>

      {/* Get in touch */}
      <section className="contact-cta">
        <h2 className="contact-cta__heading">Let’s build something.</h2>
        <p className="contact-cta__subhead">Have an idea? We’d like to hear from you.</p>
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
