import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GraduationCap, Landmark, Presentation, ChevronRight, ChevronDown, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const highlightCards = [
    {
      title: 'SCHOLARSHIP',
      desc: 'Program beasiswa prestasi akademik, non-akademik, tahfidz, dan bantuan pendidikan berkelanjutan bagi siswa berpotensi.',
      icon: GraduationCap,
      href: '/prestasi',
    },
    {
      title: 'OUR CAMPUS',
      desc: 'Fasilitas belajar modern, laboratorium sains & multimedia lengkap, serta lingkungan sekolah yang asri, nyaman, dan berkarakter.',
      icon: Landmark,
      href: '/profil/sejarah',
    },
    {
      title: 'PROGRAMS',
      desc: 'Kurikulum Merdeka dengan fondasi Fase E (Kelas 10) & Peminatan Fase F (Kelas 11-12), didukung bimbingan persiapan PTN dan riset ilmiah.',
      icon: Presentation,
      href: '/jurusan',
    },
  ];

  return (
    <section className="relative w-full bg-[#000000] text-white overflow-hidden">
      {/* Hero Banner with Full-bleed Background Image */}
      <div className="relative min-h-150 lg:min-h-165 flex items-center justify-center pt-20 pb-36 px-4">
        {/* Background Image (image.png) with natural exposure and central text vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/image.png"
            alt="SMA PGRI 1 Lumajang"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-90 contrast-105"
          />
          {/* Central dark radial spotlight & gradient to ensure crystal clear readability while showing the campus */}
          <div className="absolute inset-0 bg-radial-[circle_at_center] from-black/80 via-black/65 to-black/90" />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/60" />
        </div>

        {/* Hero Center Content matching Mockup Seal & Serif Headline */}
        <div className="relative z-10 container mx-auto max-w-4xl text-center flex flex-col items-center">
          
          {/* Official Emblem Circular Seal (Top Center) */}
          <div className="mb-3 flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 p-2 shadow-2xl backdrop-blur-sm border border-white/40 flex items-center justify-center hover:scale-105 transition-transform">
              <Image
                src="/logo-sekolah.jpg"
                alt="Emblem SMA PGRI 1 Lumajang"
                width={70}
                height={70}
                className="object-contain"
                priority
              />
            </div>
            {/* Contextual Subtitle in Indonesian */}
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-white/90 uppercase mt-3 select-none">
              SEKOLAH MENENGAH ATAS
            </span>
          </div>

          {/* Main Headline (Playfair / Classical Serif typography) */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] mb-3 leading-tight">
            SMA PGRI 1 Lumajang
          </h1>

          {/* Subtle gold line accent */}
          <div className="w-20 sm:w-28 h-[1.5px] bg-[#d4af37] mb-3 opacity-80" />

          {/* Slogan */}
          <p className="text-[10px] sm:text-xs font-semibold tracking-[0.28em] text-neutral-300 uppercase mb-6 select-none">
            THE CHARACTER OF SUCCESS
          </p>

          {/* Primary & Secondary CTA Action Buttons in First Viewport */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-6">
            <Link
              href="/ppdb"
              className="px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>PENDAFTARAN PPDB 2026</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/profil/sejarah"
              className="px-7 py-3 bg-black/60 hover:bg-neutral-900 text-neutral-200 hover:text-white border border-white/20 hover:border-white/40 font-bold text-xs sm:text-sm rounded-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
            >
              JELAJAHI PROFIL SEKOLAH
            </Link>
          </div>

        </div>
      </div>

      {/* 3-Card Strip Section (Matching Mockup: Horizontal Dark Cards with Border) */}
      <div className="relative z-20 -mt-16 sm:-mt-20 container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {highlightCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                className="group relative bg-black/80 hover:bg-black/95 border border-white/20 hover:border-white/40 rounded-xl p-5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <h3 className="text-xs sm:text-sm font-black tracking-wider uppercase text-white group-hover:text-blue-400 transition-colors">
                      {card.title}
                    </h3>
                    <div className="w-3.5 h-3.5 rounded-full border border-white/60 flex items-center justify-center text-[9px] text-white">
                      <ChevronRight className="w-2.5 h-2.5" />
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-300 leading-relaxed line-clamp-3">
                    {card.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mouse Scroll / Down Indicator Pin */}
        <div className="flex justify-center mt-6">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-center justify-center animate-bounce opacity-70">
            <ChevronDown className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>

    </section>
  );
}
