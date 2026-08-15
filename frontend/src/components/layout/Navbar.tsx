'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, BookMarked } from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { TopHeaderBar } from './TopHeaderBar';
import { NavDesktopMenu } from './NavDesktopMenu';
import { NavMobileDrawer } from './NavMobileDrawer';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 1. Top Header Bar */}
      <TopHeaderBar />

      {/* 2. Main Navigation Bar */}
      <nav
        className={`relative transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md shadow-2xl border-b border-neutral-900'
            : 'bg-[#050505]/95 backdrop-blur-md border-b border-neutral-900'
        }`}
      >
        <div className="container mx-auto px-4 h-18 sm:h-20 flex items-center justify-between">
          {/* Logo & School Title */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white p-0.5 flex items-center justify-center border border-neutral-800 shadow-sm group-hover:scale-105 transition-transform">
              <Image
                src="/logo-sekolah.jpg"
                alt="Logo SMA PGRI 1"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors leading-none">
                SMA PGRI 1
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase mt-0.5">
                Lumajang
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <NavDesktopMenu />

          {/* Right Action Elements */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/ppdb"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all duration-300 hover:-translate-y-0.5 shrink-0"
            >
              PPDB ONLINE
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-300 hover:bg-neutral-900 transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Decorative Top-Right Ribbon */}
        <div className="hidden xl:block absolute top-0 right-10 z-40">
          <div className="w-9 h-26 bg-gradient-to-b from-blue-600 to-blue-700 shadow-2xl flex flex-col items-center justify-between pb-2.5 clip-path-ribbon">
            <span className="text-[8px] font-black text-white uppercase tracking-widest writing-mode-vertical pt-2 select-none opacity-90">
              PGRI 1
            </span>
            <BookMarked className="w-3.5 h-3.5 text-blue-200" />
          </div>
        </div>

        {/* 3. Mobile Navigation Drawer */}
        <NavMobileDrawer
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </nav>
    </header>
  );
}
