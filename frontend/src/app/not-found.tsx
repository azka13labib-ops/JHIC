'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8 inline-block">
          {/* Decorative background glow */}
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full scale-150"></div>
          
          <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center">
            <SearchX className="w-20 h-20 text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-8xl font-black text-slate-800 mb-4 tracking-tighter">
          4<span className="text-blue-600">0</span>4
        </h1>
        
        <h2 className="text-2xl font-bold text-slate-700 mb-3">
          Halaman Tidak Ditemukan
        </h2>
        
        <p className="text-slate-500 mb-8 leading-relaxed">
          Maaf, halaman yang Anda cari mungkin telah dihapus, diubah namanya, atau memang tidak pernah ada.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center shadow-md shadow-blue-200"
          >
            <Home className="w-4 h-4" />
            Ke Beranda Utama
          </Link>
          
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 border border-slate-200 transition-colors w-full sm:w-auto justify-center shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
