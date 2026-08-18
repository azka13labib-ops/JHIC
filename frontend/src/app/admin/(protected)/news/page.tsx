'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getPublicUrl } from '@/lib/site';
import { Newspaper, Edit, Calendar, User, Eye, Pin } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSearchBar } from '@/components/admin/AdminSearchBar';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';
import { PinNewsButton } from '@/components/admin/PinNewsButton';

interface AdminNewsItem {
  id: number;
  title: string;
  slug?: string;
  content: string;
  image_path?: string;
  is_pinned?: boolean;
  author?: {
    id: number;
    name: string;
  };
  created_at: string;
}

export default function AdminNewsPage() {
  const { data: session } = useSession();
  const [newsList, setNewsList] = useState<AdminNewsItem[]>([]);
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/news`, { headers: authHeaders });
      const data = await res.json();
      setNewsList(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setNewsList([]);
    } finally {
      setLoading(false);
    }
  }, [session, authHeaders]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Filter and pagination
  const filteredNews = useMemo(() => {
    if (!search.trim()) return newsList;
    const q = search.toLowerCase();
    return newsList.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.author?.name && item.author.name.toLowerCase().includes(q))
    );
  }, [newsList, search]);

  const totalPages = Math.ceil(filteredNews.length / perPage) || 1;
  const paginatedNews = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredNews.slice(start, start + perPage);
  }, [filteredNews, page, perPage]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Reusable Header Operator */}
      <AdminPageHeader
        icon={Newspaper}
        title="Manajemen Berita & Pengumuman"
        description="Kelola seluruh publikasi berita, pengumuman, dan sematan berita utama di beranda."
        actionButton={{
          label: 'Tambah Berita Baru',
          href: '/news/create',
        }}
      />

      {/* Table Container with Reusable Search & Pagination */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Reusable Search Bar */}
        <AdminSearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari judul berita atau nama penulis..."
          totalResults={filteredNews.length}
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
                  <th className="py-4 px-6">Judul Berita</th>
                  <th className="py-4 px-6">Penulis</th>
                  <th className="py-4 px-6">Tanggal Publikasi</th>
                  <th className="py-4 px-6 text-right">Aksi & Sematan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {paginatedNews.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      {search ? 'Tidak ada berita yang cocok dengan pencarian.' : 'Belum ada berita yang dipublikasikan.'}
                    </td>
                  </tr>
                ) : (
                  paginatedNews.map((item: AdminNewsItem) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 max-w-md">
                        <div className="flex items-center gap-2">
                          {item.is_pinned && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
                              <Pin className="w-2.5 h-2.5 fill-amber-600 text-amber-700" />
                              Disematkan
                            </span>
                          )}
                          <span className="line-clamp-1">{item.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.author?.name || 'Administrator'}</span>
                        </div>
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
                          <PinNewsButton id={item.id} initialPinned={!!item.is_pinned} title={item.title} />

                          {item.slug && (
                            <a
                              href={getPublicUrl(`/berita/${item.slug}`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                              title="Pratinjau Publik"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <Link
                            href={`/admin/news/${item.id}/edit`}
                            className="p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                            title="Edit Berita"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <DeleteConfirmButton
                            endpoint="/admin/news"
                            id={item.id}
                            title={item.title}
                            entityName="berita"
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
          totalItems={filteredNews.length}
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

