'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, product_id: null }),
      });
      if (!res.ok) throw new Error('Gagal mengirim pesan.');
      setState('done');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-bold text-green-800 text-xl mb-1">Pesan Berhasil Terkirim!</h3>
        <p className="text-green-700">Kami akan menghubungi kamu dalam 1–2 hari kerja.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Nama *</label>
          <input required value={form.name} onChange={(e) => set('name', e.target.value)}
            placeholder="Nama lengkap"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email *</label>
          <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)}
            placeholder="email@example.com"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Subjek *</label>
        <input required value={form.subject} onChange={(e) => set('subject', e.target.value)}
          placeholder="Subjek pesan"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Pesan *</label>
        <textarea required value={form.message} onChange={(e) => set('message', e.target.value)}
          placeholder="Tulis pesan kamu di sini..."
          rows={5}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
      </div>
      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>}
      <button type="submit" disabled={state === 'loading'}
        className="w-full bg-[#2B3B6F] text-white py-4 rounded-xl font-extrabold hover:bg-[#1E2B58] transition-colors shadow-lg disabled:opacity-50 text-sm">
        {state === 'loading' ? 'Mengirim...' : 'Kirim Pesan →'}
      </button>
    </form>
  );
}
