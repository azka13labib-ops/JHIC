'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Save, Loader2, Newspaper, Pin } from 'lucide-react';
import { ImageUploadPreview } from '@/components/admin/ImageUploadPreview';
import LimitModal from '@/components/ui/LimitModal';

interface NewsFormProps {
  isEdit?: boolean;
  initialData?: {
    id?: number;
    title?: string;
    content?: string;
    is_pinned?: boolean | number;
    image_path?: string;
    image?: string;
  };
}

export function NewsForm({ isEdit = false, initialData }: NewsFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [image, setImage] = useState<File | null>(null);
  const [isPinned, setIsPinned] = useState(Boolean(initialData?.is_pinned));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const rawImg = initialData?.image_path || initialData?.image;
  const currentImageUrl = rawImg 
    ? (rawImg.startsWith('http') ? rawImg : `http://127.0.0.1:8000/storage/${rawImg}`) 
    : null;

  const [modalData, setModalData] = useState<{isOpen: boolean, title: string, message: string}>({
    isOpen: false,
    title: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Judul dan Konten berita wajib diisi.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('is_pinned', isPinned ? '1' : '0');
      if (image) {
        formData.append('image', image);
      }
      
      if (isEdit) {
        formData.append('_method', 'PUT');
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const endpoint = isEdit ? `/admin/news/${initialData?.id}` : `/admin/news`;
      
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 400 && errorData.error === 'Batas Maksimal Tercapai') {
          setModalData({
            isOpen: true,
            title: errorData.error,
            message: errorData.message
          });
          return;
        }
        throw new Error(errorData.message || 'Gagal menyimpan berita.');
      }

      router.push('/admin/news');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat menyimpan berita.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {isEdit ? 'Edit Berita' : 'Tambah Berita Baru'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEdit ? 'Perbarui informasi artikel, status sematan, dan foto dokumentasi kegiatan.' : 'Tulis dan publikasikan informasi kegiatan resmi sekolah.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali</span>
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs text-slate-900">
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Judul */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Judul Berita <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul berita utama..."
              className="w-full px-4 py-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-blue-600 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/15 transition-all"
            />
          </div>

          {/* Opsi Sematkan Berita */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3.5">
            <input
              type="checkbox"
              id="is_pinned"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
            <label htmlFor="is_pinned" className="cursor-pointer select-none">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Pin className="w-3.5 h-3.5 fill-amber-600 text-amber-700" />
                Sematkan Berita ini ke Beranda (Headline Utama)
              </span>
              <span className="block text-[11px] text-amber-700 mt-0.5 leading-relaxed">
                Berita yang disematkan akan diprioritaskan tampil pada kartu utama di halaman depan website.
              </span>
            </label>
          </div>

          {/* Photo Preview Upload */}
          <ImageUploadPreview
            currentImageUrl={currentImageUrl}
            onChange={(file) => setImage(file)}
            label="Foto Utama Berita"
            helperText="Pilih foto dokumentasi yang tajam dan landscape (JPG/PNG maks. 5MB)"
          />

          {/* Konten */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Isi Konten Berita <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tuliskan isi lengkap artikel berita di sini..."
              className="w-full p-4 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-blue-600 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/15 transition-all leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 hover:shadow-blue-600/40 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isEdit ? 'Menyimpan...' : 'Mempublikasikan...'}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEdit ? 'Simpan Perubahan' : 'Publikasikan Berita'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <LimitModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        title={modalData.title}
        message={modalData.message}
      />
    </div>
  );
}
