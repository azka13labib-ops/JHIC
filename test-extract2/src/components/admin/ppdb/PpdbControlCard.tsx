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
      className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl transition-all duration-300 relative overflow-hidden ${
        settings.is_open
          ? 'bg-linear-to-br from-emerald-600 via-teal-600 to-emerald-800 shadow-emerald-600/20'
          : 'bg-linear-to-br from-slate-700 via-slate-800 to-slate-900 shadow-slate-900/20'
      }`}
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                settings.is_open
                  ? 'bg-white/20 text-emerald-100 backdrop-blur-sm'
                  : 'bg-rose-500/30 text-rose-200 backdrop-blur-sm'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  settings.is_open ? 'bg-emerald-300 animate-ping' : 'bg-rose-400'
                }`}
              />
              {settings.is_open ? 'Pendaftaran Sedang Dibuka' : 'Pendaftaran Ditutup'}
            </span>
            <span className="text-xs text-white/80 font-medium">
              Tahun Ajaran: {settings.academic_year}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            Master Kontrol PPDB
          </h2>
          <p className="text-white/80 text-sm max-w-xl">
            {settings.is_open
              ? 'Formulir pendaftaran publik aktif dan dapat menerima berkas pendaftar baru.'
              : 'Formulir pendaftaran publik ditutup. Pengunjung diarahkan ke informasi layanan atau hotline WhatsApp.'}
          </p>

          {/* Timeline schedule hints */}
          {(settings.registration_start || settings.registration_end) && (
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/90">
              {settings.registration_start && (
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-lg">
                  <Calendar className="w-3.5 h-3.5" /> Buka:{' '}
                  {new Date(settings.registration_start).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              )}
              {settings.registration_end && (
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5" /> Tutup:{' '}
                  {new Date(settings.registration_end).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              )}
              {settings.announcement_date && (
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-lg">
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
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold px-5 py-3 rounded-2xl transition border border-white/20 backdrop-blur-sm text-sm"
          >
            <Settings className="w-4 h-4" />
            Atur Jadwal & Pesan
          </button>

          <button
            onClick={onToggle}
            disabled={toggling}
            className={`flex items-center gap-2 font-black px-6 py-3 rounded-2xl transition shadow-lg active:scale-95 text-sm ${
              settings.is_open
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-900/30'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-900/30'
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
