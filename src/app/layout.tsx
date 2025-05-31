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
  icons: [
    {
      rel: 'icon',
      url: '/favicon.svg',
      type: 'image/svg+xml',
      sizes: 'any'
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
