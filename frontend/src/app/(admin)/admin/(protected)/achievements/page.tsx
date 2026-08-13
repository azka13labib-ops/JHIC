'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import type { Achievement } from '@/types';

export default function AdminAchievementsPage() {
  const { data: session } = useSession();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  const authHeaders = { Authorization: `Bearer ${session?.accessToken}`, Accept: 'application/json' };

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/achievements`, { headers: authHeaders });
      const data = await res.json();
      setAchievements(Array.isArray(data) ? data : data.data ?? []);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const deleteAchievement = async (id: number) => {
    if (!confirm('Yakin hapus prestasi ini?')) return;
    setDeleting(id);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/achievements/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      fetchData();
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Prestasi</h1>
        <a
          href="/admin/achievements/new"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
        >
          + Tambah Prestasi
        </a>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-16 text-slate-400">Belum ada data prestasi.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-left text-xs text-slate-500">
                  <th className="px-4 py-3 font-semibold">Judul Prestasi</th>
                  <th className="px-4 py-3 font-semibold">Tingkat</th>
                  <th className="px-4 py-3 font-semibold">Tahun</th>
                  <th className="px-4 py-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {achievements.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-900">{item.title}</td>
                    <td className="px-4 py-3 text-slate-600 capitalize">{item.level}</td>
                    <td className="px-4 py-3 text-slate-600">{item.year}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <a href={`/admin/achievements/${item.id}/edit`}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 transition-colors font-semibold">
                          Edit
                        </a>
                        <button
                          onClick={() => deleteAchievement(item.id)}
                          disabled={deleting === item.id}
                          className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded hover:bg-red-100 transition-colors font-semibold disabled:opacity-50"
                        >
                          {deleting === item.id ? '...' : 'Hapus'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
