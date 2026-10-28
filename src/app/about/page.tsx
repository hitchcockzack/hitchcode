import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import page from '@/components/site/Page.module.css'
import { ENGAGEMENT_STEPS } from '@/content/engagement'
import { PRIMARY_CTA, SITE } from '@/content/site'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Hitchcode is Zack Hitchcock: carpenter, Army Airborne infantryman, construction project manager, then software engineer. You work directly with the person doing the engineering.',
  alternates: { canonical: '/about' },
}

const PATH = [
  { when: 'First', what: 'Carpenter', note: 'Every job starts with the problem, the right tools, and building something that lasts.' },
  { when: 'Then', what: 'Army, Airborne infantry', note: 'Precision, adaptability, and planning for things that cannot fail.' },
  {
    when: 'Then',
    what: 'Construction project manager',
    note: 'From the field to the office: a $3M+ school retrofit program with several crews working at once, run on screens and spreadsheets.',
  },
  { when: 'Then', what: 'Software engineer', note: 'Trained as an engineer to master the one tool construction never handed him.' },
  { when: 'Now', what: 'Hitchcode', note: 'Engineering the operations behind established businesses. Builder of AgeVerified Lax.' },
]

const PRINCIPLES = [
  { title: 'Fix the handoffs first.', body: 'Most friction lives between departments, not inside a tool. That is where we look first.' },
  { title: 'Leave alone what works.', body: 'Replacing software is expensive and disruptive. We connect before we rebuild.' },
  { title: 'A person stays on the money.', body: 'Automation handles the routine. Anything that touches customers or cash has a person on the exception.' },
  { title: 'Write it down.', body: 'Every decision, trade-off and approval is recorded, so the operation never depends on one memory again.' },
]

export default function AboutPage() {
  return (
    <main id="main" className="hc-page">
      <section className={page.hero} aria-labelledby="about-title">
        <div className={`${page.heroInner} ${styles.heroGrid}`}>
          <div>
            <p className={page.kicker}>About · The person doing the engineering</p>
            <h1 id="about-title" className={page.title}>
              Built by someone who has run the crews.
            </h1>
            <p className={page.lede}>
              Hitchcode is Zack Hitchcock. Before writing software he framed houses, served as an Airborne infantryman,
              and managed construction programs. You work with him directly: no account managers, no handoffs.
            </p>
          </div>
          <figure className={styles.portrait}>
            <Image
              src="/optimized/zack.webp"
              alt="Zack Hitchcock"
              width={256}
              height={256}
              sizes="(max-width: 899px) 180px, 256px"
              priority
            />
            <figcaption>Zack Hitchcock · Founder</figcaption>
          </figure>
        </div>
      </section>

      <section className={page.sheet} aria-labelledby="path-title">
        <div className={page.inner}>
          <div className={page.head}>
            <div>
              <p className={page.kickerDark}>The path</p>
              <h2 id="path-title" className={page.h2}>
                Field first, then the office, then the code.
              </h2>
            </div>
            <p className={page.intro}>
              The order matters. The problems Hitchcode solves were lived from the field side long before they were
              written in software.
            </p>
          </div>
          <ol className={styles.path}>
            {PATH.map((step) => (
              <li key={step.what}>
                <span className={styles.when}>{step.when}</span>
                <span className={styles.what}>{step.what}</span>
                <span className={styles.note}>{step.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={page.sheetAlt} aria-labelledby="principles-title">
        <div className={page.inner}>
          <div className={page.head}>
            <div>
              <p className={page.kickerDark}>Working principles</p>
              <h2 id="principles-title" className={page.h2}>
                Four rules the work follows.
              </h2>
            </div>
          </div>
          <ol className={styles.principles}>
            {PRINCIPLES.map((principle, i) => (
              <li key={principle.title}>
                <span className={styles.pNo}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.pTitle}>{principle.title}</span>
                <span className={styles.pBody}>{principle.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={page.ink} aria-labelledby="how-title">
        <div className={page.inner}>
          <div className={page.head}>
            <div>
              <p className={page.kicker}>How an engagement runs</p>
              <h2 id="how-title" className={page.h2}>
                Five sheets, in order.
              </h2>
            </div>
            <p className={page.intro}>Nothing is built before you approve the drawing.</p>
          </div>
          <ol className={page.steps}>
            {ENGAGEMENT_STEPS.map((step) => (
              <li key={step.no}>
                <span className={page.stepNo}>Sheet {step.no}</span>
                <span className={page.stepName}>{step.name}</span>
                <span className={page.stepBody}>{step.line}</span>
              </li>
            ))}
          </ol>
          <p className={styles.outside}>
            Outside work: Zack serves his community as a firefighter. Vito, a German Shepherd rescue, supervises.
          </p>
        </div>
      </section>

      <section className={page.band} aria-labelledby="about-cta">
        <div className={page.inner}>
          <p className={page.kicker}>Talk to Zack</p>
          <h2 id="about-cta" className={page.bandTitle}>
            Where is the work getting stuck?
          </h2>
          <div className={page.actions}>
            <Link href={PRIMARY_CTA.href} className={page.primary}>
              {PRIMARY_CTA.label} <span aria-hidden="true">→</span>
            </Link>
            <a href={`mailto:${SITE.email}`} className={page.secondary}>
              {SITE.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
