'use client';

import { useState } from 'react';
import { 
  Search, 
  Download, 
  Copy, 
  Check, 
  Filter, 
  RefreshCw,
  School,
  GraduationCap
} from 'lucide-react';
import { Registration, STATUS_CONFIG, STATUS_OPTIONS } from '@/types/ppdb';

interface PpdbTableProps {
  registrations: Registration[];
  loading: boolean;
  onRefresh: () => void;
  onUpdateStatus: (id: number, status: string, notes?: string) => Promise<void>;
  onExportCsv: () => void;
}

export function PpdbTable({
  registrations,
  loading,
  onRefresh,
  onUpdateStatus,
  onExportCsv,
}: PpdbTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = registrations.filter((r) => {
    const matchSearch =
      r.full_name.toLowerCase().includes(search.toLowerCase()) ||
      r.registration_number.toLowerCase().includes(search.toLowerCase()) ||
      r.nisn.includes(search) ||
      r.previous_school?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header controls */}
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-slate-900">
            Daftar Berkas Pendaftar
          </h3>
          <p className="text-xs text-slate-500">
            Menampilkan {filtered.length} dari {registrations.length} total calon siswa
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, nomor, NISN..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
            />
          </div>

          {/* Filter status */}
          <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter status pendaftaran"
              className="bg-transparent pr-2 py-1 focus:outline-none font-bold text-slate-700 cursor-pointer"
            >
              <option value="all">Semua Status</option>
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Refresh button */}
          <button
            onClick={onRefresh}
            aria-label="Segarkan data tabel"
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {/* Export CSV */}
          <button
            onClick={onExportCsv}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase font-black tracking-wider">
            <tr>
              <th className="px-6 py-4">No. Pendaftaran</th>
              <th className="px-6 py-4">Data Calon Siswa</th>
              <th className="px-6 py-4">Pilihan Jurusan</th>
              <th className="px-6 py-4">Status & Verifikasi</th>
              <th className="px-6 py-4">Catatan</th>
              <th className="px-6 py-4">Tgl Daftar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                  {loading
                    ? 'Memuat data calon siswa...'
                    : 'Tidak ada data pendaftaran yang sesuai kriteria.'}
                </td>
              </tr>
            ) : (
              filtered.map((reg) => {
                const conf = STATUS_CONFIG[reg.status] || STATUS_CONFIG.pending;
                return (
                  <tr key={reg.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-6 py-4 font-mono font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span>{reg.registration_number}</span>
                        <button
                          onClick={() =>
                            handleCopy(reg.id, reg.registration_number)
                          }
                          aria-label={`Salin nomor pendaftaran ${reg.registration_number}`}
                          className="p-1 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition"
                        >
                          {copiedId === reg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans font-normal mt-0.5">
                        NISN: {reg.nisn}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-sm">
                        {reg.full_name}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                        <School className="w-3 h-3 text-slate-400" />
                        {reg.previous_school || '-'}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        <GraduationCap className="w-3.5 h-3.5" />
                        {reg.major_choice}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={reg.status}
                        disabled={updatingId === reg.id}
                        aria-label={`Status verifikasi untuk ${reg.full_name}`}
                        onChange={async (e) => {
                          setUpdatingId(reg.id);
                          await onUpdateStatus(reg.id, e.target.value, reg.notes);
                          setUpdatingId(null);
                        }}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer transition ${conf.badge}`}
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-6 py-4">
                      <input
                        type="text"
                        defaultValue={reg.notes || ''}
                        placeholder="Tambah catatan..."
                        aria-label={`Catatan verifikasi untuk ${reg.full_name}`}
                        onBlur={async (e) => {
                          if (e.target.value !== (reg.notes || '')) {
                            setUpdatingId(reg.id);
                            await onUpdateStatus(
                              reg.id,
                              reg.status,
                              e.target.value
                            );
                            setUpdatingId(null);
                          }
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-transparent hover:border-slate-200 focus:border-blue-500 focus:bg-white bg-slate-50/50 transition focus:outline-none"
                      />
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(reg.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
