import { Camera, ArrowLeft } from 'lucide-react';
import { getImageUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getGalleryBySlug } from "@/lib/api/school";

export const revalidate = 60;

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
                className="max-h-[650px] w-full sm:w-auto h-auto object-contain rounded-xl border border-slate-200 shadow-2xs"
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-slate-100 flex items-center justify-center text-slate-400 rounded-lg">
              <Camera className="w-12 h-12 text-slate-300" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
