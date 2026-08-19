'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { GraduationCap, Briefcase, Building2, Eye, X } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSearchBar } from '@/components/admin/AdminSearchBar';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';

interface AlumniItem {
  id: number;
  name: string;
  graduation_year: number | string;
  major?: string;
  current_job?: string;
  company?: string;
  photo_url?: string;
  testimonial?: string;
  created_at: string;
}

export default function AdminAlumniPage() {
  const { data: session } = useSession();
  const [alumniList, setAlumniList] = useState<AlumniItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniItem | null>(null);

  const authHeaders = useMemo(() => ({
    Authorization: `Bearer ${session?.accessToken}`,
    Accept: 'application/json',
  }), [session?.accessToken]);

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/alumni`, { headers: authHeaders });
      const data = await res.json();
      setAlumniList(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setAlumniList([]);
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken, authHeaders]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredAlumni = useMemo(() => {
    if (!search.trim()) return alumniList;
    const q = search.toLowerCase();
    return alumniList.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.current_job && item.current_job.toLowerCase().includes(q)) ||
        (item.company && item.company.toLowerCase().includes(q)) ||
        (item.graduation_year && item.graduation_year.toString().includes(q)) ||
        (item.major && item.major.toLowerCase().includes(q))
    );
  }, [alumniList, search]);

  const totalPages = Math.ceil(filteredAlumni.length / perPage) || 1;
  const paginatedAlumni = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredAlumni.slice(start, start + perPage);
  }, [filteredAlumni, page, perPage]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminPageHeader
        icon={GraduationCap}
        title="Tracer Study Alumni"
        description="Kelola direktori alumni SMA PGRI 1 Lumajang, data karir, institusi kerja, dan testimoni lulusan."
      />

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <AdminSearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari nama alumni, profesi, instansi/perusahaan, atau tahun lulus..."
          totalResults={filteredAlumni.length}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-4 px-6">Nama Alumni</th>
                  <th className="py-4 px-6">Tahun Lulus</th>
                  <th className="py-4 px-6">Profesi / Jabatan</th>
                  <th className="py-4 px-6">Instansi / Perusahaan</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {paginatedAlumni.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      {search ? 'Tidak ada alumni yang cocok dengan pencarian.' : 'Belum ada data tracer alumni yang terdaftar.'}
                    </td>
                  </tr>
                ) : (
                  paginatedAlumni.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 max-w-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                            {item.name ? item.name.charAt(0).toUpperCase() : 'A'}
                          </div>
                          <span className="truncate">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-100/80 text-[10px]">
                          Lulus {item.graduation_year || '-'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.current_job || '-'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.company || '-'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedAlumni(item)}
                            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                            title="Detail Alumni"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <DeleteConfirmButton
                            endpoint="/admin/alumni"
                            id={item.id}
                            title={item.name}
                            entityName="data alumni"
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

        <AdminPagination
          currentPage={page}
          totalPages={totalPages}
          itemsPerPage={perPage}
          totalItems={filteredAlumni.length}
          onPageChange={setPage}
          onItemsPerPageChange={(val: number) => {
            setPerPage(val);
            setPage(1);
          }}
        />
      </div>

      {/* Modal Detail Testimoni */}
      {selectedAlumni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Detail Tracer Alumni</h3>
              <button
                onClick={() => setSelectedAlumni(null)}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-base">
                  {selectedAlumni.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{selectedAlumni.name}</h4>
                  <p className="text-slate-500">Angkatan / Tahun Lulus: {selectedAlumni.graduation_year}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Profesi</span>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedAlumni.current_job || '-'}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Instansi / Kampus</span>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedAlumni.company || '-'}</p>
                </div>
              </div>
              {selectedAlumni.major && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Jurusan / Program Studi</span>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedAlumni.major}</p>
                </div>
              )}
              {selectedAlumni.testimonial && (
                <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100/60">
                  <span className="text-[10px] text-blue-600 font-bold uppercase">Kesan & Pesan Alumni</span>
                  <p className="text-slate-700 italic mt-1 leading-relaxed">&ldquo;{selectedAlumni.testimonial}&rdquo;</p>
                </div>
              )}
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedAlumni(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
