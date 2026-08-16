import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  Laptop, 
  Microscope, 
  BookOpen, 
  Mic, 
  Trophy, 
  Landmark, 
  Tv, 
  Trees,
  CheckCircle2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fasilitas & Sarana Prasarana | SMA PGRI 1 Lumajang',
  description: 'Eksplorasi sarana prasarana modern, laboratorium komputer, laboratorium sains, studio podcast, perpustakaan digital, dan fasilitas olahraga SMA PGRI 1 Lumajang.',
};

export const revalidate = 86400;

export default function FasilitasPage() {
  const facilities = [
    {
      icon: Laptop,
      title: 'Laboratorium Komputer & Multimedia',
      specs: ['PC Processor Core i7 & GPU Dedikasi', 'Jaringan Fiber Optic 500 Mbps', 'Ruang Full AC & Smart Projector', 'Software Berlisensi Industri'],
      desc: 'Tiga ruang laboratorium multimedia modern untuk menunjang pembelajaran TIK, pemrograman web, desain grafis, dan ujian berbasis komputer (CBT).',
      badge: 'Teknologi & Digital',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      icon: Microscope,
      title: 'Laboratorium Sains Terpadu',
      specs: ['Mikroskop Digital High-Resolution', 'Set Eksperimen Fisika & Kimia Lengkap', 'Wastafel & Lemari Asam Standar Lab', 'Perlengkapan APD & Keselamatan'],
      desc: 'Laboratorium riset untuk praktikum Biologi, Fisika, dan Kimia yang memungkinkan siswa melakukan riset sains mandiri maupun bimbingan olimpiade.',
      badge: 'Sains & Riset',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      icon: BookOpen,
      title: 'Perpustakaan Digital & Reading Lounge',
      specs: ['Ribuan Judul Buku & Jurnal', 'Akses E-Library & Komputer Pencarian', 'Area Lesehan Ber-AC & Cozy', 'Ruang Diskusi & Riset Mandiri'],
      desc: 'Pusat sumber belajar dengan integrasi sistem katalog digital dan suasana nyaman untuk meningkatkan minat literasi siswa.',
      badge: 'Literasi & Riset',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop',
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      icon: Mic,
      title: 'Studio Podcast & Broadcasting',
      specs: ['Audio Mixer Profesional & Mic Condenser', 'Kamera 4K & Lighting Studio', 'Ruang Kedap Suara (Acoustic Foam)', 'PC Workstation Video Editing'],
      desc: 'Wadah ekspresi dan kreativitas peserta didik dalam memproduksi siniar (podcast), rekaman edukasi, dan siaran berita sekolah.',
      badge: 'Kreativitas & Media',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
      color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
    {
      icon: Trophy,
      title: 'Lapangan Olahraga Multifungsi',
      specs: ['Lapangan Futsal & Bola Basket', 'Lapangan Bola Voli & Bulutangkis', 'Pencahayaan LED untuk Sore/Malam', 'Tribun Penonton & Tempat Istirahat'],
      desc: 'Fasilitas olahraga outdoor & semi-indoor berstandar pertandingan resmi untuk mendukung ekstrakurikuler dan kebugaran siswa.',
      badge: 'Olahraga & Prestasi',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
      color: 'text-rose-600 bg-rose-50 border-rose-100',
    },
    {
      icon: Landmark,
      title: 'Masjid & Pusat Ibadah Sekolah',
      specs: ['Kapasitas Ratusan Jamaah', 'Area Wudhu Bersih & Terpisah', 'Pendingin Ruangan & Sound System Jernih', 'Pusat Kajian Keagamaan & Sholat Dhuha'],
      desc: 'Sarana ibadah representatif untuk pembentukan karakter religius, sholat berjamaah harian, dan kajian keputrian.',
      badge: 'Karakter & Spiritual',
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=800&auto=format&fit=crop',
      color: 'text-teal-600 bg-teal-50 border-teal-100',
    },
    {
      icon: Tv,
      title: 'Smart Classroom & Gedung Aula',
      specs: ['Smart Board & Laser Projector', 'Gedung Aula Kapasitas 500 Orang', 'Stage & Sound System Konser/Seminar', 'Koneksi Wi-Fi Dedicated'],
      desc: 'Ruang kelas interaktif abad ke-21 dan gedung pertemuan serbaguna untuk seminar, wisuda, dan pameran karya siswa.',
      badge: 'Akademik & Pertemuan',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      icon: Trees,
      title: 'Kantin Sehat & Eco-Park Sekolah',
      specs: ['Standar Higienis Binaan Dinkes', 'Menu Sehat & Bergizi Terjangkau', 'Taman Hijau Asri & Gazebo Belajar', 'Pengolahan Sampah Ramah Lingkungan'],
      desc: 'Pusat kuliner sekolah yang higienis serta ruang terbuka hijau asri untuk kenyamanan dan relaksasi siswa di jam istirahat.',
      badge: 'Kesehatan & Lingkungan',
      image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=800&auto=format&fit=crop',
      color: 'text-lime-600 bg-lime-50 border-lime-100',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <section className="relative bg-linear-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b border-slate-200 py-16 sm:py-20 overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 text-blue-700">
            <Building2 className="w-3.5 h-3.5" /> Sarana & Prasarana Kampus
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight text-slate-900">
            Fasilitas Modern & Unggulan
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Menghadirkan lingkungan belajar yang representatif, nyaman, dan berbasis teknologi mutakhir untuk mendukung setiap potensi siswa.
          </p>

          {/* Breadcrumb */}
          <div className="flex justify-center items-center gap-2 text-xs sm:text-sm text-slate-500 mt-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span>Profil</span>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Fasilitas</span>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* High Quality Facility Image */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={fac.image}
                      alt={fac.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    <div className="absolute top-4 left-4">
                      <div className={`w-11 h-11 rounded-2xl ${fac.color} backdrop-blur-md bg-white/95 flex items-center justify-center shadow-md`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md border border-white/50 text-slate-900 shadow-xs">
                        {fac.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-7">
                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {fac.title}
                    </h2>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {fac.desc}
                    </p>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                        Spesifikasi & Keunggulan:
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {fac.specs.map((spec, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
