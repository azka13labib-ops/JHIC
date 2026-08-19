'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PUBLIC_SITE_URL } from '@/lib/site';
import { 
  Search, 
  X, 
  LayoutDashboard, 
  Users, 
  Newspaper, 
  Calendar, 
  BookOpen, 
  Trophy, 
  PenTool, 
  ImageIcon, 
  PlusCircle, 
  ExternalLink,
  LogOut,
  Command
} from 'lucide-react';
import { signOut } from 'next-auth/react';

interface CommandItem {
  title: string;
  category: 'Navigasi' | 'Aksi Cepat' | 'Sistem';
  href?: string;
  action?: () => void;
  icon: React.ComponentType<{ className?: string }>;
  keywords?: string;
}

export function AdminCommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const commands: CommandItem[] = [
    // Navigation
    { title: 'Dashboard Utama', category: 'Navigasi', href: '/dashboard', icon: LayoutDashboard, keywords: 'home beranda status' },
    { title: 'Pendaftaran PPDB', category: 'Navigasi', href: '/ppdb', icon: Users, keywords: 'siswa pendaftar calon murid daftar' },
    { title: 'Manajemen Berita', category: 'Navigasi', href: '/news', icon: Newspaper, keywords: 'artikel pengumuman info warta' },
    { title: 'Jadwal Agenda', category: 'Navigasi', href: '/agendas', icon: Calendar, keywords: 'kalender rapat kegiatan event' },
    { title: 'Artikel Edukasi', category: 'Navigasi', href: '/articles', icon: BookOpen, keywords: 'tulisan esai artikel' },
    { title: 'Direktori Prestasi', category: 'Navigasi', href: '/achievements', icon: Trophy, keywords: 'juara lomba medali piala' },
    { title: 'Tracer Alumni', category: 'Navigasi', href: '/alumni', icon: Users, keywords: 'alumni lulusan tracer' },
    { title: 'Karya Siswa', category: 'Navigasi', href: '/student-works', icon: PenTool, keywords: 'portofolio kreasi gambar' },
    { title: 'Galeri Foto', category: 'Navigasi', href: '/galleries', icon: ImageIcon, keywords: 'dokumentasi album foto' },
    
    // Quick Actions
    { title: 'Tulis Berita Baru', category: 'Aksi Cepat', href: '/admin/news/create', icon: PlusCircle, keywords: 'buat post posting baru' },
    { title: 'Tambah Agenda Baru', category: 'Aksi Cepat', href: '/admin/agendas/create', icon: PlusCircle, keywords: 'jadwal buat baru' },
    { title: 'Input Prestasi Siswa', category: 'Aksi Cepat', href: '/admin/achievements/new', icon: PlusCircle, keywords: 'input juara baru' },
    { title: 'Upload Karya Siswa', category: 'Aksi Cepat', href: '/admin/student-works/create', icon: PlusCircle, keywords: 'upload karya kreasi' },
    { title: 'Tambah Galeri Foto', category: 'Aksi Cepat', href: '/admin/galleries/create', icon: PlusCircle, keywords: 'upload album foto' },
    { title: 'Tulis Artikel Edukasi', category: 'Aksi Cepat', href: '/admin/articles/create', icon: PlusCircle, keywords: 'buat artikel tulisan' },

    // System
    { title: 'Lihat Website Publik', category: 'Sistem', action: () => window.open(PUBLIC_SITE_URL, '_blank'), icon: ExternalLink, keywords: 'preview website live' },
    { title: 'Keluar Sesi (Logout)', category: 'Sistem', action: () => signOut({ callbackUrl: '/login' }), icon: LogOut, keywords: 'logout exit sign out' },
  ];

  // Listen for Ctrl+K / Cmd+K
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setOpen(!open);
    }
    if (e.key === 'Escape' && open) {
      setOpen(false);
    }
  }, [open, setOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!open) return null;

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.keywords && cmd.keywords.toLowerCase().includes(q))
    );
  });

  const handleSelect = (cmd: CommandItem) => {
    setOpen(false);
    setQuery('');
    if (cmd.action) {
      cmd.action();
    } else if (cmd.href) {
      router.push(cmd.href);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-20 animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari menu, aksi cepat, atau ketik keyword... (mis: berita, ppdb, buat)"
            className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-500">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 max-h-96">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs font-semibold">
              Tidak ada hasil yang cocok dengan &quot;{query}&quot;.
            </div>
          ) : (
            <div>
              {['Navigasi', 'Aksi Cepat', 'Sistem'].map((cat) => {
                const groupItems = filteredCommands.filter((c) => c.category === cat);
                if (groupItems.length === 0) return null;

                return (
                  <div key={cat} className="space-y-1 mb-3">
                    <div className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {cat}
                    </div>
                    {groupItems.map((cmd, idx) => {
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelect(cmd)}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all text-left group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span>{cmd.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-normal group-hover:text-blue-600 group-hover:font-semibold">
                            Pilih ↵
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Command className="w-3.5 h-3.5 text-slate-500" />
            <span>Pintasan Cepat Admin SMA PGRI 1</span>
          </div>
          <span>Gunakan ↑ ↓ untuk navigasi</span>
        </div>

      </div>

    </div>
  );
}
