'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { PpdbControlCard } from '@/components/admin/ppdb/PpdbControlCard';
import { PpdbStatsOverview } from '@/components/admin/ppdb/PpdbStatsOverview';
import { PpdbSettingsModal } from '@/components/admin/ppdb/PpdbSettingsModal';
import { PpdbTable } from '@/components/admin/ppdb/PpdbTable';
import { Registration, PpdbSettings } from '@/types/ppdb';

export default function AdminPpdbPage() {
  const { data: session } = useSession();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [settings, setSettings] = useState<PpdbSettings>({
    is_open: true,
    academic_year: '2026/2027',
    registration_start: '',
    registration_end: '',
    announcement_date: '',
    closed_message: '',
  });

  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showAlert = (type: 'success' | 'error', text: string) => {
    setAlert({ type, text });
    setTimeout(() => setAlert(null), 4000);
  };

  const authHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...(session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
  };

  const fetchRegistrations = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/admin/registrations`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      if (res.ok) {
        const json = await res.json();
        setRegistrations(json.data || json);
      }
    } catch {
      showAlert('error', 'Gagal memuat data pendaftaran.');
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken]);

  const fetchSettings = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/admin/ppdb-settings`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.is_open !== undefined) setSettings(json);
      }
    } catch {
      // Graceful fallback
    }
  }, [session?.accessToken]);

  useEffect(() => {
    if (session?.accessToken) {
      fetchRegistrations();
      fetchSettings();
    }
  }, [session?.accessToken, fetchRegistrations, fetchSettings]);

  const handleToggleStatus = async () => {
    if (!session?.accessToken) return;
    setToggling(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/admin/ppdb-settings/toggle`, {
        method: 'POST',
        headers: authHeaders,
      });
      const json = await res.json();
      if (res.ok) {
        setSettings((prev) => ({ ...prev, is_open: json.is_open }));
        showAlert(
          'success',
          json.is_open
            ? 'Pendaftaran PPDB berhasil DIBUKA.'
            : 'Pendaftaran PPDB berhasil DITUTUP.'
        );
      } else {
        showAlert('error', json.message || 'Gagal mengubah status PPDB.');
      }
    } catch {
      showAlert('error', 'Terjadi kesalahan jaringan.');
    } finally {
      setToggling(false);
    }
  };

  const handleSaveSettings = async (form: PpdbSettings) => {
    if (!session?.accessToken) return;
    setSavingSettings(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/admin/ppdb-settings`, {
        method: 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (res.ok) {
        setSettings(form);
        setIsSettingsOpen(false);
        showAlert('success', 'Pengaturan jadwal PPDB berhasil disimpan.');
      } else {
        showAlert('error', json.message || 'Gagal menyimpan pengaturan.');
      }
    } catch {
      showAlert('error', 'Terjadi kesalahan saat menyimpan pengaturan.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: string, notes?: string) => {
    if (!session?.accessToken) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/admin/registrations/${id}/status`, {
        method: 'PATCH',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      if (res.ok) {
        setRegistrations((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, status: status as Registration['status'], notes } : r
          )
        );
        showAlert('success', 'Status pendaftar berhasil diperbarui.');
      } else {
        showAlert('error', 'Gagal memperbarui status pendaftar.');
      }
    } catch {
      showAlert('error', 'Terjadi kesalahan koneksi.');
    }
  };

  const handleExportCsv = async () => {
    if (!session?.accessToken) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/admin/registrations/export`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pendaftar-ppdb.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        showAlert('error', 'Gagal mengunduh CSV.');
      }
    } catch {
      showAlert('error', 'Terjadi kesalahan jaringan.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Alert toast banner */}
      {alert && (
        <div
          className={`p-4 rounded-2xl text-sm font-bold flex items-center justify-between shadow-lg animate-in slide-in-from-top duration-300 ${
            alert.type === 'success'
              ? 'bg-emerald-600 text-white shadow-emerald-600/20'
              : 'bg-rose-600 text-white shadow-rose-600/20'
          }`}
        >
          <span>{alert.text}</span>
          <button
            onClick={() => setAlert(null)}
            className="text-white/80 hover:text-white ml-4 font-normal"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. Master Control Card */}
      <PpdbControlCard
        settings={settings}
        toggling={toggling}
        onToggle={handleToggleStatus}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* 2. Stats Cards Overview */}
      <PpdbStatsOverview registrations={registrations} />

      {/* 3. Registrations Table */}
      <PpdbTable
        registrations={registrations}
        loading={loading}
        onRefresh={fetchRegistrations}
        onUpdateStatus={handleUpdateStatus}
        onExportCsv={handleExportCsv}
      />

      {/* 4. Settings Modal */}
      <PpdbSettingsModal
        settings={settings}
        isOpen={isSettingsOpen}
        saving={savingSettings}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
      />
    </div>
  );
}
