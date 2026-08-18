import { getQuickLinks } from "@/lib/api/school";
import { ExternalLink, Link2 } from 'lucide-react';

export const revalidate = 60;

export default async function QuickLinkPage() {
  const links = await getQuickLinks();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-900 uppercase block mb-1">
              Direktori Tautan Eksternal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Tautan Penting & Layanan Terkait
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Akses cepat menuju portal Kemendikbud, Dapodik, SNPMB, Dinas Pendidikan Jawa Timur, dan layanan mitra sekolah.
            </p>
          </div>
        </div>
      </section>

      {/* Main Listing */}
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        {links.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-md mx-auto shadow-2xs">
            <Link2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">Belum Ada Tautan</h3>
            <p className="text-xs text-slate-500 mt-1">Daftar tautan penting akan diperbarui secara berkala.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {links.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-blue-300 transition-colors flex flex-col justify-between group min-h-28"
              >
                <div>
                  <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center mb-2.5">
                    <Link2 className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {item.title}
                  </h2>
                </div>
                
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                  <span>Buka Tautan</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
