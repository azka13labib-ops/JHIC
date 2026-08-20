'use client';

import Link from 'next/link';

interface NavMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavMobileDrawer({ isOpen, onClose }: NavMobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-5 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl">
      <div className="grid grid-cols-2 gap-2 text-xs">
        <Link
          href="/"
          onClick={onClose}
          className="p-2.5 font-bold text-slate-900 hover:bg-slate-100 hover:text-blue-600 rounded-xl transition-colors"
        >
          HOME
        </Link>
        <Link
          href="/jurusan"
          onClick={onClose}
          className="p-2.5 font-bold text-slate-900 hover:bg-slate-100 hover:text-blue-600 rounded-xl transition-colors"
        >
          AKADEMIK
        </Link>
        <Link
          href="/prestasi"
          onClick={onClose}
          className="p-2.5 font-bold text-slate-900 hover:bg-slate-100 hover:text-blue-600 rounded-xl transition-colors"
        >
          PRESTASI
        </Link>
        <Link
          href="/ekstrakurikuler"
          onClick={onClose}
          className="p-2.5 font-bold text-slate-900 hover:bg-slate-100 hover:text-blue-600 rounded-xl transition-colors"
        >
          EKSTRAKURIKULER
        </Link>
        <Link
          href="/alumni"
          onClick={onClose}
          className="p-2.5 font-bold text-slate-900 hover:bg-slate-100 hover:text-blue-600 rounded-xl transition-colors"
        >
          ALUMNI
        </Link>
      </div>

      <div className="border-t border-slate-200 pt-3">
        <div className="text-[10px] font-bold uppercase text-slate-400 mb-2">
          Profil Sekolah
        </div>
        <div className="grid grid-cols-2 gap-1 text-xs">
          <Link
            href="/profil/sejarah"
            onClick={onClose}
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
          >
            Sejarah
          </Link>
          <Link
            href="/profil/visi-misi"
            onClick={onClose}
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
          >
            Visi Misi
          </Link>
          <Link
            href="/profil/fasilitas"
            onClick={onClose}
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
          >
            Fasilitas Sekolah
          </Link>
          <Link
            href="/profil/sambutan"
            onClick={onClose}
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
          >
            Sambutan
          </Link>
          <Link
            href="/guru"
            onClick={onClose}
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
          >
            Direktori Guru
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-3">
        <div className="text-[10px] font-bold uppercase text-slate-400 mb-2">
          Informasi & Komunitas
        </div>
        <div className="grid grid-cols-2 gap-1 text-xs">
          <Link
            href="/berita"
            onClick={onClose}
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
          >
            Berita
          </Link>
          <Link
            href="/agenda"
            onClick={onClose}
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
          >
            Agenda
          </Link>
          <Link
            href="/artikel"
            onClick={onClose}
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
          >
            Artikel
          </Link>
          <Link
            href="/buku-tamu"
            onClick={onClose}
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
          >
            Buku Tamu
          </Link>
          <Link
            href="/kontak"
            onClick={onClose}
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
          >
            Kontak
          </Link>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href="/ppdb"
          onClick={onClose}
          className="w-full block py-2.5 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md"
        >
          PPDB ONLINE 2026
        </Link>
      </div>
    </div>
  );
}
