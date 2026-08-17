'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Building2, Trophy, ChevronRight, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const highlightCards = [
    {
      title: 'KURIKULUM & PEMINATAN',
      desc: 'Kurikulum Merdeka dengan fondasi Fase E (Kelas 10) & Peminatan Fase F (Kelas 11-12) MIPA, IPS, Bahasa, didukung bimbingan persiapan PTN.',
      icon: BookOpen,
      href: '/jurusan',
    },
    {
      title: 'PROFIL & FASILITAS',
      desc: 'Gedung representatif, laboratorium sains & komputer multimedia lengkap, serta lingkungan sekolah yang asri, nyaman, dan berkarakter.',
      icon: Building2,
      href: '/profil/sejarah',
    },
    {
      title: 'PRESTASI & BEASISWA',
      desc: 'Wadah bakat siswa, raihan juara akademik & non-akademik, serta program beasiswa prestasi dan apresiasi bakat berkelanjutan.',
      icon: Trophy,
      href: '/prestasi',
    },
  ];

  return (
    <section className="relative w-full bg-white text-slate-900 overflow-hidden">
      {/* Hero Banner with Clean Light Overlay */}
      <div className="relative min-h-150 lg:min-h-165 flex items-center justify-center pt-16 pb-32 sm:pb-36 px-4">
        {/* Campus Background Image with Clean Light Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/image.png"
            alt="SMA PGRI 1 Lumajang"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-95 contrast-105 opacity-90"
          />
          {/* Balanced light gradient & radial scrim to keep photo clear while text stays sharp */}
          <div className="absolute inset-0 bg-radial-[circle_at_center] from-white/80 via-white/45 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-b from-white/60 via-transparent to-white" />
        </div>

        {/* Hero Center Content */}
        <div className="relative z-10 container mx-auto max-w-4xl text-center flex flex-col items-center">
          
          {/* Official Emblem Circular Seal */}
          <div className="mb-3 flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-2 shadow-xl border border-slate-200 flex items-center justify-center hover:scale-105 transition-transform overflow-hidden">
              <Image
                src="/logo-sekolah.png"
                alt="Emblem SMA PGRI 1 Lumajang"
                width={70}
                height={70}
                className="object-contain rounded-full"
                priority
              />
            </div>
            {/* Subtitle in Indonesian */}
            <span className="text-[10px] sm:text-xs font-extrabold tracking-[0.35em] text-blue-900 uppercase mt-3 select-none">
              SEKOLAH MENENGAH ATAS
            </span>
          </div>

          {/* Main Headline in Classical Serif */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-slate-900 drop-shadow-xs mb-3 leading-tight">
            SMA PGRI 1 Lumajang
          </h1>

          {/* Gold accent line */}
          <div className="w-20 sm:w-28 h-0.5 bg-[#d4af37] mb-3 opacity-90 rounded-full" />

          {/* Slogan */}
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.28em] text-slate-500 uppercase mb-7 select-none">
            THE CHARACTER OF SUCCESS
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-4">
            <Link
              href="/ppdb"
              className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>PENDAFTARAN PPDB 2026</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/profil/sejarah"
              className="px-7 py-3.5 bg-white hover:bg-slate-100/80 text-slate-800 border border-slate-300 hover:border-slate-400 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all duration-300 hover:-translate-y-0.5"
            >
              JELAJAHI PROFIL SEKOLAH
            </Link>
          </div>

        </div>
      </div>

      {/* 3-Card Strip Section in Crisp Light Mode */}
      <div className="relative z-20 -mt-16 sm:-mt-20 container mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {highlightCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                className="group relative bg-white/95 hover:bg-white border border-slate-200/90 hover:border-blue-300 rounded-2xl p-5 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1 flex items-start gap-4 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <h3 className="text-xs sm:text-sm font-black tracking-wider uppercase text-slate-900 group-hover:text-blue-700 transition-colors">
                      {card.title}
                    </h3>
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-300 group-hover:border-blue-400 flex items-center justify-center text-[9px] text-slate-400 group-hover:text-blue-600 transition-colors">
                      <ChevronRight className="w-2.5 h-2.5" />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                    {card.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </section>
  );
}
