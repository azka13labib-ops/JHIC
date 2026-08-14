'use client';

import { useState, useEffect } from "react";

export default function GuestbookPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const fetchGuestbooks = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guestbooks`);
        const data = await res.json();
        if(data.data) setEntries(data.data);
    } catch(e) {
        console.error(e);
    }
  };

  useEffect(() => {
    fetchGuestbooks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guestbooks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, institution, message }),
      });

      if (!res.ok) throw new Error("Gagal mengirim buku tamu");

      setSuccess(true);
      setName("");
      setEmail("");
      setInstitution("");
      setMessage("");
      fetchGuestbooks();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Buku Tamu</h1>
      <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
        Silakan tinggalkan pesan, kesan, atau saran untuk SMA PGRI 1 Lumajang.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6">Isi Buku Tamu</h2>
            {success && (
              <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-xl">
                Terima kasih! Pesan Anda telah berhasil dikirim.
              </div>
            )}
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Nama Lengkap *</label>
                <input type="text" value={name} onChange={e=>setName(e.target.value)} required className="w-full px-4 py-2 border rounded-xl" placeholder="Nama Anda" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Email (Opsional)</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-xl" placeholder="email@contoh.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Instansi / Asal (Opsional)</label>
                <input type="text" value={institution} onChange={e=>setInstitution(e.target.value)} className="w-full px-4 py-2 border rounded-xl" placeholder="Asal Instansi/Sekolah" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Pesan *</label>
                <textarea value={message} onChange={e=>setMessage(e.target.value)} required rows={4} className="w-full px-4 py-2 border rounded-xl" placeholder="Tulis pesan Anda di sini..."></textarea>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">
                {loading ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
        </div>

        {/* List */}
        <div className="space-y-6 h-[600px] overflow-y-auto pr-2">
            <h2 className="text-2xl font-bold mb-6">Pesan Terbaru</h2>
            {entries.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
                    Belum ada pesan.
                </div>
            ) : (
                entries.map(entry => (
                    <div key={entry.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl mr-4">
                                {entry.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{entry.name}</h3>
                                <p className="text-xs text-slate-500">{entry.institution || 'Pengunjung Umum'} • {new Date(entry.created_at).toLocaleDateString('id-ID')}</p>
                            </div>
                        </div>
                        <p className="text-slate-700 text-sm">{entry.message}</p>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
}
