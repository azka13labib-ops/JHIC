'use client';

import { useState } from 'react';
import { X, Settings, Loader2 } from 'lucide-react';
import { PpdbSettings } from '@/types/ppdb';

interface PpdbSettingsModalProps {
  settings: PpdbSettings;
  isOpen: boolean;
  saving: boolean;
  onClose: () => void;
  onSave: (form: PpdbSettings) => Promise<void>;
}

export function PpdbSettingsModal({
  settings,
  isOpen,
  saving,
  onClose,
  onSave,
}: PpdbSettingsModalProps) {
  const [form, setForm] = useState<PpdbSettings>({ ...settings });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Pengaturan Periode & Pesan PPDB
              </h3>
              <p className="text-xs text-slate-500">
                Sesuaikan jadwal pendaftaran dan pesan ketika form ditutup
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tahun Ajaran
            </label>
            <input
              type="text"
              value={form.academic_year}
              onChange={(e) => setForm({ ...form, academic_year: e.target.value })}
              placeholder="Contoh: 2026/2027"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tanggal Mulai Pendaftaran
              </label>
              <input
                type="date"
                value={form.registration_start}
                onChange={(e) =>
                  setForm({ ...form, registration_start: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tanggal Tutup Pendaftaran
              </label>
              <input
                type="date"
                value={form.registration_end}
                onChange={(e) =>
                  setForm({ ...form, registration_end: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tanggal Pengumuman Hasil
            </label>
            <input
              type="date"
              value={form.announcement_date}
              onChange={(e) =>
                setForm({ ...form, announcement_date: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Pesan Saat Pendaftaran Ditutup
            </label>
            <textarea
              rows={3}
              value={form.closed_message}
              onChange={(e) =>
                setForm({ ...form, closed_message: e.target.value })
              }
              placeholder="Pesan kustom untuk pengunjung ketika status PPDB sedang ditutup..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
