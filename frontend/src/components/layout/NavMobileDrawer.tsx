'use client';

import Link from 'next/link';
import { 
  X, 
  ChevronDown,
  Landmark,
  Target,
  Building2,
  Mic,
  Users,
  GraduationCap,
  Laptop,
  FileText,
  BarChart3,
  Newspaper,
  CalendarDays,
  BookOpen,
  MessageSquareQuote,
  Image as ImageIcon,
  Palette,
  PenTool,
  BookUser,
  Link as LinkIcon,
  Phone
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavMobileDrawer({ isOpen, onClose }: NavMobileDrawerProps) {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  if (isOpen && !isRendered) {
    setIsRendered(true);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => {
        setIsRendered(false);
        setOpenMenu(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const navItems = [
    { title: 'HOME', href: '/' },
    {
      title: 'PROFIL',
      submenus: [
        { title: 'Sejarah Sekolah', href: '/profil/sejarah', icon: Landmark, iconColor: 'text-blue-600' },
        { title: 'Visi & Misi', href: '/profil/visi-misi', icon: Target, iconColor: 'text-amber-600' },
        { title: 'Fasilitas Sekolah', href: '/profil/fasilitas', icon: Building2, iconColor: 'text-indigo-600' },
        { title: 'Sambutan Kepala Sekolah', href: '/profil/sambutan', icon: Mic, iconColor: 'text-emerald-600' },
        { title: 'Direktori Guru', href: '/guru', icon: Users, iconColor: 'text-purple-600' },
      ],
    },
    {
      title: 'AKADEMIK',
      submenus: [
        { title: 'Peminatan & Jurusan', href: '/jurusan', icon: GraduationCap, iconColor: 'text-blue-600' },
        { title: 'Direktori Guru & Staf', href: '/guru', icon: Users, iconColor: 'text-purple-600' },
      ],
    },
    { title: 'EKSTRAKURIKULER', href: '/ekstrakurikuler' },
    { title: 'PRESTASI', href: '/prestasi' },
    { title: 'ALUMNI', href: '/alumni' },
    {
      title: 'PORTAL',
      submenus: [
        { title: 'E-Learning Siswa', href: '#', icon: Laptop, iconColor: 'text-blue-600' },
        { title: 'Ujian CBT Online', href: '#', icon: FileText, iconColor: 'text-amber-600' },
        { title: 'E-Rapor Digital', href: '#', icon: BarChart3, iconColor: 'text-emerald-600' },
      ],
    },
    {
      title: 'INFORMASI',
      submenus: [
        { title: 'Berita Sekolah', href: '/berita', icon: Newspaper, iconColor: 'text-blue-600' },
        { title: 'Agenda & Event', href: '/agenda', icon: CalendarDays, iconColor: 'text-amber-600' },
        { title: 'Artikel & Edukasi', href: '/artikel', icon: BookOpen, iconColor: 'text-emerald-600' },
        { title: 'Opini & Gagasan', href: '/opini', icon: MessageSquareQuote, iconColor: 'text-purple-600' },
      ],
    },
    {
      title: 'KARYA',
      submenus: [
        { title: 'Galeri Dokumentasi', href: '/galeri', icon: ImageIcon, iconColor: 'text-rose-600' },
        { title: 'Karya Kreatif Siswa', href: '/karya-siswa', icon: Palette, iconColor: 'text-indigo-600' },
        { title: 'Blog Siswa', href: '/blog-siswa', icon: PenTool, iconColor: 'text-teal-600' },
      ],
    },
    {
      title: 'KONTAK',
      submenus: [
        { title: 'Buku Tamu Publik', href: '/buku-tamu', icon: BookUser, iconColor: 'text-blue-600' },
        { title: 'Tautan Cepat', href: '/link-penting', icon: LinkIcon, iconColor: 'text-emerald-600' },
        { title: 'Kontak & Alamat', href: '/kontak', icon: Phone, iconColor: 'text-amber-600' },
      ],
    },
  ];

  if (!isRendered) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-100 lg:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div 
        className={`fixed inset-y-0 right-0 z-110 w-[85vw] max-w-sm bg-white rounded-l-4xl shadow-[-10px_0_40px_rgba(0,0,0,0.1)] lg:hidden flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
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

        {/* Scrollable Accordion Content */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="flex flex-col">
            {navItems.map((item) => {
              const isOpenMenu = openMenu === item.title;
              
              return (
                <div key={item.title} className="mb-2">
                  {item.submenus ? (
                    <>
                      <button
                        onClick={() => setOpenMenu(isOpenMenu ? null : item.title)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                          isOpenMenu 
                            ? 'bg-blue-50 text-blue-700 shadow-[0_2px_10px_-3px_rgba(59,130,246,0.2)] border border-blue-100/50' 
                            : 'bg-transparent text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-bold text-[15px]">{item.title}</span>
                        <ChevronDown 
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isOpenMenu ? 'rotate-180 text-blue-600' : 'text-slate-400'
                          }`} 
                        />
                      </button>
                      
                      <div 
                        className={`grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                          isOpenMenu ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="p-2 space-y-1 bg-slate-50/80 rounded-2xl border border-slate-100/50">
                            {item.submenus.map((sub) => {
                              const Icon = sub.icon;
                              const iconColor = sub.iconColor || 'text-slate-400';
                              return (
                                <Link
                                  key={sub.title}
                                  href={sub.href}
                                  onClick={onClose}
                                  className="flex items-center gap-3.5 p-3 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white/40 hover:bg-white rounded-xl transition-all hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 group/sub"
                                >
                                  {Icon ? (
                                    <div className="w-9 h-9 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0 group-hover/sub:scale-110 group-hover/sub:rotate-3 transition-transform duration-300">
                                      <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
                                    </div>
                                  ) : (
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-3"></div>
                                  )}
                                  <span>{sub.title}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      onClick={onClose}
                      className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 text-slate-800 transition-all font-bold text-[15px]"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              );
            })}
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
