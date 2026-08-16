'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  GraduationCap, 
  Search, 
  BookOpen, 
  Award, 
  Users,
  Filter
} from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  role: string;
  subject: string;
  category: 'Pimpinan' | 'MIPA & Komputer' | 'Sosial & Humaniora' | 'Bahasa & Seni' | 'BK & Kesiswaan';
  education: string;
  quote?: string;
  image: string;
}

const TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Drs. H. Bambang Sujarwo, M.Pd.',
    role: 'Kepala Sekolah',
    subject: 'Manajemen Pendidikan & Kepemimpinan',
    category: 'Pimpinan',
    education: 'S2 Magister Manajemen Pendidikan - Universitas Negeri Malang',
    quote: 'Mendidik dengan hati, menginspirasi dengan keteladanan, mencetak generasi berkarakter unggul.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Siti Rahmawati, S.Pd., M.Si.',
    role: 'Wakil Kepala Sekolah Bidang Kurikulum',
    subject: 'Matematika Peminatan & Logika',
    category: 'Pimpinan',
    education: 'S2 Matematika Murni - Institut Teknologi Sepuluh Nopember (ITS)',
    quote: 'Kurikulum adaptif dan inovatif adalah kunci membuka potensi intelektual masa depan.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Ahmad Faisal, S.Pd.',
    role: 'Wakil Kepala Sekolah Bidang Kesiswaan',
    subject: 'Pendidikan Jasmani, Olahraga & Kesehatan (PJOK)',
    category: 'Pimpinan',
    education: 'S1 Pendidikan Kepelatihan Olahraga - Universitas Negeri Surabaya',
    quote: 'Disiplin dan sportivitas di lapangan mencerminkan integritas dalam kehidupan nyata.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Ir. Hendra Gunawan, M.Kom.',
    role: 'Guru TIK & Pembina E-Sport',
    subject: 'Informatika & Pemrograman Web',
    category: 'MIPA & Komputer',
    education: 'S2 Teknik Informatika - Universitas Brawijaya',
    quote: 'Kuasai teknologi agar kita menjadi pencipta masa depan, bukan sekadar penonton.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Dewi Lestari, S.Si., M.Pd.',
    role: 'Guru Sains & Pembina OSN Fisika',
    subject: 'Fisika Terapan & Robotika',
    category: 'MIPA & Komputer',
    education: 'S2 Pendidikan Sains - Universitas Jember',
    quote: 'Sains mengajarkan kita rasa ingin tahu yang tak terbatas terhadap kebesaran semesta.',
    image: 'https://images.unsplash.com/photo-1580894732488-824f2b963177?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Budi Santoso, S.Pd.',
    role: 'Guru Kimia & Laboratorium Riset',
    subject: 'Kimia Analitik & Biokimia',
    category: 'MIPA & Komputer',
    education: 'S1 Pendidikan Kimia - Universitas Negeri Malang',
    quote: 'Eksperimen laboratorium menumbuhkan ketelitian berpikir dan inovasi aplikatif.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '7',
    name: 'Nurlaila Fitri, S.Pd.',
    role: 'Guru Biologi & Pembina Adiwiyata',
    subject: 'Biologi Lingkungan & Bioteknologi',
    category: 'MIPA & Komputer',
    education: 'S1 Pendidikan Biologi - Universitas Airlangga',
    quote: 'Mencintai lingkungan hidup adalah manifestasi rasa syukur terhadap kehidupan.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '8',
    name: 'Rudi Hermawan, S.Pd.',
    role: 'Guru Sejarah & Pembina Pasgrisa',
    subject: 'Sejarah Indonesia & Dunia',
    category: 'Sosial & Humaniora',
    education: 'S1 Pendidikan Sejarah - Universitas Negeri Malang',
    quote: 'Bangsa yang besar adalah bangsa yang menghargai dan belajar dari sejarahnya.',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '9',
    name: 'Ratna Wulandari, S.E., M.M.',
    role: 'Guru Ekonomi & Kewirausahaan',
    subject: 'Ekonomi, Akuntansi & Bisnis Kreatif',
    category: 'Sosial & Humaniora',
    education: 'S2 Magister Manajemen - Universitas Brawijaya',
    quote: 'Kreativitas kewirausahaan adalah bekal kemandirian finansial generasi muda.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '10',
    name: 'Drs. Supriyadi, M.Pd.',
    role: 'Guru Sosiologi & Geografi',
    subject: 'Sosiologi & Dinamika Masyarakat',
    category: 'Sosial & Humaniora',
    education: 'S2 Pendidikan Ilmu Pengetahuan Sosial - UM',
    quote: 'Pahami keberagaman sosial untuk menumbuhkan empati dan kerukunan bersama.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '11',
    name: 'Sarah Stephanie, S.Pd., M.Ed.',
    role: 'Guru Bahasa Inggris & Pembina English Club',
    subject: 'Bahasa & Sastra Inggris',
    category: 'Bahasa & Seni',
    education: 'S2 Master of Education - Monash University Australia',
    quote: 'Language is the bridge that connects your dreams to the international stage.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '12',
    name: 'Tri Wahyuni, S.Pd.',
    role: 'Guru Bahasa Indonesia & Pembina Jurnalistik',
    subject: 'Bahasa Indonesia & Penulisan Kreatif',
    category: 'Bahasa & Seni',
    education: 'S1 Pendidikan Bahasa dan Sastra Indonesia - UNEJ',
    quote: 'Bahasa menunjukkan bangsa, kata-kata adalah jendela gagasan dan peradaban.',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '13',
    name: 'Ki Joko Prabowo, S.Sn.',
    role: 'Guru Seni Budaya & Pembina Karawitan',
    subject: 'Seni Rupa, Musik & Karawitan Jawa',
    category: 'Bahasa & Seni',
    education: 'S1 Seni Pertunjukan - Institut Seni Indonesia (ISI) Surakarta',
    quote: 'Seni menghaluskan budi pekerti dan mengabadikan keluhuran budaya leluhur.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '14',
    name: 'Nur Aini Khodijah, S.Psi., M.Psi., Psikolog',
    role: 'Koordinator Bimbingan Konseling (BK)',
    subject: 'Psikologi Pendidikan & Konseling Karir',
    category: 'BK & Kesiswaan',
    education: 'S2 Profesi Psikologi Pendidikan - Universitas Airlangga',
    quote: 'Setiap anak memiliki bintangnya masing-masing, tugas kami mendampingi agar mereka bersinar.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '15',
    name: 'Ustadz M. Zainal Arifin, S.Pd.I.',
    role: 'Guru PAI & Pembina Al-Banjari',
    subject: 'Pendidikan Agama Islam & Budi Pekerti',
    category: 'BK & Kesiswaan',
    education: 'S1 Pendidikan Agama Islam - UIN Kiai Haji Achmad Siddiq',
    quote: 'Ilmu tanpa adab bagaikan pohon tanpa buah, jadikan taqwa lentera setiap langkah.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
  },
];

