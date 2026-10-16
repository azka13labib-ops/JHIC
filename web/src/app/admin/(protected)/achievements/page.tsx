'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getPublicUrl } from '@/lib/site';
import { Trophy, Edit, Eye, Calendar } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSearchBar } from '@/components/admin/AdminSearchBar';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';
import type { Achievement } from '@/types';

export default function AdminAchievementsPage() {
  const { data: session } = useSession();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/achievements`, { headers: authHeaders });
      const data = await res.json();
      setAchievements(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  }, [session, authHeaders]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const LEVEL_BADGES: Record<string, string> = {
    sekolah: 'bg-slate-100 text-slate-700 border-slate-200',
    kota: 'bg-blue-50 text-blue-700 border-blue-200',
    provinsi: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    nasional: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    internasional: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  // Filter and pagination
  const filteredAchievements = useMemo(() => {
    if (!search.trim()) return achievements;
    const q = search.toLowerCase();
    return achievements.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.level && item.level.toLowerCase().includes(q)) ||
        (item.year && item.year.toString().includes(q))
    );
  }, [achievements, search]);

  const totalPages = Math.ceil(filteredAchievements.length / perPage) || 1;
  const paginatedAchievements = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredAchievements.slice(start, start + perPage);
  }, [filteredAchievements, page, perPage]);

  // Reset to page 1 on search
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Reusable Header Operator */}
      <AdminPageHeader
        icon={Trophy}
        title="Manajemen Prestasi Siswa"
        description="Kelola rekam jejak juara lomba akademik, seni, dan olahraga tingkat sekolah s/d internasional."
        actionButton={{
          label: 'Tambah Prestasi Baru',
          href: '/admin/achievements/new',
        }}
      />

      {/* Table Container with Reusable Search & Pagination */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Reusable Search Bar */}
        <AdminSearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari judul prestasi, bidang lomba, atau nama siswa..."
          totalResults={filteredAchievements.length}
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
                  <th className="py-4 px-6">Nama Kejuaraan / Prestasi</th>
                  <th className="py-4 px-6">Tingkat Kompetisi</th>
                  <th className="py-4 px-6">Tahun</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {paginatedAchievements.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      {search ? 'Tidak ada prestasi yang cocok dengan pencarian.' : 'Belum ada prestasi yang terdaftar.'}
                    </td>
                  </tr>
                ) : (
                  paginatedAchievements.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 max-w-md">
                        <div className="line-clamp-1">{item.title}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${LEVEL_BADGES[item.level?.toLowerCase()] || LEVEL_BADGES.sekolah}`}>
                          <span>{item.level}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.year || '-'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={getPublicUrl('/prestasi')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                            title="Pratinjau Publik"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </a>
                          <Link
                            href={`/admin/achievements/${item.id}/edit`}
                            className="p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                            title="Edit Prestasi"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <DeleteConfirmButton
                            endpoint="/admin/achievements"
                            id={item.id}
                            title={item.title}
                            entityName="prestasi"
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
          totalItems={filteredAchievements.length}
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

