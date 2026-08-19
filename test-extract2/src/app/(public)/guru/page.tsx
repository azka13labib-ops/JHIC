'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  BookOpen, 
  GraduationCap
} from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  role: string;
  subject: string;
  category: 'Semua' | 'Pimpinan' | 'MIPA & Komputer' | 'Sosial & Humaniora' | 'Bahasa & Seni' | 'BK & Kesiswaan';
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
    role: 'Waka Bidang Kurikulum',
    subject: 'Matematika Peminatan & Logika',
    category: 'Pimpinan',
    education: 'S2 Matematika Murni - Institut Teknologi Sepuluh Nopember (ITS)',
    quote: 'Kurikulum adaptif dan inovatif adalah kunci membuka potensi intelektual masa depan.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Ahmad Faisal, S.Pd.',
    role: 'Waka Bidang Kesiswaan',
    subject: 'Pendidikan Jasmani & Kesehatan (PJOK)',
    category: 'Pimpinan',
    education: 'S1 Pendidikan Kepelatihan Olahraga - Universitas Negeri Surabaya',
    quote: 'Disiplin dan sportivitas di lapangan mencerminkan integritas dalam kehidupan nyata.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Ir. Hendra Gunawan, M.Kom.',
    role: 'Guru Informatika & Komputer',
    subject: 'Informatika & Pemrograman Web',
    category: 'MIPA & Komputer',
    education: 'S2 Teknik Informatika - Universitas Brawijaya',
    quote: 'Kuasai teknologi agar kita menjadi pencipta masa depan, bukan sekadar penonton.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Dewi Lestari, S.Si., M.Pd.',
    role: 'Guru Fisika & Pembina OSN',
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
    role: 'Guru Biologi & Lingkungan',
    subject: 'Biologi Lingkungan & Bioteknologi',
    category: 'MIPA & Komputer',
    education: 'S1 Pendidikan Biologi - Universitas Airlangga',
    quote: 'Mencintai lingkungan hidup adalah manifestasi rasa syukur terhadap kehidupan.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '8',
    name: 'Rudi Hermawan, S.Pd.',
    role: 'Guru Sejarah Indonesia',
    subject: 'Sejarah Nasional & Kebudayaan',
    category: 'Sosial & Humaniora',
    education: 'S1 Pendidikan Sejarah - Universitas Negeri Malang',
    quote: 'Bangsa yang besar adalah bangsa yang memahami dan menghargai akar sejarahnya.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '9',
    name: 'Dra. Sri Wahyuni',
    role: 'Guru Sosiologi & Riset Sosial',
    subject: 'Sosiologi & Antropologi Terapan',
    category: 'Sosial & Humaniora',
    education: 'S1 Sosiologi - Universitas Gadjah Mada (UGM)',
    quote: 'Empati sosial dan berpikir kritis adalah fondasi masyarakat yang berkeadilan.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '10',
    name: 'Agus Purnomo, S.E., M.M.',
    role: 'Guru Ekonomi & Akuntansi',
    subject: 'Ekonomi Manajerial & Literasi Finansial',
    category: 'Sosial & Humaniora',
    education: 'S2 Magister Manajemen - Universitas Brawijaya',
    quote: 'Kecerdasan finansial dan wirausaha kreatif memerdekakan masa depan generasi muda.',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '11',
    name: 'Nurul Hidayati, S.Pd.',
    role: 'Guru Bahasa Inggris',
    subject: 'English Literacy, Debate & TOEFL Prep',
    category: 'Bahasa & Seni',
    education: 'S1 Pendidikan Bahasa Inggris - Universitas Negeri Surabaya',
    quote: 'Language connects diverse minds; fluency gives you wings to explore the world.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '12',
    name: 'Bayu Wicaksono, S.Sn.',
    role: 'Guru Seni Rupa & Karawitan',
    subject: 'Seni Musik Tradisional & Desain Grafis',
    category: 'Bahasa & Seni',
    education: 'S1 Seni Pertunjukan - Institut Seni Indonesia (ISI) Yogyakarta',
    quote: 'Seni mengasah kepekaan rasa dan menjaga keluhuran warisan adiluhung nusantara.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '13',
    name: 'Eka Pratiwi, S.Pd.',
    role: 'Guru Bahasa Indonesia',
    subject: 'Sastra Indonesia, Jurnalistik & Literasi',
    category: 'Bahasa & Seni',
    education: 'S1 Pendidikan Bahasa & Sastra Indonesia - Universitas Jember',
    quote: 'Kata adalah cermin pemikiran; menulis adalah cara kita meninggalkan jejak abadi.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '14',
    name: 'Drs. H. M. Mansyur, M.Pd.I.',
    role: 'Guru Pendidikan Agama Islam',
    subject: 'Pendidikan Agama Islam, Fiqih & Akhlak',
    category: 'BK & Kesiswaan',
    education: 'S2 Pendidikan Agama Islam - UIN Maulana Malik Ibrahim Malang',
    quote: 'Ilmu tanpa adab bagaikan pohon tanpa buah; kejujuran adalah mahkota sejati.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '15',
    name: 'Rina Anggraini, S.Psi., M.Psi.',
    role: 'Koordinator Bimbingan Konseling',
    subject: 'Konseling Akademik, Karier & Minat Bakat PTN',
    category: 'BK & Kesiswaan',
    education: 'S2 Psikologi Pendidikan - Universitas Airlangga',
    quote: 'Setiap anak istimewa; tugas kami membimbing mereka menemukan jalan terbaiknya.',
    image: 'https://images.unsplash.com/photo-1580894732488-824f2b963177?q=80&w=600&auto=format&fit=crop',
  },
];

