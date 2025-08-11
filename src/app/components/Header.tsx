'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/demos', label: 'Demos' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const inter = Inter({ subsets: ['latin'] });

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close drawer on ESC or click outside
  useEffect(() => {
    if (!drawerOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setDrawerOpen(false);
    }
    function handleClick(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    }
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [drawerOpen]);

  return (
    <header className="sticky top-0 z-50 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/50 border-b border-zinc-800 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="relative flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <svg
                viewBox="0 0 32 32"
                className="h-9 w-9"
                role="img"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="hitchcode-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#c026d3" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="32" height="32" rx="6" fill="url(#hitchcode-gradient)" />
                <text
                  x="16"
                  y="16"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, Inter, sans-serif"
                  fontWeight="bold"
                  fontSize="18"
                  fill="#fff"
                  letterSpacing="0"
                  alignmentBaseline="central"
                  dominantBaseline="central"
                  style={{ textShadow: '0 0 2px #fff, 0 0 5px #3b82f6, 0 0 8px #c026d3' }}
                >
                  H
                </text>
              </svg>
              <span className={`${inter.className} text-lg md:text-xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors duration-200`}>
                hitchcode
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_LINKS.map(link => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${active ? 'text-white' : 'text-zinc-300 hover:text-white'} hover:bg-zinc-900/40`}
                >
                  {link.label}
                  <span className={`absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Get Started Button */}
            <Link href="/contact" className="hidden md:inline-flex relative items-center justify-center p-[3px] rounded-full group">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#a21caf]" />
              <span className="px-5 py-2.5 bg-black rounded-full text-white text-sm font-semibold relative transition-colors duration-200 group-hover:bg-transparent">Start the Conversation</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-200"
              aria-label="Open navigation menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="w-5 h-5 text-zinc-200" />
            </button>
          </div>
        </div>

        {/* Tablet Navigation (md to lg) */}
        <nav className="hidden md:flex lg:hidden items-center justify-center space-x-6 py-3 border-t border-zinc-800/70">
          {NAV_LINKS.slice(0, 4).map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/40 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-200 lg:hidden" style={{ zIndex: 9998 }}>
          <div
            ref={drawerRef}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col animate-slide-in"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800/70 bg-zinc-950">
            <div className="flex items-center space-x-3">
                <svg
                  viewBox="0 0 32 32"
                  className="h-8 w-8"
                  role="img"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="hitchcode-gradient-drawer" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#c026d3" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="32" height="32" rx="6" fill="url(#hitchcode-gradient-drawer)" />
                  <text
                    x="16"
                    y="16"
                    textAnchor="middle"
                    fontFamily="JetBrains Mono, Inter, sans-serif"
                    fontWeight="bold"
                    fontSize="18"
                    fill="#fff"
                    letterSpacing="0"
                    alignmentBaseline="central"
                    dominantBaseline="central"
                    style={{ textShadow: '0 0 2px #fff, 0 0 5px #3b82f6, 0 0 8px #c026d3' }}
                  >
                    H
                  </text>
                </svg>
                <span className="text-lg font-bold tracking-tight text-zinc-100">Menu</span>
              </div>
              <button
                className="p-2 rounded-lg hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-colors duration-200"
                aria-label="Close navigation menu"
                onClick={() => setDrawerOpen(false)}
              >
                <X className="w-5 h-5 text-zinc-200" />
              </button>
            </div>

            {/* Drawer Navigation */}
            <nav className="flex-1 flex flex-col p-6 space-y-2">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center px-4 py-3 text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-all duration-200 border border-zinc-800/0 hover:border-zinc-700/70"
                  onClick={() => setDrawerOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-6 mt-6 border-t border-zinc-800/70">
                <Link href="/contact" className="relative flex items-center justify-center p-[3px] rounded-full group" onClick={() => setDrawerOpen(false)}>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#a21caf]" />
                  <span className="px-6 py-3 bg-zinc-950 rounded-full text-white font-semibold relative transition-colors duration-200 group-hover:bg-transparent">Start the Conversation</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </header>
  );
}
