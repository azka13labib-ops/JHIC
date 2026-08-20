'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { Shield, Search, Trash2, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminPagination } from '@/components/admin/AdminPagination';

interface Report {
  id: number;
  ticket_id: string;
  category: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminReportsPage() {
  const { data: session } = useSession();
  const [reportsList, setReportsList] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  const authHeaders = useMemo(() => ({
    Authorization: `Bearer ${session?.accessToken}`,
    Accept: 'application/json',
  }), [session?.accessToken]);

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/reports`, { headers: authHeaders });
      const data = await res.json();
      setReportsList(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setReportsList([]);
    } finally {
      setLoading(false);
    }
  }, [session, authHeaders]);

  useEffect(() => { 
    fetchData(); 
  }, [fetchData]);

  const deleteReport = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus laporan ini secara permanen?')) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/reports/${id}`, {
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

  const updateStatus = async (id: number, newStatus: string) => {
    setIsUpdating(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/reports/${id}/status`, {
        method: 'PATCH',
        headers: {
          ...authHeaders,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(null);
    }
  };

  // Filter and pagination
  const filteredReports = useMemo(() => {
    if (!search.trim()) return reportsList;
    const q = search.toLowerCase();
    return reportsList.filter(
      (item) =>
        item.ticket_id.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q)
    );
  }, [reportsList, search]);

  const totalPages = Math.ceil(filteredReports.length / perPage) || 1;
  const paginatedReports = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredReports.slice(start, start + perPage);
  }, [filteredReports, page, perPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={Shield}
        title="Kotak Suara Aman (Laporan)"
        description="Kelola laporan anonim dari siswa atau pihak luar secara rahasia dan aman."
      />

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={search}
              onChange={handleSearchChange}
              placeholder="Cari kode tiket, kategori, atau isi laporan..."
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
            {paginatedReports.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                {search ? 'Tidak ada laporan yang cocok dengan pencarian.' : 'Belum ada laporan masuk.'}
              </div>
            ) : (
              paginatedReports.map((item) => (
                <div key={item.id} className={`p-6 transition-colors ${item.status === 'Pending' ? 'bg-amber-50/30' : 'hover:bg-slate-50'}`}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-xs font-mono font-bold text-slate-700 tracking-widest">
                            {item.ticket_id}
                          </div>
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                            {item.category}
                          </div>
                          <span className="text-xs text-slate-400 ml-2">
                            {new Date(item.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        </div>
                        
                        <div className="shrink-0 flex items-center gap-2">
                          <button 
                            onClick={() => deleteReport(item.id)}
                            disabled={isDeleting === item.id}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus Laporan"
                          >
                            {isDeleting === item.id ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-800 whitespace-pre-line shadow-xs">
                        {item.message}
                      </div>
                    </div>

                    <div className="lg:w-56 shrink-0 bg-slate-50 rounded-xl p-4 border border-slate-200 h-fit">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 border-b border-slate-200 pb-2">Status Penanganan</div>
                      
                      {isUpdating === item.id ? (
                        <div className="flex items-center justify-center py-4">
                          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : (
                        <div className="space-y-2 mt-3">
                          <button
                            onClick={() => updateStatus(item.id, 'Pending')}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${item.status === 'Pending' ? 'bg-slate-200 text-slate-800 shadow-xs' : 'text-slate-500 hover:bg-slate-200'}`}
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Belum Diproses
                          </button>
                          <button
                            onClick={() => updateStatus(item.id, 'Proses')}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${item.status === 'Proses' ? 'bg-amber-100 text-amber-700 shadow-xs ring-1 ring-amber-300' : 'text-slate-500 hover:bg-slate-200'}`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            Sedang Diproses
                          </button>
                          <button
                            onClick={() => updateStatus(item.id, 'Selesai')}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${item.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700 shadow-xs ring-1 ring-emerald-300' : 'text-slate-500 hover:bg-slate-200'}`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Selesai Ditangani
                          </button>
                        </div>
                      )}
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
            totalItems={filteredReports.length}
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
