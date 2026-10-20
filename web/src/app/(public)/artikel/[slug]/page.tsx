import { getImageUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { getArticleBySlug } from "@/lib/api/school";
import type { Metadata } from "next";

export const revalidate = 60;

function cleanExcerpt(content?: string, length = 160): string {
  if (!content) return "Artikel edukasi dan wawasan akademik SMA PGRI 1 Lumajang.";
  const plain = content.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();
  return plain.length > length ? plain.slice(0, length) + "..." : plain;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
      description: "Artikel yang Anda cari tidak tersedia.",
    };
  }

  const description = cleanExcerpt(article.content);
  const imageUrl = article.image ? getImageUrl(article.image) : "https://smapgri1lumajang.sch.id/image.png";

  return {
    title: article.title,
    description,
    alternates: {
      canonical: `/artikel/${slug}`,
    },
    openGraph: {
      title: article.title,
      description,
      url: `https://smapgri1lumajang.sch.id/artikel/${slug}`,
      siteName: "SMA PGRI 1 Lumajang",
      type: "article",
      publishedTime: article.published_at || article.created_at,
      authors: [article.author || "Admin SMAGRISA"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function DetailArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: cleanExcerpt(article.content),
    image: [article.image ? getImageUrl(article.image) : "https://smapgri1lumajang.sch.id/image.png"],
    datePublished: article.published_at || article.created_at,
    dateModified: article.updated_at || article.published_at || article.created_at,
    author: {
      "@type": "Person",
      name: article.author || "Admin SMAGRISA",
    },
    publisher: {
      "@type": "Organization",
      name: "SMA PGRI 1 Lumajang",
      logo: {
        "@type": "ImageObject",
        url: "https://smapgri1lumajang.sch.id/logo-sekolah.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://smapgri1lumajang.sch.id/artikel/${slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Back Link */}
        <Link
          href="/artikel"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 mb-6 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Daftar Artikel</span>
        </Link>

        {/* Article Box */}
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-2xs">
          
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-6 mb-6 border-b border-slate-100">
            <div className="flex items-center gap-1 text-blue-700 font-semibold">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.author || 'Admin SMAGRISA'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {new Date(article.published_at || article.created_at).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Natural Uncropped Image Display */}
          {article.image && (
            <div className="mb-8 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={getImageUrl(article.image)} 
                alt={article.title} 
                className="max-h-150 w-full sm:w-auto h-auto object-contain rounded-xl border border-slate-200 shadow-2xs"
              />
            </div>
          )}

          <div className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-4 whitespace-pre-wrap">
            {article.content}
          </div>
        </article>

      </div>
    </div>
  );
}