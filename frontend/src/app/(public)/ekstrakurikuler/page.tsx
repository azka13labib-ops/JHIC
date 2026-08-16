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
  Sparkles,
  Compass
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

const DAYS = ['Semua Hari', 'Senin', 'Selasa', 'Rabu', 'Kamis'];

export default function EkstrakurikulerPage() {
  const [selectedDay, setSelectedDay] = useState('Semua Hari');
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
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <section className="relative bg-linear-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b border-slate-200 py-16 sm:py-20 overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 text-blue-700">
            <Trophy className="w-3.5 h-3.5" /> Program Minat & Bakat Siswa
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight text-slate-900">
            Ekstrakurikuler Sekolah
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Wadah pengembangan karakter, kepemimpinan, kreativitas seni, sains, dan prestasi olahraga SMA PGRI 1 Lumajang.
          </p>

          {/* Breadcrumb */}
          <div className="flex justify-center items-center gap-2 text-xs sm:text-sm text-slate-500 mt-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Ekstrakurikuler</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">

        {/* 1. Ekstrakurikuler Wajib Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-800 mb-4">
            <Compass className="w-3.5 h-3.5" /> Ekstrakurikuler Wajib Nasional
          </div>
          
          <div className="bg-linear-to-br from-amber-500/10 via-white to-orange-500/10 border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-center gap-8 group">
            <div className="relative h-64 w-full lg:w-96 rounded-2xl overflow-hidden shrink-0 shadow-md">
              <Image
                src={MANDATORY_CLUB.image}
                alt={MANDATORY_CLUB.name}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-white shadow-md">
                  WAJIB KELAS X & XI
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                  {MANDATORY_CLUB.name}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {MANDATORY_CLUB.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">Jadwal Latihan:</span>
                    <span className="text-slate-500">{MANDATORY_CLUB.schedule}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">Pembina:</span>
                    <span className="text-slate-500">{MANDATORY_CLUB.mentor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Ekstrakurikuler Pilihan Section */}
        <div className="pt-8 border-t border-slate-200/80">
          
          <div className="text-center md:text-left mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 border border-blue-200 text-blue-700 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> 13 Cabang Ekstrakurikuler Pilihan
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Pilihan Minat, Bakat & Prestasi
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Setiap siswa wajib memilih minimal 1 ekstrakurikuler pilihan sesuai minat dan potensi diri.
              </p>
            </div>

            {/* Results Count Badge */}
            <div className="text-xs font-bold text-slate-500 self-center md:self-end bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              Menampilkan <span className="text-blue-600 font-black">{filteredItems.length}</span> dari {ELECTIVE_CLUBS.length} ekstrakurikuler
            </div>
          </div>

          {/* Search & Day Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari ekstrakurikuler (futsal, basket, tari, silat)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Day Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
                  <Calendar className="w-3.5 h-3.5" /> Hari Latihan:
                </span>
                {DAYS.map((day) => {
                  const active = selectedDay === day;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                        active
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : 'bg-slate-100/80 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Cards Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">Tidak ada ekstrakurikuler ditemukan</h3>
              <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian atau pilih filter hari yang lain.</p>
              <button
                onClick={() => { setSelectedDay('Semua Hari'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
                >
                  <div>
                    {/* Photo Cover with Badge */}
                    <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-black flex items-center justify-center">
                          {item.no}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md bg-white/95 shadow-xs ${item.tagColor}`}>
                          {item.badge}
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-3">
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-blue-600/90 text-white backdrop-blur-md shadow-xs">
                          {item.day}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                        {item.desc}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="font-semibold text-slate-700">Jadwal:</span>
                          <span className="text-slate-500 font-medium">{item.schedule}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-semibold text-slate-700">Pembina:</span>
                          <span className="text-slate-500 font-medium">{item.mentor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
