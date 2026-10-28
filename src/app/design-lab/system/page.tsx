import type { Metadata } from 'next'
import Link from 'next/link'

import JobReveal from '@/components/showroom/JobReveal'
import OperationMap from '@/components/showroom/OperationMap'
import { systemFontVariables } from '@/lib/fonts'
import styles from './system.module.css'

export const metadata: Metadata = {
  title: 'Gate 3 · System sheet · Design Lab',
}

const TYPE = [
  {
    role: 'Display',
    spec: 'Newsreader 400 · 44–110px · 0.98 · −0.032em',
    sample: 'We engineer what runs it.',
    className: 'display',
  },
  {
    role: 'Text',
    spec: 'Instrument Sans 400–600 · 16–19px · 1.55',
    sample: 'We connect the software, workflows, and equipment behind established companies.',
    className: 'text',
  },
  {
    role: 'Annotation',
    spec: 'IBM Plex Mono 500 · 10–11px · +0.1em · caps',
    sample: 'System study 001 · Sheet SS-001 · Scale NTS',
    className: 'annotation',
  },
  {
    role: 'Printed',
    spec: 'Doto, round dots · work orders only',
    sample: 'Work order J-2417 · crew 3',
    className: 'printed',
  },
] as const

const PENS = [
  { name: 'Ink', token: '--ink', hex: '#101413', use: 'Type, built lines, dark rooms' },
  { name: 'Paper', token: '--paper', hex: '#EDECE5', use: 'Light sections, type on ink' },
  { name: 'Sheet', token: '--sheet', hex: '#EFEDE6', use: 'Drawing sheets' },
  { name: 'Vellum', token: '--vellum', hex: '#F7F6F1', use: 'Built software, printed objects' },
  { name: 'Slate', token: '--slate', hex: '#707C79', use: 'Drafting lines, never small text' },
  { name: 'Slate text', token: '--slate-text', hex: '#56615F', use: 'Annotations on paper (AA)' },
  { name: 'Signal', token: '--signal', hex: '#EF875C', use: 'The active job, attention, the build line. Nothing else.' },
  { name: 'Blueprint', token: '--blueprint', hex: '#244D70', use: 'Drawn scenes only, never buttons' },
] as const

const MOTION = [
  { token: '--dur-press', value: '120ms', use: 'Key and button press' },
  { token: '--dur-inspect', value: '240ms', use: 'Selecting a department, dimming layers' },
  { token: '--dur-route', value: '700ms', use: 'A connection drawing in' },
  { token: '--stagger-route', value: '110ms', use: 'Next connection along the job’s path' },
  { token: '--stagger-status', value: '320ms', use: 'Status reaching the next department' },
  { token: '--dur-reveal', value: '900ms', use: 'Build line gliding to either end' },
  { token: '--dur-loop', value: '8s', use: 'Ambient loops; first frame starts mid-cycle' },
] as const

const SPACE = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128] as const

/*
  Gate 3 review sheet: the approved direction (A) as tokens and working components.
  Not a page design. The homepage is assembled from these pieces at Gate 4.
*/
export default function SystemSheet() {
  return (
    <main className={`${styles.page} ${systemFontVariables}`}>
      <header className={styles.bar}>
        <Link href="/design-lab" className={styles.brand}>
          <span className={styles.wordmark}>Hitchcode</span>
          <span className={styles.brandNote}>/ Operations engineering</span>
        </Link>
        <p className={styles.sheetNo}>System sheet 002 · Gate 3</p>
      </header>

      <section className={styles.intro} aria-labelledby="system-title">
        <p className={styles.kicker}>Gate 3 · System and signature interactions</p>
        <h1 id="system-title" className={styles.title}>
          The drawing set behind the showroom.
        </h1>
        <p className={styles.lede}>
          Direction A turned into tokens and working components. The connected operation and the plan-to-live
          reveal below are the real, reusable pieces the homepage will be assembled from.
        </p>
        <nav aria-label="On this sheet" className={styles.jump}>
          <a href="#tokens">Tokens</a>
          <a href="#operation">03 · Connected operation</a>
          <a href="#plan-to-live">05 · Plan to live system</a>
        </nav>
      </section>

      <section id="tokens" className={styles.sheet} aria-labelledby="tokens-title">
        <div className={styles.frame}>
          <div className={styles.sheetHead}>
            <p className={styles.kickerDark}>Tokens · src/styles/design-tokens.css</p>
            <h2 id="tokens-title" className={styles.h2}>
              Two families, a mono, and a short list of pens.
            </h2>
          </div>

          <div className={styles.specimens}>
            {TYPE.map((row) => (
              <div key={row.role} className={styles.specimen}>
                <p className={styles.specRole}>{row.role}</p>
                <p className={`${styles.specSample} ${styles[row.className]}`}>{row.sample}</p>
                <p className={styles.specMeta}>{row.spec}</p>
              </div>
            ))}
          </div>

          <ul className={styles.pens} aria-label="Color tokens">
            {PENS.map((pen) => (
              <li key={pen.token} className={styles.pen}>
                <span className={styles.chip} style={{ background: `var(${pen.token})` }} aria-hidden="true" />
                <span className={styles.penName}>{pen.name}</span>
                <span className={styles.penHex}>
                  {pen.hex} · {pen.token}
                </span>
                <span className={styles.penUse}>{pen.use}</span>
              </li>
            ))}
          </ul>

          <div className={styles.pair}>
            <div>
              <p className={styles.specRole}>Space · 4/8 primitives</p>
              <ol className={styles.space}>
                {SPACE.map((n) => (
                  <li key={n}>
                    <span style={{ width: n }} aria-hidden="true" />
                    {n}
                  </li>
                ))}
              </ol>
              <p className={styles.specMeta}>
                Sections vary on purpose: quiet 96–180, standard 72–128, tight 48–80. Page pad 20–48, gutter 16–24,
                12 columns.
              </p>
            </div>
            <div>
              <p className={styles.specRole}>Motion · nothing bounces</p>
              <table className={styles.motion}>
                <tbody>
                  {MOTION.map((m) => (
                    <tr key={m.token}>
                      <th scope="row">{m.token}</th>
                      <td>{m.value}</td>
                      <td>{m.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={styles.specMeta}>
                Drafting ease (0.65, 0, 0.35, 1) for things being drawn; settle ease (0.22, 1, 0.36, 1) for response.
                Reduced motion collapses every duration and keeps every control.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="operation" className={styles.sheet}>
        <div className={styles.frame}>
          <OperationMap />
        </div>
      </section>

      <section id="plan-to-live" className={styles.sheet} aria-labelledby="reveal-title">
        <div className={styles.frame}>
          <div className={styles.revealHead}>
            <p className={styles.kickerDark}>05 · From plan to live system</p>
            <h2 id="reveal-title" className={styles.h2}>
              The same console, drawn and running.
            </h2>
            <p className={styles.revealLede}>
              Every field the drawing promises, the working system fills. Drag the build line across, or switch to the
              live system and watch the job run to an approved invoice.
            </p>
          </div>
          <JobReveal id="system" />
        </div>
      </section>

      <footer className={styles.footer}>
        <span>Sheet 002 of the Hitchcode drawing set</span>
        <span>All demo data is synthetic</span>
      </footer>
    </main>
  )
}
