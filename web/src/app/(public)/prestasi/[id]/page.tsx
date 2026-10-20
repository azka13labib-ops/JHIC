import { getImageUrl } from "@/lib/utils";
import { getAchievementById } from '@/lib/api/school';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Trophy, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600; // 1 hour ISR

const LEVEL_CONFIG: Record<string, { label: string; badge: string }> = {
  sekolah: { label: 'Tingkat Sekolah', badge: 'bg-slate-100 text-slate-800 border-slate-200' },
  kota: { label: 'Tingkat Kabupaten', badge: 'bg-blue-50 text-blue-800 border-blue-200' },
  provinsi: { label: 'Tingkat Provinsi', badge: 'bg-purple-50 text-purple-800 border-purple-200' },
  nasional: { label: 'Tingkat Nasional', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  internasional: { label: 'Tingkat Internasional', badge: 'bg-amber-50 text-amber-900 border-amber-300' },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const achievement = await getAchievementById(id);

  if (!achievement) {
    return {
      title: "Prestasi Tidak Ditemukan",
      description: "Data prestasi yang Anda cari tidak tersedia.",
    };
  }

  const description = achievement.description || `Prestasi ${achievement.title} yang diraih oleh siswa SMA PGRI 1 Lumajang.`;
  const imageUrl = achievement.image_path ? getImageUrl(achievement.image_path) : "https://smapgri1lumajang.sch.id/image.png";

  return {
    title: `${achievement.title} - Prestasi Siswa`,
    description,
    alternates: {
      canonical: `/prestasi/${id}`,
    },
    openGraph: {
      title: `${achievement.title} - Prestasi Siswa`,
      description,
      url: `https://smapgri1lumajang.sch.id/prestasi/${id}`,
      siteName: "SMA PGRI 1 Lumajang",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: achievement.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: achievement.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function AchievementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const achievement = await getAchievementById(id);

  if (!achievement) return notFound();

  const levelObj = LEVEL_CONFIG[achievement.level] || LEVEL_CONFIG.sekolah;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Back Link */}
        <Link
          href="/prestasi"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 mb-6 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Prestasi Siswa</span>
        </Link>

        {/* Detail Box */}
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-2xs">
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold border ${levelObj.badge}`}>
              <Trophy className="w-3.5 h-3.5" />
              <span>{levelObj.label}</span>
            </span>
            {achievement.date && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{new Date(achievement.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </span>
            )}
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 leading-tight mb-4">
            {achievement.title}
          </h1>

          {/* Student Names */}
          {achievement.student_name && (
            <div className="text-xs font-semibold text-blue-700 pb-5 mb-6 border-b border-slate-100">
              Peraih Penghargaan: {achievement.student_name}
            </div>
          )}

          {/* Image */}
          {achievement.image_path && (
            <div className="mb-8 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={getImageUrl(achievement.image_path)} 
                alt={achievement.title} 
                className="max-h-150 w-full sm:w-auto h-auto object-contain rounded-xl border border-slate-200 shadow-2xs"
              />
            </div>
          )}

          <div className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-4 whitespace-pre-wrap">
            {achievement.description}
          </div>
        </article>

      </div>
    </div>
  );
}
