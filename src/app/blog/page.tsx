import { client } from '@/lib/sanity'
import { postsQuery } from '@/lib/sanity.queries'
import { Post } from '@/lib/sanity.types'
import Link from 'next/link'
import { CalendarDays, Tag } from 'lucide-react'

export default async function BlogPage() {
  const posts: Post[] = await client.fetch(postsQuery)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6">
            The Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Thoughts, insights, and stories from the intersection of technology and creativity.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid gap-8 md:gap-12">
            {posts.map((post, index) => (
              <article
                key={post._id}
                className={`group cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <Link href={`/blog/${post.slug.current}`}>
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className="p-8 md:p-10">
                      {/* Categories */}
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.categories.map((category) => (
                            <span
                              key={category._id}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300"
                            >
                              <Tag size={12} />
                              {category.title}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className={`font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 mb-4 ${
                        index === 0 ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-2xl md:text-3xl'
                      }`}>
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className={`text-gray-600 leading-relaxed mb-6 ${
                          index === 0 ? 'text-lg md:text-xl' : 'text-base md:text-lg'
                        }`}>
                          {post.excerpt}
                        </p>
                      )}

                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDays size={16} />
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>

                      {/* Read More */}
                      <div className="mt-6">
                        <span className="inline-flex items-center text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                          Read article
                          <svg
                            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              📝
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  )
}
