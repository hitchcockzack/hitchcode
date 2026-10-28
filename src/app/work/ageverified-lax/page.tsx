import type { Metadata } from 'next'
import Link from 'next/link'

import page from '@/components/site/Page.module.css'
import { PRIMARY_CTA } from '@/content/site'
import styles from './case.module.css'

export const metadata: Metadata = {
  title: 'AgeVerified Lax · Case study',
  description:
    'AgeVerified Lax: one birth-certificate upload trusted by every role in youth lacrosse. Age verification, rosters, scheduling and event eligibility on one platform.',
  alternates: { canonical: '/work/ageverified-lax' },
}

// Roles and capabilities as published on ageverifiedlax.com/info.
const ROLES = [
  {
    role: 'Player / parent',
    does: 'Uploads a birth certificate once, sees schedules, gets team updates.',
  },
  {
    role: 'Coach',
    does: 'Builds rosters from verified players, schedules practices and games, messages the team.',
  },
  {
    role: 'Club director',
    does: 'Oversees every team and coach, assigns players, sees verification status across the club.',
  },
  {
    role: 'Event director',
    does: 'Sets up tournaments and checks eligibility at the door.',
  },
]

const BUILT = [
  'AgeLock verifier: machine-learning document checks on uploaded birth certificates',
  'Roster management with verification status on every player',
  'Scheduling for practices, games and tournaments',
  'CRM workflows, email automation and customer communications',
  'In-app payments',
]

/* Case study: the verified product, written as an operations story. */
export default function AgeVerifiedLaxCase() {
  return (
    <main id="main" className="hc-page">
      <section className={page.hero} aria-labelledby="case-title">
        <div className={page.heroInner}>
          <p className={page.kicker}>
            <Link href="/work" className={styles.back}>
              Work
            </Link>{' '}
            / Case study · Product
          </p>
          <h1 id="case-title" className={page.title}>
            AgeVerified Lax
          </h1>
          <p className={page.lede}>
            One upload, trusted by every role in youth lacrosse. A platform built and operated by Hitchcode&apos;s
            founder.
          </p>
          <dl className={page.facts}>
            <div>
              <dt>What</dt>
              <dd>Team management with age verification</dd>
            </div>
            <div>
              <dt>Who uses it</dt>
              <dd>Clubs, coaches, parents, event directors</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>Designed, built and run end to end</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                Live at{' '}
                <a href="https://ageverifiedlax.com/info" target="_blank" rel="noopener noreferrer" className={styles.inline}>
                  ageverifiedlax.com
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={page.sheet} aria-labelledby="problem-title">
        <div className={`${page.inner} ${styles.split}`}>
          <div>
            <p className={page.kickerDark}>01 · The problem</p>
            <h2 id="problem-title" className={page.h2}>
              Age divisions run on trust, and trust ran on paperwork.
            </h2>
          </div>
          <div className={page.prose}>
            <p>
              Youth lacrosse sorts players into age divisions. Checking ages meant birth certificates passed around by
              email, checked by hand, by different people, at different times: slow for clubs and easy to game.
            </p>
            <p>
              Every role needed the same fact, whether this player is eligible, and each one was getting it a different
              way.
            </p>
          </div>
        </div>
      </section>

      <section className={page.sheetAlt} aria-labelledby="system-title">
        <div className={page.inner}>
          <div className={page.head}>
            <div>
              <p className={page.kickerDark}>02 · The system</p>
              <h2 id="system-title" className={page.h2}>
                One action, recorded once, trusted everywhere.
              </h2>
            </div>
            <p className={page.intro}>
              When a parent uploads a birth certificate, the verifier checks it, coaches see a verified player, club
              directors can assign teams, and events confirm eligibility without asking again.
            </p>
          </div>

          <ol className={styles.roles}>
            {ROLES.map((item, i) => (
              <li key={item.role}>
                <span className={styles.roleNo}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.roleName}>{item.role}</span>
                <span className={styles.roleDoes}>{item.does}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={page.sheet} aria-labelledby="built-title">
        <div className={`${page.inner} ${styles.split}`}>
          <div>
            <p className={page.kickerDark}>03 · What was built</p>
            <h2 id="built-title" className={page.h2}>
              The whole stack, not a feature.
            </h2>
          </div>
          <div>
            <ul className={page.ticks}>
              {BUILT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={page.meta}>
              Bracket management and live scoring are listed as coming soon on the product site and are not described
              here as finished.
            </p>
          </div>
        </div>
      </section>

      <section className={page.ink} aria-labelledby="lesson-title">
        <div className={`${page.inner} ${styles.split}`}>
          <div>
            <p className={page.kicker}>04 · Why it matters to an operations business</p>
            <h2 id="lesson-title" className={page.h2}>
              Your job record is the birth certificate.
            </h2>
          </div>
          <div className={page.prose}>
            <p>
              Swap the birth certificate for a signed estimate and the roles for sales, the office, the field and the
              books, and it is the same problem: one fact, needed by everyone, re-entered by each of them.
            </p>
            <p>
              The fix is the same too. Record it once, check it once, and let every department read the same version.
            </p>
            <p>
              <Link href="/#operation" className={styles.inlineDark}>
                See it drawn for a contractor <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className={page.band} aria-labelledby="case-cta">
        <div className={page.inner}>
          <p className={page.kicker}>Next</p>
          <h2 id="case-cta" className={page.bandTitle}>
            What is your birth certificate?
          </h2>
          <div className={page.actions}>
            <Link href={PRIMARY_CTA.href} className={page.primary}>
              {PRIMARY_CTA.label} <span aria-hidden="true">→</span>
            </Link>
            <Link href="/work" className={page.secondary}>
              All work
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
