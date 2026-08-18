import { Camera, Image as ImageIcon } from 'lucide-react';
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { getGalleries } from "@/lib/api/school";

export const revalidate = 60;

export default async function GalleryPage() {
  const galleries = await getGalleries();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-900 uppercase block mb-1">
              Dokumentasi & Arsip Visual
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Galeri Foto Sekolah
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Arsip visual kegiatan akademik, pentas seni kesiswaan, kejuaraan olahraga, dan lingkungan kampus SMA PGRI 1 Lumajang.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        {galleries.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-md mx-auto shadow-2xs">
            <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">Belum Ada Foto</h3>
            <p className="text-xs text-slate-500 mt-1">Dokumentasi kegiatan sekolah akan diunggah secara berkala.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleries.map((item) => (
              <Link href={`/galeri/${item.slug}`} key={item.id} className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-2xs aspect-square flex flex-col justify-end">
                {item.image ? (
                  <Image 
                    src={getImageUrl(item.image)} 
                    alt={item.title} 
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                    <Camera className="w-8 h-8 text-slate-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3.5">
                  <h2 className="text-white font-bold text-xs leading-snug line-clamp-2">{item.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
