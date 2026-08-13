import { notFound } from "next/navigation";

import Link from "next/link";
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
        
        <div className="flex items-center gap-4 text-slate-500 mb-8 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
              {news.author?.name?.charAt(0) || 'A'}
            </div>
            <span className="font-medium text-slate-700">{news.author?.name || 'Admin'}</span>
          </div>
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
          <div className="mb-10 rounded-2xl overflow-hidden shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={news.image_path} 
              alt={news.title} 
              className="w-full h-auto object-cover max-h-[500px]"
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