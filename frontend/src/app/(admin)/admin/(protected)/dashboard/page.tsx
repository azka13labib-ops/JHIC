'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Newspaper, 
  Calendar, 
  BookOpen, 
  ImageIcon, 
  PenTool, 
  Trophy,
  Users,
  ArrowRight,
  Clock,
  PlusCircle
} from 'lucide-react';

import { STATUS_CONFIG } from '@/types/ppdb';

interface DashboardStats {
  ppdb: { total: number; pending: number; verified?: number; accepted: number; rejected: number };
  news: { total: number };
  agendas?: { total: number };
  achievements?: { total: number };
  recent_registrations: Array<{
    id: number;
    registration_number: string;
    full_name: string;
    major_choice?: string;
    status: string;
    created_at: string;
  }>;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 11) return 'Selamat Pagi';
    if (hours < 15) return 'Selamat Siang';
    if (hours < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}/admin/dashboard/stats`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            Accept: 'application/json',
          },
        });
        if (res.ok) {
          const json = await res.json();
          setStats(json.data || json);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    }

    if (session?.accessToken) {
      fetchStats();
    }
  }, [session?.accessToken]);

  const ppdbTotal = stats?.ppdb?.total ?? 0;
  const ppdbPending = stats?.ppdb?.pending ?? 0;
  const ppdbVerified = stats?.ppdb?.verified ?? 0;
  const ppdbAccepted = stats?.ppdb?.accepted ?? 0;
  const ppdbRejected = stats?.ppdb?.rejected ?? 0;

  const statCards = [
    {
      label: 'Pendaftar PPDB 2026',
      value: ppdbTotal,
      sub: `${ppdbPending} menunggu verifikasi`,
      href: '/admin/ppdb',
      color: 'from-blue-600 to-blue-700',
      shadow: 'shadow-blue-500/20',
      icon: Users,
      badgeText: '+ Realtime',
    },
    {
      label: 'Berita & Pengumuman',
      value: stats?.news?.total ?? 0,
      sub: 'Artikel sekolah terbit',
      href: '/admin/news',
      color: 'from-indigo-600 to-indigo-700',
      shadow: 'shadow-indigo-500/20',
      icon: Newspaper,
      badgeText: 'Publikasi',
    },
    {
      label: 'Agenda Kegiatan',
      value: stats?.agendas?.total ?? 0,
      sub: 'Event & kalender akademik',
      href: '/admin/agendas',
      color: 'from-emerald-600 to-emerald-700',
      shadow: 'shadow-emerald-500/20',
      icon: Calendar,
      badgeText: 'Kegiatan',
    },
    {
      label: 'Prestasi Siswa',
      value: stats?.achievements?.total ?? 0,
      sub: 'Rekor juara & olimpiade',
      href: '/admin/achievements',
      color: 'from-amber-600 to-amber-700',
      shadow: 'shadow-amber-500/20',
      icon: Trophy,
      badgeText: 'Prestasi',
    },
  ];

  const quickActions = [
    { label: 'Tulis Berita Baru', href: '/admin/news/create', icon: Newspaper, color: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200' },
    { label: 'Tambah Agenda', href: '/admin/agendas/create', icon: Calendar, color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-200' },
    { label: 'Input Prestasi', href: '/admin/achievements/new', icon: Trophy, color: 'bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200' },
    { label: 'Upload Karya Siswa', href: '/admin/student-works/create', icon: PenTool, color: 'bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200' },
    { label: 'Tambah Galeri Foto', href: '/admin/galleries/create', icon: ImageIcon, color: 'bg-rose-50 text-rose-600 hover:bg-rose-100 border-rose-200' },
    { label: 'Tambah Artikel', href: '/admin/articles/create', icon: BookOpen, color: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Welcome Greeting Banner */}
      <div className="relative rounded-3xl bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl overflow-hidden">
        {/* Subtle Ambient Backing */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {getGreeting()}, {session?.user?.name || 'Administrator'}! 
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              Selamat datang di pusat kendali website resmi SMA PGRI 1 Lumajang. Pantau pendaftaran PPDB, publikasikan kegiatan, dan kelola layanan sekolah.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/admin/ppdb"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5"
            >
              <Users className="w-4 h-4" />
              <span>Kelola PPDB</span>
            </Link>
            <Link
              href="/admin/news/create"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-xl backdrop-blur-sm transition-all duration-200 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Buat Berita</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              className={`relative bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group overflow-hidden ${card.shadow}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${card.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  {card.badgeText}
                </span>
              </div>

              <div className="space-y-0.5">
                <div className="text-3xl font-black text-slate-900 tracking-tight">
                  {loading ? '...' : card.value}
                </div>
                <div className="text-xs font-bold text-slate-700">
                  {card.label}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {card.sub}
                </div>
              </div>

              {/* Action arrow indicator */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
                <span>Buka Modul</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* 3. Main Dashboard Body: PPDB Realtime & Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left (7 Cols): Recent PPDB Registrations */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900 leading-tight">
                  Pendaftar PPDB Terbaru
                </h2>
                <span className="text-xs text-slate-400">Verifikasi calon siswa baru realtime</span>
              </div>
            </div>
            <Link
              href="/admin/ppdb"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>Semua Pendaftar</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : stats?.recent_registrations && stats.recent_registrations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-100 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-3">No. Daftar</th>
                    <th className="py-3 px-3">Nama</th>
                    <th className="py-3 px-3">Program / Jenjang</th>
                    <th className="py-3 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats.recent_registrations.map((reg) => {
                    const cfg = STATUS_CONFIG[reg.status] || STATUS_CONFIG.pending;
                    return (
                      <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-blue-600">{reg.registration_number}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">{reg.full_name}</td>
                        <td className="py-3 px-3 text-slate-600 font-semibold">{reg.major_choice || 'Fase E (Umum)'}</td>
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold border ${cfg.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {cfg.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Belum ada data pendaftar baru.
            </div>
          )}
        </div>

        {/* Right (5 Cols): PPDB Status Breakdown & Quick Shortlinks */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* PPDB Distribution Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">
                Status Verifikasi PPDB
              </h3>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Total: {ppdbTotal}
              </span>
            </div>

            {/* Distribution Bar */}
            <div className="space-y-2.5">
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                <div
                  style={{ width: `${ppdbTotal ? (ppdbAccepted / ppdbTotal) * 100 : 0}%` }}
                  className="bg-emerald-500 h-full transition-all duration-500"
                  title="Diterima"
                />
                <div
                  style={{ width: `${ppdbTotal ? (ppdbVerified / ppdbTotal) * 100 : 0}%` }}
                  className="bg-blue-500 h-full transition-all duration-500"
                  title="Terverifikasi"
                />
                <div
                  style={{ width: `${ppdbTotal ? (ppdbPending / ppdbTotal) * 100 : 0}%` }}
                  className="bg-amber-500 h-full transition-all duration-500"
                  title="Pending"
                />
                <div
                  style={{ width: `${ppdbTotal ? (ppdbRejected / ppdbTotal) * 100 : 0}%` }}
                  className="bg-rose-500 h-full transition-all duration-500"
                  title="Ditolak"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                  <span className="text-blue-800 font-semibold">Terverifikasi</span>
                  <span className="font-bold text-blue-900">{ppdbVerified}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-between">
                  <span className="text-amber-800 font-semibold">Pending</span>
                  <span className="font-bold text-amber-900">{ppdbPending}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                  <span className="text-emerald-800 font-semibold">Diterima</span>
                  <span className="font-bold text-emerald-900">{ppdbAccepted}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-between">
                  <span className="text-rose-800 font-semibold">Ditolak</span>
                  <span className="font-bold text-rose-900">{ppdbRejected}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-3.5">
            <h3 className="font-bold text-sm text-slate-900">
              Aksi Cepat Konten
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {quickActions.map((qa, idx) => {
                const Icon = qa.icon;
                return (
                  <Link
                    key={idx}
                    href={qa.href}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${qa.color}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{qa.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
