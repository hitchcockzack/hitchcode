import type { Metadata } from "next";
// import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import Header from "./components/Header";

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

export const metadata: Metadata = {
  title: "hitchcode",
  description: "The solution to all your problems.",
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
    title: 'hitchcode',
    description: 'The solution to all your problems.',
    images: [
      {
        url: '/og-blog-default.png',
        width: 1200,
        height: 630,
        alt: 'hitchcode',
      }
    ],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and Icons - Comprehensive Setup */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Open Graph Default Image */}
        <meta property="og:image" content="/og-blog-default.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="hitchcode" />

        {/* Preload critical resources */}
        <link rel="preload" href="/optimized/zack.webp" as="image" type="image/webp" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Resource hints for performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
