'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Briefcase, Building2, Calendar, Plus, Clock } from 'lucide-react';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';

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

  const authHeaders = { Authorization: `Bearer ${session?.accessToken}`, Accept: 'application/json' };

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/vacancies`, { headers: authHeaders });
      const data = await res.json();
      setVacancies(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setVacancies([]);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Bursa Kerja Khusus (BKK)</h1>
            <p className="text-xs text-slate-500 mt-0.5">Kelola lowongan magang (PKL), karir lulusan, dan relasi industri mitra.</p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-4 px-6">Posisi Lowongan</th>
                  <th className="py-4 px-6">Perusahaan Mitra</th>
                  <th className="py-4 px-6">Tipe Pekerjaan</th>
                  <th className="py-4 px-6">Batas Lamaran</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {vacancies.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      Belum ada lowongan BKK yang terdaftar.
                    </td>
                  </tr>
                ) : (
                  vacancies.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 max-w-xs">
                        <div className="line-clamp-1">{v.title}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{v.company?.name ?? '-'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-indigo-100">
                          <Clock className="w-3 h-3 text-indigo-500" />
                          <span>{TYPE_MAP[v.type] ?? v.type}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {v.deadline ? new Date(v.deadline).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            }) : 'Terbuka'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          v.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${v.is_active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                          <span>{v.is_active ? 'Aktif' : 'Tutup'}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <DeleteConfirmButton
                          endpoint="/admin/vacancies"
                          id={v.id}
                          title={v.title}
                          entityName="lowongan"
                          onDeleted={fetchData}
                        />
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
