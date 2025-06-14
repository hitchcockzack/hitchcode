import { Metadata } from 'next'
import BlogPageClient from './BlogPageClient'

// For dev environment, use localhost for Open Graph images to work
const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://hitchcode.com'
  : 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Blog - Zack Hitchcock | Full-Stack Developer',
  description: 'Thoughts, insights, and stories from the intersection of technology and creativity. Regular articles on web development, automation, and digital innovation.',
  authors: [{ name: 'Zack Hitchcock', url: 'https://hitchcode.com' }],
  creator: 'Zack Hitchcock',
  publisher: 'Zack Hitchcock',
  category: 'Technology',
  keywords: 'web development, programming, tech blog, automation, full-stack development, technology insights, coding tutorials, software engineering',

  // Core meta tags
  metadataBase: new URL(baseUrl),

  // Icons
  icons: {
    icon: `${baseUrl}/favicon.svg`,
    apple: `${baseUrl}/apple-touch-icon.png`
  },

  // Open Graph for Facebook and general social media
  openGraph: {
    title: 'Blog - Zack Hitchcock | Full-Stack Developer',
    description: 'Thoughts, insights, and stories from the intersection of technology and creativity. Regular articles on web development, automation, and digital innovation.',
    url: `${baseUrl}/blog`,
    siteName: 'hitchcode',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-blog-default.png`,
        width: 1200,
        height: 630,
        alt: 'Blog - Zack Hitchcock | Full-Stack Developer & Digital Architect',
        type: 'image/png'
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@hitchcode',
    creator: '@hitchcode',
    title: 'Blog - Zack Hitchcock | Full-Stack Developer',
    description: 'Thoughts, insights, and stories from the intersection of technology and creativity. Regular articles on web development, automation, and digital innovation.',
    images: [
      {
        url: `${baseUrl}/og-blog-default.png`,
        alt: 'Blog - Zack Hitchcock | Full-Stack Developer & Digital Architect',
        width: 1200,
        height: 630,
      }
    ],
  },

  // SEO and robots
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

  // Canonical URL
  alternates: {
    canonical: `${baseUrl}/blog`,
  },

  // Additional platform-specific and general meta tags
  other: {
    // Basic author info
    'author': 'Zack Hitchcock',

    // LinkedIn specific
    'linkedin:owner': 'Zack Hitchcock',

    // Facebook specific
    'fb:admins': 'Zack Hitchcock',

    // Additional Open Graph properties
    'og:site_name': 'hitchcode',
    'og:locale': 'en_US',
    'og:type': 'website',
    'og:title': 'Blog - Zack Hitchcock | Full-Stack Developer',
    'og:description': 'Thoughts, insights, and stories from the intersection of technology and creativity. Regular articles on web development, automation, and digital innovation.',
    'og:url': `${baseUrl}/blog`,
    'og:image': `${baseUrl}/og-blog-default.png`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/png',
    'og:image:alt': 'Blog - Zack Hitchcock | Full-Stack Developer & Digital Architect',

    // Twitter specific
    'twitter:card': 'summary_large_image',
    'twitter:site': '@hitchcode',
    'twitter:creator': '@hitchcode',
    'twitter:title': 'Blog - Zack Hitchcock | Full-Stack Developer',
    'twitter:description': 'Thoughts, insights, and stories from the intersection of technology and creativity. Regular articles on web development, automation, and digital innovation.',
    'twitter:image': `${baseUrl}/og-blog-default.png`,
    'twitter:image:alt': 'Blog - Zack Hitchcock | Full-Stack Developer & Digital Architect',

    // Theme and app related
    'theme-color': '#000000',
    'msapplication-TileColor': '#000000',
    'msapplication-TileImage': `${baseUrl}/apple-touch-icon.png`,

    // Content type and language
    'content-type': 'text/html; charset=utf-8',
    'content-language': 'en',

    // Cache control for social media crawlers
    'cache-control': 'public, max-age=31536000',
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}
