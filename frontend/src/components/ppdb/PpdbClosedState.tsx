import Link from 'next/link';
import { AlertTriangle, FileCheck, MessageCircle } from 'lucide-react';
import { PpdbInfo } from './types';

interface PpdbClosedStateProps {
  ppdbInfo: PpdbInfo;
}

export function PpdbClosedState({ ppdbInfo }: PpdbClosedStateProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-16">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-12 max-w-lg w-full text-center space-y-6 animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 bg-rose-50 border border-rose-200 rounded-3xl flex items-center justify-center text-rose-600 mx-auto">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="inline-block px-3 py-1 bg-rose-100 text-rose-800 text-xs font-black uppercase rounded-full tracking-wider">
            Pendaftaran Ditutup
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Masa PPDB Telah Ditutup
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
            {ppdbInfo.closed_message || 'Mohon maaf, masa penerimaan peserta didik baru (PPDB) SMA PGRI 1 Lumajang saat ini sedang tidak menerima pendaftaran.'}
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/ppdb/status"
            className="w-full py-3.5 bg-[#1E2B58] hover:bg-[#2B3B6F] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>Cek Status Kelulusan Pendaftar</span>
          </Link>

          <a
            href="https://wa.me/6281234567890?text=Halo%20Panitia%20PPDB%20SMA%20PGRI%201%20Lumajang,%20saya%20ingin%20bertanya%20informasi%20PPDB"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Hubungi Panitia Sekolah (WhatsApp)</span>
          </a>

          <Link
            href="/ppdb"
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 pt-2"
          >
            ← Kembali ke Beranda PPDB
          </Link>
        </div>
      </div>
    </div>
  );
}
