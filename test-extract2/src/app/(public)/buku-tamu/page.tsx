'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Building2, 
  Calendar
} from 'lucide-react';

interface GuestbookEntry {
  id: number;
  name: string;
  email?: string;
  institution?: string;
  message: string;
  created_at: string;
}

const FALLBACK_ENTRIES: GuestbookEntry[] = [
  {
    id: 1,
    name: 'Drs. Hendro Wibowo',
    institution: 'Dinas Pendidikan Jawa Timur',
    message: 'Apresiasi yang sangat tinggi untuk kemajuan transformasi digital dan fasilitas pembelajaran di SMA PGRI 1 Lumajang.',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 2,
    name: 'Ibu Hj. Suryaningsih',
    institution: 'Wali Murid Calon Siswa Baru',
    message: 'Portal PPDB dan informasi sekolah sangat jelas dan mudah diakses. Semoga sekolah ini semakin berprestasi!',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(FALLBACK_ENTRIES);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const fetchGuestbooks = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/guestbooks`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          setEntries(data.data);
        }
      }
    } catch {
      // Keep fallback
    }
  };

  useEffect(() => {
    fetchGuestbooks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/guestbooks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, institution, message }),
      });

      if (!res.ok) throw new Error('Gagal mengirim buku tamu. Silakan coba kembali.');

      setSuccess(true);
      setName('');
      setEmail('');
      setInstitution('');
      setMessage('');
      fetchGuestbooks();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-900 uppercase block mb-1">
              Buku Tamu Digital
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Buku Tamu & Pesan Pengunjung
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Tinggalkan pesan, saran, apresiasi, atau kesan kunjungan Anda untuk kemajuan sivitas akademika SMA PGRI 1 Lumajang.
            </p>
          </div>
        </div>
      </section>

      {/* 2-Column Main Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1 (5 cols): Entry Form */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs">
            <div className="mb-4">
              <h2 className="text-sm font-bold text-slate-900">Isi Buku Tamu</h2>
              <p className="text-xs text-slate-500 mt-0.5">Pesan Anda akan langsung tampil di linimasa pengunjung.</p>
            </div>

            {success && (
              <div className="p-3.5 mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Terima kasih! Pesan buku tamu Anda berhasil dikirim.</span>
              </div>
            )}

            {error && (
              <div className="p-3.5 mb-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama lengkap Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Instansi / Asal Lembaga (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: SMPN 1 Lumajang / Instansi / Umum"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Email (Opsional)</label>
                <input
                  type="email"
                  placeholder="email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pesan & Kesan *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tuliskan pesan, saran, atau kesan Anda..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Mengirim...' : 'Kirim Buku Tamu'}</span>
              </button>
            </form>
          </div>

          {/* Column 2 (7 cols): Feed of Entries */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Pesan Masuk ({entries.length})
              </span>
              <span className="text-[11px] text-slate-500">Diperbarui otomatis</span>
            </div>

            <div className="space-y-3 max-h-160 overflow-y-auto pr-1">
              {entries.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-none">
                          {item.name}
                        </h2>
                        {item.institution && (
                          <span className="text-[11px] text-blue-700 font-medium flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3 text-slate-400" />
                            <span>{item.institution}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 shrink-0">
                      {new Date(item.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed pl-10.5">
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
