'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { getPublicUrl } from '@/lib/site';
import { Briefcase, Edit, Calendar, Eye, Inbox, Building } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSearchBar } from '@/components/admin/AdminSearchBar';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';
import Link from 'next/link';
import { JobFormModal } from './JobFormModal';

interface AdminJobItem {
  id: number;
  title: string;
  slug?: string;
  company_name: string;
  location: string;
  type: string;
  closing_date: string;
  is_active: boolean;
}

export default function AdminJobsPage() {
  const { data: session } = useSession();
  const [jobsList, setJobsList] = useState<AdminJobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<AdminJobItem | undefined>(undefined);

  const authHeaders = useMemo(() => ({
    Authorization: `Bearer ${session?.accessToken}`,
    Accept: 'application/json',
  }), [session?.accessToken]);

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/jobs`, { headers: authHeaders });
      const data = await res.json();
      setJobsList(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setJobsList([]);
    } finally {
      setLoading(false);
    }
  }, [session, authHeaders]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Filter and pagination
  const filteredJobs = useMemo(() => {
    if (!search.trim()) return jobsList;
    const q = search.toLowerCase();
    return jobsList.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.company_name.toLowerCase().includes(q)
    );
  }, [jobsList, search]);

  const totalPages = Math.ceil(filteredJobs.length / perPage) || 1;
  const paginatedJobs = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredJobs.slice(start, start + perPage);
  }, [filteredJobs, page, perPage]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={Briefcase}
        title="Manajemen Bursa Kerja Khusus (BKK)"
        description="Kelola lowongan pekerjaan untuk disalurkan ke alumni sekolah."
        actionButton={{
          label: 'Tambah Lowongan Baru',
          onClick: () => {
            setEditingJob(undefined);
            setIsModalOpen(true);
          }
        }}
      />

      <div className="flex gap-2">
        <Link 
          href="/admin/jobs/applications"
          className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl shadow-xs hover:border-blue-300 hover:text-blue-700 transition-colors"
        >
          <Inbox className="w-4 h-4" />
          <span>Lihat Data Pelamar</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <AdminSearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari judul lowongan atau nama perusahaan..."
          totalResults={filteredJobs.length}
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
                  <th className="py-4 px-6">Posisi & Perusahaan</th>
                  <th className="py-4 px-6">Jenis & Lokasi</th>
                  <th className="py-4 px-6">Batas Lamaran</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {paginatedJobs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      {search ? 'Tidak ada lowongan yang cocok dengan pencarian.' : 'Belum ada lowongan.'}
                    </td>
                  </tr>
                ) : (
                  paginatedJobs.map((item: AdminJobItem) => {
                    const isClosed = new Date(item.closing_date) < new Date();
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-900 max-w-md">
                          <div className="flex items-start gap-2">
                            <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${item.is_active && !isClosed ? 'bg-green-500' : 'bg-slate-300'}`} title={item.is_active && !isClosed ? 'Aktif' : 'Non-aktif/Ditutup'}></span>
                            <div>
                              <div className="line-clamp-1">{item.title}</div>
                              <div className="flex items-center gap-1 mt-1 text-slate-500 font-medium">
                                <Building className="w-3 h-3" />
                                <span>{item.company_name}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-slate-800">{item.type}</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-1 line-clamp-1">
                            {item.location}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span className={isClosed ? 'text-red-600 font-bold' : ''}>
                              {new Date(item.closing_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {item.slug && (
                              <a
                                href={getPublicUrl(`/karir/${item.slug}`)}
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
                                setEditingJob(item);
                                setIsModalOpen(true);
                              }}
                              className="p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                              title="Edit Lowongan"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <DeleteConfirmButton
                              endpoint="/admin/jobs"
                              id={item.id}
                              title={item.title}
                              entityName="lowongan"
                              onDeleted={fetchData}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        <AdminPagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredJobs.length}
          itemsPerPage={perPage}
          onPageChange={setPage}
          onItemsPerPageChange={(newPerPage) => {
            setPerPage(newPerPage);
            setPage(1);
          }}
        />
      </div>

      <JobFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchData}
        job={editingJob}
      />
    </div>
  );
}
