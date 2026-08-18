'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Save, Loader2, PenTool } from 'lucide-react';
import { ImageUploadPreview } from '@/components/admin/ImageUploadPreview';

export default function EditStudentWorkPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const { data: session } = useSession();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [studentName, setStudentName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentWork = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
        const res = await fetch(`${apiUrl}/admin/student-works/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            Accept: 'application/json',
          },
        });
        if (!res.ok) throw new Error('Gagal mengambil data karya siswa.');
        
        const data = await res.json();
        setTitle(data.title || '');
        setDescription(data.description || '');
        setStudentName(data.student_name || '');
        if (data.image_path || data.image) {
          const rawImg = data.image_path || data.image;
          const fullImg = rawImg.startsWith('http') ? rawImg : `http://127.0.0.1:8000/storage/${rawImg}`;
          setCurrentImageUrl(fullImg);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    if (session?.accessToken) {
      fetchStudentWork();
    }
  }, [id, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !studentName.trim()) {
      setError('Judul, Nama Siswa, dan Deskripsi karya wajib diisi.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('title', title);
      formData.append('description', description);
      formData.append('student_name', studentName);
      if (image) {
        formData.append('image', image);
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/admin/student-works/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Gagal mengubah karya siswa.');
      }

      router.push('/admin/student-works');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        <span className="text-xs font-semibold text-slate-400">Memuat data karya...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Edit Karya Siswa</h1>
            <p className="text-xs text-slate-500 mt-0.5">Perbarui deskripsi, nama kreator, dan foto hasil karya.</p>
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

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs text-slate-900">
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Judul Karya Siswa <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul karya..."
              className="w-full px-4 py-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-purple-600 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/15 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Nama Siswa Kreator <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Nama Lengkap Siswa"
              className="w-full px-4 py-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-purple-600 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/15 transition-all"
            />
          </div>

          <ImageUploadPreview
            currentImageUrl={currentImageUrl}
            onChange={(file) => setImage(file)}
            label="Foto Karya / Hasil Produk"
            helperText="Pilih foto produk karya nyata atau tangkapan layar inovasi (JPG/PNG maks. 5MB)"
          />

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Deskripsi Karya Siswa <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan konsep, proses pembuatan, dan manfaat karya ini..."
              className="w-full p-4 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-purple-600 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/15 transition-all leading-relaxed"
            />
          </div>

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
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-md shadow-purple-600/20 hover:shadow-purple-600/40 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
