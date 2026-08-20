'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { getPublicUrl } from '@/lib/site';
import { Package, Edit, Calendar, Eye, Inbox, Tag } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSearchBar } from '@/components/admin/AdminSearchBar';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';
import Link from 'next/link';
import { ProductFormModal } from './ProductFormModal';

interface AdminProductItem {
  id: number;
  name: string;
  slug?: string;
  description: string;
  category: string | null;
  price: string | number;
  stock: number;
  is_active: boolean;
  image?: string;
  created_at: string;
}

export default function AdminProductsPage() {
  const { data: session } = useSession();
  const [productsList, setProductsList] = useState<AdminProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProductItem | undefined>(undefined);

  const authHeaders = useMemo(() => ({
    Authorization: `Bearer ${session?.accessToken}`,
    Accept: 'application/json',
  }), [session?.accessToken]);

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products`, { headers: authHeaders });
      const data = await res.json();
      setProductsList(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setProductsList([]);
    } finally {
      setLoading(false);
    }
  }, [session, authHeaders]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Filter and pagination
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return productsList;
    const q = search.toLowerCase();
    return productsList.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q))
    );
  }, [productsList, search]);

  const totalPages = Math.ceil(filteredProducts.length / perPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredProducts.slice(start, start + perPage);
  }, [filteredProducts, page, perPage]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={Package}
        title="Manajemen Produk BLUD"
        description="Kelola katalog produk unggulan dan layanan sekolah."
        actionButton={{
          label: 'Tambah Produk Baru',
          onClick: () => {
            setEditingProduct(undefined);
            setIsModalOpen(true);
          }
        }}
      />

      <div className="flex gap-2">
        <Link 
          href="/admin/products/inquiries"
          className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl shadow-xs hover:border-blue-300 hover:text-blue-700 transition-colors"
        >
          <Inbox className="w-4 h-4" />
          <span>Kelola Pesanan / Inquiry</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <AdminSearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari nama produk atau kategori..."
          totalResults={filteredProducts.length}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-4 px-6">Nama Produk</th>
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6">Harga & Stok</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {paginatedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      {search ? 'Tidak ada produk yang cocok dengan pencarian.' : 'Belum ada produk.'}
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((item: AdminProductItem) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 max-w-md">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${item.is_active ? 'bg-green-500' : 'bg-slate-300'}`} title={item.is_active ? 'Aktif' : 'Non-aktif'}></span>
                          <span className="line-clamp-1">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Tag className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.category || '-'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-blue-700 font-bold mb-0.5">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(item.price))}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                          Stok: {item.stock}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {item.slug && (
                            <a
                              href={getPublicUrl(`/produk/${item.slug}`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                              title="Pratinjau Publik"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => {
                              setEditingProduct(item);
                              setIsModalOpen(true);
                            }}
                            className="p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                            title="Edit Produk"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <DeleteConfirmButton
                            endpoint="/admin/products"
                            id={item.id}
                            title={item.name}
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

        <AdminPagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredProducts.length}
          itemsPerPage={perPage}
          onPageChange={setPage}
          onItemsPerPageChange={(newPerPage) => {
            setPerPage(newPerPage);
            setPage(1);
          }}
        />
      </div>

      <ProductFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchData}
        product={editingProduct}
      />
    </div>
  );
}
