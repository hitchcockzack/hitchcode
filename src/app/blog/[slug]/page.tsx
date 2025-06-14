import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { Post } from '@/lib/sanity.types'
import BlogPostClient from './BlogPostClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    categories[]->{
      _id,
      title,
      slug
    }
  }`

  return await client.fetch(query, { slug })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found - Zack Hitchcock'
    }
  }

  const title = `${post.title} - Zack Hitchcock`
  const description = post.excerpt || `Read "${post.title}" by Zack Hitchcock - Full-Stack Developer & Digital Architect`

  // For dev environment, use localhost for Open Graph images to work
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://hitchcode.com'
    : 'http://localhost:3000'

  const url = `${baseUrl}/blog/${post.slug.current}`
  const imageUrl = `${baseUrl}/og-blog-default.png`
  const faviconUrl = `${baseUrl}/favicon.svg`

  return {
    title,
    description,
    authors: [{ name: 'Zack Hitchcock', url: 'https://hitchcode.com' }],
    creator: 'Zack Hitchcock',
    publisher: 'Zack Hitchcock',
    category: 'Technology',
    keywords: post.categories?.map(cat => cat.title).join(', ') || 'web development, programming, tech, automation, full-stack',

    // Core meta tags
    metadataBase: new URL(baseUrl),

    // Icons
    icons: {
      icon: faviconUrl,
      apple: `${baseUrl}/apple-touch-icon.png`
    },

    // Open Graph for Facebook and general social media
    openGraph: {
      title,
      description,
      url,
      siteName: 'hitchcode',
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: ['Zack Hitchcock'],
      section: 'Technology',
      tags: post.categories?.map(cat => cat.title) || ['Technology', 'Web Development', 'Automation'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${post.title} - Blog post by Zack Hitchcock`,
          type: 'image/png'
        }
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: '@hitchcode',
      creator: '@hitchcode',
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: `${post.title} - Blog post by Zack Hitchcock`,
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
      canonical: url,
    },

    // Additional platform-specific and general meta tags
    other: {
      // Basic article info
      'author': 'Zack Hitchcock',
      'article:author': 'Zack Hitchcock',
      'article:published_time': post.publishedAt,
      'article:modified_time': post.publishedAt,
      'article:section': 'Technology',
      'article:tag': post.categories?.map(cat => cat.title).join(',') || 'Technology,Programming,Automation',

      // LinkedIn specific
      'linkedin:owner': 'Zack Hitchcock',

      // Facebook specific
      'fb:admins': 'Zack Hitchcock',

      // Additional Open Graph properties
      'og:site_name': 'hitchcode',
      'og:locale': 'en_US',
      'og:type': 'article',
      'og:title': title,
      'og:description': description,
      'og:url': url,
      'og:image': imageUrl,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:type': 'image/png',
      'og:image:alt': `${post.title} - Blog post by Zack Hitchcock`,

      // Twitter specific
      'twitter:card': 'summary_large_image',
      'twitter:site': '@hitchcode',
      'twitter:creator': '@hitchcode',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': imageUrl,
      'twitter:image:alt': `${post.title} - Blog post by Zack Hitchcock`,

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
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}
