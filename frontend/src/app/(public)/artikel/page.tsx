import { Newspaper, ArrowRight } from 'lucide-react';
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/lib/api/school";

export const revalidate = 60;

export default async function ArtikelPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-900 uppercase block mb-1">
              Khazanah Literasi & Edukasi
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Artikel & Wawasan Pendidikan
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Tulisan edukatif, tips belajar, dan wawasan pedagogik dari pendidik dan praktisi pendidikan SMA PGRI 1 Lumajang.
            </p>
          </div>
        </div>
      </section>

      {/* Main Listing */}
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        {articles.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-md mx-auto shadow-2xs">
            <Newspaper className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">Belum Ada Artikel</h3>
            <p className="text-xs text-slate-500 mt-1">Artikel edukatif terbaru akan segera dipublikasikan di sini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((item: any) => (
              <Link href={`/artikel/${item.slug}`} key={item.id} className="group">
                <div className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors h-full flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="relative h-48 w-full bg-slate-100 border-b border-slate-200">
                      {item.image ? (
                        <Image 
                          src={getImageUrl(item.image)} 
                          alt={item.title} 
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Newspaper className="w-8 h-8 text-slate-300" />
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>{new Date(item.published_at || item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span className="text-blue-700 font-semibold">{item.author || 'Admin SMAGRISA'}</span>
                      </div>

                      <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h2>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
