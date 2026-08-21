'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, Clock, UserCheck } from 'lucide-react';
import { MANDATORY_CLUB, ELECTIVE_CLUBS, DAYS } from '@/components/ekstrakurikuler/data';
import { EkstrakurikulerCard } from '@/components/ekstrakurikuler/EkstrakurikulerCard';

export default function EkstrakurikulerPage() {
  const [selectedDay, setSelectedDay] = useState<typeof DAYS[number]>('Semua Hari');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return ELECTIVE_CLUBS.filter((item) => {
      const matchDay = selectedDay === 'Semua Hari' || item.day === selectedDay;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDay && matchSearch;
    });
  }, [selectedDay, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Editorial Header */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-900 uppercase block mb-1">
              Pengembangan Diri & Karakter
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Ekstrakurikuler SMAGRISA
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Program pembinaan bakat, kepemimpinan, sains, seni budaya, dan olahraga prestasi yang resmi diselenggarakan di SMA PGRI 1 Lumajang.
            </p>
          </div>

          {/* Search & Day Filters */}
          <div className="mt-8 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari ekstrakurikuler, cabang olahraga, seni..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9.5 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedDay === day
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl space-y-10">
        
        {/* Mandatory Club Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              1. Ekstrakurikuler Wajib
            </span>
          </div>

          <div className="bg-white border border-blue-200 rounded-xl p-5 sm:p-6 shadow-2xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="relative md:col-span-4 h-44 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={MANDATORY_CLUB.image}
                alt={MANDATORY_CLUB.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="md:col-span-8 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                  {MANDATORY_CLUB.badge}
                </span>
                <span className="text-xs font-semibold text-slate-500">Wajib Seluruh Siswa Kelas X & XI</span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {MANDATORY_CLUB.name}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                {MANDATORY_CLUB.desc}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-700 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span className="font-semibold">{MANDATORY_CLUB.schedule}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{MANDATORY_CLUB.mentor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 13 Elective Clubs */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              2. 13 Ekstrakurikuler Pilihan (Menampilkan {filteredItems.length} Klub)
            </span>
            {selectedDay !== 'Semua Hari' && (
              <span className="text-xs font-semibold text-blue-700">Hari: {selectedDay}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <EkstrakurikulerCard key={item.id} item={item} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
