import { client } from '@/lib/sanity'
import { postQuery } from '@/lib/sanity.queries'
import { Post } from '@/lib/sanity.types'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, Tag } from 'lucide-react'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Custom components for Portable Text
const components = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-12 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 mt-10 leading-tight">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-900 pl-6 py-4 my-8 italic text-xl text-gray-600 bg-gray-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-lg text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-lg text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post: Post = await client.fetch(postQuery, { slug })

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category) => (
                <span
                  key={category._id}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
                >
                  <Tag size={14} />
                  {category.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-gray-500 border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div className="text-content">
            <PortableText value={post.body} components={components} />
          </div>
        </article>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors duration-200 font-medium group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Back to all posts
          </Link>
        </footer>
      </div>
    </div>
  )
}

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const posts: Post[] = await client.fetch(`*[_type == "post"]{ slug }`)

  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}
