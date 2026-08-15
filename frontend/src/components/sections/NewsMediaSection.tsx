'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Radio
} from 'lucide-react';
import { getImageUrl } from '@/lib/utils';

interface NewsItem {
  id?: number;
  title: string;
  slug?: string;
  image?: string;
  image_path?: string;
  category?: string;
  created_at?: string;
  content?: string;
}

interface NewsMediaSectionProps {
  initialNews?: NewsItem[];
}

export default function NewsMediaSection({ initialNews = [] }: NewsMediaSectionProps) {
  const activeDay = 17; // Highlighted event date in calendar

  // Days of August 2026 (Starts on Saturday = 6 leading blanks)
  const daysInMonth = 31;
  const startDayOffset = 6;
  const calendarCells = [];
  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push(i);
  }

  const defaultNews: NewsItem[] = [
    {
      title: 'Pelepasan Wisudawan & Penghargaan Prestasi Siswa Berlangsung Khidmat',
      slug: 'pelepasan-wisudawan-2026',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop',
      category: 'HOT | TODAY',
    },
    {
      title: 'Gedung Laboratorium Sains & Komputer Terpadu Resmi Beroperasi',
      slug: 'gedung-lab-terpadu-resmi',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop',
      category: 'TODAY',
    },
    {
      title: 'Karya Siswa Masuk Nominasi Inovasi Digital Tingkat Jawa Timur',
      slug: 'karya-siswa-nominasi-inovasi-digital',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
      category: 'HOT | TODAY',
    },
    {
      title: 'Pekan Olahraga, Seni & Budaya Meriahkan Semester Baru 2026',
      slug: 'pekan-olahraga-seni-budaya',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
      category: 'HIGHLIGHT',
    },
  ];

  const newsList = initialNews.length > 0 ? initialNews : defaultNews;
  const card1 = newsList[0] || defaultNews[0];
  const card2 = newsList[1] || defaultNews[1];
  const card3 = newsList[2] || defaultNews[2];
  const cardTall = newsList[3] || defaultNews[3];

  const resolveImage = (item: NewsItem, fallback: string) => {
    const raw = item.image_path || item.image;
    return raw ? getImageUrl(raw) : fallback;
  };

  return (
    <section className="relative py-24 bg-[#0a0f1d] text-white overflow-hidden">
      {/* Background with subtle architectural campus depth */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image.png"
          alt="Campus Backdrop"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-15 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#000000] via-[#0b1329]/90 to-[#000000]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        
        {/* Section Header (Matches Mockup • News.) */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              News.
            </h2>
          </div>
          <div className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
            Communication Center | For You Page
          </div>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Pusat berita, informasi akademik, agenda kegiatan, dan siaran prestasi SMA PGRI 1 Lumajang.
          </p>
        </div>

        {/* 3-Column Grid Matching Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          
          {/* Column 1 (Left 6 Cols): Top Wide Card + Bottom 2 Cards */}
          <div className="md:col-span-12 lg:col-span-6 space-y-5">
            
            {/* 1. Wide Top News Card */}
            <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/60 aspect-video flex flex-col justify-end p-6">
              <Image
                src={resolveImage(card1, defaultNews[0].image!)}
                alt={card1.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
              
              <div className="relative z-10 space-y-2 max-w-xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {card1.category || 'HOT | TODAY'}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                  {card1.title}
                </h3>
                <div className="pt-1">
                  <Link
                    href={card1.slug ? `/berita/${card1.slug}` : '/berita'}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow-md transition-all"
                  >
                    <span>READ NEWS</span>
                    <span className="text-[10px]">»</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Bottom Row (2 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Bottom Card 1 */}
              <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black/60 aspect-4/3 flex flex-col justify-end p-4">
                <Image
                  src={resolveImage(card2, defaultNews[1].image!)}
                  alt={card2.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
                <div className="relative z-10 space-y-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">
                    {card2.category || 'TODAY'}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                    {card2.title}
                  </h4>
                  <div className="pt-0.5">
                    <Link
                      href={card2.slug ? `/berita/${card2.slug}` : '/berita'}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold shadow transition-all"
                    >
                      <span>READ NEWS</span>
                      <span>»</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Card 2 */}
              <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black/60 aspect-4/3 flex flex-col justify-end p-4">
                <Image
                  src={resolveImage(card3, defaultNews[2].image!)}
                  alt={card3.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
                <div className="relative z-10 space-y-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">
                    {card3.category || 'HOT | TODAY'}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                    {card3.title}
                  </h4>
                  <div className="pt-0.5">
                    <Link
                      href={card3.slug ? `/berita/${card3.slug}` : '/berita'}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold shadow transition-all"
                    >
                      <span>READ NEWS</span>
                      <span>»</span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Column 2 (Middle 3 Cols): Tall Vertical Card */}
          <div className="md:col-span-6 lg:col-span-3">
            <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/60 aspect-9/16 min-h-110 flex flex-col justify-end p-5">
              <Image
                src={resolveImage(cardTall, defaultNews[3].image!)}
                alt={cardTall.title}
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-65"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
              
              <div className="relative z-10 space-y-2.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">
                  HIGHLIGHT
                </span>
                <h4 className="text-sm font-bold text-white line-clamp-3 leading-snug">
                  {cardTall.title}
                </h4>
                <div className="pt-1">
                  <Link
                    href={cardTall.slug ? `/berita/${cardTall.slug}` : '/berita'}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow transition-all"
                  >
                    <span>READ NEWS</span>
                    <span>»</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 (Right 3 Cols): Podcast + Calendar + Blue CTA */}
          <div className="md:col-span-6 lg:col-span-3 space-y-4">
            
            {/* 1. Podcast Card (White card matching mockup) */}
            <div className="bg-white text-neutral-900 rounded-xl p-3.5 shadow-xl border border-neutral-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[9px] font-bold text-blue-600 uppercase tracking-wider">
                  <Radio className="w-2.5 h-2.5 text-red-500 animate-pulse" /> Podcast Streaming
                </div>
                <div className="text-xs font-bold text-neutral-900 truncate">
                  Suara PGRI 1 Lumajang
                </div>
              </div>
            </div>

            {/* 2. Interactive Calendar Widget (White card matching mockup) */}
            <div className="bg-white text-neutral-900 rounded-xl p-4 shadow-xl border border-neutral-200">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-neutral-100">
                <button type="button" aria-label="Bulan Sebelumnya" className="p-0.5 rounded hover:bg-neutral-100 text-neutral-400">
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <div className="font-bold text-xs text-neutral-800">
                  August 2026
                </div>
                <button type="button" aria-label="Bulan Selanjutnya" className="p-0.5 rounded hover:bg-neutral-100 text-neutral-400">
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Days Header */}
              <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-neutral-400 mb-1">
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
              </div>

              {/* Date Cells */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                {calendarCells.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="h-5" />;
                  }
                  const isActive = day === activeDay;
                  return (
                    <div
                      key={`day-${day}`}
                      className={`h-5 flex items-center justify-center rounded-full text-[10px] font-semibold transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Blue Gradient CTA Card (Matching Mockup JOIN NOW! Banner) */}
            <div className="rounded-xl p-4 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-xl relative overflow-hidden space-y-2">
              <div className="text-[9px] font-bold uppercase tracking-wider text-blue-200">
                INFO | AUGUST 2026
              </div>
              
              <h3 className="text-xs sm:text-sm font-black text-white leading-tight">
                JOIN NOW! | Welcoming new members
              </h3>

              <div className="pt-1">
                <Link
                  href="/ppdb"
                  className="w-full py-2 px-3 rounded-lg bg-white hover:bg-neutral-100 text-blue-800 font-black text-[10px] shadow transition-all flex items-center justify-between uppercase tracking-wider"
                >
                  <span>REGISTRATION</span>
                  <span className="text-blue-600 font-bold">»</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
