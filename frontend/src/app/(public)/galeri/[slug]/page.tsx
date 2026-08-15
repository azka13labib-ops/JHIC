import { Camera } from 'lucide-react';
import { getImageUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getGalleryBySlug } from "@/lib/api/school";

export const revalidate = 60;

export default async function DetailGaleriPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getGalleryBySlug(slug);

  if (!item) notFound();

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <Link href="/galeri" className="text-blue-600 hover:underline mb-8 inline-block">
          &larr; Kembali ke Daftar Galeri
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center leading-tight">
          {item.title}
        </h1>
        
        {item.image ? (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-lg bg-slate-100 relative aspect-video w-full max-h-[80vh]">
            <Image 
              src={getImageUrl(item.image)} 
              alt={item.title} 
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="w-full h-96 bg-slate-100 flex items-center justify-center text-slate-400 rounded-2xl mb-10">
            <Camera className="w-16 h-16 text-slate-300" />
          </div>
        )}
      </div>
    </div>
  );
}
