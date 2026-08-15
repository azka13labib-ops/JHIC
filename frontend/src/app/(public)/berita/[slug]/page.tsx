import { getImageUrl } from "@/lib/utils";
import { notFound } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import { getNewsBySlug } from "@/lib/api/school";

export const revalidate = 60; // Revalidate every minute

export default async function DetailBeritaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link href="/berita" className="text-blue-600 hover:underline mb-8 inline-block">
          &larr; Kembali ke Daftar Berita
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          {news.title}
        </h1>
        
        <div className="flex items-center gap-4 text-slate-500 mb-8 pb-6 border-b border-slate-200">
          <span className="font-semibold text-slate-700">{news.author?.name || 'Admin'}</span>
          <span className="text-slate-300">|</span>
          <span>
            {new Date(news.published_at || news.created_at).toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>

        {news.image_path && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-sm relative aspect-video w-full max-h-125 bg-slate-100">
            <Image 
              src={getImageUrl(news.image_path)} 
              alt={news.title} 
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
          {news.content}
        </div>
      </div>
    </div>
  );
}