import Link from 'next/link';
import { fetchApi } from '@/lib/api-client';
import { Plus, Edit, PenTool, User, Calendar, Eye } from 'lucide-react';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';

export const dynamic = 'force-dynamic';

export default async function StudentWorkPage() {
  const res = await fetchApi('/admin/student-works', { cache: 'no-store' });
  
  if (!res.ok) {
    return (
      <div className="p-8 bg-rose-50 border border-rose-200 rounded-3xl text-rose-700 font-bold flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
          <PenTool className="w-4 h-4 text-rose-600" />
        </div>
        <div>
          <div>Gagal mengambil data karya siswa dari server.</div>
          <div className="text-xs font-normal text-rose-500 mt-0.5">Pastikan server backend Laravel berjalan normal.</div>
        </div>
      </div>
    );
  }

  const rawData = await res.json().catch(() => []);
  const worksList = Array.isArray(rawData) ? rawData : Array.isArray(rawData?.data) ? rawData.data : [rawData].filter(Boolean);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Manajemen Karya Siswa</h1>
            <p className="text-xs text-slate-500 mt-0.5">Kelola portofolio inovasi, karya seni, dan produk kreatif siswa.</p>
          </div>
        </div>
        
        <Link
          href="/admin/student-works/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Karya Baru</span>
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-4 px-6">Judul Karya</th>
                <th className="py-4 px-6">Nama Siswa Kreator</th>
                <th className="py-4 px-6">Tanggal Publikasi</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {worksList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    Belum ada karya siswa yang terdaftar.
                  </td>
                </tr>
              ) : (
                worksList.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 max-w-md">
                      <div className="line-clamp-1">{item.title}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                        <User className="w-3.5 h-3.5 text-purple-600" />
                        <span>{item.student_name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-slate-600">
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
                      <div className="flex items-center justify-end gap-2">
                        {item.slug && (
                          <Link
                            href={`/karya-siswa/${item.slug}`}
                            target="_blank"
                            className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 border border-slate-200 rounded-lg transition-colors"
                            title="Pratinjau Publik"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/student-works/${item.id}/edit`}
                          className="p-2 text-slate-700 hover:text-purple-600 hover:bg-purple-50 border border-slate-200 rounded-lg transition-colors"
                          title="Edit Karya"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <DeleteConfirmButton endpoint="/admin/student-works" id={item.id} title={item.title} entityName="karya siswa" />
                      </div>
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
