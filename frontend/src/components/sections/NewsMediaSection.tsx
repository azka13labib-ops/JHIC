'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Radio,
  Pin,
  Newspaper,
  Calendar as CalendarIcon,
  ArrowRight
} from 'lucide-react';
import { getImageUrl } from '@/lib/utils';

interface NewsItem {
  id?: number;
  title: string;
  slug?: string;
  image?: string;
  image_path?: string;
  is_pinned?: boolean;
  published_at?: string;
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

  // Purely use real news from database
  const newsList = initialNews;
  const totalNews = newsList.length;

  const card1 = newsList[0];
  const card2 = newsList[1];
  const card3 = newsList[2];
  const cardTall = newsList[3];

  const hasTallCard = totalNews >= 4;

  const resolveImage = (item: NewsItem) => {
    const raw = item.image_path || item.image;
    if (raw) return getImageUrl(raw);
    return '/image.png'; // Fallback to school campus backdrop
  };

  const formatDate = (item?: NewsItem) => {
    if (!item) return '';
    const dateStr = item.published_at || item.created_at;
    if (!dateStr) return 'TERBARU';
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <section className="relative py-20 lg:py-24 bg-slate-50/70 text-slate-900 overflow-hidden border-t border-slate-200/60">
      {/* Background with subtle architectural campus depth */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/image.png"
          alt="Campus Backdrop"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-10 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-white via-slate-50/80 to-white" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                News & Media.
              </h2>
            </div>
            <div className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Pusat Informasi, Pengumuman & Media Sekolah
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Publikasi berita terkini, agenda kegiatan akademik, dan dokumentasi prestasi SMA PGRI 1 Lumajang.
            </p>
          </div>

          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-2xs hover:shadow-xs transition-all"
          >
            <span>Lihat Semua Berita ({totalNews})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dynamic Grid Layout based on Real News Count */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          
          {/* If No News in Database */}
          {totalNews === 0 && (
            <div className="md:col-span-12 lg:col-span-9 rounded-2xl border border-slate-200 bg-white p-12 text-center flex flex-col items-center justify-center min-h-90 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3">
                <Newspaper className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Belum Ada Berita</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md">
                Publikasi berita dan pengumuman resmi sekolah yang ditambahkan melalui panel admin akan langsung tampil di sini.
              </p>
            </div>
          )}

          {/* Left Column for Real News: Spans 9 cols if <4 items, or 6 cols if 4+ items */}
          {totalNews > 0 && (
            <div className={`md:col-span-12 ${hasTallCard ? 'lg:col-span-6' : 'lg:col-span-9'} space-y-5`}>
              
              {/* 1. Main Headline Card (Card 1) */}
              {card1 && (
                <div className={`relative group rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950 ${totalNews === 1 ? 'aspect-21/9 min-h-75' : 'aspect-video'} flex flex-col justify-end p-6 sm:p-7`}>
                  <Image
                    src={resolveImage(card1)}
                    alt={card1.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-65"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  
                  <div className="relative z-10 space-y-2.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      {card1.is_pinned ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                          <Pin className="w-2.5 h-2.5 fill-amber-400" />
                          <span>SEMATAN | HEADLINE</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                          {formatDate(card1)}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-xl font-bold text-white leading-snug line-clamp-2 drop-shadow-xs">
                      {card1.title}
                    </h3>
                    
                    <div className="pt-1">
                      <Link
                        href={card1.slug ? `/berita/${card1.slug}` : '/berita'}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                      >
                        <span>BACA BERITA</span>
                        <span className="text-[10px]">»</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Sub-Row for News 2 & 3 (Only rendered if they exist in DB) */}
              {(card2 || card3) && (
                <div className={`grid grid-cols-1 ${card2 && card3 ? 'sm:grid-cols-2' : 'grid-cols-1'} gap-5`}>
                  
                  {/* Card 2 */}
                  {card2 && (
                    <div className="relative group rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 aspect-4/3 flex flex-col justify-end p-4 hover:shadow-xl transition-all">
                      <Image
                        src={resolveImage(card2)}
                        alt={card2.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-65"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
                      <div className="relative z-10 space-y-1.5">
                        {card2.is_pinned ? (
                          <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 rounded-full backdrop-blur-md">
                            <Pin className="w-2 h-2 fill-amber-400" />
                            <span>DISEMATKAN</span>
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300">
                            {formatDate(card2)}
                          </span>
                        )}
                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                          {card2.title}
                        </h4>
                        <div className="pt-0.5">
                          <Link
                            href={card2.slug ? `/berita/${card2.slug}` : '/berita'}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold shadow transition-all"
                          >
                            <span>BACA BERITA</span>
                            <span>»</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card 3 */}
                  {card3 && (
                    <div className="relative group rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 aspect-4/3 flex flex-col justify-end p-4 hover:shadow-xl transition-all">
                      <Image
                        src={resolveImage(card3)}
                        alt={card3.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-65"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
                      <div className="relative z-10 space-y-1.5">
                        {card3.is_pinned ? (
                          <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 rounded-full backdrop-blur-md">
                            <Pin className="w-2 h-2 fill-amber-400" />
                            <span>DISEMATKAN</span>
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300">
                            {formatDate(card3)}
                          </span>
                        )}
                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                          {card3.title}
                        </h4>
                        <div className="pt-0.5">
                          <Link
                            href={card3.slug ? `/berita/${card3.slug}` : '/berita'}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold shadow transition-all"
                          >
                            <span>BACA BERITA</span>
                            <span>»</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* Middle Column for 4th News: Only rendered if at least 4 items exist */}
          {hasTallCard && cardTall && (
            <div className="md:col-span-6 lg:col-span-3">
              <div className="relative group rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950 aspect-9/16 min-h-110 flex flex-col justify-end p-5">
                <Image
                  src={resolveImage(cardTall)}
                  alt={cardTall.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-65"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="relative z-10 space-y-2.5">
                  {cardTall.is_pinned ? (
                    <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 rounded-full backdrop-blur-md">
                      <Pin className="w-2 h-2 fill-amber-400" />
                      <span>DISEMATKAN</span>
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300">
                      {formatDate(cardTall)}
                    </span>
                  )}
                  <h4 className="text-sm font-bold text-white line-clamp-3 leading-snug">
                    {cardTall.title}
                  </h4>
                  <div className="pt-1">
                    <Link
                      href={cardTall.slug ? `/berita/${cardTall.slug}` : '/berita'}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow transition-all"
                    >
                      <span>BACA BERITA</span>
                      <span>»</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Column (Always 3 cols): Podcast + Calendar + Registration CTA */}
          <div className="md:col-span-6 lg:col-span-3 space-y-4">
            
            {/* 1. Podcast Card */}
            <div className="bg-white text-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200/90 flex items-center gap-3.5 hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Play className="w-4 h-4 fill-white translate-x-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[9px] font-bold text-blue-600 uppercase tracking-wider">
                  <Radio className="w-2.5 h-2.5 text-red-500 animate-pulse" /> Podcast Streaming
                </div>
                <div className="text-xs font-bold text-slate-900 truncate">
                  Suara PGRI 1 Lumajang
                </div>
              </div>
            </div>

            {/* 2. Calendar Card */}
            <div className="bg-white text-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200/90 text-center hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3 px-1 text-slate-600 text-xs">
                <button type="button" className="p-1 hover:bg-slate-100 rounded-md transition cursor-pointer" aria-label="Previous Month">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <div className="font-bold text-slate-900 text-xs tracking-tight flex items-center gap-1.5 justify-center">
                  <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>Agustus 2026</span>
                </div>
                <button type="button" className="p-1 hover:bg-slate-100 rounded-md transition cursor-pointer" aria-label="Next Month">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Day Labels */}
              <div className="grid grid-cols-7 text-[10px] font-bold text-slate-400 mb-2">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
              </div>

              {/* Day Grid */}
              <div className="grid grid-cols-7 gap-y-1.5 text-xs font-medium text-slate-700">
                {calendarCells.map((day, idx) => {
                  if (day === null) {
                    return <div key={`blank-${idx}`} className="h-6 w-6 mx-auto" />;
                  }

                  const isSelected = day === activeDay;

                  return (
                    <div
                      key={`day-${day}`}
                      className={`h-6 w-6 mx-auto flex items-center justify-center rounded-full text-[11px] font-semibold transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30 scale-105'
                          : 'hover:bg-slate-100 text-slate-700 cursor-pointer'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Registration CTA Card */}
            <div className="rounded-2xl p-5 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-xl shadow-blue-600/20 flex flex-col justify-between min-h-36">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-blue-200">
                  PPDB 2026/2027
                </span>
                <h4 className="text-sm font-extrabold text-white mt-1 leading-snug">
                  Penerimaan Siswa Baru SMA PGRI 1 Lumajang
                </h4>
              </div>
              <div className="pt-3">
                <Link
                  href="/ppdb/daftar"
                  className="w-full bg-white hover:bg-slate-100 text-blue-900 rounded-xl py-2 px-3 text-[11px] font-extrabold uppercase tracking-wider flex items-center justify-between shadow-md transition-all group"
                >
                  <span>DAFTAR SEKARANG</span>
                  <span className="group-hover:translate-x-1 transition-transform">»</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
