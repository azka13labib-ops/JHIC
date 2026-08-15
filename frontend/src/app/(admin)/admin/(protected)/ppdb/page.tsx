'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Search, 
  Users, 
  Download, 
  Copy, 
  Check, 
  School, 
  GraduationCap,
  Filter,
  RefreshCw,
  Power,
  Settings,
  Calendar,
  X,
  Clock,
  Megaphone
} from 'lucide-react';

interface Registration {
  id: number;
  registration_number: string;
  full_name: string;
  nisn: string;
  major_choice: string;
  status: 'pending' | 'verified' | 'accepted' | 'rejected';
  previous_school: string;
  created_at: string;
  notes?: string;
}

interface PpdbSettings {
  is_open: boolean;
  academic_year: string;
  registration_start: string;
  registration_end: string;
  announcement_date: string;
  closed_message: string;
}

const STATUS_CONFIG: Record<string, { label: string; badge: string; dot: string }> = {
  pending:  { label: 'Menunggu', badge: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-500' },
  verified: { label: 'Terverifikasi', badge: 'bg-blue-50 text-blue-800 border-blue-200', dot: 'bg-blue-500' },
  accepted: { label: 'Diterima', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500' },
  rejected: { label: 'Ditolak', badge: 'bg-rose-50 text-rose-800 border-rose-200', dot: 'bg-rose-500' },
};

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Menunggu' },
  { value: 'verified', label: 'Terverifikasi' },
  { value: 'accepted', label: 'Diterima' },
  { value: 'rejected', label: 'Ditolak' },
];

export default function AdminPpdbPage() {
  const { data: session } = useSession();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // PPDB Control Settings State
  const [settings, setSettings] = useState<PpdbSettings>({
    is_open: true,
    academic_year: '2026/2027',
    registration_start: '2026-07-01',
    registration_end: '2026-08-31',
    announcement_date: '2026-09-10',
    closed_message: 'Pendaftaran PPDB SMA PGRI 1 Lumajang saat ini sedang ditutup. Terima kasih atas antusiasme pendaftar.',
  });
  const [togglingStatus, setTogglingStatus] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    showToast('success', `${label} "${text}" disalin ke clipboard!`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Fetch Settings
  const fetchSettings = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/admin/ppdb-settings`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (e) {
      console.error('Fetch settings error:', e);
    }
  }, [session?.accessToken]);

  // Fetch Registrations
  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.set('status', filterStatus);
      if (search) params.set('search', search);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/admin/registrations?${params}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: 'application/json',
        },
      });

      if (res.status === 401) {
        signOut({ callbackUrl: '/admin/login' });
        return;
      }

      if (!res.ok) {
        throw new Error(`Server mengembalikan status ${res.status}`);
      }

      const data = await res.json();
      setRegistrations(data.data ?? []);
    } catch (e: any) {
      console.error('Fetch PPDB error:', e);
      setErrorMsg(e.message || 'Gagal memuat data pendaftaran.');
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken, filterStatus, search]);

  useEffect(() => {
    fetchSettings();
    fetchData();
  }, [fetchSettings, fetchData]);

  // Toggle Open/Close Status
  const handleToggleStatus = async () => {
    if (!session?.accessToken || togglingStatus) return;
    setTogglingStatus(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/admin/ppdb-settings/toggle`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: 'application/json',
        },
      });
      if (!res.ok) throw new Error('Gagal mengubah status PPDB');
      const data = await res.json();
      setSettings((prev) => ({ ...prev, is_open: data.is_open }));
      showToast('success', data.message || 'Status PPDB berhasil diubah.');
    } catch (e: any) {
      showToast('error', e.message || 'Terjadi kesalahan');
    } finally {
      setTogglingStatus(false);
    }
  };

  // Save Settings Modal
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.accessToken || savingSettings) return;
    setSavingSettings(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/admin/ppdb-settings`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Gagal menyimpan pengaturan PPDB');
      const data = await res.json();
      setSettings(data.settings);
      setShowSettingsModal(false);
      showToast('success', 'Pengaturan jadwal dan pesan PPDB berhasil disimpan.');
    } catch (e: any) {
      showToast('error', e.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setSavingSettings(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    if (!session?.accessToken) {
      showToast('error', 'Sesi login tidak valid, silakan login ulang.');
      return;
    }

    const previousRegistrations = [...registrations];

    setRegistrations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
    );
    setUpdatingId(id);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/admin/registrations/${id}/status`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Gagal mengubah status di server.');
      }

      showToast('success', `Status berhasil diubah menjadi "${newStatus.toUpperCase()}".`);
    } catch (err: any) {
      console.error('Update status error:', err);
      setRegistrations(previousRegistrations);
      showToast('error', err.message || 'Terjadi kesalahan saat memperbarui status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const exportCsv = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    window.open(`${apiUrl}/admin/registrations/export`, '_blank');
  };

  const totalCount = registrations.length;
  const pendingCount = registrations.filter((r) => r.status === 'pending').length;
  const verifiedCount = registrations.filter((r) => r.status === 'verified').length;
  const acceptedCount = registrations.filter((r) => r.status === 'accepted').length;

  return (
    <div className="space-y-6 text-slate-900 animate-in fade-in duration-300">
      
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold transition-all animate-in fade-in slide-in-from-bottom-5 ${
            toastMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : 'bg-rose-50 text-rose-900 border-rose-300'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* PPDB Portal Master Control Bar */}
      <div className={`p-6 rounded-3xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs ${
        settings.is_open 
          ? 'bg-emerald-50/70 border-emerald-200' 
          : 'bg-rose-50/70 border-rose-200'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
            settings.is_open 
              ? 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20' 
              : 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
          }`}>
            <Power className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                settings.is_open 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-rose-600 text-white'
              }`}>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {settings.is_open ? 'PENDAFTARAN DIBUKA' : 'PENDAFTARAN DITUTUP'}
              </span>
              <span className="text-xs font-bold text-slate-600">Tahun Ajaran {settings.academic_year}</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              {settings.is_open 
                ? 'Portal pendaftaran aktif menerima formulir calon siswa baru secara online.' 
                : 'Formulir pendaftaran dinonaktifkan di halaman publik dan akses submit diblokir.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleToggleStatus}
            disabled={togglingStatus}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 ${
              settings.is_open
                ? 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white'
            }`}
          >
            {togglingStatus ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Power className="w-4 h-4" />
            )}
            <span>{settings.is_open ? 'Tutup Pendaftaran' : 'Buka Pendaftaran'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSettingsModal(true)}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl font-bold text-xs text-slate-700 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>Atur Jadwal & Pesan</span>
          </button>
        </div>
      </div>

      {/* Header with Title and Quick Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Data Pendaftar PPDB</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Realtime</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Verifikasi berkas pendaftar, tetapkan jurusan, dan update status seleksi.</p>
          </div>
        </div>
        
        <button
          onClick={exportCsv}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Data CSV</span>
        </button>
      </div>

      {/* Quick Filter Status Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setFilterStatus('')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            filterStatus === ''
              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">Total Pendaftar</div>
          <div className="text-xl font-extrabold mt-0.5">{totalCount}</div>
        </button>

        <button
          onClick={() => setFilterStatus('pending')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            filterStatus === 'pending'
              ? 'bg-amber-600 text-white border-amber-600 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50/50'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider opacity-80 text-amber-700">Menunggu Verifikasi</div>
          <div className="text-xl font-extrabold text-amber-900 mt-0.5">{pendingCount}</div>
        </button>

        <button
          onClick={() => setFilterStatus('verified')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            filterStatus === 'verified'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/50'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider opacity-80 text-blue-700">Terverifikasi</div>
          <div className="text-xl font-extrabold text-blue-900 mt-0.5">{verifiedCount}</div>
        </button>

        <button
          onClick={() => setFilterStatus('accepted')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            filterStatus === 'accepted'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50/50'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider opacity-80 text-emerald-700">Lulus / Diterima</div>
          <div className="text-xl font-extrabold text-emerald-900 mt-0.5">{acceptedCount}</div>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchData()}
            placeholder="Cari nama siswa, nomor pendaftaran, NISN, atau asal sekolah..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-8 pr-8 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">Semua Status</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={fetchData}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Cari
          </button>
        </div>
      </div>

      {/* Main Registrations Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-semibold text-slate-400">Memuat data pendaftar...</span>
          </div>
        ) : errorMsg ? (
          <div className="p-8 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <div className="text-sm font-bold text-rose-700">{errorMsg}</div>
            <button
              onClick={fetchData}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Coba Lagi</span>
            </button>
          </div>
        ) : registrations.length === 0 ? (
          <div className="text-center py-16 space-y-2">
            <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-500">Tidak ada pendaftar yang cocok dengan filter saat ini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-4 px-6">No. Pendaftaran</th>
                  <th className="py-4 px-6">Nama & NISN</th>
                  <th className="py-4 px-6">Pilihan Jurusan</th>
                  <th className="py-4 px-6">Asal Sekolah</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Ubah Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {registrations.map((reg) => {
                  const cfg = STATUS_CONFIG[reg.status] || STATUS_CONFIG.pending;
                  const isUpdating = updatingId === reg.id;
                  const isCopied = copiedText === reg.registration_number;

                  return (
                    <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 font-mono font-bold text-blue-600">
                          <span>{reg.registration_number}</span>
                          <button
                            onClick={() => copyToClipboard(reg.registration_number, 'Nomor Pendaftaran')}
                            className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Salin No. Pendaftaran"
                          >
                            {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-400 block pt-0.5">
                          {new Date(reg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{reg.full_name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">NISN: {reg.nisn}</div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                          {reg.major_choice}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-44">{reg.previous_school}</span>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold border ${cfg.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <select
                            value={reg.status}
                            onChange={(e) => updateStatus(reg.id, e.target.value)}
                            disabled={isUpdating}
                            className="border border-slate-300 hover:border-blue-500 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50"
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s.value} value={s.value} className="text-slate-900 bg-white font-medium">
                                {s.label}
                              </option>
                            ))}
                          </select>
                          {isUpdating && (
                            <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin shrink-0" />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Settings Modal Dialog */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Pengaturan Periode PPDB</h3>
                  <p className="text-xs text-slate-500">Sesuaikan tahun ajaran, jadwal pelaksanaan, dan pesan penutupan.</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Tahun Ajaran</label>
                <input
                  type="text"
                  value={settings.academic_year}
                  onChange={(e) => setSettings({ ...settings, academic_year: e.target.value })}
                  placeholder="e.g. 2026/2027"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Mulai Pendaftaran</span>
                  </label>
                  <input
                    type="date"
                    value={settings.registration_start || ''}
                    onChange={(e) => setSettings({ ...settings, registration_start: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Batas Akhir Pendaftaran</span>
                  </label>
                  <input
                    type="date"
                    value={settings.registration_end || ''}
                    onChange={(e) => setSettings({ ...settings, registration_end: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Megaphone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Tanggal Pengumuman Hasil</span>
                </label>
                <input
                  type="date"
                  value={settings.announcement_date || ''}
                  onChange={(e) => setSettings({ ...settings, announcement_date: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Pesan Saat Pendaftaran Ditutup</label>
                <textarea
                  rows={3}
                  value={settings.closed_message || ''}
                  onChange={(e) => setSettings({ ...settings, closed_message: e.target.value })}
                  placeholder="Pesan informasi yang akan dibaca calon siswa saat form ditutup..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {savingSettings && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Simpan Pengaturan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
