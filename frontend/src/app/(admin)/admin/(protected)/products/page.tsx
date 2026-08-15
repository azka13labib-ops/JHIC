'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ShoppingBag, Plus, Edit, Eye, Tag, DollarSign } from 'lucide-react';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';

interface Product {
  id: number;
  name: string;
  slug?: string;
  price: number;
  department: string;
  is_active: boolean;
  image_path?: string;
  category?: { id: number; name: string };
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
}

export default function AdminProductsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const authHeaders = { Authorization: `Bearer ${session?.accessToken}`, Accept: 'application/json' };

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products`, { headers: authHeaders });
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Katalog Produk BLUD</h1>
            <p className="text-xs text-slate-500 mt-0.5">Kelola barang karya vokasi, merchandise sekolah, dan unit usaha BLUD.</p>
          </div>
        </div>
        
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk Baru</span>
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-4 px-6">Nama Produk</th>
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6">Jurusan</th>
                  <th className="py-4 px-6">Harga Satuan</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      Belum ada produk BLUD yang terdaftar.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 max-w-xs">
                        <div className="line-clamp-1">{p.name}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-semibold">
                          <Tag className="w-3 h-3 text-slate-400" />
                          <span>{p.category?.name ?? 'Umum'}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-600 font-medium">
                        {p.department || '-'}
                      </td>
                      <td className="py-4 px-6 font-bold text-emerald-600">
                        {formatPrice(p.price)}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          p.is_active !== false ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${p.is_active !== false ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                          <span>{p.is_active !== false ? 'Tersedia' : 'Nonaktif'}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {p.slug && (
                            <Link
                              href={`/produk/${p.slug}`}
                              target="_blank"
                              className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 border border-slate-200 rounded-lg transition-colors"
                              title="Pratinjau Katalog"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>
                          )}
                          <Link
                            href={`/admin/products/${p.id}/edit`}
                            className="p-2 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 border border-slate-200 rounded-lg transition-colors"
                            title="Edit Produk"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <DeleteConfirmButton
                            endpoint="/admin/products"
                            id={p.id}
                            title={p.name}
                            entityName="produk"
                            onDeleted={fetchData}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
