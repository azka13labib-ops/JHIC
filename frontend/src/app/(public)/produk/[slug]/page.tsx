import { getImageUrl } from "@/lib/utils";
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/api/resources';
import InquiryForm from './InquiryForm';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Produk tidak ditemukan' };
  return {
    title: `${product.name} | Produk BLUD SMA PGRI 1 Lumajang`,
    description: product.description.slice(0, 155),
  };
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
}

export default async function ProdukDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/produk" className="inline-flex items-center gap-1 text-emerald-600 hover:underline mb-8 text-sm">
          ← Kembali ke Katalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Gambar */}
          <div className="relative h-80 lg:h-125 bg-linear-to-br from-emerald-50 to-teal-50 rounded-2xl overflow-hidden shadow-lg">
            {product.image_path ? (
              <Image 
                src={getImageUrl(product.image_path)} 
                alt={product.name} 
                fill 
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">📦</div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">
                {product.category?.name}
              </span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                {product.department}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{product.name}</h1>
            <div className="text-4xl font-extrabold text-emerald-600 mb-6">{formatPrice(product.price)}</div>
            <div className="prose prose-slate max-w-none mb-8">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Deskripsi Produk</h3>
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </div>
            <InquiryForm productId={product.id} productName={product.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
