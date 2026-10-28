import Link from 'next/link'

import { PRIMARY_CTA, PRIMARY_NAV, SITE } from '@/content/site'
import styles from './SiteFooter.module.css'

const MORE = [
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Writing' },
  { href: '/demos', label: 'Earlier prototypes' },
]

/* The footer is the drawing set's title block: who drew it, how to reach them, what is sample data. */
export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandBlock}>
          <p className={styles.wordmark}>{SITE.name}</p>
          <p className={styles.line}>
            Operations engineering for established businesses. We connect what exists, build what is missing, and
            stay accountable for how it runs.
          </p>
          <Link href={PRIMARY_CTA.href} className={styles.cta}>
            {PRIMARY_CTA.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <nav aria-label="Footer" className={styles.columns}>
          <div>
            <p className={styles.colHead}>The practice</p>
            <ul>
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={styles.colHead}>More</p>
            <ul>
              {MORE.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={styles.colHead}>Direct</p>
            <ul>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
              <li>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className={styles.strip}>
        <span>
          © {year} {SITE.name} · {SITE.founder}
        </span>
        <span>Demonstrations on this site use synthetic data</span>
        <a href="#main" className={styles.topLink}>
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
