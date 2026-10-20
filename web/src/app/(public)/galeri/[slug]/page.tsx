import { Camera, ArrowLeft } from 'lucide-react';
import { getImageUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getGalleryBySlug } from "@/lib/api/school";
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getGalleryBySlug(slug);

  if (!item) {
    return {
      title: "Galeri Tidak Ditemukan",
      description: "Dokumentasi foto yang Anda cari tidak tersedia.",
    };
  }

  const description = item.description || `Dokumentasi foto ${item.title} di SMA PGRI 1 Lumajang.`;
  const imageUrl = item.image ? getImageUrl(item.image) : "https://smapgri1lumajang.sch.id/image.png";

  return {
    title: item.title,
    description,
    alternates: {
      canonical: `/galeri/${slug}`,
    },
    openGraph: {
      title: item.title,
      description,
      url: `https://smapgri1lumajang.sch.id/galeri/${slug}`,
      siteName: "SMA PGRI 1 Lumajang",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function DetailGaleriPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getGalleryBySlug(slug);

  if (!item) notFound();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Back Link */}
        <Link
          href="/galeri"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 mb-6 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Galeri Foto</span>
        </Link>

        {/* Media Container */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-4">
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 leading-tight">
            {item.title}
          </h1>

          {item.image ? (
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={getImageUrl(item.image)} 
                alt={item.title} 
                className="max-h-162.5 w-full sm:w-auto h-auto object-contain rounded-xl border border-slate-200 shadow-2xs"
              />
            </div>
          ) : (
            <div className="h-64 rounded-xl bg-slate-100 flex flex-col items-center justify-center text-slate-400">
              <Camera className="w-8 h-8 mb-2" />
              <span className="text-xs">Foto belum tersedia</span>
            </div>
          )}

          {item.description && (
            <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
              {item.description}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
