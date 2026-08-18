'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Save, Loader2, Trophy } from 'lucide-react';
import { ImageUploadPreview } from '@/components/admin/ImageUploadPreview';

export default function AdminNewAchievementPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'sekolah',
    year: new Date().getFullYear().toString(),
  });
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.accessToken) return;
    
    setLoading(true);
    setError('');
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('level', formData.level);
      data.append('year', formData.year);
      if (image) data.append('image', image);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/admin/achievements`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: 'application/json',
        },
        body: data,
      });

      if (res.ok) {
        router.push('/admin/achievements');
        router.refresh();
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Gagal menyimpan data prestasi');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Tambah Prestasi Siswa</h1>
            <p className="text-xs text-slate-500 mt-0.5">Dokumentasikan perolehan juara, sertifikat, dan medali kejuaraan.</p>
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
              Judul Prestasi / Kejuaraan <span className="text-rose-500">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="Misal: Juara 1 Olimpiade Sains Nasional (OSN) Bidang Fisika..."
              className="w-full px-4 py-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-amber-600 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-500/15 transition-all"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Tingkat Kejuaraan <span className="text-rose-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-amber-600 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/15 transition-all cursor-pointer"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              >
                <option value="sekolah">Tingkat Sekolah</option>
                <option value="kota">Tingkat Kota / Kabupaten</option>
                <option value="provinsi">Tingkat Provinsi</option>
                <option value="nasional">Tingkat Nasional</option>
                <option value="internasional">Tingkat Internasional</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Tahun Perolehan <span className="text-rose-500">*</span>
              </label>
              <input
                required
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-amber-600 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/15 transition-all"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                onKeyDown={(e) => {
                  if (['e', 'E', '+', '-', '.', ',', ' '].includes(e.key)) e.preventDefault();
                }}
                placeholder="e.g. 2026"
              />
            </div>
          </div>

          <ImageUploadPreview
            onChange={(file) => setImage(file)}
            label="Foto Penyerahan Piala / Piagam Penghargaan"
            helperText="Pilih foto dokumentasi penerimaan piagam atau medali (JPG/PNG maks. 5MB)"
          />

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Deskripsi Singkat Prestasi
            </label>
            <textarea
              className="w-full p-4 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-amber-600 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-500/15 transition-all leading-relaxed"
              rows={4}
              placeholder="Jelaskan nama siswa peraih prestasi, pembimbing, dan penyelenggara perlombaan..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-600/20 hover:shadow-amber-600/40 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Prestasi</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
