'use client';

import { useState } from 'react';

export default function JobApplyForm({ jobId, jobTitle }: { jobId: number; jobTitle: string }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? 'Gagal mengirim lamaran.');
      }
      setState('done');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
        <div className="text-2xl mb-1">✅</div>
        <p className="font-bold text-green-800 text-sm">Lamaran terkirim!</p>
        <p className="text-green-700 text-xs mt-1">Kami akan menghubungi kamu terkait posisi <strong>{jobTitle}</strong>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-violet-50 border border-violet-100 rounded-xl p-4 space-y-3">
      <h4 className="font-bold text-slate-800 text-sm">Kirim Lamaran</h4>
      <input required value={form.name} onChange={(e) => set('name', e.target.value)}
        placeholder="Nama lengkap *"
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
      <div className="grid grid-cols-2 gap-3">
        <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)}
          placeholder="Email *"
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
        <input value={form.phone} onChange={(e) => set('phone', e.target.value)}
          placeholder="No. HP"
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
      </div>
      <textarea value={form.message} onChange={(e) => set('message', e.target.value)}
        placeholder="Motivasi / pesan tambahan"
        rows={2}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
      {error && <p className="text-red-600 text-xs">{error}</p>}
      <button type="submit" disabled={state === 'loading'}
        className="w-full bg-violet-600 text-white py-2.5 rounded-lg font-bold hover:bg-violet-700 transition-colors text-sm disabled:opacity-50">
        {state === 'loading' ? 'Mengirim...' : 'Kirim Lamaran →'}
      </button>
    </form>
  );
}
