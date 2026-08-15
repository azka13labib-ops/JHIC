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
  openGraph: {
    title: 'Program Peminatan Fase F | SMA PGRI 1 Lumajang',
    description: 'Pilihan mata pelajaran peminatan untuk persiapan studi lanjut ke perguruan tinggi.',
  },
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
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-linear-to-br from-[#1E2B58] to-[#2B3B6F] text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
            <GraduationCap className="w-4 h-4 text-amber-300" /> Kurikulum Merdeka • Peminatan Fase F (Kelas XI - XII)
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Eksplorasi Minat,<br />Raih Masa Depan</h1>
          <p className="text-blue-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Sesuai Kurikulum Merdeka, siswa baru Kelas 10 menempuh program umum bersama. Penjurusan dan pemilihan mata pelajaran peminatan (MIPA, IPS, atau Bahasa & Budaya) dilaksanakan pada kenaikan Kelas 11 melalui asesmen minat dan bakat.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => {
            const IconComp = ICON_MAP[dept.icon ?? ''] ?? BookOpen;
            return (
              <div
                key={dept.id}
                className="group bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <IconComp className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">{dept.name}</h2>
                <p className="text-slate-600 text-sm leading-relaxed grow">{dept.description}</p>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Selengkapnya <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Tambahan */}
        <div className="mt-16 bg-amber-50 border border-amber-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Bimbingan Karir & Pemilihan Minat</h2>
          <p className="text-slate-600 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            Konsultasikan pilihan kelompok mata pelajaran peminatanmu bersama tim Bimbingan Konseling (BK) kami untuk persiapan SNBP, SNBT, perguruan tinggi kedinasan, dan karir impian.
          </p>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 bg-[#2B3B6F] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1E2B58] transition-colors"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  );
}
