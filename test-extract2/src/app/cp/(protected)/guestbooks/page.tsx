'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { BookMarked, Mail, Building, Calendar } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSearchBar } from '@/components/admin/AdminSearchBar';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';

interface GuestbookItem {
  id: number;
  name: string;
  email?: string;
  institution?: string;
  message: string;
  created_at: string;
}

export default function AdminGuestbooksPage() {
  const { data: session } = useSession();
  const [guestbooks, setGuestbooks] = useState<GuestbookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const authHeaders = useMemo(() => ({
    Authorization: `Bearer ${session?.accessToken}`,
    Accept: 'application/json',
  }), [session?.accessToken]);

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/guestbooks`, { headers: authHeaders });
      const data = await res.json();
      setGuestbooks(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setGuestbooks([]);
    } finally {
      setLoading(false);
    }
  }, [session, authHeaders]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Filter and pagination
  const filteredGuestbooks = useMemo(() => {
    if (!search.trim()) return guestbooks;
    const q = search.toLowerCase();
    return guestbooks.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.institution && item.institution.toLowerCase().includes(q)) ||
        item.message.toLowerCase().includes(q)
    );
  }, [guestbooks, search]);

  const totalPages = Math.ceil(filteredGuestbooks.length / perPage) || 1;
  const paginatedGuestbooks = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredGuestbooks.slice(start, start + perPage);
  }, [filteredGuestbooks, page, perPage]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Reusable Header Operator */}
      <AdminPageHeader
        icon={BookMarked}
        title="Buku Tamu Publik"
        description="Daftar aspirasi, testimoni, dan pesan dari pengunjung serta wali murid."
      />

      {/* Table Container with Reusable Search & Pagination */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Reusable Search Bar */}
        <AdminSearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari nama pengirim, email, instansi, atau isi pesan..."
          totalResults={filteredGuestbooks.length}
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
                  <th className="py-4 px-6">Pengirim & Kontak</th>
                  <th className="py-4 px-6">Instansi / Asal</th>
                  <th className="py-4 px-6">Isi Pesan</th>
                  <th className="py-4 px-6">Tanggal Kirim</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {paginatedGuestbooks.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      {search ? 'Tidak ada pesan buku tamu yang cocok dengan pencarian.' : 'Belum ada pesan buku tamu yang masuk.'}
                    </td>
                  </tr>
                ) : (
                  paginatedGuestbooks.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0">
                            {item.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{item.name}</div>
                            {item.email && (
                              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                <Mail className="w-3 h-3 text-slate-400" />
                                <span>{item.email}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.institution || '-'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 max-w-sm">
                        <p className="line-clamp-2 text-slate-600">{item.message}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <DeleteConfirmButton
                            endpoint="/admin/guestbooks"
                            id={item.id}
                            title={`Pesan dari ${item.name}`}
                            entityName="buku tamu"
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

        {/* Reusable Pagination */}
        <AdminPagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredGuestbooks.length}
          itemsPerPage={perPage}
          onPageChange={setPage}
          onItemsPerPageChange={(newPerPage) => {
            setPerPage(newPerPage);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
}
