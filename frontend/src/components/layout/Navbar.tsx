'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronDown, 
  Mail, 
  Phone, 
  Laptop, 
  FileText, 
  BarChart3, 
  GraduationCap, 
  Landmark, 
  Target, 
  Mic,
  Newspaper,
  Users,
  Menu,
  X,
  Sparkles,
  BookMarked
} from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';

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
      {/* Top Bar */}
      <div className="bg-[#050505] text-neutral-400 py-1.5 text-xs border-b border-neutral-900 hidden sm:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-400" /> info@smapgri1lmj.sch.id
            </span>
            <span className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> (0334) 881234
            </span>
          </div>

          <div className="flex gap-5 items-center">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">Instagram</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">YouTube</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">Facebook</a>
            <Link href="/admin/login" className="text-neutral-400 hover:text-[#c99b38] transition-colors font-medium ml-2">Portal Admin</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`relative transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md shadow-2xl border-b border-neutral-900' 
          : 'bg-[#050505]/95 backdrop-blur-md border-b border-neutral-900'
      }`}>
        <div className="container mx-auto px-4 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Logo & School Name */}
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
          
          {/* Desktop Navigation Links matching Mockup Fonts */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link 
              href="/" 
              className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors"
            >
              HOME
            </Link>
            
            {/* Profil Dropdown */}
            <div className="relative group py-4">
              <button className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors flex items-center gap-1">
                PROFIL
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-60" />
              </button>
              
              <div className="absolute top-16 left-0 w-80 bg-[#0d0d0d] border border-neutral-800 shadow-2xl rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Tentang Sekolah
                </div>
                <Link 
                  href="/profil/sejarah" 
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 text-blue-400 flex items-center justify-center shrink-0 border border-neutral-800">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover/item:text-blue-400">
                      Sejarah Sekolah
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Perjalanan sejak 1985 hingga era digital
                    </div>
                  </div>
                </Link>

                <Link 
                  href="/profil/visi-misi" 
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 text-[#c99b38] flex items-center justify-center shrink-0 border border-neutral-800">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover/item:text-[#c99b38]">
                      Visi & Misi
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Fondasi karakter unggul dan religius
                    </div>
                  </div>
                </Link>

                <Link 
                  href="/profil/sambutan" 
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 text-emerald-400 flex items-center justify-center shrink-0 border border-neutral-800">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover/item:text-emerald-400">
                      Sambutan Kepala Sekolah
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Pesan kepemimpinan & masa depan
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Akademik Dropdown */}
            <div className="relative group py-4">
              <button className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors flex items-center gap-1">
                AKADEMIK
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-60" />
              </button>
              
              <div className="absolute top-16 left-0 w-72 bg-[#0d0d0d] border border-neutral-800 shadow-2xl rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Program Belajar
                </div>
                <Link 
                  href="/jurusan" 
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 text-blue-400 flex items-center justify-center shrink-0 border border-neutral-800">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover/item:text-blue-400">
                      Peminatan & Jurusan
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      MIPA, IPS, & Bahasa Budaya
                    </div>
                  </div>
                </Link>

                <Link 
                  href="/guru" 
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 text-purple-400 flex items-center justify-center shrink-0 border border-neutral-800">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover/item:text-purple-400">
                      Direktori Guru & Staf
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Tenaga pendidik profesional
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <Link 
              href="/ekstrakurikuler" 
              className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors"
            >
              EKSTRAKURIKULER
            </Link>

            <Link 
              href="/prestasi" 
              className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors"
            >
              PRESTASI
            </Link>
            
            {/* Portal Layanan Dropdown */}
            <div className="relative group py-4">
              <button className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors flex items-center gap-1">
                PORTAL
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-60" />
              </button>
              
              <div className="absolute top-16 left-0 w-72 bg-[#0d0d0d] border border-neutral-800 shadow-2xl rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Layanan Digital
                </div>
                <a 
                  href="#" 
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
                >
                  <div className="w-7 h-7 rounded-lg bg-neutral-900 text-blue-400 flex items-center justify-center shrink-0 border border-neutral-800">
                    <Laptop className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-200 group-hover/item:text-blue-400">
                    E-Learning Siswa
                  </span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
                >
                  <div className="w-7 h-7 rounded-lg bg-neutral-900 text-[#c99b38] flex items-center justify-center shrink-0 border border-neutral-800">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-200 group-hover/item:text-[#c99b38]">
                    Ujian CBT Online
                  </span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
                >
                  <div className="w-7 h-7 rounded-lg bg-neutral-900 text-emerald-400 flex items-center justify-center shrink-0 border border-neutral-800">
                    <BarChart3 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-200 group-hover/item:text-emerald-400">
                    E-Rapor Digital
                  </span>
                </a>
              </div>
            </div>

            {/* Megamenu / Dropdown Lainnya */}
            <div className="relative group py-4">
              <button className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors flex items-center gap-1">
                LAINNYA
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-60" />
              </button>
              
              <div className="absolute top-16 right-0 w-[500px] bg-[#0d0d0d] border border-neutral-800 shadow-2xl rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 grid grid-cols-2 gap-4">
                
                {/* Kolom 1 */}
                <div className="space-y-1">
                  <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5 text-blue-500" /> Informasi & Karya
                  </div>
                  <Link href="/berita" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
                    Berita Sekolah
                  </Link>
                  <Link href="/agenda" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
                    Agenda & Event
                  </Link>
                  <Link href="/artikel" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
                    Artikel & Edukasi
                  </Link>
                  <Link href="/karya-siswa" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
                    Karya Kreatif Siswa
                  </Link>
                  <Link href="/galeri" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
                    Galeri Dokumentasi
                  </Link>
                  <Link href="/opini" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
                    Opini & Gagasan
                  </Link>
                </div>

                {/* Kolom 2 */}
                <div className="space-y-1">
                  <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#c99b38]" /> Komunitas & Layanan
                  </div>
                  <Link href="/blog-siswa" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
                    Blog Siswa
                  </Link>
                  <Link href="/alumni" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
                    Tracer Alumni
                  </Link>
                  <Link href="/buku-tamu" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
                    Buku Tamu Publik
                  </Link>
                  <Link href="/link-penting" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
                    Tautan Cepat
                  </Link>
                  <Link href="/kontak" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
                    Kontak & Alamat
                  </Link>
                </div>

              </div>
            </div>

          </div>

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

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-300 hover:bg-neutral-900 transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Top-Right Bookmark Ribbon / Flag Element */}
        <div className="hidden xl:block absolute top-0 right-10 z-40">
          <div className="w-9 h-26 bg-gradient-to-b from-blue-600 to-blue-700 shadow-2xl flex flex-col items-center justify-between pb-2.5 clip-path-ribbon">
            <span className="text-[8px] font-black text-white uppercase tracking-widest writing-mode-vertical pt-2 select-none opacity-90">
              PGRI 1
            </span>
            <BookMarked className="w-3.5 h-3.5 text-blue-200" />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0d0d0d] border-b border-neutral-800 px-4 py-5 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-2.5 font-bold text-white hover:bg-neutral-900 rounded-lg">HOME</Link>
              <Link href="/jurusan" onClick={() => setMobileMenuOpen(false)} className="p-2.5 font-bold text-white hover:bg-neutral-900 rounded-lg">AKADEMIK</Link>
              <Link href="/prestasi" onClick={() => setMobileMenuOpen(false)} className="p-2.5 font-bold text-white hover:bg-neutral-900 rounded-lg">PRESTASI</Link>
              <Link href="/ekstrakurikuler" onClick={() => setMobileMenuOpen(false)} className="p-2.5 font-bold text-white hover:bg-neutral-900 rounded-lg">EKSTRAKURIKULER</Link>
            </div>

            <div className="border-t border-neutral-800 pt-3">
              <div className="text-[10px] font-bold uppercase text-neutral-500 mb-2">Profil Sekolah</div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <Link href="/profil/sejarah" onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-neutral-400 hover:text-white">Sejarah</Link>
                <Link href="/profil/visi-misi" onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-neutral-400 hover:text-white">Visi Misi</Link>
                <Link href="/profil/sambutan" onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-neutral-400 hover:text-white">Sambutan</Link>
                <Link href="/guru" onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-neutral-400 hover:text-white">Direktori Guru</Link>
              </div>
            </div>

            <div className="border-t border-neutral-800 pt-3">
              <div className="text-[10px] font-bold uppercase text-neutral-500 mb-2">Informasi & Komunitas</div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <Link href="/berita" onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-neutral-400 hover:text-white">Berita</Link>
                <Link href="/agenda" onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-neutral-400 hover:text-white">Agenda</Link>
                <Link href="/artikel" onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-neutral-400 hover:text-white">Artikel</Link>
                <Link href="/alumni" onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-neutral-400 hover:text-white">Tracer Alumni</Link>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                href="/ppdb" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block py-2.5 text-center bg-blue-600 text-white font-bold rounded-xl text-xs shadow-md"
              >
                PPDB ONLINE 2026
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
