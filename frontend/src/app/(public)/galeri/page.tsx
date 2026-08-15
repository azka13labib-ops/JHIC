import { Camera } from 'lucide-react';
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { getGalleries } from "@/lib/api/school";

export const revalidate = 60; // Revalidate every minute

export default async function GalleryPage() {
  const galleries = await getGalleries();

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Galeri Foto</h1>
      <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
        Kumpulan dokumentasi kegiatan dan fasilitas di SMA PGRI 1 Lumajang.
      </p>

      {galleries.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-lg">Belum ada foto yang diunggah.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleries.map((item) => (
            <Link href={`/galeri/${item.slug}`} key={item.id} className="group relative overflow-hidden rounded-2xl bg-slate-100 aspect-square shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                {item.image ? (
                  <Image 
                    src={getImageUrl(item.image)} 
                    alt={item.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Camera className="w-12 h-12 text-slate-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h2 className="text-white font-bold text-lg">{item.title}</h2>
                </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
