'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { JetBrains_Mono } from 'next/font/google';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services/full-stack-development', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const jetbrains = JetBrains_Mono({ subsets: ['latin'] });

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
    <header className="relative z-20 py-6 px-4 sm:px-8 md:px-12 border-b border-white/10 bg-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <svg
            className="h-8 w-8 rounded-md"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', background: 'linear-gradient(135deg, #2563eb 0%, #a21caf 100%)', borderRadius: '0.375rem' }}
          >
            <rect x="0" y="0" width="32" height="32" rx="6" fill="url(#hitchcode-gradient)" />
            <defs>
              <linearGradient id="hitchcode-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563eb" />
                <stop offset="1" stopColor="#a21caf" />
              </linearGradient>
            </defs>
            <text
              x="16"
              y="16.5"
              textAnchor="middle"
              fontFamily="JetBrains Mono, Inter, sans-serif"
              fontWeight="bold"
              fontSize="20"
              fill="white"
              letterSpacing="1"
              alignmentBaseline="middle"
              dominantBaseline="middle"
            >
              H
            </text>
          </svg>
          <span className={`${jetbrains.className} text-lg font-medium tracking-tight hidden sm:block`}>HITCHCODE</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Get Started button (desktop) */}
        <Link
          href="/contact"
          className="hidden md:inline-block px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-sm rounded-md transition-colors border border-white/10"
        >
          Get Started
        </Link>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open navigation menu"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu className="w-7 h-7 text-white" />
        </button>
      </div>

      {/* Drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 md:hidden"
          style={{ zIndex: 9998 }}
        >
          <div
            ref={drawerRef}
            className="fixed top-0 right-0 h-full w-4/5 max-w-xs border-l border-white/10 shadow-2xl z-50 flex flex-col p-6 animate-slide-in drawer-solid-bg"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-bold tracking-tight text-white">Menu</span>
              <button
                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close navigation menu"
                onClick={() => setDrawerOpen(false)}
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base text-gray-200 hover:text-white py-2 px-2 rounded transition-colors"
                  onClick={() => setDrawerOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-medium text-center transition-all duration-300"
                onClick={() => setDrawerOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .drawer-solid-bg {
          background-color: #000000 !important;
          background: #000000 !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          z-index: 9999 !important;
        }
        .drawer-solid-bg * {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
      `}</style>
    </header>
  );
}
