import { fetchApi } from '@/lib/api-client';
import { BookMarked, User, Building, Mail, Calendar } from 'lucide-react';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';

export const dynamic = 'force-dynamic';

export default async function GuestbookPage() {
  const res = await fetchApi('/admin/guestbooks', { cache: 'no-store' });
  
  if (!res.ok) {
    return (
      <div className="p-8 bg-rose-50 border border-rose-200 rounded-3xl text-rose-700 font-bold flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
          <BookMarked className="w-4 h-4 text-rose-600" />
        </div>
        <div>
          <div>Gagal mengambil data buku tamu dari server.</div>
          <div className="text-xs font-normal text-rose-500 mt-0.5">Pastikan server backend Laravel berjalan normal.</div>
        </div>
      </div>
    );
  }

  const rawData = await res.json().catch(() => []);
  const guestbooksList = Array.isArray(rawData) ? rawData : Array.isArray(rawData?.data) ? rawData.data : [rawData].filter(Boolean);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center shrink-0">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Buku Tamu Publik</h1>
            <p className="text-xs text-slate-500 mt-0.5">Daftar aspirasi, testimoni, dan pesan dari pengunjung serta wali murid.</p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
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
              {guestbooksList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    Belum ada pesan buku tamu yang masuk.
                  </td>
                </tr>
              ) : (
                guestbooksList.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs shrink-0">
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
                    <td className="py-4 px-6 max-w-xs sm:max-w-md">
                      <p className="line-clamp-2 text-slate-700 leading-relaxed font-normal">{item.message}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-slate-600 whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {new Date(item.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <DeleteConfirmButton endpoint="/admin/guestbooks" id={item.id} title={item.name} entityName="pesan buku tamu" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
