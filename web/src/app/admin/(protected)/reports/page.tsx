'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { Shield, Search, Trash2, CheckCircle2, Clock, AlertTriangle, MessageSquare, Send, X } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminPagination } from '@/components/admin/AdminPagination';

interface Report {
  id: number;
  ticket_id: string;
  category: string;
  message: string;
  status: string;
  created_at: string;
  admin_response?: string | null;
  responded_at?: string | null;
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

  // State untuk form balasan admin
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyStatus, setReplyStatus] = useState('Proses');

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
    let ignore = false;
    if (session?.accessToken) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/reports`, { headers: authHeaders })
        .then((res) => res.json())
        .then((data) => {
          if (!ignore) {
            setReportsList(Array.isArray(data) ? data : data.data ?? []);
            setLoading(false);
          }
        })
        .catch(() => {
          if (!ignore) {
            setReportsList([]);
            setLoading(false);
          }
        });
    }
    return () => {
      ignore = true;
    };
  }, [session, authHeaders]);

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

  const updateStatusOnly = async (id: number, newStatus: string) => {
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

  const handleOpenReply = (item: Report) => {
    setActiveReplyId(item.id);
    setReplyText(item.admin_response || '');
    setReplyStatus(item.status === 'Pending' ? 'Proses' : item.status);
  };

  const handleCancelReply = () => {
    setActiveReplyId(null);
    setReplyText('');
  };

  const handleSaveReply = async (id: number) => {
    setIsUpdating(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/reports/${id}/status`, {
        method: 'PATCH',
        headers: {
          ...authHeaders,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: replyStatus,
          admin_response: replyText.trim()
        })
      });
      if (res.ok) {
        setActiveReplyId(null);
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
        item.message.toLowerCase().includes(q) ||
        (item.admin_response && item.admin_response.toLowerCase().includes(q))
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
        description="Kelola laporan anonim dari siswa secara rahasia, perbarui status, dan kirim balasan tindak lanjut resmi."
      />

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={search}
              onChange={handleSearchChange}
              placeholder="Cari kode tiket, kategori, isi laporan, atau balasan..."
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
                <div key={item.id} className={`p-6 transition-colors ${item.status === 'Pending' ? 'bg-amber-50/30' : 'hover:bg-slate-50/60'}`}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-xs font-mono font-bold text-slate-800 tracking-widest">
                            {item.ticket_id}
                          </div>
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            {item.category}
                          </div>
                          <span className="text-xs text-slate-400">
                            {new Date(item.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        </div>
                        
                        <div className="shrink-0 flex items-center gap-2">
                          <button 
                            onClick={() => deleteReport(item.id)}
                            disabled={isDeleting === item.id}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
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

                      {/* Pesan Laporan Murid */}
                      <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-800 whitespace-pre-line shadow-xs">
                        {item.message}
                      </div>

                      {/* Tampilan Balasan Resmi Admin Jika Sudah Ada */}
                      {item.admin_response && activeReplyId !== item.id && (
                        <div className="rounded-xl bg-blue-50/70 border border-blue-200/80 p-4 space-y-2">
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <div className="font-bold text-blue-900 flex items-center gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                              <span>Balasan Resmi Sekolah / BK (Dapat dilihat murid via kode tiket)</span>
                            </div>
                            {item.responded_at && (
                              <span className="text-slate-500 text-[11px]">
                                {new Date(item.responded_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-800 whitespace-pre-line leading-relaxed bg-white/80 p-3 rounded-lg border border-blue-100">
                            {item.admin_response}
                          </p>
                          <div className="pt-1">
                            <button
                              onClick={() => handleOpenReply(item)}
                              className="text-xs font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
                            >
                              Edit Balasan Ini
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Form Tulis/Edit Balasan */}
                      {activeReplyId === item.id && (
                        <div className="rounded-2xl bg-slate-50 border border-blue-200 p-5 space-y-4 shadow-sm animate-in fade-in">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
                              <MessageSquare className="w-4 h-4 text-blue-600" />
                              <span>Tulis Tanggapan Resmi untuk Pemegang Tiket ({item.ticket_id})</span>
                            </h5>
                            <button
                              onClick={handleCancelReply}
                              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={4}
                            placeholder="Tuliskan tindak lanjut atau tanggapan resmi dari pihak sekolah/BK. Balasan ini akan dibaca secara anonim oleh murid saat memasukkan kode tiket..."
                            className="w-full p-3.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400 text-slate-800 resize-none shadow-2xs"
                          ></textarea>

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-600">Update Status:</span>
                              <select
                                value={replyStatus}
                                onChange={(e) => setReplyStatus(e.target.value)}
                                className="px-3 py-1.5 text-xs font-bold bg-white border border-slate-300 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              >
                                <option value="Pending">Pending (Belum Diproses)</option>
                                <option value="Proses">Sedang Diproses</option>
                                <option value="Selesai">Selesai Ditangani</option>
                              </select>
                            </div>

                            <div className="flex items-center gap-2 justify-end">
                              <button
                                onClick={handleCancelReply}
                                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                              >
                                Batal
                              </button>
                              <button
                                onClick={() => handleSaveReply(item.id)}
                                disabled={isUpdating === item.id}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors shadow-xs disabled:opacity-70 cursor-pointer"
                              >
                                {isUpdating === item.id ? (
                                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Send className="w-3.5 h-3.5" />
                                )}
                                <span>Simpan & Kirim Balasan</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {!item.admin_response && activeReplyId !== item.id && (
                        <div>
                          <button
                            onClick={() => handleOpenReply(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200/80"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Tulis Balasan Resmi</span>
                          </button>
                        </div>
                      )}

                    </div>

                    {/* Sisi Kanan: Status Cepat */}
                    <div className="lg:w-56 shrink-0 bg-slate-50 rounded-xl p-4 border border-slate-200 h-fit">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 border-b border-slate-200 pb-2">Status Penanganan</div>
                      
                      {isUpdating === item.id ? (
                        <div className="flex items-center justify-center py-4">
                          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : (
                        <div className="space-y-2 mt-3">
                          <button
                            onClick={() => updateStatusOnly(item.id, 'Pending')}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${item.status === 'Pending' ? 'bg-slate-200 text-slate-800 shadow-xs' : 'text-slate-500 hover:bg-slate-200'}`}
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Belum Diproses
                          </button>
                          <button
                            onClick={() => updateStatusOnly(item.id, 'Proses')}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${item.status === 'Proses' ? 'bg-amber-100 text-amber-700 shadow-xs ring-1 ring-amber-300' : 'text-slate-500 hover:bg-slate-200'}`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            Sedang Diproses
                          </button>
                          <button
                            onClick={() => updateStatusOnly(item.id, 'Selesai')}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${item.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700 shadow-xs ring-1 ring-emerald-300' : 'text-slate-500 hover:bg-slate-200'}`}
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
