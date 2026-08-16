import { Trophy } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ekstrakurikuler | SMA PGRI 1 Lumajang',
};

export default function EkstrakurikulerPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <section className="bg-linear-to-br from-[#1E2B58] to-[#2B3B6F] text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Ekstrakurikuler</h1>
          <p className="text-blue-200">Kembangkan minat dan bakatmu di luar jam pelajaran akademik</p>
        </div>
      </section>
      
      <div className="flex-1 flex items-center justify-center p-4 py-20">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-2xl w-full border border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">Kegiatan Pengembangan Bakat & Minat</h2>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            Halaman ini nantinya akan berisi daftar kegiatan ekstrakurikuler beserta galeri foto kegiatannya.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
            <span>←</span> Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
