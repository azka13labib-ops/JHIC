import type { Metadata } from 'next';
import { getAchievements } from '@/lib/api/resources';
import Image from 'next/image';

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
      <section className="bg-gradient-to-br from-[#1E2B58] to-[#2B3B6F] text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
            🏆 Prestasi Siswa
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Kebanggaan Kami</h1>
          <p className="text-blue-200 max-w-xl mx-auto text-lg">
            Daftar pencapaian dan prestasi gemilang siswa-siswi SMA PGRI 1 Lumajang dari tingkat kota hingga internasional.
          </p>
        </div>
      </section>

      {/* Grid */}
      <div className="container mx-auto px-4 mt-16">
        {achievements.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Belum Ada Data Prestasi</h3>
            <p className="text-slate-500">Data prestasi sedang diperbarui oleh admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                <div className="relative h-56 bg-slate-100">
                  {item.image_path ? (
                    <Image
                      src={item.image_path}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                      <span className="text-5xl mb-2">🏅</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${LEVEL_COLORS[item.level] ?? LEVEL_COLORS.sekolah}`}>
                      Tingkat {item.level}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#2B3B6F] mb-3">
                    📅 Tahun {item.year}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-slate-600 text-sm line-clamp-3">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
