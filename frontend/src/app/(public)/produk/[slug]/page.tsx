import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Package, CheckCircle2, Building } from "lucide-react";
import Link from "next/link";
import { getProductBySlug } from "@/lib/api/school";
import { getImageUrl } from "@/lib/utils";
import InquiryForm from "./InquiryForm";

export const revalidate = 60;

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Editorial Header */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link 
            href="/produk" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Katalog
          </Link>
          
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-blue-900 uppercase mb-2">
            <Package className="w-4 h-4" />
            <span>Detail Produk</span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight leading-tight">
            {product.name}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-5xl mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-video sm:aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              {product.image ? (
                <Image 
                  src={getImageUrl(product.image)} 
                  alt={product.name} 
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <Package className="w-12 h-12 text-slate-300" />
                  <span className="text-sm">Tidak ada gambar</span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Deskripsi Produk</h2>
              <div className="prose prose-slate prose-sm sm:prose-base max-w-none text-slate-600">
                <p className="whitespace-pre-line leading-relaxed">{product.description}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center shrink-0">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">BLUD SMA PGRI 1 Lumajang</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Badan Layanan Umum Daerah - Unit Produksi & Jasa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Form Column */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="mb-6">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Kategori</div>
                <div className="inline-block bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded">
                  {product.category || 'Umum'}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Harga</div>
                <div className="text-3xl font-bold text-blue-700 tracking-tight">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
                </div>
              </div>
              
              <div className="mb-2">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Status & Stok</div>
                <div className="flex items-center gap-2 text-sm">
                  {product.stock > 0 ? (
                    <div className="flex items-center gap-1.5 text-green-700 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Tersedia ({product.stock})</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-red-600 font-medium">
                      <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-[10px]">!</div>
                      <span>Habis</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <InquiryForm productId={product.id} productName={product.name} />
          </div>
          
        </div>
      </div>
    </div>
  );
}
