import Link from 'next/link'

import page from '@/components/site/Page.module.css'
import { PRIMARY_NAV } from '@/content/site'

/* 404: a sheet missing from the drawing set. */
export default function NotFound() {
  return (
    <main id="main" className="hc-page">
      <section className={page.hero} aria-labelledby="nf-title">
        <div className={page.heroInner}>
          <p className={page.kicker}>Sheet not found · 404</p>
          <h1 id="nf-title" className={page.title}>
            This sheet is not in the set.
          </h1>
          <p className={page.lede}>The page may have moved when the site was redrawn. These are the sheets that exist:</p>
          <div className={page.actions}>
            <Link href="/" className={page.primary}>
              Back to sheet 001 <span aria-hidden="true">→</span>
            </Link>
            {PRIMARY_NAV.map((item) => (
              <Link key={item.href} href={item.href} className={page.secondary}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
