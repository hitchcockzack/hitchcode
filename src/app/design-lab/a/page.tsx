import type { Metadata } from 'next'
import Link from 'next/link'

import { plexMono } from '../_shared/mono'
import AtelierSheet from './AtelierSheet'
import { doto, instrumentSans, newsreader } from './fonts'
import styles from './atelier.module.css'

export const metadata: Metadata = {
  title: 'A · Technical Atelier · Design Lab',
}

const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/about', label: 'About' },
]

/*
  Study A — Technical Atelier.
  The page is a drawing set on a dark studio table. The headline crosses from the
  room onto the sheet and inverts as it goes (mix-blend difference), so the type
  and the drawing read as one composed object rather than text beside a picture.
*/
export default function AtelierStudy() {
  return (
    <main
      className={`${styles.room} ${newsreader.variable} ${instrumentSans.variable} ${plexMono.variable} ${doto.variable}`}
    >
      <header className={styles.bar}>
        <Link href="/design-lab/a" className={styles.brand}>
          <span className={styles.wordmark}>Hitchcode</span>
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

      <section className={styles.hero} aria-labelledby="atelier-title">
        <p className={styles.kicker}>
          <span>System study 001</span>
          <span aria-hidden="true">—</span>
          <span>One job, drawn through the company</span>
        </p>

        <h1 id="atelier-title" className={styles.title}>
          <span className={styles.titleLine}>You built the business.</span>
          <span className={`${styles.titleLine} ${styles.titleIndent}`}>We engineer what runs it.</span>
        </h1>

        <p className={styles.lede}>
          We connect the software, workflows, and equipment behind established companies, and build what
          is missing. Less work between teams. More control over the operation.
        </p>

        <div className={styles.actions}>
          <Link href="/contact" className={styles.primary}>
            Discuss your operation
            <span aria-hidden="true" className={styles.arrow}>
              →
            </span>
          </Link>
          <a href="#sheet" className={styles.secondary}>
            Explore the systems
          </a>
        </div>

        <AtelierSheet />
      </section>
    </main>
  )
}
