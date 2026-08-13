import Link from "next/link";
import Image from "next/image";
import { getNews } from "@/lib/api/school";

export const revalidate = 60; // Revalidate every minute

export default async function BeritaPage() {
  const news = await getNews();

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Berita & Informasi</h1>
      <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
        Kumpulan berita terbaru, pengumuman, dan informasi seputar kegiatan SMA PGRI 1 Lumajang.
      </p>

      {news.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-lg">Belum ada berita yang dipublikasikan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link href={`/berita/${item.slug}`} key={item.id} className="group">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  {item.image_path ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={item.image_path} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <span className="text-4xl">📰</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center text-xs text-slate-500 mb-3">
                    <span>{new Date(item.published_at || item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md">{item.author?.name || 'Admin'}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-slate-600 line-clamp-3 flex-grow">
                    {item.content}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 font-semibold text-blue-600 flex items-center gap-2">
                    Baca selengkapnya <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