const CATEGORIES = [
  'Semua Bidang',
  'Pimpinan',
  'MIPA & Komputer',
  'Sosial & Humaniora',
  'Bahasa & Seni',
  'BK & Kesiswaan',
];

export default function GuruPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua Bidang');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeachers = useMemo(() => {
    return TEACHERS.filter((t) => {
      const matchCategory = selectedCategory === 'Semua Bidang' || t.category === selectedCategory;
      const matchSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <section className="relative bg-linear-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b border-slate-200 py-16 sm:py-20 overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 text-blue-700">
            <GraduationCap className="w-3.5 h-3.5" /> Tenaga Pendidik Profesional
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight text-slate-900">
            Direktori Guru & Staf
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Mengenal lebih dekat jajaran pendidik berdedikasi tinggi, berpendidikan magister, dan berpengalaman di SMA PGRI 1 Lumajang.
          </p>

          {/* Breadcrumb */}
          <div className="flex justify-center items-center gap-2 text-xs sm:text-sm text-slate-500 mt-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span>Profil</span>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Direktori Guru</span>
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
                placeholder="Cari nama guru atau mata pelajaran..."
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
            <div className="text-xs font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              Menampilkan <span className="font-black text-blue-600">{filteredTeachers.length}</span> dari {TEACHERS.length} guru
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Bidang:
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

        {/* Teachers Grid */}
        {filteredTeachers.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">Data guru tidak ditemukan</h3>
            <p className="text-xs text-slate-500 mt-1">Coba gunakan nama guru atau bidang studi lainnya.</p>
            <button
              onClick={() => { setSelectedCategory('Semua Bidang'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo & Role Container */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                    
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-blue-700 shadow-xs">
                        {teacher.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                        {teacher.role}
                      </span>
                      <h2 className="text-base sm:text-lg font-extrabold text-white leading-snug drop-shadow-xs">
                        {teacher.name}
                      </h2>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-900 block">Mata Pelajaran:</span>
                          <span className="text-slate-600 font-medium">{teacher.subject}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                        <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-900 block">Latar Belakang Pendidikan:</span>
                          <span className="text-slate-600 font-medium">{teacher.education}</span>
                        </div>
                      </div>
                    </div>

                    {teacher.quote && (
                      <div className="pt-3 border-t border-slate-100 text-xs italic text-slate-500 bg-slate-50/70 p-3 rounded-xl">
                        &ldquo;{teacher.quote}&rdquo;
                      </div>
                    )}
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
