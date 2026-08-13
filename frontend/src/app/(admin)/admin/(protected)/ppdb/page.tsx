'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface Registration {
  id: number;
  registration_number: string;
  full_name: string;
  nisn: string;
  major_choice: string;
  status: 'pending' | 'verified' | 'accepted' | 'rejected';
  previous_school: string;
  created_at: string;
  notes?: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending:  'bg-yellow-100 text-yellow-700',
  verified: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const STATUS_OPTIONS = ['pending', 'verified', 'accepted', 'rejected'];

export default function AdminPpdbPage() {
  const { data: session } = useSession();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState<number | null>(null);

  const authHeaders = {
    Authorization: `Bearer ${session?.accessToken}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.set('status', filterStatus);
      if (search) params.set('search', search);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/registrations?${params}`,
        { headers: authHeaders }
      );
      const data = await res.json();
      setRegistrations(data.data ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, filterStatus, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const updateStatus = async (id: number, status: string) => {
    setUpdating(id);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/registrations/${id}/status`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ status }),
      });
      fetchData();
    } finally {
      setUpdating(null);
    }
  };

  const exportCsv = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/registrations/export`,
      '_blank'
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Manajemen PPDB</h1>
        <button
          onClick={exportCsv}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
        >
          📥 Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchData()}
          placeholder="Cari nama / no. pendaftaran..."
          className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">Semua Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <button
          onClick={fetchData}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
        >
          Cari
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : registrations.length === 0 ? (
          <div className="text-center py-16 text-slate-400">Tidak ada data pendaftar.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-left text-xs text-slate-500">
                  <th className="px-4 py-3 font-semibold">No. Pendaftaran</th>
                  <th className="px-4 py-3 font-semibold">Nama</th>
                  <th className="px-4 py-3 font-semibold">NISN</th>
                  <th className="px-4 py-3 font-semibold">Jurusan</th>
                  <th className="px-4 py-3 font-semibold">Asal Sekolah</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{reg.registration_number}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{reg.full_name}</td>
                    <td className="px-4 py-3 text-slate-600">{reg.nisn}</td>
                    <td className="px-4 py-3 text-slate-600">{reg.major_choice}</td>
                    <td className="px-4 py-3 text-slate-600 max-w-37.5 truncate">{reg.previous_school}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[reg.status]}`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={reg.status}
                        onChange={(e) => updateStatus(reg.id, e.target.value)}
                        disabled={updating === reg.id}
                        className="border border-slate-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white disabled:opacity-50"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
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
