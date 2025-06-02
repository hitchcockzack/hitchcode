'use client';

import { useState, useEffect } from 'react';
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Head from 'next/head'
import { Post } from '@/lib/sanity.types'
import { CalendarDays, Tag, ArrowLeft, Clock, User, Share2, Facebook, Linkedin, Twitter } from 'lucide-react'
import { JetBrains_Mono, Inter } from 'next/font/google';
import { sendNotification } from '@/lib/notifications';

const jetbrains = JetBrains_Mono({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

interface BlogPostClientProps {
  post: Post
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [playedIntro, setPlayedIntro] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Set current URL for sharing
    setCurrentUrl(window.location.href);

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
    if (post) {
      sendNotification(`📖 Blog post "${post.title}" viewed`);
    }
  }, [post]);

  const handleShare = async (platform: string) => {
    if (!post) return;

    const shareUrl = currentUrl;
    const shareTitle = post.title;
    const shareText = post.excerpt || post.title;

    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'width=600,height=400'
        );
        sendNotification('📱 Shared on Facebook');
        break;

      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
          '_blank',
          'width=600,height=400'
        );
        sendNotification('🐦 Shared on Twitter');
        break;

      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'width=600,height=400'
        );
        sendNotification('💼 Shared on LinkedIn');
        break;

      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({
              title: shareTitle,
              text: shareText,
              url: shareUrl,
            });
            sendNotification('📤 Shared via native menu');
          } catch (error) {
            // User cancelled sharing or error occurred
            console.log('Share cancelled or failed');
          }
        } else {
          // Fallback: copy to clipboard
          try {
            await navigator.clipboard.writeText(shareUrl);
            sendNotification('📋 Link copied to clipboard');
          } catch (error) {
            console.log('Failed to copy to clipboard');
          }
        }
        break;
    }
  };

  return (
    <>
      {/* Additional meta tags for social sharing */}
      <Head>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="article:author" content="Zack Hitchcock" />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@hitchcode" />
      </Head>

      <div className={`min-h-screen w-full bg-black text-white ${inter.className}`}>
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

        <main className="relative z-10">
          {/* Back Navigation */}
          <div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Link
                href="/blog"
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Blog
              </Link>
            </div>
          </div>

          {/* Article Header */}
          <header className="relative py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`transform transition-all duration-1000 ease-out ${playedIntro ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.categories.map((category) => (
                      <span
                        key={category._id}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-gray-300"
                      >
                        <Tag size={14} />
                        {category.title}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className={`${jetbrains.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight`}>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {post.title}
                  </span>
                </h1>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>Zack Hitchcock</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>5 min read</span>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 mr-2">Share:</span>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-600/20 hover:border-blue-500/30 flex items-center justify-center transition-all duration-300 group"
                      title="Share on Facebook"
                    >
                      <Facebook size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-sky-600/20 hover:border-sky-500/30 flex items-center justify-center transition-all duration-300 group"
                      title="Share on Twitter"
                    >
                      <Twitter size={18} className="text-gray-400 group-hover:text-sky-400 transition-colors duration-300" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-700/20 hover:border-blue-600/30 flex items-center justify-center transition-all duration-300 group"
                      title="Share on LinkedIn"
                    >
                      <Linkedin size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                    </button>
                    <button
                      onClick={() => handleShare('native')}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-purple-600/20 hover:border-purple-500/30 flex items-center justify-center transition-all duration-300 group"
                      title="More sharing options"
                    >
                      <Share2 size={18} className="text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <article className="relative py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '200ms' }}>
                <div className="prose prose-lg prose-invert max-w-none">
                  <PortableText
                    value={post.body}
                    components={{
                      types: {
                        code: ({ value }) => (
                          <div className="my-8">
                            <pre className={`${jetbrains.className} bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-lg p-6 overflow-x-auto text-sm leading-relaxed`}>
                              <code className={`language-${value.language || 'text'} text-gray-300`}>
                                {value.code}
                              </code>
                            </pre>
                          </div>
                        ),
                      },
                      marks: {
                        link: ({ children, value }) => (
                          <a
                            href={value.href}
                            className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/50 hover:decoration-blue-300 transition-colors duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-white">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic text-gray-300">{children}</em>
                        ),
                      },
                      block: {
                        normal: ({ children }) => (
                          <p className="mb-6 text-gray-300 leading-relaxed text-lg">{children}</p>
                        ),
                        h1: ({ children }) => (
                          <h1 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6 mt-12 text-white`}>{children}</h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className={`${jetbrains.className} text-2xl md:text-3xl font-bold mb-4 mt-10 text-white`}>{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className={`${jetbrains.className} text-xl md:text-2xl font-bold mb-4 mt-8 text-white`}>{children}</h3>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-500/5 rounded-r-lg">
                            <div className="text-gray-300 italic text-lg">{children}</div>
                          </blockquote>
                        ),
                      },
                      list: {
                        bullet: ({ children }) => (
                          <ul className="mb-6 space-y-2 text-gray-300 list-disc list-outside ml-6 pl-2">{children}</ul>
                        ),
                        number: ({ children }) => (
                          <ol className="mb-6 space-y-2 text-gray-300 list-decimal list-outside ml-6 pl-2">{children}</ol>
                        ),
                      },
                      listItem: {
                        bullet: ({ children }) => (
                          <li className="text-gray-300 leading-relaxed text-lg pl-1">{children}</li>
                        ),
                        number: ({ children }) => (
                          <li className="text-gray-300 leading-relaxed text-lg pl-1">{children}</li>
                        ),
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </article>

          {/* Share Section */}
          <section className="relative py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '300ms' }}>
                <h3 className={`${jetbrains.className} text-xl font-bold mb-6`}>
                  <span className="text-white">Found this helpful? Share it!</span>
                </h3>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 hover:border-blue-500/50 rounded-lg transition-all duration-300 group"
                  >
                    <Facebook size={18} className="text-blue-400" />
                    <span className="text-blue-300 font-medium">Facebook</span>
                  </button>

                  <button
                    onClick={() => handleShare('twitter')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600/20 border border-sky-500/30 hover:bg-sky-600/30 hover:border-sky-500/50 rounded-lg transition-all duration-300 group"
                  >
                    <Twitter size={18} className="text-sky-400" />
                    <span className="text-sky-300 font-medium">Twitter</span>
                  </button>

                  <button
                    onClick={() => handleShare('linkedin')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700/20 border border-blue-600/30 hover:bg-blue-700/30 hover:border-blue-600/50 rounded-lg transition-all duration-300 group"
                  >
                    <Linkedin size={18} className="text-blue-500" />
                    <span className="text-blue-400 font-medium">LinkedIn</span>
                  </button>

                  <button
                    onClick={() => handleShare('native')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 hover:border-purple-500/50 rounded-lg transition-all duration-300 group"
                  >
                    <Share2 size={18} className="text-purple-400" />
                    <span className="text-purple-300 font-medium">More Options</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Footer */}
          <footer className="relative py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '400ms' }}>
                <div className="mb-8">
                  <h3 className={`${jetbrains.className} text-2xl font-bold mb-4`}>
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      Enjoyed this article?
                    </span>
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Check out more insights and stories from my blog.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/blog"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-md font-medium transition-all duration-300 min-w-[160px] text-center"
                  >
                    Read More Articles
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-md font-medium transition-colors min-w-[160px] text-center"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </footer>
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

          /* Enhanced prose styling for better readability */
          .prose p {
            margin-bottom: 1.5rem;
          }

          .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
            scroll-margin-top: 2rem;
          }

          .prose pre {
            font-size: 0.875rem;
            line-height: 1.6;
          }

          .prose blockquote {
            font-style: italic;
          }

          .prose a {
            font-weight: 500;
          }

          @media (max-width: 768px) {
            .prose {
              font-size: 16px;
            }

            .prose h1 {
              font-size: 1.75rem;
            }

            .prose h2 {
              font-size: 1.5rem;
            }

            .prose h3 {
              font-size: 1.25rem;
            }
          }
        `}</style>
      </div>
    </>
  )
}
