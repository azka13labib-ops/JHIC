'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  ppdb: { total: number; pending: number; accepted: number; rejected: number };
  news: { total: number };
  products: { total: number; active: number };
  jobs: { total: number; active: number };
  applications: { total: number; pending: number };
  recent_registrations: Array<{
    id: number;
    registration_number: string;
    full_name: string;
    major_choice: string;
    status: string;
    created_at: string;
  }>;
}

const STATUS_COLORS: Record<string, string> = {
  pending:  'bg-yellow-100 text-yellow-700',
  verified: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/admin/login');
  }, [status, router]);

  useEffect(() => {
    if (!session?.accessToken) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard/stats`, {
      headers: { Authorization: `Bearer ${session.accessToken}`, Accept: 'application/json' },
    })
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const statCards = [
    { label: 'Total Pendaftar PPDB', value: stats?.ppdb.total ?? 0, sub: `${stats?.ppdb.pending ?? 0} menunggu`, href: '/admin/ppdb', color: 'bg-blue-500', icon: '🎓' },
    { label: 'Berita Dipublikasi', value: stats?.news.total ?? 0, sub: 'Total artikel', href: '/admin/news', color: 'bg-indigo-500', icon: '📰' },
    { label: 'Produk BLUD Aktif', value: stats?.products.active ?? 0, sub: `${stats?.products.total ?? 0} total produk`, href: '/admin/products', color: 'bg-emerald-500', icon: '📦' },
    { label: 'Lowongan Aktif', value: stats?.jobs.active ?? 0, sub: `${stats?.applications.pending ?? 0} lamaran baru`, href: '/admin/jobs', color: 'bg-violet-500', icon: '💼' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Selamat datang, <strong>{session.user?.name}</strong></p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 font-semibold transition-colors"
        >
          Logout →
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}
            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                {card.icon}
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 mb-1">{card.value}</div>
            <div className="text-sm font-semibold text-slate-700">{card.label}</div>
            <div className="text-xs text-slate-400 mt-1">{card.sub}</div>
          </Link>
        ))}
      </div>

      {/* Pendaftar Terbaru */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-900">Pendaftar PPDB Terbaru</h2>
          <Link href="/admin/ppdb" className="text-blue-600 text-sm hover:underline font-semibold">Lihat semua →</Link>
        </div>
        {stats?.recent_registrations && stats.recent_registrations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
                  <th className="pb-3 pr-4 font-semibold">No. Pendaftaran</th>
                  <th className="pb-3 pr-4 font-semibold">Nama</th>
                  <th className="pb-3 pr-4 font-semibold">Jurusan</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {stats.recent_registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-4 font-mono text-xs text-slate-600">{reg.registration_number}</td>
                    <td className="py-3 pr-4 font-semibold text-slate-900">{reg.full_name}</td>
                    <td className="py-3 pr-4 text-slate-600">{reg.major_choice}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[reg.status] ?? 'bg-slate-100 text-slate-600'}`}>
                        {reg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-400 text-sm text-center py-6">Belum ada pendaftar.</p>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[
          { label: 'Kelola Berita', href: '/admin/news', icon: '📰' },
          { label: 'Kelola PPDB', href: '/admin/ppdb', icon: '🎓' },
          { label: 'Kelola Produk', href: '/admin/products', icon: '📦' },
          { label: 'Kelola Lowongan', href: '/admin/jobs', icon: '💼' },
        ].map(({ label, href, icon }) => (
          <Link key={label} href={href}
            className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center hover:bg-slate-100 transition-colors">
            <span className="text-2xl block mb-2">{icon}</span>
            <span className="text-sm font-semibold text-slate-700">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
