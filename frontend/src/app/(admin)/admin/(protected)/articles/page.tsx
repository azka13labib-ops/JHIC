'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { BookOpen, Edit, User, Calendar, Eye } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSearchBar } from '@/components/admin/AdminSearchBar';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';

interface AdminArticleItem {
  id: number;
  title: string;
  slug?: string;
  author?: string;
  created_at: string;
}

export default function AdminArticlesPage() {
  const { data: session } = useSession();
  const [articles, setArticles] = useState<AdminArticleItem[]>([]);
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/articles`, { headers: authHeaders });
      const data = await res.json();
      setArticles(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [session, authHeaders]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Filter and pagination
  const filteredArticles = useMemo(() => {
    if (!search.trim()) return articles;
    const q = search.toLowerCase();
    return articles.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.author && item.author.toLowerCase().includes(q))
    );
  }, [articles, search]);

  const totalPages = Math.ceil(filteredArticles.length / perPage) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredArticles.slice(start, start + perPage);
  }, [filteredArticles, page, perPage]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Reusable Header Operator */}
      <AdminPageHeader
        icon={BookOpen}
        title="Manajemen Artikel Edukasi"
        description="Kelola artikel edukasi, literasi ilmiah, dan wawasan guru."
        actionButton={{
          label: 'Tambah Artikel Baru',
          href: '/admin/articles/create',
        }}
      />

      {/* Table Container with Reusable Search & Pagination */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Reusable Search Bar */}
        <AdminSearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari judul artikel atau nama penulis..."
          totalResults={filteredArticles.length}
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
                  <th className="py-4 px-6">Judul Artikel</th>
                  <th className="py-4 px-6">Penulis</th>
                  <th className="py-4 px-6">Tanggal Terbit</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {paginatedArticles.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      {search ? 'Tidak ada artikel yang cocok dengan pencarian.' : 'Belum ada artikel edukasi yang terdaftar.'}
                    </td>
                  </tr>
                ) : (
                  paginatedArticles.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 max-w-md">
                        <div className="line-clamp-1">{item.title}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.author || 'Admin'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-600">
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
                            <Link
                              href={`/artikel/${item.slug}`}
                              target="_blank"
                              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                              title="Pratinjau Publik"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>
                          )}
                          <Link
                            href={`/admin/articles/${item.id}/edit`}
                            className="p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                            title="Edit Artikel"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <DeleteConfirmButton
                            endpoint="/admin/articles"
                            id={item.id}
                            title={item.title}
                            entityName="artikel"
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
          totalItems={filteredArticles.length}
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
