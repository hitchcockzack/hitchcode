import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  title: "HitchCode",
  description: "Crafting cutting-edge software solutions with precision and elegance.",
  icons: [
    {
      rel: 'icon',
      url: faviconDataUrl,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
