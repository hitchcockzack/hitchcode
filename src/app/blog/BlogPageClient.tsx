'use client';

import { useState, useEffect } from 'react';
import { client } from '@/lib/sanity'
import { postsQuery } from '@/lib/sanity.queries'
import { Post } from '@/lib/sanity.types'
import Link from 'next/link'
import { CalendarDays, Tag, ArrowRight, BookOpen, Clock } from 'lucide-react'
import { JetBrains_Mono, Inter } from 'next/font/google';
import { sendNotification } from '@/lib/notifications';

const jetbrains = JetBrains_Mono({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function BlogPageClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [playedIntro, setPlayedIntro] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts: Post[] = await client.fetch(postsQuery);
      setPosts(fetchedPosts);
    };

    fetchPosts();

    const timer = setTimeout(() => {
      setPlayedIntro(true);
    }, 500);

    // Intersection Observer for reveal animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    document.querySelectorAll('.reveal-item').forEach(item => {
      observer.observe(item);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Send notification when page is visited
  useEffect(() => {
    sendNotification('📝 Blog page visited');
  }, []);

  return (
    <div className={`min-h-screen w-full bg-black text-white flex flex-col ${inter.className}`}>
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Global accent lines */}
      <div className="fixed top-0 left-0 w-4 h-screen bg-gradient-to-b from-blue-600/30 via-purple-600/30 to-transparent z-0" />
      <div className="fixed top-0 right-0 w-4 h-screen bg-gradient-to-b from-transparent via-purple-600/30 to-blue-600/30 z-0" />

      {/* Floating gradient orbs */}
      <div className="fixed -top-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[100px] animate-pulse" />
      <div className="fixed -bottom-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transform transition-all duration-1000 ease-out ${playedIntro ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>

              <h1 className={`${jetbrains.className} text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight`}>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">The Blog</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Thoughts, insights, and stories from the intersection of technology and creativity.
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{posts.length} articles</span>
                </div>
                <div className="w-1 h-1 bg-gray-500 rounded-full" />
                <span>Regular updates</span>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="relative py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length > 0 ? (
              <div className="space-y-8">
                {posts.map((post, index) => (
                  <article
                    key={post._id}
                    className="reveal-item opacity-0 transition-all duration-700 translate-y-8 group"
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <Link href={`/blog/${post.slug.current}`}>
                      <div className="p-8 md:p-10 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:translate-y-[-4px] shadow-xl">
                        {/* Categories */}
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {post.categories.map((category) => (
                              <span
                                key={category._id}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 group-hover:text-blue-300 transition-all duration-300"
                              >
                                <Tag size={12} />
                                {category.title}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h2 className={`${jetbrains.className} text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 mb-4`}>
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                            {post.excerpt}
                          </p>
                        )}

                        {/* Meta Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
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
                          <div className="inline-flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                            Read article
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '200ms' }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-r from-gray-700 to-gray-600 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
                <p className="text-gray-400">Check back soon for new content!</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <style jsx global>{`
        .reveal-item {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 1s ease-out, transform 1s ease-out;
        }

        .reveal-item.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}
