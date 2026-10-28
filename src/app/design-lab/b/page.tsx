import type { Metadata } from 'next'
import Link from 'next/link'

import { plexMono } from '../_shared/mono'
import ControlConsole from './ControlConsole'
import { archivo, vt323 } from './fonts'
import styles from './control-room.module.css'

export const metadata: Metadata = {
  title: 'B · The Control Room · Design Lab',
}

const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/about', label: 'About' },
]

/*
  Study B — The Control Room.
  A still life on a dispatch desk: a period terminal and a scale model of the yard,
  both reacting to one sample job. The hardware keys are the real demo controls,
  so the pause/step affordances are part of the object, not overlaid UI.
*/
export default function ControlRoomStudy() {
  return (
    <main className={`${styles.room} ${archivo.variable} ${vt323.variable} ${plexMono.variable}`}>
      <header className={styles.bar}>
        <Link href="/design-lab/b" className={styles.brand}>
          <span className={styles.nameplate}>Hitchcode</span>
          <span className={styles.brandNote}>Operations engineering</span>
        </Link>

        <nav aria-label="Primary" className={styles.nav}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <p className={styles.feed}>
          <span className={styles.feedLed} aria-hidden="true" />
          Sample feed
        </p>

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

      <section className={styles.hero} aria-labelledby="control-title">
        <div className={styles.copy}>
          <p className={styles.kicker}>
            <span>System study 001</span>
            <span aria-hidden="true">/</span>
            <span>The dispatch desk</span>
          </p>

          <h1 id="control-title" className={styles.title}>
            You built the business. <span className={styles.titleSecond}>We engineer what runs it.</span>
          </h1>

          <p className={styles.lede}>
            We connect the software, workflows, and equipment behind established companies, and build what
            is missing. Less work between teams. More control over the operation.
          </p>

          <div className={styles.actions}>
            <Link href="/contact" className={styles.primary}>
              Discuss your operation
            </Link>
            <a href="#console" className={styles.secondary}>
              Explore the systems
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <ControlConsole />
      </section>
    </main>
  )
}
