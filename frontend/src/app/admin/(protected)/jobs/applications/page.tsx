'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { Inbox, Search, ArrowLeft, Building, Trash2, FileText, Download } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminPagination } from '@/components/admin/AdminPagination';
import Link from 'next/link';

interface JobApplication {
  id: number;
  job_id: number;
  name: string;
  email: string;
  phone: string;
  cover_letter: string | null;
  resume_path: string;
  created_at: string;
  job?: {
    id: number;
    title: string;
    company_name: string;
  };
}

export default function AdminJobApplicationsPage() {
  const { data: session } = useSession();
  const [applicationsList, setApplicationsList] = useState<JobApplication[]>([]);
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/job-applications`, { headers: authHeaders });
      const data = await res.json();
      setApplicationsList(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setApplicationsList([]);
    } finally {
      setLoading(false);
    }
  }, [session, authHeaders]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const deleteApplication = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data pelamar ini?')) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/job-applications/${id}`, {
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

  const getResumeUrl = (path: string) => {
    if (!path) return '#';
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${path}`;
  };

  // Filter and pagination
  const filteredApplications = useMemo(() => {
    if (!search.trim()) return applicationsList;
    const q = search.toLowerCase();
    return applicationsList.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        (item.job?.title && item.job.title.toLowerCase().includes(q)) ||
        (item.job?.company_name && item.job.company_name.toLowerCase().includes(q))
    );
  }, [applicationsList, search]);

  const totalPages = Math.ceil(filteredApplications.length / perPage) || 1;
  const paginatedApplications = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredApplications.slice(start, start + perPage);
  }, [filteredApplications, page, perPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <Link 
        href="/admin/jobs"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-700 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Kembali ke Manajemen Lowongan
      </Link>

      <AdminPageHeader
        icon={Inbox}
        title="Data Pelamar BKK"
        description="Kelola data lamaran kerja masuk dari alumni ke mitra industri."
      />

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={search}
              onChange={handleSearchChange}
              placeholder="Cari nama pelamar, email, atau lowongan..."
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
            {paginatedApplications.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                {search ? 'Tidak ada data pelamar yang cocok dengan pencarian.' : 'Belum ada data pelamar masuk.'}
              </div>
            ) : (
              paginatedApplications.map((item) => (
                <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
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
                          <a 
                            href={getResumeUrl(item.resume_path)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            Lihat CV / Resume
                          </a>
                          <button 
                            onClick={() => deleteApplication(item.id)}
                            disabled={isDeleting === item.id}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus Data"
                          >
                            {isDeleting === item.id ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {item.cover_letter && (
                        <div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Surat Lamaran / Pesan</div>
                          <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-line shadow-xs">
                            {item.cover_letter}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="lg:w-64 shrink-0 bg-slate-50 rounded-xl p-4 border border-slate-200 h-fit">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Melamar Untuk Lowongan</div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                          <Building className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 line-clamp-2 mb-0.5">
                            {item.job?.title || 'Lowongan telah dihapus'}
                          </div>
                          <div className="text-[11px] font-semibold text-slate-600">
                            {item.job?.company_name}
                          </div>
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
            totalItems={filteredApplications.length}
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
