import { notFound } from "next/navigation";

import Link from "next/link";
import { getArticleBySlug } from "@/lib/api/school";

export const revalidate = 60; // Revalidate every minute

export default async function DetailArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link href="/artikel" className="text-blue-600 hover:underline mb-8 inline-block">
          &larr; Kembali ke Daftar Artikel
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-4 text-slate-500 mb-8 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
              {article.author?.charAt(0) || 'A'}
            </div>
            <span className="font-medium text-slate-700">{article.author || 'Admin'}</span>
          </div>
          <span className="text-slate-300">|</span>
          <span>
            {new Date(article.published_at || article.created_at).toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>

        {article.image && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-auto object-cover max-h-125"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
          {article.content}
        </div>
      </div>
    </div>
  );
}