'use client';

import { Power, Calendar, Settings, Clock, Megaphone, Loader2 } from 'lucide-react';
import { PpdbSettings } from '@/types/ppdb';

interface PpdbControlCardProps {
  settings: PpdbSettings;
  toggling: boolean;
  onToggle: () => void;
  onOpenSettings: () => void;
}

export function PpdbControlCard({
  settings,
  toggling,
  onToggle,
  onOpenSettings,
}: PpdbControlCardProps) {
  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 transition-all duration-300 relative border shadow-xs ${
        settings.is_open
          ? 'bg-white border-emerald-200 text-slate-900'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                settings.is_open
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  settings.is_open ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
              {settings.is_open ? 'Pendaftaran Dibuka' : 'Pendaftaran Ditutup'}
            </span>
            <span className="text-xs font-medium text-slate-500">
              Tahun Ajaran: {settings.academic_year}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Status Pendaftaran PPDB
          </h2>
          <p className="text-sm max-w-xl leading-relaxed text-slate-600">
            {settings.is_open
              ? 'Calon siswa dapat mengisi formulir dan mengirim berkas pendaftaran melalui halaman web.'
              : 'Pendaftaran ditutup. Pengunjung web akan melihat pesan penutupan dan kontak bantuan.'}
          </p>

          {/* Timeline schedule hints */}
          {(settings.registration_start || settings.registration_end) && (
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-600">
              {settings.registration_start && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 border border-slate-200">
                  <Calendar className="w-3.5 h-3.5" /> Buka:{' '}
                  {new Date(settings.registration_start).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              )}
              {settings.registration_end && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 border border-slate-200">
                  <Clock className="w-3.5 h-3.5" /> Tutup:{' '}
                  {new Date(settings.registration_end).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              )}
              {settings.announcement_date && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 border border-slate-200">
                  <Megaphone className="w-3.5 h-3.5" /> Pengumuman:{' '}
                  {new Date(settings.announcement_date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg transition text-sm bg-white border border-slate-300 hover:bg-slate-50 text-slate-700"
          >
            <Settings className="w-4 h-4" />
            Pengaturan Jadwal
          </button>

          <button
            onClick={onToggle}
            disabled={toggling}
            className={`flex items-center gap-2 font-bold px-5 py-2.5 rounded-lg transition text-sm ${
              settings.is_open
                ? 'bg-rose-100 hover:bg-rose-200 text-rose-800'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {toggling ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Power className="w-4 h-4" />
            )}
            {settings.is_open ? 'Tutup Pendaftaran' : 'Buka Pendaftaran Sekarang'}
          </button>
        </div>
      </div>
    </div>
  );
}
