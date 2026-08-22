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
import { AdminPagination } from '@/components/admin/AdminPagination';
import { Select } from '@/components/ui/Select';

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
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

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
          <div className="relative min-w-55">
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
            <Select
              value={statusFilter}
              onChange={(val: string) => setStatusFilter(val)}
              options={[
                { value: 'all', label: 'Semua Status' },
                ...STATUS_OPTIONS
              ]}
              className="w-36 border-none bg-transparent shadow-none"
            />
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
      <div>
        {/* 1. Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase font-black tracking-wider">
              <tr>
                <th className="px-6 py-4">No. Pendaftaran</th>
                <th className="px-6 py-4">Data Calon Siswa</th>
                <th className="px-6 py-4">Program / Jenjang</th>
                <th className="px-6 py-4">Status & Verifikasi</th>
                <th className="px-6 py-4">Tgl Daftar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    {loading
                      ? 'Memuat data calon siswa...'
                      : 'Tidak ada data pendaftaran yang sesuai kriteria.'}
                  </td>
                </tr>
              ) : (
                paginated.map((reg) => {
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
                          {reg.major_choice || 'Fase E (Umum)'}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <Select
                          value={reg.status}
                          disabled={updatingId === reg.id}
                          onChange={async (val: string) => {
                            setUpdatingId(reg.id);
                            await onUpdateStatus(reg.id, val, reg.notes);
                            setUpdatingId(null);
                          }}
                          options={STATUS_OPTIONS}
                          className={`w-36 ${conf.badge}`}
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

        {/* 2. Mobile Card Stack View */}
        <div className="lg:hidden flex flex-col divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              {loading ? 'Memuat data calon siswa...' : 'Tidak ada data pendaftaran yang sesuai.'}
            </div>
          ) : (
            paginated.map((reg) => {
              const conf = STATUS_CONFIG[reg.status] || STATUS_CONFIG.pending;
              return (
                <div key={reg.id} className="p-5 hover:bg-slate-50/50 transition flex flex-col gap-4">
                  {/* Header: Name and Status */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 text-sm truncate">
                        {reg.full_name}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-1 truncate">
                        <School className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{reg.previous_school || '-'}</span>
                      </div>
                    </div>
                    <Select
                      value={reg.status}
                      disabled={updatingId === reg.id}
                      onChange={async (val: string) => {
                        setUpdatingId(reg.id);
                        await onUpdateStatus(reg.id, val, reg.notes);
                        setUpdatingId(null);
                      }}
                      options={STATUS_OPTIONS}
                      className={`w-36 ${conf.badge}`}
                    />
                  </div>
                  
                  {/* Middle: ID, Major, Date */}
                  <div className="flex flex-col gap-2.5 text-xs text-slate-500 bg-slate-50/70 rounded-xl p-3.5 border border-slate-100">
                    <div className="flex justify-between items-center">
                      <div className="font-mono font-bold text-blue-700 flex items-center gap-2">
                        {reg.registration_number}
                        <button 
                          onClick={() => handleCopy(reg.id, reg.registration_number)} 
                          className="p-1 hover:bg-blue-100 rounded text-blue-600 transition"
                        >
                          {copiedId === reg.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <div className="text-[10px] font-semibold text-slate-400">
                        NISN: {reg.nisn}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                      <div className="flex items-center gap-1.5 font-bold text-slate-700">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        {reg.major_choice || 'Fase E (Umum)'}
                      </div>
                      <div className="text-[10px]">
                        {new Date(reg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Reusable Pagination for PPDB Table */}
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={filtered.length}
        itemsPerPage={perPage}
        onPageChange={setPage}
        onItemsPerPageChange={(newPerPage) => {
          setPerPage(newPerPage);
          setPage(1);
        }}
      />
    </div>
  );
}
