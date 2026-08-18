'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Trophy, 
  Search, 
  Clock, 
  UserCheck, 
  Calendar,
  Compass,
  ArrowRight
} from 'lucide-react';

interface Extracurricular {
  no: number;
  id: string;
  name: string;
  category: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis';
  schedule: string;
  desc: string;
  mentor: string;
  image: string;
  tagColor: string;
  badge: string;
}

const MANDATORY_CLUB = {
  name: 'Gerakan Pramuka (Gugus Depan SMAGRISA)',
  badge: 'Ekstrakurikuler Wajib',
  desc: 'Pendidikan kepramukaan wajib bagi seluruh peserta didik guna membentuk karakter disiplin, kemandirian, kepemimpinan, keterampilan bertahan hidup, dan jiwa gotong royong.',
  schedule: 'Jumat, 13.30 - 15.00 WIB',
  mentor: 'Mabigus & Pembina Pramuka SMAGRISA',
  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
};

const ELECTIVE_CLUBS: Extracurricular[] = [
  {
    no: 1,
    id: 'pasgrisa',
    name: 'PASGRISA (Paskibra SMAGRISA)',
    category: 'Kepemimpinan',
    day: 'Senin',
    badge: 'Pasukan Pengibar Bendera',
    desc: 'Melatih kedisiplinan, ketahanan fisik, formasi baris-berbaris (PBB) presisi tinggi, serta seleksi Paskibraka Kabupaten Lumajang.',
    schedule: 'Senin, 15.00 - 16.30 WIB',
    mentor: 'Instruktur Purna Paskibraka',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-red-50 text-red-700 border-red-200',
  },
  {
    no: 2,
    id: 'futsal',
    name: 'FUTSAL',
    category: 'Olahraga',
    day: 'Senin',
    badge: 'Olahraga & Atletik',
    desc: 'Mengasah taktik permainan cepat, kontrol bola, shooting akurat, stamina fisik, dan kekompakan tim dalam turnamen antar-pelajar.',
    schedule: 'Senin, 15.00 - 16.30 WIB',
    mentor: 'Coach Futsal Sekolah',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    no: 3,
    id: 'basket',
    name: 'BASKET',
    category: 'Olahraga',
    day: 'Selasa',
    badge: 'Olahraga & Atletik',
    desc: 'Membina fisik prima, kemampuan dribble, tembakan akurat, pertahanan rapat, dan strategi tim dalam kejuaraan basket pelajar & DBL.',
    schedule: 'Selasa, 15.00 - 16.30 WIB',
    mentor: 'Coach Basket SMAGRISA',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  {
    no: 4,
    id: 'math-club',
    name: 'MATHEMATICS STUDY CLUB',
    category: 'Akademik & Sains',
    day: 'Selasa',
    badge: 'Sains & Olimpiade',
    desc: 'Pendalaman penalaran logika analitis, bedah soal HOTS, dan pembinaan intensif Olimpiade Sains Nasional (OSN) Matematika.',
    schedule: 'Selasa, 15.00 - 16.30 WIB',
    mentor: 'Tim Pembina OSN Matematika',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    no: 5,
    id: 'albanjari',
    name: 'ALBANJARI',
    category: 'Keagamaan',
    day: 'Selasa',
    badge: 'Seni Religi & Sholawat',
    desc: 'Melantunkan sholawat nabi dengan ketukan rebana Al-Banjari yang harmonis serta tampil di festival hadrah dan peringatan hari besar Islam.',
    schedule: 'Selasa, 15.00 - 16.30 WIB',
    mentor: 'Ustadz Pembina Seni Hadrah',
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  {
    no: 6,
    id: 'game-sport',
    name: 'GAME SPORT (E-Sport)',
    category: 'Teknologi & Gaming',
    day: 'Selasa',
    badge: 'E-Sport & Strategi Digital',
    desc: 'Pembinaan atlet game digital kompetitif terarah (Mobile Legends, PUBG Mobile) dengan etika digital, komunikasi, dan strategi teamwork.',
    schedule: 'Selasa, 15.00 - 16.30 WIB',
    mentor: 'Instruktur Komunitas E-Sport',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    no: 7,
    id: 'tari',
    name: 'TARI',
    category: 'Seni & Budaya',
    day: 'Rabu',
    badge: 'Seni Tari Tradisional',
    desc: 'Mempelajari wiraga, wirama, dan wirasa tari tradisional Jawa Timur dan kreasi nusantara untuk ajang FLS2N serta seremonial resmi.',
    schedule: 'Rabu, 15.00 - 16.30 WIB',
    mentor: 'Pelatih Seni Tari Tradisional',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
  },
  {
    no: 8,
    id: 'volly',
    name: 'VOLLY',
    category: 'Olahraga',
    day: 'Rabu',
    badge: 'Olahraga & Atletik',
    desc: 'Mengasah kekuatan smash, servis presisi, pertahanan passing bawah, dan kerjasama tim dalam liga bola voli pelajar.',
    schedule: 'Rabu, 15.00 - 16.30 WIB',
    mentor: 'Instruktur PBVSI',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    no: 9,
    id: 'pmr',
    name: 'PMR (Palang Merah Remaja)',
    category: 'Kemanusiaan',
    day: 'Rabu',
    badge: 'Kemanusiaan & Medis',
    desc: 'Pelatihan pertolongan pertama pada kecelakaan (PP), evakuasi tandu, perawatan keluarga, donor darah, dan jiwa sukarelawan.',
    schedule: 'Rabu, 15.00 - 16.30 WIB',
    mentor: 'Korps Sukarela PMI',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    no: 10,
    id: 'karawitan',
    name: 'KARAWITAN',
    category: 'Seni & Budaya',
    day: 'Kamis',
    badge: 'Gamelan Jawa Tradisional',
    desc: 'Melestarikan harmoni gamelan slendro & pelog, kepekaan rasa musikal Jawa, serta mengiringi pergelaran seni dan wayang.',
    schedule: 'Kamis, 15.00 - 16.30 WIB',
    mentor: 'Instruktur Sanggar Karawitan',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    no: 11,
    id: 'band',
    name: 'BAND',
    category: 'Seni & Budaya',
    day: 'Kamis',
    badge: 'Musik & Akustik',
    desc: 'Wadah musikalitas vokal, gitar, drum, keyboard, dan bass untuk menyalurkan kreativitas di pentas seni dan festival band pelajar.',
    schedule: 'Kamis, 15.00 - 16.30 WIB',
    mentor: 'Guru Pembina Seni Musik',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    no: 12,
    id: 'english-club',
    name: 'ENGLISH STUDY CLUB',
    category: 'Akademik & Bahasa',
    day: 'Kamis',
    badge: 'Bahasa & Public Speaking',
    desc: 'Meningkatkan kemahiran bahasa Inggris aktif, debat kompetitif, speech contest, storytelling, dan persiapan sertifikasi.',
    schedule: 'Kamis, 15.00 - 16.30 WIB',
    mentor: 'Guru Bahasa Inggris',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    no: 13,
    id: 'pencak-silat',
    name: 'PENCAK SILAT',
    category: 'Olahraga',
    day: 'Kamis',
    badge: 'Bela Diri Tradisional',
    desc: 'Mengembangkan ketahanan fisik, jurus pertahanan diri, filosofi budi pekerti luhur, dan prestasi kejuaraan IPSI / O2SN.',
    schedule: 'Kamis, 15.00 - 16.30 WIB',
    mentor: 'Pendekar Perguruan Silat',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
];

const DAYS = ['Semua Hari', 'Senin', 'Selasa', 'Rabu', 'Kamis'] as const;

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
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:border-blue-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 w-full bg-slate-100 border-b border-slate-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/95 text-slate-800 border border-slate-200 shadow-2xs">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                      {item.day} • {item.badge}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Clock className="w-3 h-3 text-blue-600 shrink-0" />
                    <span>{item.schedule}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <UserCheck className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{item.mentor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
