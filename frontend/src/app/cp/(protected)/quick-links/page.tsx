'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Link2, Edit, Calendar, ExternalLink } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSearchBar } from '@/components/admin/AdminSearchBar';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';

interface AdminQuickLinkItem {
  id: number;
  title: string;
  url: string;
  created_at: string;
}

export default function AdminQuickLinksPage() {
  const { data: session } = useSession();
  const [links, setLinks] = useState<AdminQuickLinkItem[]>([]);
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/quick-links`, { headers: authHeaders });
      const data = await res.json();
      setLinks(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setLinks([]);
    } finally {
      setLoading(false);
    }
  }, [session, authHeaders]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Filter and pagination
  const filteredLinks = useMemo(() => {
    if (!search.trim()) return links;
    const q = search.toLowerCase();
    return links.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.url && item.url.toLowerCase().includes(q))
    );
  }, [links, search]);

  const totalPages = Math.ceil(filteredLinks.length / perPage) || 1;
  const paginatedLinks = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredLinks.slice(start, start + perPage);
  }, [filteredLinks, page, perPage]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Reusable Header Operator */}
      <AdminPageHeader
        icon={Link2}
        title="Manajemen Tautan Cepat"
        description="Kelola pintasan situs eksternal, portal Kemdikbud, E-Rapor, dan LMS sekolah."
        actionButton={{
          label: 'Tambah Tautan Baru',
          href: '/quick-links/create',
        }}
      />

      {/* Table Container with Reusable Search & Pagination */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Reusable Search Bar */}
        <AdminSearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari label tautan atau alamat URL..."
          totalResults={filteredLinks.length}
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
                  <th className="py-4 px-6">Nama / Label Tautan</th>
                  <th className="py-4 px-6">Alamat Target (URL)</th>
                  <th className="py-4 px-6">Tanggal Input</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {paginatedLinks.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      {search ? 'Tidak ada tautan yang cocok dengan pencarian.' : 'Belum ada tautan cepat yang terdaftar.'}
                    </td>
                  </tr>
                ) : (
                  paginatedLinks.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 max-w-xs">
                        <div className="line-clamp-1">{item.title}</div>
                      </td>
                      <td className="py-4 px-6 max-w-sm">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold hover:underline truncate"
                        >
                          <span className="truncate">{item.url}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
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
                          <Link
                            href={`/quick-links/${item.id}/edit`}
                            className="p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                            title="Edit Tautan"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <DeleteConfirmButton
                            endpoint="/admin/quick-links"
                            id={item.id}
                            title={item.title}
                            entityName="tautan cepat"
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
          totalItems={filteredLinks.length}
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
