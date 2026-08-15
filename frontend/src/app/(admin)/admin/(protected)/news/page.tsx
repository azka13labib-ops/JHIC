import Link from 'next/link';
import { fetchApi } from '@/lib/api-client';
import { Plus, Edit, Newspaper, Calendar, User, Eye } from 'lucide-react';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const res = await fetchApi('/admin/news', { cache: 'no-store' });
  
  if (!res.ok) {
    return (
      <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 font-bold">
        Gagal mengambil data berita dari server.
      </div>
    );
  }

  const newsList = await res.json();

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Manajemen Berita</h1>
            <p className="text-xs text-slate-500 mt-0.5">Kelola seluruh publikasi berita dan pengumuman sekolah.</p>
          </div>
        </div>
        
        <Link
          href="/admin/news/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Berita Baru</span>
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-4 px-6">Judul Berita</th>
                <th className="py-4 px-6">Penulis</th>
                <th className="py-4 px-6">Tanggal Publikasi</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {newsList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    Belum ada berita yang dipublikasikan.
                  </td>
                </tr>
              ) : (
                newsList.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 max-w-md">
                      <div className="line-clamp-1">{item.title}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.author?.name || 'Administrator'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-slate-500">
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
                            href={`/berita/${item.slug}`}
                            target="_blank"
                            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                            title="Pratinjau Publik"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/news/${item.id}/edit`}
                          className="p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                          title="Edit Berita"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <DeleteConfirmButton endpoint="/admin/news" id={item.id} title={item.title} entityName="berita" />
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
