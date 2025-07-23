'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Inter } from 'next/font/google';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/demos', label: 'Demos' },
  { href: '/services/full-stack-development', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const inter = Inter({ subsets: ['latin'] });

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

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
    <header className="sticky top-0 z-20 bg-white border-b border-zinc-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="relative flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-200 shadow-md">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className={`${inter.className} text-xl font-bold tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors duration-200`}>
                hitchcode
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-all duration-200 rounded-lg hover:bg-zinc-50 group"
              >
                {link.label}
                <span className="absolute inset-x-4 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Get Started Button */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label="Open navigation menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="w-5 h-5 text-zinc-700" />
            </button>
          </div>
        </div>

        {/* Tablet Navigation (md to lg) */}
        <nav className="hidden md:flex lg:hidden items-center justify-center space-x-6 py-3 border-t border-zinc-100">
          {NAV_LINKS.slice(0, 4).map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-200 lg:hidden"
          style={{ zIndex: 9998 }}
        >
          <div
            ref={drawerRef}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white border-l border-zinc-200 shadow-2xl z-50 flex flex-col animate-slide-in"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-zinc-50">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="text-lg font-bold tracking-tight text-zinc-900">Menu</span>
              </div>
              <button
                className="p-2 rounded-lg hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                aria-label="Close navigation menu"
                onClick={() => setDrawerOpen(false)}
              >
                <X className="w-5 h-5 text-zinc-700" />
              </button>
            </div>

            {/* Drawer Navigation */}
            <nav className="flex-1 flex flex-col p-6 space-y-2">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center px-4 py-3 text-base font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg transition-all duration-200 border border-transparent hover:border-zinc-200"
                  onClick={() => setDrawerOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-6 mt-6 border-t border-zinc-200">
                <Link
                  href="/contact"
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => setDrawerOpen(false)}
                >
                  Get Started
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
