'use client';

import Link from 'next/link';

interface NavMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavMobileDrawer({ isOpen, onClose }: NavMobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-[#0d0d0d] border-b border-neutral-800 px-4 py-5 space-y-4 max-h-[80vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-2 text-xs">
        <Link
          href="/"
          onClick={onClose}
          className="p-2.5 font-bold text-white hover:bg-neutral-900 rounded-lg"
        >
          HOME
        </Link>
        <Link
          href="/jurusan"
          onClick={onClose}
          className="p-2.5 font-bold text-white hover:bg-neutral-900 rounded-lg"
        >
          AKADEMIK
        </Link>
        <Link
          href="/prestasi"
          onClick={onClose}
          className="p-2.5 font-bold text-white hover:bg-neutral-900 rounded-lg"
        >
          PRESTASI
        </Link>
        <Link
          href="/ekstrakurikuler"
          onClick={onClose}
          className="p-2.5 font-bold text-white hover:bg-neutral-900 rounded-lg"
        >
          EKSTRAKURIKULER
        </Link>
      </div>

      <div className="border-t border-neutral-800 pt-3">
        <div className="text-[10px] font-bold uppercase text-neutral-500 mb-2">
          Profil Sekolah
        </div>
        <div className="grid grid-cols-2 gap-1 text-xs">
          <Link
            href="/profil/sejarah"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            Sejarah
          </Link>
          <Link
            href="/profil/visi-misi"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            Visi Misi
          </Link>
          <Link
            href="/profil/sambutan"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            Sambutan
          </Link>
          <Link
            href="/guru"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            Direktori Guru
          </Link>
        </div>
      </div>

      <div className="border-t border-neutral-800 pt-3">
        <div className="text-[10px] font-bold uppercase text-neutral-500 mb-2">
          Informasi & Komunitas
        </div>
        <div className="grid grid-cols-2 gap-1 text-xs">
          <Link
            href="/berita"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            Berita
          </Link>
          <Link
            href="/agenda"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            Agenda
          </Link>
          <Link
            href="/artikel"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            Artikel
          </Link>
          <Link
            href="/alumni"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            Tracer Alumni
          </Link>
          <Link
            href="/buku-tamu"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            Buku Tamu
          </Link>
          <Link
            href="/kontak"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            Kontak
          </Link>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href="/ppdb"
          onClick={onClose}
          className="w-full block py-2.5 text-center bg-blue-600 text-white font-bold rounded-xl text-xs shadow-md"
        >
          PPDB ONLINE 2026
        </Link>
      </div>
    </div>
  );
}
