'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { Inbox, CheckCircle2, Search, ArrowLeft, Building, Trash2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminPagination } from '@/components/admin/AdminPagination';
import Link from 'next/link';

interface ProductInquiry {
  id: number;
  product_id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
  product?: {
    id: number;
    name: string;
  };
}

export default function AdminProductInquiriesPage() {
  const { data: session } = useSession();
  const [inquiriesList, setInquiriesList] = useState<ProductInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const authHeaders = useMemo(() => ({
    Authorization: `Bearer ${session?.accessToken}`,
    Accept: 'application/json',
  }), [session?.accessToken]);

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/product-inquiries`, { headers: authHeaders });
      const data = await res.json();
      setInquiriesList(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setInquiriesList([]);
    } finally {
      setLoading(false);
    }
  }, [session, authHeaders]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const markAsRead = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/product-inquiries/${id}/read`, {
        method: 'POST',
        headers: authHeaders,
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/product-inquiries/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(null);
    }
  };

  // Filter and pagination
  const filteredInquiries = useMemo(() => {
    if (!search.trim()) return inquiriesList;
    const q = search.toLowerCase();
    return inquiriesList.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        (item.product?.name && item.product.name.toLowerCase().includes(q))
    );
  }, [inquiriesList, search]);

  const totalPages = Math.ceil(filteredInquiries.length / perPage) || 1;
  const paginatedInquiries = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredInquiries.slice(start, start + perPage);
  }, [filteredInquiries, page, perPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <Link 
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-700 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Kembali ke Produk
      </Link>

      <AdminPageHeader
        icon={Inbox}
        title="Inquiry & Pesanan Produk"
        description="Kelola pesan dan pertanyaan pelanggan terkait produk BLUD."
      />

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={search}
              onChange={handleSearchChange}
              placeholder="Cari nama, email, WA, atau produk..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {paginatedInquiries.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                {search ? 'Tidak ada inquiry yang cocok dengan pencarian.' : 'Belum ada pesan inquiry.'}
              </div>
            ) : (
              paginatedInquiries.map((item) => (
                <div key={item.id} className={`p-6 transition-colors ${!item.is_read ? 'bg-blue-50/30' : 'hover:bg-slate-50'}`}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {!item.is_read && (
                              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                            )}
                            <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                            <span className="text-xs text-slate-500 ml-2">
                              {new Date(item.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
                            <a href={`mailto:${item.email}`} className="hover:text-blue-600 hover:underline">{item.email}</a>
                            <a href={`https://wa.me/${item.phone.replace(/^0/, '62')}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-600 hover:underline">{item.phone}</a>
                          </div>
                        </div>
                        
                        <div className="shrink-0 flex items-center gap-2">
                          {!item.is_read && (
                            <button 
                              onClick={() => markAsRead(item.id)}
                              className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Tandai Dibaca
                            </button>
                          )}
                          <button 
                            onClick={() => deleteInquiry(item.id)}
                            disabled={isDeleting === item.id}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus Pesan"
                          >
                            {isDeleting === item.id ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-line shadow-xs">
                        {item.message}
                      </div>
                    </div>

                    <div className="lg:w-64 shrink-0 bg-slate-50 rounded-xl p-4 border border-slate-200 h-fit">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Terkait Produk</div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                          <Building className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 line-clamp-2">
                            {item.product?.name || 'Produk telah dihapus'}
                          </div>
                          {item.product && (
                            <Link href={`/produk/${item.product_id}`} target="_blank" className="text-[11px] text-blue-600 hover:underline mt-1 inline-block">
                              Lihat Katalog
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className="p-4 border-t border-slate-100">
          <AdminPagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={filteredInquiries.length}
            itemsPerPage={perPage}
            onPageChange={setPage}
            onItemsPerPageChange={(newPerPage) => {
              setPerPage(newPerPage);
              setPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
}
