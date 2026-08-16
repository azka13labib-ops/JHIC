'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
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
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <section className="relative bg-linear-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b border-slate-200 py-16 sm:py-20 overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 text-blue-700">
            <BookOpen className="w-3.5 h-3.5" /> Buku Tamu & Aspirasi Publik
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight text-slate-900">
            Buku Tamu Digital
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Silakan tinggalkan pesan, kesan, masukan konstruktif, atau sapaan hangat Anda untuk civitas akademika SMA PGRI 1 Lumajang.
          </p>

          {/* Breadcrumb */}
          <div className="flex justify-center items-center gap-2 text-xs sm:text-sm text-slate-500 mt-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Buku Tamu</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (5 cols): Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs sticky top-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Tulis Buku Tamu</h2>
                  <p className="text-xs text-slate-500">Pesan Anda akan tampil di beranda buku tamu.</p>
                </div>
              </div>

              {success && (
                <div className="mb-5 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-start gap-2.5 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Terima kasih! Pesan dan aspirasi Anda telah berhasil terkirim.</span>
                </div>
              )}

              {error && (
                <div className="mb-5 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-start gap-2.5 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Alamat Email (Opsional)
                  </label>
                  <input
                    type="email"
                    placeholder="email@anda.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Instansi / Sekolah / Asal
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: SMPN 1 Lumajang / Umum"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Pesan & Kesan *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan pesan atau saran Anda di sini..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? 'Mengirim...' : 'Kirim Pesan Buku Tamu →'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column (7 cols): Message Feed */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>Pesan & Sapaan Pengunjung</span>
              </h2>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                {entries.length} Pesan
              </span>
            </div>

            {entries.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700">Belum ada pesan buku tamu</h3>
                <p className="text-xs text-slate-500 mt-1">Jadilah yang pertama menuliskan pesan di buku tamu!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-extrabold text-sm flex items-center justify-center shrink-0 border border-blue-200">
                          {entry.name ? entry.name.charAt(0).toUpperCase() : 'G'}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{entry.name}</h3>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            {entry.institution && (
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-slate-400" />
                                {entry.institution}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(entry.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                      {entry.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
