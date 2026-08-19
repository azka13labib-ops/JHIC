'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Pin, 
  Newspaper, 
  Calendar as CalendarIcon, 
  ArrowRight,
  ChevronRight
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
  const newsList = initialNews;
  const totalNews = newsList.length;

  const card1 = newsList[0];
  const card2 = newsList[1];
  const card3 = newsList[2];

  const resolveImage = (item: NewsItem) => {
    const raw = item.image_path || item.image;
    if (raw) return getImageUrl(raw);
    return '/image.png';
  };

  const formatDate = (item?: NewsItem) => {
    if (!item) return '';
    const dateStr = item.published_at || item.created_at;
    if (!dateStr) return 'Terbaru';
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <section className="py-16 lg:py-20 bg-slate-50 text-slate-900 border-t border-slate-200/80">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold tracking-wider text-blue-900 uppercase mb-1">
              Warta & Agenda Kampus
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900">
              Kabar Terbaru SMAGRISA
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Publikasi resmi kegiatan akademik, prestasi siswa, dan informasi terkini SMA PGRI 1 Lumajang.
            </p>
          </div>

          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-2xs transition-colors self-start sm:self-auto"
          >
            <span>Semua Berita ({totalNews})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          
          {/* If No News in Database */}
          {totalNews === 0 && (
            <div className="md:col-span-12 lg:col-span-8 rounded-xl border border-slate-200 bg-white p-10 text-center flex flex-col items-center justify-center min-h-75 shadow-xs">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                <Newspaper className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Belum Ada Berita</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md">
                Publikasi berita dan pengumuman resmi yang ditambahkan melalui panel admin akan langsung tampil di sini.
              </p>
            </div>
          )}

          {/* Left Column for Real News */}
          {totalNews > 0 && (
            <div className={`md:col-span-12 ${totalNews >= 4 ? 'lg:col-span-6' : 'lg:col-span-8'} space-y-4`}>
              
              {/* 1. Main Headline Card */}
              {card1 && (
                <div className="relative group rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-950 aspect-video flex flex-col justify-end p-5 sm:p-6">
                  <Image
                    src={resolveImage(card1)}
                    alt={card1.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-500 opacity-70"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
                  
                  <div className="relative z-10 space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      {card1.is_pinned ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/20 border border-amber-400/30 px-2 py-0.5 rounded-md">
                          <Pin className="w-3 h-3" />
                          <span>Headline Disematkan</span>
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-amber-300">
                          {formatDate(card1)}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2">
                      {card1.title}
                    </h3>
                    
                    <div className="pt-1">
                      <Link
                        href={card1.slug ? `/berita/${card1.slug}` : '/berita'}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
                      >
                        <span>Baca Selengkapnya</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Sub-Row for News 2 & 3 */}
              {(card2 || card3) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {card2 && (
                    <Link
                      href={card2.slug ? `/berita/${card2.slug}` : '/berita'}
                      className="group bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-blue-300 transition-colors flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="text-[11px] font-semibold text-blue-700">
                          {formatDate(card2)}
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                          {card2.title}
                        </h4>
                      </div>
                      <div className="pt-3 flex items-center text-[11px] font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
                        <span>Baca Berita</span>
                        <ChevronRight className="w-3 h-3 ml-0.5" />
                      </div>
                    </Link>
                  )}

                  {card3 && (
                    <Link
                      href={card3.slug ? `/berita/${card3.slug}` : '/berita'}
                      className="group bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-blue-300 transition-colors flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="text-[11px] font-semibold text-blue-700">
                          {formatDate(card3)}
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                          {card3.title}
                        </h4>
                      </div>
                      <div className="pt-3 flex items-center text-[11px] font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
                        <span>Baca Berita</span>
                        <ChevronRight className="w-3 h-3 ml-0.5" />
                      </div>
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Right Column: Calendar & Upcoming Agenda Sidebar */}
          <div className="md:col-span-12 lg:col-span-4 space-y-4">
            
            {/* Quick Agenda Widget */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-blue-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Agenda Sekolah
                  </h3>
                </div>
                <Link href="/agenda" className="text-[11px] font-semibold text-blue-600 hover:text-blue-700">
                  Lihat Semua
                </Link>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-md bg-blue-600 text-white flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold uppercase">Agu</span>
                    <span className="text-sm font-black leading-none">17</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Upacara HUT RI ke-81</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Lapangan Utama Kampus • 07.00 WIB</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-md bg-slate-700 text-white flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold uppercase">Sep</span>
                    <span className="text-sm font-black leading-none">10</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Pengumuman Hasil PPDB 2026</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Portal Online & Papan Pengumuman</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Link Card for PPDB */}
            <div className="bg-blue-900 text-white rounded-xl p-5 shadow-xs">
              <span className="text-[10px] font-bold tracking-widest text-[#d4af37] uppercase block mb-1">
                Penerimaan Siswa Baru
              </span>
              <h3 className="text-sm font-bold text-white mb-2">
                Pendaftaran PPDB 2026/2027 Masih Dibuka
              </h3>
              <p className="text-xs text-blue-100 mb-4 leading-relaxed">
                Pilih Jalur Reguler atau Jalur Prestasi secara online tanpa perlu antre di sekolah.
              </p>
              <Link
                href="/ppdb"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#d4af37] hover:bg-[#c49e2e] text-slate-950 text-xs font-bold transition-colors"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
