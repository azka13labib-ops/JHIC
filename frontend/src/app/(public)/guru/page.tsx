import { GraduationCap } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Direktori Guru | SMA PGRI 1 Lumajang',
};

export default function GuruPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <section className="bg-linear-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b border-slate-200 py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Direktori Guru & Staf</h1>
          <p className="text-slate-600 max-w-xl mx-auto text-base">Mengenal lebih dekat para pendidik berdedikasi tinggi di SMA PGRI 1 Lumajang</p>
        </div>
      </section>
      
      <div className="flex-1 flex items-center justify-center p-4 py-20">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-2xl w-full border border-slate-100">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6"><GraduationCap className="w-10 h-10" /></div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">Halaman Direktori Guru</h2>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            Data profil guru beserta mata pelajaran yang diampu saat ini sedang dihimpun oleh admin.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
            <span>←</span> Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
