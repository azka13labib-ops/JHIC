'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Trophy, 
  Search, 
  Clock, 
  UserCheck, 
  Filter
} from 'lucide-react';

interface Extracurricular {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  desc: string;
  schedule: string;
  mentor: string;
  image: string;
  tagColor: string;
  badge: string;
}

const EXTRACURRICULARS: Extracurricular[] = [
  {
    id: 'basket',
    name: 'Bola Basket',
    category: 'Olahraga',
    badge: 'Olahraga & Atletik',
    shortDesc: 'Melatih kelincahan, sportivitas, dan strategi tim dalam kompetisi DBL dan turnamen daerah.',
    desc: 'Ekstrakurikuler Bola Basket membina fisik prima, kemampuan dribbling, shooting, passing, serta kekompakan tim untuk berkompetisi di ajang DBL dan kejuaraan antar-pelajar se-Jawa Timur.',
    schedule: 'Selasa & Jumat (15.30 - 17.30 WIB)',
    mentor: 'Coach Tim Basket SMAGRISA',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  {
    id: 'futsal',
    name: 'Futsal',
    category: 'Olahraga',
    badge: 'Olahraga & Atletik',
    shortDesc: 'Mengasah teknik permainan cepat, passing presisi, dan kekompakan tim.',
    desc: 'Wadah bagi siswa penggemar sepak bola mini untuk mengasah teknik kontrol bola, skema serangan cepat, stamina fisik, dan mental bertanding dalam turnamen futsal regional.',
    schedule: 'Senin & Kamis (15.30 - 17.30 WIB)',
    mentor: 'Pelatih Futsal Berlisensi',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'karawitan',
    name: 'Seni Karawitan',
    category: 'Seni & Budaya',
    badge: 'Seni Tradisional',
    shortDesc: 'Melestarikan harmoni gamelan Jawa, laras pelog & slendro, serta tembang nusantara.',
    desc: 'Kegiatan seni musik tradisional gamelan yang melatih kepekaan rasa, kerjasama musikal tabuhan saron, bonang, kendang, dan gong, serta mengiringi berbagai pentas budaya sekolah.',
    schedule: 'Rabu (15.00 - 17.00 WIB)',
    mentor: 'Instruktur Sanggar Seni Gamelan',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 'volly',
    name: 'Bola Voli',
    category: 'Olahraga',
    badge: 'Olahraga & Atletik',
    shortDesc: 'Melatih kekuatan smash, servis akurat, dan koordinasi bertahan beregu.',
    desc: 'Mengembangkan keterampilan dasar servis atas/bawah, passing bawah, setting bola, spike tajam, dan blokade rapat untuk persiapan kejuaraan O2SN dan liga voli pelajar.',
    schedule: 'Rabu & Sabtu (15.30 - 17.30 WIB)',
    mentor: 'Instruktur PBVSI',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'band',
    name: 'Musik Band & Akustik',
    category: 'Seni & Budaya',
    badge: 'Musik Kreatif',
    shortDesc: 'Wadah musikalitas vokal, gitar, bass, drum, dan keyboard untuk pentas seni sekolah.',
    desc: 'Mengekspresikan bakat bermusik dalam aransemen lagu pop, rock, jazz, maupun akustik religi. Rutin mengisi panggung seremonial sekolah dan festival band pelajar.',
    schedule: 'Jumat (14.00 - 17.00 WIB)',
    mentor: 'Guru Pembina Seni Musik',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'esport',
    name: 'E-Sport',
    category: 'Teknologi',
    badge: 'Digital & Gaming',
    shortDesc: 'Pembinaan gaming strategis kompetitif dengan etika digital dan teamwork terarah.',
    desc: 'Membimbing atlet esports sekolah pada nomor Mobile Legends, PUBG Mobile, dan game kompetitif lainnya dengan fokus pada strategi makro/mikro, manajemen waktu, dan sportivitas digital.',
    schedule: 'Sabtu (13.00 - 15.30 WIB)',
    mentor: 'Komunitas E-Sport Kampus',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    id: 'english-club',
    name: 'English Club',
    category: 'Akademik & Bahasa',
    badge: 'Bahasa Asing',
    shortDesc: 'Meningkatkan rasa percaya diri berbahasa Inggris, debat, dan public speaking.',
    desc: 'Mengasah kemampuan percakapan aktif bahasa Inggris, persiapan lomba English Debate, Storytelling, Speech Contest, serta bimbingan tes kemahiran bahasa internasional.',
    schedule: 'Kamis (15.00 - 16.30 WIB)',
    mentor: 'Guru Bahasa Inggris & Native Speaker Guest',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    id: 'math-club',
    name: 'Math Club',
    category: 'Akademik & Bahasa',
    badge: 'Sains & Olimpiade',
    shortDesc: 'Pendalaman logika analitik dan pembinaan intensif Olimpiade Sains Nasional (OSN).',
    desc: 'Klub eksplorasi matematika lanjut, problem solving analitis tingkat tinggi (HOTS), serta bimbingan intensif peserta didik menuju kompetisi OSN Matematika tingkat kota hingga nasional.',
    schedule: 'Selasa (15.00 - 16.30 WIB)',
    mentor: 'Tim Pembina OSN Matematika',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    id: 'paskibra',
    name: 'Paskibra',
    category: 'Kepemimpinan',
    badge: 'Karakter & Disiplin',
    shortDesc: 'Menanamkan kedisiplinan, formasi baris-berbaris (PBB) presisi, dan patriotisme.',
    desc: 'Pasukan Pengibar Bendera Sekolah yang melatih postur, kesigapan baris-berbaris formasi, jiwa kepemimpinan tangguh, dan persiapan seleksi Paskibraka tingkat Kabupaten Lumajang.',
    schedule: 'Senin & Kamis (15.30 - 17.30 WIB)',
    mentor: 'Purna Paskibraka Indonesia (PPI)',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-red-50 text-red-700 border-red-200',
  },
  {
    id: 'albanjari',
    name: 'Al-Banjari (Hadrah)',
    category: 'Keagamaan',
    badge: 'Seni Religi Islam',
    shortDesc: 'Melantunkan sholawat nabi dengan ketukan rebana Al-Banjari yang harmonis.',
    desc: 'Ekstrakurikuler seni rebana klasik dan sholawat yang menumbuhkan kecintaan spiritual kepada Rasulullah SAW, mengisi peringatan Maulid Nabi, dan festival Al-Banjari antar-pelajar.',
    schedule: 'Senin (15.30 - 17.00 WIB)',
    mentor: 'Ustadz Pembina Seni Hadrah',
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  {
    id: 'tari',
    name: 'Seni Tari Tradisional',
    category: 'Seni & Budaya',
    badge: 'Seni Pertunjukan',
    shortDesc: 'Melestarikan seni tari daerah Jawa Timur dan kreasi nusantara untuk ajang FLS2N.',
    desc: 'Mempelajari wiraga, wirama, dan wirasa tari tradisional khas Jawa Timur seperti Gandrung, Remo, serta tari kreasi baru untuk tampil di ajang FLS2N dan festival seni budaya.',
    schedule: 'Kamis (15.00 - 17.00 WIB)',
    mentor: 'Koreografer & Guru Seni Tari',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
  },
  {
    id: 'pnr',
    name: 'PMR / PNR (Palang Merah)',
    category: 'Kepemimpinan',
    badge: 'Kemanusiaan & Medis',
    shortDesc: 'Pelatihan pertolongan pertama (PP), tanggap darurat medis, dan aksi sosial kemanusiaan.',
    desc: 'Palang Merah Remaja mendidik siswa siaga medis pertolongan pertama pada kecelakaan, evakuasi tandu, perawatan keluarga, donor darah, dan bakti sosial masyarakat.',
    schedule: 'Rabu (15.30 - 17.00 WIB)',
    mentor: 'Korps Sukarela PMI Kabupaten',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    id: 'pencak-silat',
    name: 'Pencak Silat',
    category: 'Olahraga',
    badge: 'Bela Diri Tradisional',
    shortDesc: 'Mengembangkan ketahanan fisik, jurus pertahanan diri, dan prestasi kejuaraan IPSI.',
    desc: 'Olahraga seni bela diri warisan luhur nusantara yang melatih stamina, kelenturan jurus, ketangkasan tanding, pembinaan mental satria, dan prestasi di kejuaraan O2SN / IPSI.',
    schedule: 'Sabtu (07.00 - 09.30 WIB)',
    mentor: 'Pendekar Perguruan Pencak Silat',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
];

const CATEGORIES = [
  'Semua',
  'Olahraga',
  'Seni & Budaya',
  'Akademik & Bahasa',
  'Kepemimpinan',
  'Keagamaan',
  'Teknologi',
];

export default function EkstrakurikulerPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return EXTRACURRICULARS.filter((item) => {
      const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.badge.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <section className="relative bg-linear-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b border-slate-200 py-16 sm:py-20 overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 text-blue-700">
            <Trophy className="w-3.5 h-3.5" /> Pengembangan Bakat & Minat
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight text-slate-900">
            13 Ekstrakurikuler Unggulan
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Wadah eksplorasi potensi diri, kepemimpinan, seni budaya, sains, dan prestasi olahraga peserta didik SMA PGRI 1 Lumajang.
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
        
        {/* Search & Category Filter Controls */}
        <div className="mb-10 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari ekstrakurikuler (misal: basket, silat)..."
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

            {/* Results Count Badge */}
            <div className="text-xs font-semibold text-slate-500">
              Menampilkan <span className="font-bold text-blue-600">{filteredItems.length}</span> dari {EXTRACURRICULARS.length} ekstrakurikuler
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Kategori:
            </span>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-slate-100/80 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Extracurricular Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">Tidak ada ekstrakurikuler ditemukan</h3>
            <p className="text-xs text-slate-500 mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
            <button
              onClick={() => { setSelectedCategory('Semua'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition"
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
                    
                    <div className="absolute top-3.5 left-3.5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md bg-white/95 shadow-xs ${item.tagColor}`}>
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                      {item.desc}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-700">Jadwal:</span>
                        <span className="text-slate-500">{item.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-semibold text-slate-700">Pembina:</span>
                        <span className="text-slate-500">{item.mentor}</span>
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
  );
}
