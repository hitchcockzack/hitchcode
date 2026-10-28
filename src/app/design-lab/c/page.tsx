import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import Link from 'next/link'

import { plexMono } from '../_shared/mono'
import BlueprintReveal from './BlueprintReveal'
import { spaceGrotesk } from './fonts'
import styles from './blueprint.module.css'

export const metadata: Metadata = {
  title: 'C · The Living Blueprint · Design Lab',
}

const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/about', label: 'About' },
]

// Coordinate ticks on the 80px major grid, like the margin of a printed blueprint.
const COLUMNS = Array.from({ length: 26 }, (_, i) => String(i).padStart(2, '0'))
const ROWS = 'ABCDEFGHJKLMNP'.split('')

/*
  Study C — The Living Blueprint.
  The whole hero is a blueprint sheet, and the signature transformation is the
  hero artifact: the same job console, drafted on the left and running on the
  right, divided by a build line the visitor controls.
*/
export default function LivingBlueprintStudy() {
  return (
    <main className={`${styles.field} ${spaceGrotesk.variable} ${GeistSans.variable} ${plexMono.variable}`}>
      <div className={styles.ticksTop} aria-hidden="true">
        {COLUMNS.map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
      <div className={styles.ticksLeft} aria-hidden="true">
        {ROWS.map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>

      <header className={styles.bar}>
        <Link href="/design-lab/c" className={styles.brand}>
          <svg viewBox="0 0 20 20" width="20" height="20" className={styles.mark} aria-hidden="true">
            <rect x="1" y="1" width="18" height="18" fill="none" stroke="currentColor" strokeDasharray="2 2" />
            <path d="M1 19 L19 1" stroke="currentColor" />
            <rect x="1" y="11" width="8" height="8" fill="currentColor" />
          </svg>
          <span className={styles.wordmark}>hitchcode</span>
          <span className={styles.brandNote}>/ Operations engineering</span>
        </Link>

        <nav aria-label="Primary" className={styles.nav}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className={styles.barCta}>
          Discuss your operation
        </Link>

        <details className={styles.menu}>
          <summary>Menu</summary>
          <div className={styles.menuPanel}>
            {NAV.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact">Discuss your operation</Link>
          </div>
        </details>
      </header>

      <section className={styles.hero} aria-labelledby="blueprint-title">
        <div className={styles.copy}>
          <p className={styles.kicker}>
            <span className={styles.kickerMark} aria-hidden="true" />
            System study 001 · From plan to live system
          </p>

          <h1 id="blueprint-title" className={styles.title}>
            <span>You built the business.</span> <span>We engineer what runs it.</span>
          </h1>

          <p className={styles.lede}>
            We connect the software, workflows, and equipment behind established companies, and build what
            is missing. Less work between teams. More control over the operation.
          </p>

          <div className={styles.actions}>
            <Link href="/contact" className={styles.primary}>
              Discuss your operation
              <span aria-hidden="true">→</span>
            </Link>
            <a href="#system" className={styles.secondary}>
              Explore the systems
            </a>
          </div>
        </div>

        <BlueprintReveal />
      </section>

      <p className={styles.sheetMark} aria-hidden="true">
        <span>Sheet 1 of 1</span>
        <span>Rev A</span>
        <span>Hitchcode / Operations engineering</span>
      </p>
    </main>
  )
}
