'use client';

import { useState } from 'react';
import Link from 'next/link';

const STATUS_MAP = {
  pending:  { label: 'Menunggu Verifikasi', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
  verified: { label: 'Terverifikasi', color: 'bg-blue-100 text-blue-800', icon: '🔍' },
  accepted: { label: 'Diterima', color: 'bg-green-100 text-green-800', icon: '✅' },
  rejected: { label: 'Tidak Diterima', color: 'bg-red-100 text-red-800', icon: '❌' },
};

interface RegistrationStatus {
  registration_number: string;
  full_name: string;
  major_choice?: string;
  status: keyof typeof STATUS_MAP;
  notes?: string;
  created_at: string;
}

export default function PpdbStatusPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<RegistrationStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkStatus = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ppdb/check-status?q=${encodeURIComponent(query)}`,
        { headers: { Accept: 'application/json' } }
      );
      if (!res.ok) throw new Error('Data tidak ditemukan. Pastikan nomor pendaftaran atau NISN sudah benar.');
      const data = await res.json();
      setResult(data.data ?? data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="text-center mb-8">
          <Link href="/ppdb" className="text-blue-600 text-sm hover:underline">← Info PPDB</Link>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Cek Status Pendaftaran</h1>
          <p className="text-slate-500 mt-2">Masukkan nomor pendaftaran atau NISN untuk melihat status</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="flex gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkStatus()}
              placeholder="Nomor pendaftaran / NISN"
              className="flex-1 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={checkStatus}
              disabled={loading}
              className="bg-[#2B3B6F] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1E2B58] transition-colors disabled:opacity-50"
            >
              {loading ? '...' : 'Cek'}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">{error}</div>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${STATUS_MAP[result.status]?.color}`}>
                  <span>{STATUS_MAP[result.status]?.icon}</span>
                  {STATUS_MAP[result.status]?.label}
                </div>
              </div>
              <div className="border border-slate-100 rounded-xl p-4 space-y-3 text-sm">
                {[
                  ['No. Pendaftaran', result.registration_number],
                  ['Nama', result.full_name],
                  ['Program / Jenjang', result.major_choice || 'Kelas 10 (Fase E)'],
                  ['Tanggal Daftar', new Date(result.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">{k}</span>
                    <span className="font-semibold text-slate-900">{v}</span>
                  </div>
                ))}
                {result.notes && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <span className="text-slate-500 text-xs">Catatan dari Admin:</span>
                    <p className="text-slate-700 mt-1">{result.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
          Belum daftar?{' '}
          <Link href="/ppdb/daftar" className="text-blue-600 hover:underline font-semibold">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  );
}
