'use client';

import { useState } from 'react';

export default function InquiryForm({ productId, productName }: { productId: number; productName: string }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, product_id: productId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? 'Gagal mengirim pesan.');
      }
      setState('done');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-2">✅</div>
        <h3 className="font-bold text-green-800 mb-1">Pesan Terkirim!</h3>
        <p className="text-green-700 text-sm">Kami akan segera menghubungi kamu mengenai <strong>{productName}</strong>.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
      <h3 className="font-bold text-slate-900 mb-4 text-lg">📩 Hubungi Kami / Pesan Produk</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required value={form.name}
          onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="Nama lengkap *"
          className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            required type="email" value={form.email}
            onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="Email *"
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="No. HP"
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <textarea
          required value={form.message}
          onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Pesan / pertanyaan produk *"
          rows={3}
          className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={state === 'loading'}
          className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {state === 'loading' ? 'Mengirim...' : 'Kirim Pesan →'}
        </button>
      </form>
    </div>
  );
}
