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

  // Use the current host (ngrok or production)
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://hitchcode.com'
    : process.env.NGROK_URL || 'https://hitchcode.com'

  const url = `${baseUrl}/blog/${post.slug.current}`
  const imageUrl = `${baseUrl}/og-blog-default.png`

  return {
    title,
    description,
    authors: [{ name: 'Zack Hitchcock', url: 'https://hitchcode.com' }],
    creator: 'Zack Hitchcock',
    publisher: 'Zack Hitchcock',
    category: 'Technology',
    keywords: post.categories?.map(cat => cat.title).join(', ') || 'web development, programming, tech',
    openGraph: {
      title,
      description,
      url,
      siteName: 'Zack Hitchcock - Full-Stack Developer',
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: ['Zack Hitchcock'],
      section: 'Technology',
      tags: post.categories?.map(cat => cat.title) || [],
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
    twitter: {
      card: 'summary_large_image',
      site: '@hitchcode',
      creator: '@hitchcode',
      title,
      description,
      images: {
        url: imageUrl,
        alt: `${post.title} - Blog post by Zack Hitchcock`,
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
      canonical: url,
    },
    other: {
      // Additional Facebook-specific tags
      'fb:app_id': '12345678', // Replace with your Facebook App ID if you have one
      'article:author': 'https://www.facebook.com/hitchcode', // Replace with your Facebook profile
      'article:published_time': post.publishedAt,
      'article:section': 'Technology',
      'article:tag': post.categories?.map(cat => cat.title).join(',') || '',
      // LinkedIn specific
      'linkedin:owner': 'Zack Hitchcock',
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
