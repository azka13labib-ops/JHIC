'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { GraduationCap, Briefcase, Building2, Eye, X } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSearchBar } from '@/components/admin/AdminSearchBar';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { AlumniFormModal } from '@/components/admin/AlumniFormModal';
import { AlumniDetailModal } from '@/components/admin/AlumniDetailModal';

interface AlumniItem {
  id: number;
  name: string;
  graduation_year: number | string;
  major?: string;
  current_job?: string;
  company?: string;
  image_path?: string;
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

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [initialData, setInitialData] = useState<any>({});
  
  const [toastAlert, setToastAlert] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastAlert({ type, text });
    setTimeout(() => setToastAlert(null), 4000);
  };

  const handleEdit = (item: AlumniItem) => {
    setInitialData(item);
    setEditingId(item.id);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setInitialData({});
    setEditingId(null);
    setIsFormOpen(true);
  };

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
      <AdminPageHeader
        icon={GraduationCap}
        title="Tracer Study Alumni"
        description="Kelola direktori alumni SMA PGRI 1 Lumajang, data karir, institusi kerja, dan testimoni lulusan."
        actionButton={{
          label: 'Tambah Data',
          onClick: handleAdd
        }}
      />

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
                          {item.image_path ? (
                            <Image src={item.image_path} alt={item.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover shadow-xs border border-slate-200 shrink-0" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                              {item.name ? item.name.charAt(0).toUpperCase() : 'A'}
                            </div>
                          )}
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
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                            title="Edit Data"
                          >
                            <Pencil className="w-3.5 h-3.5" />
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

      <AlumniDetailModal 
        alumni={selectedAlumni}
        onClose={() => setSelectedAlumni(null)}
      />

      <AlumniFormModal
        isOpen={isFormOpen}
        editingId={editingId}
        initialData={initialData}
        accessToken={session?.accessToken}
        onClose={() => setIsFormOpen(false)}
        onSuccess={fetchData}
        showToast={showToast}
      />

      {toastAlert && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 ${
            toastAlert.type === 'success' 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : toastAlert.type === 'info'
            ? 'bg-blue-50 text-blue-700 border border-blue-200'
            : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}>
          <span className="text-sm font-semibold">{toastAlert.text}</span>
          <button 
            onClick={() => setToastAlert(null)}
            className="text-slate-400 hover:text-slate-600 transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
