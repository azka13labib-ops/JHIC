import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Microscope, 
  Globe, 
  BookOpen, 
  Laptop, 
  Palette, 
  Music, 
  GraduationCap, 
  ArrowRight 
} from 'lucide-react';
import { getDepartments } from '@/lib/api/school';

export const metadata: Metadata = {
  title: 'Program Peminatan Fase F (Kelas 11-12) | SMA PGRI 1 Lumajang',
  description: 'Program kelompok mata pelajaran peminatan Fase F (Kelas XI & XII) di SMA PGRI 1 Lumajang: MIPA, IPS, dan Ilmu Bahasa & Budaya.',
};

export const revalidate = 86400;

const ICON_MAP: Record<string, React.ElementType> = {
  Microscope: Microscope,
  Globe: Globe,
  BookText: BookOpen,
  Computer: Laptop,
  Art: Palette,
  Music: Music,
};

export default async function JurusanPage() {
  const departments = await getDepartments();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-900 uppercase block mb-1">
              Kurikulum Merdeka • Fase F (Kelas XI - XII)
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Pilihan Peminatan & Konsentrasi Studi
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Sesuai Kurikulum Merdeka, siswa menempuh program umum di Kelas X dan memilih kelompok mata pelajaran peminatan (MIPA, IPS, atau Bahasa & Budaya) di Kelas XI–XII berdasarkan asesmen minat bakat.
            </p>
          </div>
        </div>
      </section>

      {/* Main Listing */}
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((dept) => {
            const IconComp = ICON_MAP[dept.icon ?? ''] ?? BookOpen;
            const slug = dept.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link
                key={dept.id}
                href={`/jurusan/${slug}`}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-blue-300 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-blue-700 mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">
                    {dept.name}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {dept.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>Lihat Kurikulum & Prospek</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Career Advisory Banner */}
        <div className="mt-10 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="max-w-xl">
            <h3 className="text-sm font-bold text-slate-900">Bimbingan Karir & Konsultasi Jurusan</h3>
            <p className="text-xs text-slate-600 mt-1">
              Konsultasikan pilihan peminatan bersama guru BK kami untuk persiapan seleksi SNBP, SNBT, kedinasan, dan karier masa depan.
            </p>
          </div>
          <Link
            href="/kontak"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shrink-0 shadow-2xs"
          >
            Hubungi Guru BK
          </Link>
        </div>
      </div>

    </div>
  );
}
