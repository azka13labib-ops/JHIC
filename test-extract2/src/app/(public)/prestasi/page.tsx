import { Trophy, ArrowRight } from 'lucide-react';
import { getImageUrl } from "@/lib/utils";
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAchievements } from '@/lib/api/school';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Prestasi Siswa | SMA PGRI 1 Lumajang',
  description: 'Daftar kejuaraan, medali olimpiade, dan prestasi membanggakan siswa SMA PGRI 1 Lumajang.',
};

const LEVEL_CONFIG: Record<string, { label: string; badge: string }> = {
  sekolah: { label: 'Tingkat Sekolah', badge: 'bg-slate-100 text-slate-800 border-slate-200' },
  kota: { label: 'Tingkat Kabupaten', badge: 'bg-blue-50 text-blue-800 border-blue-200' },
  provinsi: { label: 'Tingkat Provinsi', badge: 'bg-purple-50 text-purple-800 border-purple-200' },
  nasional: { label: 'Tingkat Nasional', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  internasional: { label: 'Tingkat Internasional', badge: 'bg-amber-50 text-amber-900 border-amber-300' },
};

export default async function PrestasiPage() {
  const achievements = await getAchievements();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-900 uppercase block mb-1">
              Rekor Capaian & Kejuaraan
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Prestasi Siswa SMAGRISA
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Daftar pencapaian gemilang siswa-siswi SMA PGRI 1 Lumajang dalam ajang olimpiade sains, olahraga, seni budaya, dan kejuaraan akademik.
            </p>
          </div>
        </div>
      </section>

      {/* Main Listing */}
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        {achievements.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-md mx-auto shadow-2xs">
            <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">Belum Ada Data Prestasi</h3>
            <p className="text-xs text-slate-500 mt-1">Data rekor prestasi siswa sedang diperbarui oleh pihak sekolah.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {achievements.map((item) => {
              const levelObj = LEVEL_CONFIG[item.level] || LEVEL_CONFIG.sekolah;
              return (
                <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="relative h-48 w-full bg-slate-100 border-b border-slate-200">
                      {item.image_path ? (
                        <Image 
                          src={getImageUrl(item.image_path)}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                          <Trophy className="w-8 h-8 text-amber-500" />
                        </div>
                      )}
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase border shadow-2xs ${levelObj.badge}`}>
                          {levelObj.label}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="text-[11px] font-semibold text-blue-700">
                        Tahun {item.year}
                      </div>

                      <h2 className="text-sm font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h2>

                      {item.description && (
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-100">
                    <Link
                      href={`/prestasi/${item.id}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-xs flex items-center justify-between transition-colors"
                    >
                      <span>Lihat Rincian</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
