'use client';

import { useState, useEffect } from 'react';
import { client } from '@/lib/sanity'
import { postsQuery } from '@/lib/sanity.queries'
import { Post } from '@/lib/sanity.types'
import Link from 'next/link'
import { CalendarDays, Tag, ArrowRight, BookOpen, Clock, PenTool } from 'lucide-react'
import { Inter } from 'next/font/google';
import { sendNotification } from '@/lib/notifications';

const inter = Inter({ subsets: ['latin'] });

// Scroll reveal hook for smooth animations
const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)
    document.querySelectorAll('.reveal-on-scroll').forEach(item => {
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])
}

export default function BlogPageClient() {
  const [posts, setPosts] = useState<Post[]>([]);

  useScrollReveal();

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts: Post[] = await client.fetch(postsQuery);
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  // Send notification when page is visited - debounced
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      sendNotification('📝 Blog page visited');
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`min-h-screen bg-white ${inter.className}`}>
      {/* Hero Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 mb-8">
              <div className="w-16 h-16 mx-auto mb-8 rounded-xl bg-blue-50 flex items-center justify-center">
                <PenTool className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            {/* Main headline */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 mb-8" style={{ transitionDelay: '200ms' }}>
              <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
                The Blog
              </h1>

              <p className="text-xl md:text-2xl text-zinc-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Thoughts, insights, and stories from the intersection of technology and creativity.
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{posts.length} articles</span>
                </div>
                <div className="w-1 h-1 bg-zinc-300 rounded-full" />
                <span>Regular updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="relative py-24 bg-zinc-50/50 border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {posts.length > 0 ? (
              <div className="space-y-8">
                {posts.map((post, index) => (
                  <article
                    key={post._id}
                    className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 group"
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <Link href={`/blog/${post.slug.current}`}>
                      <div className="p-8 md:p-10 bg-white border border-zinc-200 rounded-xl hover:border-zinc-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                        {/* Categories */}
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {post.categories.map((category) => (
                              <span
                                key={category._id}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-zinc-50 border border-zinc-200 text-zinc-600 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-700 transition-all duration-200"
                              >
                                <Tag size={12} />
                                {category.title}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 group-hover:text-blue-600 transition-colors duration-200 mb-4">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-zinc-700 leading-relaxed mb-6 text-lg">
                            {post.excerpt}
                          </p>
                        )}

                        {/* Meta Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-zinc-500">
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
                          <div className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                            Read article
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '200ms' }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">No posts yet</h3>
                <p className="text-zinc-600">Check back soon for new content!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 bg-white border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '100ms' }}>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                Stay Updated
              </h2>
              <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                Want to be notified when I publish new articles? Get in touch and let me know what topics interest you most.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md inline-flex items-center justify-center group"
                  prefetch={true}
                >
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-900 rounded-lg font-semibold transition-all duration-200"
                  prefetch={true}
                >
                  Learn More About Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Focus styles for accessibility */
        .focus-visible:focus {
          outline: 2px solid #3A5AFF;
          outline-offset: 2px;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .transition-all,
          .transition-colors,
          .transition-transform {
            transition: none;
          }

          .animate-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
