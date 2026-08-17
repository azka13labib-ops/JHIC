'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
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

      {/* 2. Main Navigation Bar */}
      <nav
        className={`relative transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
        }`}
      >
        <div className="container mx-auto px-4 h-18 sm:h-20 flex items-center justify-between">
          {/* Logo & School Title */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white p-0.5 flex items-center justify-center border border-slate-200 shadow-xs group-hover:scale-105 transition-transform">
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
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-none">
                SMA PGRI 1
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase mt-0.5">
                Lumajang
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <NavDesktopMenu />

          {/* Right Action Elements */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/ppdb"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 shrink-0"
            >
              PPDB ONLINE
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/ppdb"
              className="px-3 py-1.5 bg-blue-600 text-white font-bold text-[11px] rounded-lg shadow-xs"
            >
              PPDB
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
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


        {/* 3. Mobile Navigation Drawer */}
        <NavMobileDrawer
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </nav>
    </header>
  );
}
