import { getQuickLinks } from "@/lib/api/school";
import Link from "next/link";

export const revalidate = 60;

export default async function QuickLinkPage() {
  const links = await getQuickLinks();

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Link Penting</h1>
      <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
        Kumpulan tautan penting terkait informasi akademik dan layanan SMA PGRI 1 Lumajang.
      </p>

      {links.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-lg">Belum ada link penting yang ditambahkan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {links.map((item) => (
            <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[120px]">
                <h2 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h2>
                <div className="mt-2 flex items-center text-sm font-medium text-blue-500">
                  <span>Kunjungi Link</span>
                  <span className="ml-2">→</span>
                </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
