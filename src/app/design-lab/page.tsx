import type { Metadata } from 'next'
import Link from 'next/link'

import { plexMono } from './_shared/mono'
import styles from './_shared/lab-index.module.css'

export const metadata: Metadata = {
  title: 'Design Lab · Hitchcode',
}

const STUDIES = [
  {
    href: '/design-lab/a',
    key: 'A',
    name: 'Technical Atelier',
    material: 'Ink room, paper drawing sheet',
    idea: 'The headline crosses onto a construction drawing and inverts. The operation is drawn as an exploded axonometric of four departments; the unconnected one is still a dashed plan.',
    type: 'Newsreader · Instrument Sans · IBM Plex Mono · Doto',
  },
  {
    href: '/design-lab/b',
    key: 'B',
    name: 'The Control Room',
    material: 'Dispatch desk, period terminal, scale model',
    idea: 'A CRT prints one job crossing six departments while a low-poly yard model reacts. The hardware keys are the real pause and step controls.',
    type: 'Archivo (width axis) · IBM Plex Mono · VT323 on screen only',
  },
  {
    href: '/design-lab/c',
    key: 'C',
    name: 'The Living Blueprint',
    material: 'Blueprint sheet, paper application',
    idea: 'The hero is the signature interaction: the same job console as a drawing and as working software, divided by a build line the visitor drags.',
    type: 'Space Grotesk · Geist · IBM Plex Mono',
  },
]

// Review index for Gate 2. Not linked from the public site and excluded from indexing.
export default function DesignLabIndex() {
  return (
    <main className={`${styles.page} ${plexMono.variable}`}>
      <header className={styles.head}>
        <p className={styles.label}>Hitchcode redesign · Gate 2 · Hero explorations</p>
        <h1 className={styles.title}>Three directions, one message.</h1>
        <p className={styles.note}>
          Every study uses the approved headline, subhead and calls to action, and the same synthetic job (J-2417,
          a fictional insulation contractor). All demo data is labelled as a concept demonstration.
        </p>
      </header>

      <ol className={styles.list}>
        {STUDIES.map((study) => (
          <li key={study.key} className={styles.item}>
            <Link href={study.href} className={styles.link}>
              <span className={styles.key}>{study.key}</span>
              <span className={styles.body}>
                <span className={styles.name}>{study.name}</span>
                <span className={styles.material}>{study.material}</span>
                <span className={styles.idea}>{study.idea}</span>
                <span className={styles.type}>{study.type}</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  )
}
