'use client';

import Link from 'next/link';
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavMobileDrawer({ isOpen, onClose }: NavMobileDrawerProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const navItems = [
    { title: 'HOME', href: '/' },
    {
      title: 'PROFIL',
      submenus: [
        { title: 'Sejarah Sekolah', href: '/profil/sejarah' },
        { title: 'Visi & Misi', href: '/profil/visi-misi' },
        { title: 'Fasilitas Sekolah', href: '/profil/fasilitas' },
        { title: 'Sambutan Kepala Sekolah', href: '/profil/sambutan' },
        { title: 'Direktori Guru', href: '/guru' },
      ],
    },
    {
      title: 'AKADEMIK',
      submenus: [
        { title: 'Peminatan & Jurusan', href: '/jurusan' },
        { title: 'Direktori Guru & Staf', href: '/guru' },
      ],
    },
    { title: 'EKSTRAKURIKULER', href: '/ekstrakurikuler' },
    { title: 'PRESTASI', href: '/prestasi' },
    { title: 'ALUMNI', href: '/alumni' },
    {
      title: 'PORTAL',
      submenus: [
        { title: 'E-Learning Siswa', href: '#' },
        { title: 'Ujian CBT Online', href: '#' },
        { title: 'E-Rapor Digital', href: '#' },
      ],
    },
    {
      title: 'INFORMASI',
      submenus: [
        { title: 'Berita Sekolah', href: '/berita' },
        { title: 'Agenda & Event', href: '/agenda' },
        { title: 'Artikel & Edukasi', href: '/artikel' },
        { title: 'Opini & Gagasan', href: '/opini' },
      ],
    },
    {
      title: 'KARYA',
      submenus: [
        { title: 'Galeri Dokumentasi', href: '/galeri' },
        { title: 'Karya Kreatif Siswa', href: '/karya-siswa' },
        { title: 'Blog Siswa', href: '/blog-siswa' },
      ],
    },
    {
      title: 'KONTAK',
      submenus: [
        { title: 'Buku Tamu Publik', href: '/buku-tamu' },
        { title: 'Tautan Cepat', href: '/link-penting' },
        { title: 'Kontak & Alamat', href: '/kontak' },
      ],
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-[110] w-full max-w-sm bg-white shadow-2xl lg:hidden flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <span className="font-serif font-bold text-lg tracking-tight text-slate-900">Menu Navigasi</span>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <div key={item.title} className="border-b border-slate-50 last:border-0 pb-2">
                {item.submenus ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.title)}
                      className="flex items-center justify-between w-full py-2.5 text-base font-bold text-slate-900 hover:text-blue-600 transition-colors group"
                    >
                      <span>{item.title}</span>
                      <ChevronDown 
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          openMenu === item.title ? 'rotate-180 text-blue-600' : ''
                        }`} 
                      />
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out flex flex-col space-y-1 ${
                        openMenu === item.title ? 'max-h-[500px] opacity-100 mt-2 mb-4' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {item.submenus.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          onClick={onClose}
                          className="flex items-center gap-2 pl-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between w-full py-2.5 text-base font-bold text-slate-900 hover:text-blue-600 transition-colors group"
                  >
                    <span>{item.title}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-6 border-t border-slate-100 bg-slate-50">
          <Link
            href="/ppdb"
            onClick={onClose}
            className="flex items-center justify-center w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all text-sm tracking-wide"
          >
            PENDAFTARAN PPDB
          </Link>
        </div>
      </div>
    </>
  );
}
