#!/usr/bin/env node
/**
 * Screenshot matrix for design review (PRD §11 viewports).
 *
 * Uses playwright-core with the locally installed Google Chrome, so no browser
 * download and no change to package.json. playwright-core is resolved from the
 * project if present, otherwise from QA_TOOLS_DIR (default ~/.cache/hitchcode-qa).
 *
 *   node scripts/qa/capture-screens.mjs --routes=/design-lab/a,/design-lab/b \
 *     --out=docs/redesign/screenshots/gate-2 [--base=http://localhost:3000] \
 *     [--viewports=1440x900,390x844] [--modes=settled,first,reduced,nojs] [--full]
 *
 * Modes:
 *   settled  JS on, waits for fonts + 2.4s of motion, then captures.
 *   first    JS on, captures right after DOMContentLoaded (first-frame check).
 *   reduced  prefers-reduced-motion: reduce.
 *   nojs     JavaScript disabled: the server-rendered state only.
 *
 * Reports console errors, page errors, failed requests, and horizontal overflow.
 */
import { createRequire } from 'node:module'
import { mkdirSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'

const require = createRequire(import.meta.url)

function loadPlaywright() {
  try {
    return require('playwright-core')
  } catch {
    const dir = process.env.QA_TOOLS_DIR || join(homedir(), '.cache', 'hitchcode-qa')
    return createRequire(join(dir, 'package.json'))('playwright-core')
  }
}

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, '').split('=')
    return [key, rest.length ? rest.join('=') : 'true']
  }),
)

const base = args.base || 'http://localhost:3000'
const routes = (args.routes || '/design-lab/a,/design-lab/b,/design-lab/c').split(',')
const outDir = resolve(args.out || 'docs/redesign/screenshots/gate-2')
const viewports = (args.viewports || '1440x900,1280x800,768x1024,390x844,320x720').split(',').map((v) => {
  const [width, height] = v.split('x').map(Number)
  return { width, height }
})
const modes = (args.modes || 'settled').split(',')
const fullPage = args.full === 'true'

// Review switcher and the Next.js dev indicator are not part of the design.
const HIDE_REVIEW_CHROME = '[data-lab-nav],nextjs-portal{display:none !important}'

const { chromium } = loadPlaywright()
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const report = []

for (const route of routes) {
  const slug = route.replace(/^\//, '').replace(/\//g, '-') || 'home'
  mkdirSync(join(outDir, slug), { recursive: true })

  for (const vp of viewports) {
    for (const mode of modes) {
      const mobile = vp.width < 768
      const context = await browser.newContext({
        viewport: vp,
        deviceScaleFactor: mobile ? 2 : 1,
        isMobile: mobile,
        hasTouch: mobile,
        reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference',
        javaScriptEnabled: mode !== 'nojs',
      })
      const page = await context.newPage()
      const problems = []
      const known = []
      page.on('console', (msg) => {
        if (msg.type() !== 'error') return
        // Resource failures are reported with their URL by the response listener below.
        if (msg.text().startsWith('Failed to load resource')) return
        problems.push(`console: ${msg.text().split('\n')[0]}`)
      })
      page.on('pageerror', (err) => problems.push(`pageerror: ${err.message.split('\n')[0]}`))
      page.on('response', (res) => {
        if (res.status() < 400) return
        const line = `http ${res.status()}: ${res.url()}`
        // Pre-existing: src/app/favicon.ico conflicts with public/favicon.ico (see docs/redesign/audit.md).
        if (res.url().endsWith('/favicon.ico')) known.push(line)
        else problems.push(line)
      })
      page.on('requestfailed', (req) => {
        const failure = req.failure()?.errorText || ''
        if (!failure.includes('ERR_ABORTED')) problems.push(`requestfailed: ${req.url()} ${failure}`)
      })

      await page.goto(base + route, { waitUntil: mode === 'first' ? 'domcontentloaded' : 'load' })
      // page.evaluate cannot run with JavaScript disabled, so nojs mode only waits and captures.
      const canEvaluate = mode !== 'nojs'
      if (mode !== 'first') {
        if (canEvaluate) await page.evaluate(() => document.fonts?.ready)
        await page.waitForTimeout(2400)
      }

      const overflow = canEvaluate
        ? await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
            scrollHeight: document.documentElement.scrollHeight,
          }))
        : { scrollWidth: 0, innerWidth: 0, scrollHeight: null }

      const file = join(outDir, slug, `${vp.width}x${vp.height}-${mode}${fullPage ? '-full' : ''}.png`)
      // Applied by the screenshot itself, so it works in every mode including nojs.
      await page.screenshot({ path: file, fullPage, style: HIDE_REVIEW_CHROME })

      report.push({
        route,
        viewport: `${vp.width}x${vp.height}`,
        mode,
        file,
        horizontalOverflow: overflow.scrollWidth > overflow.innerWidth,
        scrollHeight: overflow.scrollHeight,
        problems,
        known,
      })
      await context.close()
    }
  }
}

await browser.close()
writeFileSync(join(outDir, 'report.json'), JSON.stringify(report, null, 2))

for (const r of report) {
  const flags = [r.horizontalOverflow ? 'OVERFLOW-X' : null, r.problems.length ? `${r.problems.length} problem(s)` : null]
    .filter(Boolean)
    .join(', ')
  console.log(`${r.route} ${r.viewport} ${r.mode} h=${r.scrollHeight} ${flags || 'ok'}`)
  for (const p of r.problems) console.log(`   - ${p}`)
}
