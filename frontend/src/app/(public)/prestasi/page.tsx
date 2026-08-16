import { Trophy, ArrowRight } from 'lucide-react';
import { getImageUrl } from "@/lib/utils";
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAchievements } from '@/lib/api/school';

export const revalidate = 3600; // 1 hour ISR

export const metadata: Metadata = {
  title: 'Prestasi | SMA PGRI 1 Lumajang',
  description: 'Daftar prestasi siswa-siswi SMA PGRI 1 Lumajang di berbagai tingkatan.',
};

const LEVEL_COLORS: Record<string, string> = {
  sekolah: 'bg-slate-100 text-slate-700',
  kota: 'bg-blue-100 text-blue-700',
  provinsi: 'bg-purple-100 text-purple-700',
  nasional: 'bg-emerald-100 text-emerald-700',
  internasional: 'bg-amber-100 text-amber-700',
};

export default async function PrestasiPage() {
  const achievements = await getAchievements();

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero */}
      <section className="bg-linear-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b border-slate-200 py-16 sm:py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 text-amber-700">
            <Trophy className="w-3.5 h-3.5 inline mr-1 text-amber-600" /> Prestasi Siswa
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 text-slate-900 tracking-tight">Kebanggaan Kami</h1>
          <p className="text-slate-600 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Daftar pencapaian dan prestasi gemilang siswa-siswi SMA PGRI 1 Lumajang dari tingkat kota hingga internasional.
          </p>
        </div>
      </section>

      {/* Grid */}
      <div className="container mx-auto px-4 mt-16">
        {achievements.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 flex items-center justify-center mb-4"><Trophy className="w-8 h-8 text-amber-500" /></div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Belum Ada Data Prestasi</h3>
            <p className="text-slate-500">Data prestasi sedang diperbarui oleh admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  {item.image_path ? (
                    <Image 
                      src={getImageUrl(item.image_path)}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                      <span className="text-5xl mb-2">🏅</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${LEVEL_COLORS[item.level] ?? LEVEL_COLORS.sekolah}`}>
                      Tingkat {item.level}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col grow">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#2B3B6F] mb-3">
                    📅 Tahun {item.year}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <Link
                      href={`/prestasi/${item.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-1 transition-colors group"
                    >
                      Lihat Selengkapnya
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
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
