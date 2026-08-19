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
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  FileCheck
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
      sub: `${ppdbPending} Menunggu Verifikasi`,
      href: '/cp/ppdb',
      icon: Users,
    },
    {
      label: 'Berita & Pengumuman',
      value: stats?.news?.total ?? 0,
      sub: 'Artikel sekolah terbit',
      href: '/cp/news',
      icon: Newspaper,
    },
    {
      label: 'Agenda Kegiatan',
      value: stats?.agendas?.total ?? 0,
      sub: 'Event kalender akademik',
      href: '/cp/agendas',
      icon: Calendar,
    },
    {
      label: 'Prestasi Siswa',
      value: stats?.achievements?.total ?? 0,
      sub: 'Rekor juara & olimpiade',
      href: '/cp/achievements',
      icon: Trophy,
    },
  ];

  const quickActions = [
    { label: 'Tulis Berita Baru', href: '/cp/news/create', icon: Newspaper },
    { label: 'Tambah Agenda', href: '/cp/agendas/create', icon: Calendar },
    { label: 'Input Prestasi', href: '/cp/achievements/new', icon: Trophy },
    { label: 'Upload Karya Siswa', href: '/cp/student-works/create', icon: PenTool },
    { label: 'Tambah Galeri Foto', href: '/cp/galleries/create', icon: ImageIcon },
    { label: 'Tambah Artikel', href: '/cp/articles/create', icon: BookOpen },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-xl bg-white border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-blue-800 text-[11px] font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {getGreeting()}, {session?.user?.name || 'Administrator'}
            </h1>
            <p className="text-xs text-slate-600">
              Panel Pengelolaan Data & Konten Publikasi SMA PGRI 1 Lumajang.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              href="/cp/ppdb"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Verifikasi PPDB</span>
            </Link>
            <Link
              href="/cp/news/create"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Buat Berita</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Metric Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-blue-300 transition-colors flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600">{card.label}</span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {loading ? '...' : card.value}
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {card.sub}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Buka Data</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Recent PPDB Registrations + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left (7 Cols): Recent PPDB Registrations */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-sm text-slate-900">Pendaftar PPDB Terbaru</h2>
              <span className="text-[11px] text-slate-500">Daftar calon siswa baru yang masuk sistem</span>
            </div>
            <Link
              href="/cp/ppdb"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : stats?.recent_registrations && stats.recent_registrations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">No. Daftar</th>
                    <th className="py-2.5 px-3">Nama Siswa</th>
                    <th className="py-2.5 px-3">Pilihan</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats.recent_registrations.map((reg) => {
                    const statusObj = STATUS_CONFIG[reg.status as keyof typeof STATUS_CONFIG] || {
                      label: reg.status,
                      color: 'bg-slate-100 text-slate-700',
                    };
                    return (
                      <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{reg.registration_number}</td>
                        <td className="py-2.5 px-3 font-medium text-slate-900">{reg.full_name}</td>
                        <td className="py-2.5 px-3 text-slate-600">{reg.major_choice || '—'}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusObj.badge}`}>
                            {statusObj.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 text-xs">
              Belum ada pendaftaran siswa baru dalam antrean.
            </div>
          )}
        </div>

        {/* Right (5 Cols): PPDB Summary & Quick Operations */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Status Breakdown Box */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Ringkasan Status PPDB
            </h3>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-lg font-bold text-amber-600">{ppdbPending}</div>
                <div className="text-[11px] text-slate-600 font-medium">Menunggu</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-lg font-bold text-blue-600">{ppdbVerified}</div>
                <div className="text-[11px] text-slate-600 font-medium">Terverifikasi</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-lg font-bold text-emerald-600">{ppdbAccepted}</div>
                <div className="text-[11px] text-slate-600 font-medium">Diterima</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-lg font-bold text-rose-600">{ppdbRejected}</div>
                <div className="text-[11px] text-slate-600 font-medium">Ditolak</div>
              </div>
            </div>
          </div>

          {/* Quick Actions Shortcuts */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Aksi Cepat Konten
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={i}
                    href={action.href}
                    className="p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg text-slate-700 hover:text-blue-700 text-xs font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-500" />
                    <span className="truncate">{action.label}</span>
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
