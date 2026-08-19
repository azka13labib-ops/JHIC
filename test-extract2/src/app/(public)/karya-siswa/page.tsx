import { Palette, ArrowRight } from 'lucide-react';
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { getStudentWorks } from "@/lib/api/school";

export const revalidate = 60;

export default async function StudentWorkPage() {
  const works = await getStudentWorks();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-900 uppercase block mb-1">
              Kreativitas & Inovasi Kesiswaan
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Galeri Karya Siswa
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Showcase karya seni rupa, desain grafis, literasi, produk teknologi, dan proyek inovasi siswa SMAGRISA.
            </p>
          </div>
        </div>
      </section>

      {/* Main Listing */}
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        {works.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-md mx-auto shadow-2xs">
            <Palette className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">Belum Ada Karya</h3>
            <p className="text-xs text-slate-500 mt-1">Karya dan proyek siswa terbaru akan segera ditampilkan di sini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {works.map((item) => (
              <Link href={`/karya-siswa/${item.slug}`} key={item.id} className="group">
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
                          <Palette className="w-8 h-8 text-slate-300" />
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="text-[11px] font-semibold text-blue-700">
                        Oleh: {item.student_name}
                      </div>

                      <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h2>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>Lihat Karya</span>
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
