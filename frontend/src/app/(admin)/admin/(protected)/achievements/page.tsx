'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Trophy, Plus, Edit, Eye, Award, Calendar } from 'lucide-react';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';
import type { Achievement } from '@/types';

export default function AdminAchievementsPage() {
  const { data: session } = useSession();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  const authHeaders = { Authorization: `Bearer ${session?.accessToken}`, Accept: 'application/json' };

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/achievements`, { headers: authHeaders });
      const data = await res.json();
      setAchievements(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const LEVEL_BADGES: Record<string, string> = {
    sekolah: 'bg-slate-100 text-slate-700 border-slate-200',
    kota: 'bg-blue-50 text-blue-700 border-blue-200',
    provinsi: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    nasional: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    internasional: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Manajemen Prestasi Siswa</h1>
            <p className="text-xs text-slate-500 mt-0.5">Kelola rekam jejak juara lomba akademik, seni, dan olahraga tingkat sekolah s/d internasional.</p>
          </div>
        </div>
        
        <Link
          href="/admin/achievements/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Prestasi Baru</span>
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-4 px-6">Nama Kejuaraan / Prestasi</th>
                  <th className="py-4 px-6">Tingkat Kompetisi</th>
                  <th className="py-4 px-6">Tahun</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {achievements.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      Belum ada rekam prestasi yang terdaftar.
                    </td>
                  </tr>
                ) : (
                  achievements.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 max-w-md">
                        <div className="line-clamp-1">{item.title}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${LEVEL_BADGES[item.level?.toLowerCase()] || LEVEL_BADGES.sekolah}`}>
                          <Award className="w-3 h-3" />
                          <span>{item.level}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.year}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/prestasi/${item.id}`}
                            target="_blank"
                            className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 rounded-lg transition-colors"
                            title="Pratinjau Publik"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/achievements/${item.id}/edit`}
                            className="p-2 text-slate-700 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 rounded-lg transition-colors"
                            title="Edit Prestasi"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <DeleteConfirmButton
                            endpoint="/admin/achievements"
                            id={item.id}
                            title={item.title}
                            entityName="prestasi"
                            onDeleted={fetchData}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
