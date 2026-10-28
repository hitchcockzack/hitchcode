import type { Metadata } from 'next'
import Link from 'next/link'

import page from '@/components/site/Page.module.css'
import { PRIMARY_CTA } from '@/content/site'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected work by Hitchcode: AgeVerified Lax, the AI concierge running on this site, equipment connectivity, and the field operations background behind it.',
  alternates: { canonical: '/work' },
}

const EXHIBITS = [
  {
    no: '01',
    type: 'Product · built and operated by the founder',
    title: 'AgeVerified Lax',
    body: 'A team-management platform for youth lacrosse built around one action: a parent uploads a birth certificate once, and coaches, club directors and event organizers all see a verified player. Age verification, rosters, scheduling and tournament setup in one place.',
    href: '/work/ageverified-lax',
    cta: 'Read the case study',
  },
  {
    no: '02',
    type: 'Working system · running on this site',
    title: 'The AI concierge',
    body: 'Enter a phone number and an AI agent calls within seconds, asks about the operation, and emails a written recap. It records consent, limits abuse, stores every lead and call, and writes a summary a person can act on.',
    href: '/#concierge',
    cta: 'Have it call you',
  },
  {
    no: '03',
    type: 'Client work · name withheld',
    title: 'Audio monitoring controller',
    body: 'Audio control was spread across tools, which made monitoring messy and hard to trust. The fix was a software audio controller and multiplexer with deduplication and remote control built in.',
    href: '/capabilities#hardware',
    cta: 'Equipment connectivity',
  },
  {
    no: '04',
    type: 'Before Hitchcode · operating history',
    title: 'Field operations',
    body: 'Construction project management on a $3M+ school retrofit program with several crews working at the same time. Not software work, and not a Hitchcode project: it is where the handoff problems this practice fixes were learned first-hand.',
    href: '/about',
    cta: 'About Zack',
  },
]

/* Work index: editorial exhibits, each labelled with exactly what kind of work it is. */
export default function WorkPage() {
  return (
    <main id="main" className="hc-page">
      <section className={page.hero} aria-labelledby="work-title">
        <div className={page.heroInner}>
          <p className={page.kicker}>Work · Selected exhibits</p>
          <h1 id="work-title" className={page.title}>
            Systems that are running, labelled honestly.
          </h1>
          <p className={page.lede}>
            A short list on purpose. Each exhibit says exactly what it is: a product, a working system, client work, or
            operating history from before Hitchcode.
          </p>
        </div>
      </section>

      <section className={page.ink} aria-label="Exhibits">
        <div className={page.inner}>
          <ol className={page.rows}>
            {EXHIBITS.map((exhibit) => (
              <li key={exhibit.no} className={page.row}>
                <p className={page.rowNo}>
                  {exhibit.no}
                  <span className={page.rowType}>{exhibit.type}</span>
                </p>
                <div>
                  <h2 className={page.rowTitle}>{exhibit.title}</h2>
                </div>
                <div className={page.rowBody}>
                  <p>{exhibit.body}</p>
                  <p>
                    <Link href={exhibit.href}>
                      {exhibit.cta} <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={page.band} aria-labelledby="work-cta">
        <div className={page.inner}>
          <p className={page.kicker}>Your operation next</p>
          <h2 id="work-cta" className={page.bandTitle}>
            Where is the work getting stuck?
          </h2>
          <div className={page.actions}>
            <Link href={PRIMARY_CTA.href} className={page.primary}>
              {PRIMARY_CTA.label} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
