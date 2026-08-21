'use client';

import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Search,
  Command
} from 'lucide-react';
import { navigationGroups } from '@/config/admin-menu';
import { AdminCommandPalette } from '@/components/admin/AdminCommandPalette';
import { LogoutConfirmModal } from '@/components/admin/LogoutConfirmModal';
import { AdminLiveDate } from '@/components/admin/AdminLiveDate';
import { AdminUserBadge } from '@/components/admin/AdminUserBadge';
import { PUBLIC_SITE_URL } from '@/lib/site';



export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    // If user is clearly unauthenticated, kick them out immediately.
    // window.location.replace is used to prevent the Back button from returning here.
    if (status === 'unauthenticated') {
      window.location.replace('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      window.location.replace('/login?error=AccessDenied');
    }
  }, [status, session]);

  const handleConfirmLogout = async () => {
    try {
      setLogoutLoading(true);
      if (session?.accessToken) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            Accept: 'application/json',
          },
        });
      }
    } catch {
      // Ignore network error on logout
    } finally {
      // Clear local storage / session storage just in case
      sessionStorage.clear();
      
      // Use the clean login route and force a hard redirect
      await signOut({ redirect: false });
      window.location.replace('/login');
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-700 gap-3 font-sans">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold">Memverifikasi otentikasi...</p>
      </div>
    );
  }

  if (!session || session?.user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="admin-root flex h-screen bg-[#f8fafc] text-slate-900 font-sans" style={{ colorScheme: 'light' }}>
      
      {/* Global Command Palette Dialog */}
      <AdminCommandPalette open={commandPaletteOpen} setOpen={setCommandPaletteOpen} />

      {/* Global Logout Confirmation Modal Popup */}
      <LogoutConfirmModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        loading={logoutLoading}
      />

      {/* 1. Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-slate-200/80 bg-white text-slate-900 shrink-0 select-none">
        
        {/* Sidebar Header with School Identity */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-100 bg-white">
          <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 p-1.5 flex items-center justify-center shadow-xs overflow-hidden">
            <Image
              src="/logo-sekolah.png"
              alt="Logo SMA PGRI 1"
              width={36}
              height={36}
              className="object-contain rounded-lg"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm text-slate-900 leading-none">
                SMA PGRI 1
              </span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Sidebar Navigation Links (Categorized Groups) */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-6 scrollbar-thin">
          {navigationGroups.map((grp) => (
            <div key={grp.group} className="space-y-1">
              <div className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {grp.group}
              </div>
              {grp.items.map((item) => {
                const Icon = item.icon;
                const cleanPath = pathname.replace(/^\/admin/, '') || '/';
                const isActive = cleanPath === item.href || (item.href !== '/dashboard' && cleanPath.startsWith(item.href + '/')) || pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href + '/'));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} />
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600 border border-blue-200'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer with User Profile & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {session.user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">
                {session.user?.name || 'Administrator'}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {session.user?.email || 'admin@smapgri1lmj.sch.id'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Sesi</span>
          </button>
        </div>

      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar with Command Palette Trigger */}
        <header className="h-16 border-b border-slate-200/80 bg-white px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          
          {/* Left: Mobile Toggle & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer relative w-9 h-9 flex items-center justify-center"
              aria-label="Toggle Mobile Menu"
            >
              <Menu className={`w-5 h-5 absolute transition-all duration-300 ease-in-out ${mobileOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
              <X className={`w-5 h-5 absolute transition-all duration-300 ease-in-out ${mobileOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
            </button>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="hidden sm:inline">Admin Panel</span>
              <ChevronRight className="w-3 h-3 text-slate-300 hidden sm:inline" />
              <span className="text-slate-900 font-bold capitalize">
                {(pathname.replace(/^\/admin/, '').split('/').filter(Boolean)[0] || 'Dashboard').replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Middle: Command Search Bar */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden md:flex items-center justify-between w-64 lg:w-80 px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-400 hover:text-slate-600 transition-all cursor-pointer shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Cari menu atau aksi...</span>
            </div>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono font-bold text-slate-500 shadow-xs">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Command Trigger (Mobile) */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Pintasan Cepat"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Live Indonesian Date */}
            <AdminLiveDate />

            {/* Visit Public Website */}
            <a
              href={PUBLIC_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 bg-slate-50 hover:bg-white text-xs font-bold transition-all shadow-xs group"
            >
              <span>Lihat Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </a>

            {/* Reusable Dynamic User/Operator Role Badge */}
            <AdminUserBadge user={session.user} />
          </div>

        </header>

        {/* Mobile Drawer Navigation (Animated) */}
        <div 
          className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
            mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ease-out ${
              mobileOpen ? 'opacity-100' : 'opacity-0'
            }`} 
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Panel */}
          <div 
            className={`absolute inset-y-0 left-0 w-72 bg-white flex flex-col shadow-2xl p-5 space-y-6 overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              mobileOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 p-1 flex items-center justify-center overflow-hidden">
                  <Image src="/logo-sekolah.png" alt="Logo" width={28} height={28} className="object-contain rounded-md" />
                </div>
                <span className="font-bold text-sm">SMA PGRI 1</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1 rounded text-slate-500 hover:bg-slate-100 cursor-pointer transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {navigationGroups.map((grp) => (
                <div key={grp.group} className="space-y-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400 px-2">{grp.group}</div>
                  {grp.items.map((item) => {
                    const Icon = item.icon;
                    const cleanPath = pathname.replace(/^\/admin/, '') || '/';
                    const isActive = cleanPath === item.href || (item.href !== '/dashboard' && cleanPath.startsWith(item.href + '/')) || pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href + '/'));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                          isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 mt-auto">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setLogoutModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-100 bg-rose-50 rounded-xl cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar Sesi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}
