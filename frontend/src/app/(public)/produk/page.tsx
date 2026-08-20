import { Package, ArrowRight } from 'lucide-react';
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/api/school";

export const revalidate = 60;

export default async function ProdukPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-900 uppercase block mb-1">
              Produk Unggulan
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Katalog BLUD SMAGRISA
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Produk unggulan dan layanan resmi persembahan Badan Layanan Umum Daerah (BLUD) SMA PGRI 1 Lumajang.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        {products.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-md mx-auto shadow-sm">
            <Package className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">Belum Ada Produk</h3>
            <p className="text-xs text-slate-500 mt-1">Nantikan koleksi produk terbaik kami dalam waktu dekat.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {products.map((item) => (
              <Link href={`/produk/${item.slug}`} key={item.id} className="group">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors h-full flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="relative h-48 w-full bg-slate-100 border-b border-slate-200">
                      {item.image ? (
                        <Image 
                          src={getImageUrl(item.image)} 
                          alt={item.name} 
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Package className="w-8 h-8 text-slate-300" />
                        </div>
                      )}
                      {item.category && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold text-slate-800 uppercase px-2 py-1 rounded">
                          {item.category}
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-2">
                      <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                        {item.name}
                      </h2>
                      <div className="text-sm font-bold text-blue-700">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>Lihat Detail</span>
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
