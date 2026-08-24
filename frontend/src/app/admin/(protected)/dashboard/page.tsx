'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Newspaper, 
  Calendar, 
  BookOpen, 
  ImageIcon, 
  Trophy,
  Users,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';

import { STATUS_CONFIG } from '@/types/ppdb';
import { PpdbTrendChart } from '@/components/admin/dashboard/PpdbTrendChart';

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
  recent_news?: Array<{
    id: number;
    title: string;
    created_at: string;
  }>;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

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

  const ppdbPending = stats?.ppdb?.pending ?? 0;
  const needsVerification = ppdbPending > 0;

  const quickActions = [
    { label: 'Tulis Berita', href: '/admin/news/create', icon: Newspaper },
    { label: 'Buat Agenda', href: '/admin/agendas/create', icon: Calendar },
    { label: 'Input Prestasi', href: '/admin/achievements/new', icon: Trophy },
    { label: 'Tambah Galeri', href: '/admin/galleries/create', icon: ImageIcon },
  ];

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Halo, {session?.user?.name?.split(' ')[0] || 'Admin'}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Ringkasan pekerjaan Anda hari ini.
          </p>
        </div>
        
        {/* Toolbar Aksi Cepat (High Density) */}
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 text-sm font-medium text-slate-700 transition-colors min-h-[44px] md:min-h-0"
              >
                <Icon className="w-4 h-4 text-slate-500" />
                {action.label}
              </Link>
            );
          })}
        </div>
      </header>

      {loading ? (
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-32 bg-slate-100 rounded-lg w-full" />
          <div className="grid grid-cols-4 gap-4">
            <div className="h-20 bg-slate-100 rounded-lg" />
            <div className="h-20 bg-slate-100 rounded-lg" />
            <div className="h-20 bg-slate-100 rounded-lg" />
            <div className="h-20 bg-slate-100 rounded-lg" />
          </div>
        </div>
      ) : (
        <>
          {/* 1. PRIMARY JOB AREA: PPDB Alerts */}
          {needsVerification && (
            <section aria-label="Tugas Prioritas">
              <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-amber-900 font-bold text-sm">Verifikasi PPDB Tertunda</h2>
                    <p className="text-amber-800 text-sm mt-0.5">
                      Terdapat {ppdbPending} pendaftar baru yang menunggu verifikasi dokumen.
                    </p>
                  </div>
                </div>
                <Link 
                  href="/admin/ppdb" 
                  className="w-full sm:w-auto text-center flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold min-h-[44px] sm:min-h-0 sm:py-2 px-4 rounded-md transition-colors shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Proses Sekarang</span>
                </Link>
              </div>
            </section>
          )}

          {/* 3. TERTIARY AREA: Data Tables & Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            <div className="flex flex-col gap-6">
              {/* Pendaftar Terbaru (Data Table) */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                  <h2 className="text-sm font-bold text-slate-800">Pendaftar Terbaru</h2>
                  <Link href="/admin/ppdb" className="text-xs font-medium text-blue-600 hover:underline">
                    Kelola Semua &rarr;
                  </Link>
                </div>
                
                {stats?.recent_registrations && stats.recent_registrations.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-slate-500 uppercase bg-white border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Nama</th>
                          <th className="px-4 py-3 font-semibold">No. Reg</th>
                          <th className="px-4 py-3 font-semibold text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {stats.recent_registrations.slice(0, 5).map((reg) => {
                          const statusObj = STATUS_CONFIG[reg.status as keyof typeof STATUS_CONFIG] || { label: reg.status, badge: 'text-slate-600' };
                          return (
                            <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-3 font-medium text-slate-900 truncate max-w-37.5">{reg.full_name}</td>
                              <td className="px-4 py-3 text-slate-500 font-mono text-xs">{reg.registration_number}</td>
                              <td className="px-4 py-3 text-right">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${statusObj.badge.replace('bg-', 'text-').replace('text-white', '')} ${reg.status === 'pending' ? 'text-amber-600' : ''}`}>
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
                  <div className="p-8 text-center text-slate-500 text-sm bg-white">
                    Belum ada pendaftar baru.
                  </div>
                )}
              </div>

              {/* Berita Terbaru (Fills the empty space) */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                  <h2 className="text-sm font-bold text-slate-800">Berita Terbaru Terbit</h2>
                  <Link href="/admin/news" className="text-xs font-medium text-blue-600 hover:underline">
                    Kelola Berita &rarr;
                  </Link>
                </div>
                
                {stats?.recent_news && stats.recent_news.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {stats.recent_news.map((news) => (
                      <div key={news.id} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                        <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                          <Newspaper className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {news.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {new Date(news.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <Link
                          href={`/admin/news/${news.id}/edit`}
                          className="text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
                        >
                          Edit
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500 text-sm bg-white">
                    Belum ada berita yang diterbitkan.
                  </div>
                )}
              </div>
            </div>

            {/* Trend Chart */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
              <div className="mb-4 px-1">
                <h2 className="text-sm font-bold text-slate-800">Tren Pendaftar PPDB</h2>
                <p className="text-xs text-slate-500">Perbandingan jumlah pendaftar dari tahun ke tahun.</p>
              </div>
              <PpdbTrendChart />
            </div>

          </section>
        </>
      )}
    </div>
  );
}
