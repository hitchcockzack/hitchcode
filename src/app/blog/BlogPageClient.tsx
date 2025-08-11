'use client';

import { useState, useEffect } from 'react';
import { client } from '@/lib/sanity'
import { postsQuery } from '@/lib/sanity.queries'
import { Post } from '@/lib/sanity.types'
import Link from 'next/link'
import { CalendarDays, Tag, ArrowRight, BookOpen, Clock, PenTool } from 'lucide-react'
import { Inter } from 'next/font/google';
import { sendNotification } from '@/lib/notifications';
import { BlurFade } from '../../components/magicui/blur-fade'
import { MagicCard } from '../../components/magicui/magic-card'
import { ShineBorder } from '../../components/magicui/shine-border'
import { BorderBeam } from '../../components/magicui/border-beam'

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
    <main className={`min-h-screen bg-black text-zinc-300 ${inter.className}`}>
      {/* Hero – matches site dark style */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <BlurFade inView>
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                <PenTool className="w-8 h-8 text-blue-400" />
              </div>
            </BlurFade>
            <BlurFade delay={0.08} inView>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-[1.07] bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 to-zinc-500 drop-shadow-[0_0_18px_rgba(0,0,0,0.6)] pb-[10px] -mb-[10px]">
                The Blog
              </h1>
            </BlurFade>
            <BlurFade delay={0.14} inView>
              <p className="text-xl md:text-2xl text-zinc-300 mt-4 max-w-3xl mx-auto leading-relaxed">
                Thoughts, insights, and stories from the intersection of technology and creativity.
              </p>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <div className="mt-4 flex items-center justify-center gap-4 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{posts.length} articles</span>
                </div>
                <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                <span>Regular updates</span>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="relative py-16 md:py-20 border-t border-zinc-800">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          {posts.length > 0 ? (
            <div className="space-y-6 md:space-y-8">
              {posts.map((post, index) => (
                <article key={post._id} className="group">
                  <Link href={`/blog/${post.slug.current}`}>
                    <div className="relative overflow-hidden rounded-2xl bg-zinc-950/60 border border-zinc-800">
                      <ShineBorder borderWidth={1} duration={16} shineColor={["#2563eb","#a21caf","#60a5fa"]} className="opacity-[0.22]" />
                      <MagicCard className="rounded-2xl p-6 md:p-8">
                        {/* Categories */}
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.categories.map((category) => (
                              <span
                                key={category._id}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900/60 border border-zinc-800 text-zinc-300 group-hover:border-zinc-700"
                              >
                                <Tag size={12} className="text-zinc-400" />
                                {category.title}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 group-hover:text-blue-300 transition-colors duration-200 mb-3">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-zinc-400 leading-relaxed mb-6">
                            {post.excerpt}
                          </p>
                        )}

                        {/* Meta & Read link */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-zinc-500">
                            <CalendarDays size={16} />
                            <time dateTime={post.publishedAt}>
                              {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                          </div>
                          <div className="inline-flex items-center text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                            Read article
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </MagicCard>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-zinc-500" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-2">No posts yet</h3>
              <p className="text-zinc-500">Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 border-t border-zinc-800">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <BlurFade inView>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Stay Updated</h2>
            </BlurFade>
            <BlurFade delay={0.08} inView>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Want to be notified when I publish new articles? Get in touch and let me know what topics interest you most.
              </p>
            </BlurFade>
            <BlurFade delay={0.14} inView>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="relative inline-flex items-center justify-center p-[3px] rounded-full group">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#a21caf]" />
                  <span className="px-8 py-4 bg-black rounded-full text-white font-semibold relative transition-colors duration-200 group-hover:bg-transparent inline-flex items-center">Get In Touch<ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /></span>
                  <BorderBeam size={60} duration={7} className="via-white/40" />
                </Link>
                <Link href="/about" className="px-8 py-4 bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 text-zinc-200 rounded-lg font-semibold transition-all duration-200">Learn More About Me</Link>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
    </main>
  )
}
