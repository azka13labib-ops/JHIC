'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AdminEditAchievementPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = use(params);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'sekolah',
    year: '',
    image_path: '',
  });
  const [image, setImage] = useState<File | null>(null);

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/achievements/${id}`, {
        headers: { Authorization: `Bearer ${session.accessToken}`, Accept: 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        setFormData({
          title: data.title || '',
          description: data.description || '',
          level: data.level || 'sekolah',
          year: data.year || '',
          image_path: data.image_path || '',
        });
      }
    } finally {
      setFetching(false);
    }
  }, [id, session]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.accessToken) return;
    
    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('level', formData.level);
      data.append('year', formData.year);
      if (image) data.append('image', image);
      data.append('_method', 'PUT'); // Laravel spoofing

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/achievements/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: 'application/json',
        },
        body: data,
      });

      if (res.ok) {
        router.push('/admin/achievements');
      } else {
        alert('Gagal mengupdate prestasi');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center py-10">Memuat...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Edit Prestasi</h1>
        <button type="button" onClick={() => router.back()} className="text-slate-500 hover:text-slate-700">Kembali</button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Judul Prestasi</label>
          <input
            required
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tingkat</label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
          >
            <option value="sekolah">Sekolah</option>
            <option value="kota">Kota/Kabupaten</option>
            <option value="provinsi">Provinsi</option>
            <option value="nasional">Nasional</option>
            <option value="internasional">Internasional</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tahun</label>
          <input
            required
            type="number"
            min="2000"
            max="2100"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ganti Gambar (Opsional)</label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 mb-4"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          {image ? (
            <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={URL.createObjectURL(image)} alt="Preview" className="object-cover w-full h-full" />
            </div>
          ) : formData.image_path ? (
            <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${formData.image_path}`} alt="Preview" className="object-cover w-full h-full" />
            </div>
          ) : null}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
}
