import { getImageUrl } from "@/lib/utils";
import { getAchievements } from '@/lib/api/school';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 0; // Force dynamic to always get latest data

export default async function AchievementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const achievements = await getAchievements();
  const achievement = achievements.find(a => a.id.toString() === id);

  if (!achievement) return notFound();

  const LEVEL_COLORS: Record<string, string> = {
    sekolah: 'bg-slate-100 text-slate-700',
    kota: 'bg-blue-100 text-blue-700',
    provinsi: 'bg-purple-100 text-purple-700',
    nasional: 'bg-emerald-100 text-emerald-700',
    internasional: 'bg-amber-100 text-amber-700',
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/prestasi" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Kembali ke Daftar Prestasi
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {achievement.image_path ? (
            <div className="relative w-full h-100 sm:h-125 bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={getImageUrl(achievement.image_path)}
                alt={achievement.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="relative w-full h-75 bg-slate-100 flex items-center justify-center">
              <span className="text-8xl">🏅</span>
            </div>
          )}

          <div className="p-8 sm:p-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${LEVEL_COLORS[achievement.level] ?? LEVEL_COLORS.sekolah}`}>
                Tingkat {achievement.level}
              </span>
              <span className="text-slate-500 font-semibold flex items-center gap-2">
                📅 Tahun {achievement.year}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {achievement.title}
            </h1>
            
            {achievement.description && (
              <div className="prose prose-slate max-w-none prose-lg">
                <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
