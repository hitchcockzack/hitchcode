import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'
import '@/styles/design-tokens.css'
import '@/styles/site.css'
import { siteFontVariables } from '@/lib/fonts'
import { SITE } from '@/content/site'
import ConditionalFooter from './components/ConditionalFooter'
import ConditionalHeader from './components/ConditionalHeader'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.founder, url: SITE.url }],
  creator: SITE.founder,
  publisher: SITE.name,
  category: 'Business',
  keywords: [
    'operations engineering',
    'systems integration',
    'fractional CTO',
    'custom software',
    'AI workflows',
    'managed operations',
    'contractor software',
    'home improvement operations',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE.name,
    title: `${SITE.name} · ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.ogAlt, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hitchcode',
    creator: '@hitchcode',
    title: `${SITE.name} · ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: SITE.ogImage, alt: SITE.ogAlt, width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#101413',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={siteFontVariables}>
      {/* Geist stays on <body> for the blog and legacy pages; redesigned pages set their own families from tokens. */}
      <body className={`${GeistSans.className} antialiased`}>
        <a href="#main" className="hc-skip">
          Skip to content
        </a>
        <ConditionalHeader />
        {children}
        <ConditionalFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