const CATEGORIES = [
  'Semua',
  'Pimpinan',
  'MIPA & Komputer',
  'Sosial & Humaniora',
  'Bahasa & Seni',
  'BK & Kesiswaan',
] as const;

export default function GuruPage() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeachers = useMemo(() => {
    return TEACHERS.filter((teacher) => {
      const matchCategory = activeCategory === 'Semua' || teacher.category === activeCategory;
      const matchSearch =
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.education.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Editorial Header */}
      <div className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-900 uppercase block mb-1">
              Direktori Tenaga Pendidik
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Dewan Guru & Tenaga Kependidikan
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Profil tenaga pendidik profesional dan berdedikasi SMA PGRI 1 Lumajang yang mendampingi siswa meraih prestasi akademik dan keluhuran budi pekerti.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama guru, mata pelajaran, atau gelar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9.5 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
            </div>

            {/* Department Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Directory Content List */}
      <div className="container mx-auto px-4 max-w-6xl py-8 sm:py-12">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Menampilkan {filteredTeachers.length} Tenaga Pendidik
          </span>
          {activeCategory !== 'Semua' && (
            <span className="text-xs font-semibold text-blue-700">
              Kategori: {activeCategory}
            </span>
          )}
        </div>

        {filteredTeachers.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">Tidak ada guru yang sesuai</h3>
            <p className="text-xs text-slate-500 mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-blue-300 transition-colors flex gap-4 items-start"
              >
                {/* Photo */}
                <div className="relative w-18 h-22 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    sizes="80px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                      {teacher.category}
                    </span>
                  </div>

                  <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {teacher.name}
                  </h2>

                  <div className="text-[11px] font-medium text-slate-600">
                    {teacher.role}
                  </div>

                  <div className="text-[11px] text-slate-500 line-clamp-1">
                    <span className="font-semibold text-slate-700">Bidang:</span> {teacher.subject}
                  </div>

                  <div className="pt-1 flex items-center gap-1 text-[10px] text-slate-500 border-t border-slate-100">
                    <GraduationCap className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{teacher.education}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Guidance */}
        <div className="mt-10 p-5 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Ingin berkonsultasi dengan Guru Bimbingan Konseling atau Wali Kelas?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Layanan konsultasi terbuka untuk siswa dan wali murid pada jam kerja sekolah (08.00–15.00 WIB).
            </p>
          </div>
          <Link
            href="/kontak"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shrink-0 transition-colors"
          >
            Hubungi Sekolah
          </Link>
        </div>

      </div>

    </div>
  );
}
