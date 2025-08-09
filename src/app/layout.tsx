import type { Metadata } from "next";
// import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono';
import "./globals.css";

import ConditionalHeader from "./components/ConditionalHeader";
// const geistSans = GeistSans;
// const geistMono = GeistMono;

const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Base circle -->
  <circle cx="32" cy="32" r="28" stroke="white" stroke-width="3" fill="none"/>

  <!-- Static triangles -->
  <path d="M32 8L36 19H28L32 10Z" fill="white"/>
  <path d="M32 8L36 19H28L32 8Z" fill="white" transform="rotate(120 32 32)"/>
  <path d="M32 8L36 19H28L32 8Z" fill="white" transform="rotate(240 32 32)"/>

  <!-- Static connecting lines -->
  <path d="M32 32L39.9 39.9" stroke="white" stroke-width="3"/>
  <path d="M32 32L39.9 39.9" stroke="white" stroke-width="3" transform="rotate(120 32 32)"/>
  <path d="M32 32L39.9 39.9" stroke="white" stroke-width="3" transform="rotate(240 32 32)"/>

  <!-- Center dot -->
  <circle cx="32" cy="32" r="4" fill="white"/>
</svg>
`

const faviconDataUrl = `data:image/svg+xml;base64,${Buffer.from(faviconSvg).toString('base64')}`

// For dev environment, use localhost for Open Graph images to work
const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://hitchcode.com'
  : 'http://localhost:3000'

export const metadata: Metadata = {
  title: "hitchcode - Full-Stack Developer & Digital Architect",
  description: "Zack Hitchcock - Full-Stack Developer & Digital Architect. Custom web applications, automation solutions, and technology consulting. Transform your business with innovative digital solutions.",
  authors: [{ name: 'Zack Hitchcock', url: 'https://hitchcode.com' }],
  creator: 'Zack Hitchcock',
  publisher: 'Zack Hitchcock',
  category: 'Technology',
  keywords: 'full-stack developer, web development, automation, digital architect, custom software, technology consulting, Zack Hitchcock',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: 'any'
      }
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    shortcut: '/favicon.ico'
  },
  openGraph: {
    title: 'hitchcode - Full-Stack Developer & Digital Architect',
    description: 'Zack Hitchcock - Full-Stack Developer & Digital Architect. Custom web applications, automation solutions, and technology consulting. Transform your business with innovative digital solutions.',
    url: baseUrl,
    siteName: 'hitchcode',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-blog-default.png`,
        width: 1200,
        height: 630,
        alt: 'hitchcode - Zack Hitchcock | Full-Stack Developer & Digital Architect',
        type: 'image/png'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hitchcode',
    creator: '@hitchcode',
    title: 'hitchcode - Full-Stack Developer & Digital Architect',
    description: 'Zack Hitchcock - Full-Stack Developer & Digital Architect. Custom web applications, automation solutions, and technology consulting.',
    images: {
      url: `${baseUrl}/og-blog-default.png`,
      alt: 'hitchcode - Zack Hitchcock | Full-Stack Developer & Digital Architect',
      width: 1200,
      height: 630,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Client component wrapper to read pathname and conditionally render overlay
  // We intentionally keep this inside the component to avoid SSR pathname use
  return (
    <html lang="en">
      <head>
        {/* Favicon and Icons - Comprehensive Setup */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Preload critical resources */}
        <link rel="preload" href="/optimized/zack.webp" as="image" type="image/webp" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Resource hints for performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        <ConditionalHeader />
        {children}
        {/* Hero overlay removed; the hero now embeds its own scene */}
      </body>
    </html>
  );
}
