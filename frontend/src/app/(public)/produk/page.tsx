import { getImageUrl } from "@/lib/utils";
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/api/resources';

export const metadata: Metadata = {
  title: 'Produk BLUD | SMA PGRI 1 Lumajang',
  description: 'Katalog produk dan jasa unggulan dari siswa SMA PGRI 1 Lumajang. Berkualitas, terjangkau, karya anak bangsa.',
  openGraph: {
    title: 'Produk BLUD | SMA PGRI 1 Lumajang',
    description: 'Produk dan jasa berkualitas karya siswa SMA PGRI 1 Lumajang.',
  },
};

export const revalidate = 300;

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
}

export default async function ProdukPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const products = await getProducts({
    category: searchParams.category,
    search: searchParams.search,
  });

  const activeProducts = products.filter((p) => p.is_active);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-linear-to-br from-emerald-600 to-teal-700 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
            🛍️ Produk Unggulan BLUD
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Karya Terbaik Siswa Kami</h1>
          <p className="text-emerald-100 max-w-xl mx-auto text-lg">
            Produk dan jasa berkualitas tinggi yang dihasilkan oleh siswa dan unit usaha SMA PGRI 1 Lumajang
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search */}
        <form className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              name="search"
              defaultValue={searchParams.search}
              placeholder="Cari produk..."
              className="w-full border border-slate-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">
              Cari
            </button>
          </div>
        </form>

        {/* Products grid */}
        {activeProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <span className="text-5xl block mb-4">📦</span>
            <p className="text-slate-500 text-lg">Belum ada produk yang tersedia.</p>
            <Link href="/produk" className="text-emerald-600 text-sm hover:underline mt-2 block">Lihat semua produk</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeProducts.map((product) => (
              <Link href={`/produk/${product.slug}`} key={product.id} className="group">
                <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    {product.image_path ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={getImageUrl(product.image_path)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl bg-linear-to-br from-emerald-50 to-teal-50">
                        📦
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-semibold px-2.5 py-1 rounded-full text-emerald-700 border border-emerald-100">
                      {product.department}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col grow">
                    <p className="text-xs text-slate-400 mb-1">{product.category?.name}</p>
                    <h2 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h2>
                    <p className="text-slate-500 text-sm line-clamp-2 grow">{product.description}</p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-extrabold text-emerald-600 text-lg">{formatPrice(product.price)}</span>
                      <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">Lihat Detail →</span>
                    </div>
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
