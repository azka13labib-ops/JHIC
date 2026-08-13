'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface Vacancy {
  id: number;
  title: string;
  type: string;
  is_active: boolean;
  deadline?: string;
  company?: { name: string };
}

const TYPE_MAP: Record<string, string> = {
  pkl: 'PKL / Magang',
  full_time: 'Full Time',
  part_time: 'Part Time',
};

export default function AdminJobsPage() {
  const { data: session } = useSession();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  const authHeaders = { Authorization: `Bearer ${session?.accessToken}`, Accept: 'application/json' };

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/vacancies`, { headers: authHeaders });
      const data = await res.json();
      setVacancies(Array.isArray(data) ? data : data.data ?? []);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const deleteVacancy = async (id: number) => {
    if (!confirm('Yakin hapus lowongan ini?')) return;
    setDeleting(id);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/vacancies/${id}`, {
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
        <h1 className="text-2xl font-bold text-slate-900">Lowongan BKK</h1>
        <a
          href="/admin/jobs/new"
          className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors"
        >
          + Tambah Lowongan
        </a>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : vacancies.length === 0 ? (
          <div className="text-center py-16 text-slate-400">Belum ada lowongan.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-left text-xs text-slate-500">
                  <th className="px-4 py-3 font-semibold">Posisi</th>
                  <th className="px-4 py-3 font-semibold">Perusahaan</th>
                  <th className="px-4 py-3 font-semibold">Tipe</th>
                  <th className="px-4 py-3 font-semibold">Deadline</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {vacancies.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-900">{v.title}</td>
                    <td className="px-4 py-3 text-slate-600">{v.company?.name ?? '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{TYPE_MAP[v.type] ?? v.type}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {v.deadline ? new Date(v.deadline).toLocaleDateString('id-ID') : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${v.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        {v.is_active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <a href={`/admin/jobs/${v.id}/edit`}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 transition-colors font-semibold">
                          Edit
                        </a>
                        <button
                          onClick={() => deleteVacancy(v.id)}
                          disabled={deleting === v.id}
                          className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded hover:bg-red-100 transition-colors font-semibold disabled:opacity-50"
                        >
                          {deleting === v.id ? '...' : 'Hapus'}
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
