import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

interface PpdbSuccessStateProps {
  registrationNumber: string;
}

export function PpdbSuccessState({ registrationNumber }: PpdbSuccessStateProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 max-w-lg w-full text-center animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Pendaftaran Berhasil Disubmit!</h1>
        <p className="text-slate-600 text-xs sm:text-sm mb-6">Berikut adalah nomor pendaftaran resmi Anda:</p>
        
        <div className="bg-slate-100 rounded-2xl p-4 font-mono font-black text-xl text-[#1E2B58] mb-6 tracking-widest border border-slate-200">
          {registrationNumber}
        </div>
        
        <p className="text-slate-500 text-xs mb-6 leading-relaxed">
          Simpan nomor ini untuk memeriksa status verifikasi dan pengumuman hasil seleksi di portal PPDB.
        </p>
        
        <Link href="/ppdb/status" className="block w-full bg-[#1E2B58] text-white py-3.5 rounded-xl font-bold text-xs hover:bg-[#2B3B6F] transition-all shadow-md">
          Cek Status Pendaftaran Sekarang →
        </Link>
      </div>
    </div>
  );
}
