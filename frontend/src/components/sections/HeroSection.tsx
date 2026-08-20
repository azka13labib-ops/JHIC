'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Building2, Trophy, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const highlightPillars = [
    {
      title: 'Kurikulum & Peminatan',
      desc: 'Kurikulum Merdeka dengan fondasi Fase E (Kelas X) serta peminatan Fase F (Kelas XI–XII) MIPA, IPS, dan Bahasa.',
      icon: BookOpen,
      href: '/jurusan',
    },
    {
      title: 'Profil & Fasilitas Sekolah',
      desc: 'Gedung representatif, 3 laboratorium komputer terpadu, lab sains modern, perpustakaan digital, dan lingkungan asri.',
      icon: Building2,
      href: '/profil/sejarah',
    },
    {
      title: 'Prestasi & Jejak Alumni',
      desc: '78% lulusan tembus PTN terkemuka, pembinaan kejuaraan OSN/FLS2N, serta dukungan beasiswa bakat berkelanjutan.',
      icon: Trophy,
      href: '/prestasi',
    },
  ];

  return (
    <section className="relative w-full bg-white text-slate-900 overflow-hidden">
      {/* Hero Banner Container */}
      <div className="relative min-h-140 lg:min-h-155 flex items-center justify-center pt-12 pb-24 sm:pb-28 px-4">
        {/* Campus Background Image with Restrained Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/image.png"
            alt="Sekolah SMA PGRI 1 Lumajang"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-95 opacity-85"
          />
          {/* Balanced light radial scrim to keep photo clear while text stays sharp */}
          <div className="absolute inset-0 bg-radial-[circle_at_center] from-white/90 via-white/55 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-b from-white/70 via-transparent to-white" />
        </div>

        {/* Hero Center Content */}
        <div className="relative z-10 container mx-auto max-w-3xl text-center flex flex-col items-center">
          
          {/* Official Emblem */}
          <div className="mb-4 flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1.5 shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden">
              <Image
                src="/logo-sekolah.png"
                alt="Emblem SMA PGRI 1 Lumajang"
                width={68}
                height={68}
                className="object-contain rounded-full"
                priority
              />
            </div>
            <span className="text-xs font-bold tracking-[0.25em] text-blue-900 uppercase mt-3 select-none">
              SEKOLAH MENENGAH ATAS
            </span>
          </div>

          {/* Main Headline in Classical Serif */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-slate-900 mb-3 leading-tight">
            SMA PGRI 1 Lumajang
          </h1>

          {/* Gold accent line */}
          <div className="w-16 sm:w-20 h-0.5 bg-[#d4af37] mb-3 opacity-90 rounded-full" />

          {/* Tagline */}
          <p className="text-xs sm:text-sm font-medium text-slate-600 max-w-xl mb-8 leading-relaxed">
            Mewujudkan generasi unggul dalam prestasi akademik, berkarakter mulia, dan berdaya saing global.
          </p>

          {/* Primary and Supporting CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/ppdb"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <span>Pendaftaran PPDB 2026</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/profil/sejarah"
              className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs sm:text-sm rounded-lg shadow-2xs transition-colors"
            >
              Jelajahi Profil Sekolah
            </Link>
          </div>

        </div>
      </div>

      {/* 3-Pillar Architectural Highlight Section */}
      <div className="relative z-20 -mt-12 sm:-mt-14 container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {highlightPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={idx}
                href={pillar.href}
                className="group bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-blue-300 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {pillar.title}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span>Lihat Rincian</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </section>
  );
}
