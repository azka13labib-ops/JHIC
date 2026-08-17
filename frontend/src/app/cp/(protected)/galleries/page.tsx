'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getPublicUrl } from '@/lib/site';
import Image from 'next/image';
import { Image as ImageIcon, Edit, Calendar, Eye } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSearchBar } from '@/components/admin/AdminSearchBar';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';

interface AdminGalleryItem {
  id: number;
  title: string;
  slug?: string;
  image?: string;
  created_at: string;
}

export default function AdminGalleriesPage() {
  const { data: session } = useSession();
  const [galleries, setGalleries] = useState<AdminGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const authHeaders = useMemo(() => ({
    Authorization: `Bearer ${session?.accessToken}`,
    Accept: 'application/json',
  }), [session?.accessToken]);

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/galleries`, { headers: authHeaders });
      const data = await res.json();
      setGalleries(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setGalleries([]);
    } finally {
      setLoading(false);
    }
  }, [session, authHeaders]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Filter and pagination
  const filteredGalleries = useMemo(() => {
    if (!search.trim()) return galleries;
    const q = search.toLowerCase();
    return galleries.filter((item) => item.title.toLowerCase().includes(q));
  }, [galleries, search]);

  const totalPages = Math.ceil(filteredGalleries.length / perPage) || 1;
  const paginatedGalleries = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredGalleries.slice(start, start + perPage);
  }, [filteredGalleries, page, perPage]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Reusable Header Operator */}
      <AdminPageHeader
        icon={ImageIcon}
        title="Manajemen Galeri Foto"
        description="Kelola dokumentasi foto kegiatan, momen penting, dan arsip sekolah."
        actionButton={{
          label: 'Tambah Galeri Baru',
          href: '/galleries/create',
        }}
      />

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <AdminSearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari judul galeri foto..."
          totalResults={filteredGalleries.length}
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
                  <th className="py-4 px-6">Foto Utama</th>
                  <th className="py-4 px-6">Judul Album</th>
                  <th className="py-4 px-6">Tanggal Dibuat</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {paginatedGalleries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      {search ? 'Tidak ada galeri yang cocok dengan pencarian.' : 'Belum ada galeri foto yang diunggah.'}
                    </td>
                  </tr>
                ) : (
                  paginatedGalleries.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900 max-w-md">
                        <div className="line-clamp-1">{item.title}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {item.slug && (
                            <a
                              href={getPublicUrl(`/galeri/${item.slug}`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                              title="Pratinjau Publik"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <Link
                            href={`/galleries/${item.id}/edit`}
                            className="p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                            title="Edit Galeri"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <DeleteConfirmButton
                            endpoint="/admin/galleries"
                            id={item.id}
                            title={item.title}
                            entityName="galeri"
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

        {/* Reusable Pagination */}
        <AdminPagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredGalleries.length}
          itemsPerPage={perPage}
          onPageChange={setPage}
          onItemsPerPageChange={(newPerPage) => {
            setPerPage(newPerPage);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
}
