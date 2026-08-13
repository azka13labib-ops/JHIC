'use client';

import { useState } from 'react';
import Link from 'next/link';

type Step = 1 | 2 | 3;

interface FormData {
  full_name: string;
  nisn: string;
  date_of_birth: string;
  gender: 'L' | 'P' | '';
  address: string;
  previous_school: string;
  major_choice: string;
  phone: string;
  email: string;
  parent_name: string;
  parent_phone: string;
}

const INITIAL: FormData = {
  full_name: '', nisn: '', date_of_birth: '', gender: '',
  address: '', previous_school: '', major_choice: '',
  phone: '', email: '', parent_name: '', parent_phone: '',
};

const MAJORS = ['MIPA', 'IPS', 'Ilmu Bahasa dan Budaya'];

export default function PpdbDaftarPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ registration_number: string } | null>(null);
  const [error, setError] = useState('');

  const set = (key: keyof FormData, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ppdb/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? 'Gagal mengirim pendaftaran.');
      }
      const data = await res.json();
      setSubmitted({ registration_number: data.registration_number ?? `PPDB-${Date.now()}` });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Pendaftaran Berhasil!</h1>
          <p className="text-slate-600 mb-6">Nomor pendaftaran kamu:</p>
          <div className="bg-slate-100 rounded-xl px-6 py-4 font-mono font-bold text-xl text-[#2B3B6F] mb-6 tracking-widest">
            {submitted.registration_number}
          </div>
          <p className="text-slate-500 text-sm mb-6">
            Simpan nomor ini untuk mengecek status pendaftaranmu. Kami akan menghubungi melalui email/WhatsApp.
          </p>
          <Link href="/ppdb/status" className="block w-full bg-[#2B3B6F] text-white py-3 rounded-xl font-bold hover:bg-[#1E2B58] transition-colors">
            Cek Status Pendaftaran
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/ppdb" className="text-blue-600 text-sm hover:underline">← Info PPDB</Link>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Form Pendaftaran PPDB</h1>
          <p className="text-slate-500">SMA PGRI 1 Lumajang — Tahun Ajaran 2026/2027</p>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {([1, 2, 3] as Step[]).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${step >= s ? 'bg-[#2B3B6F] text-white' : 'bg-slate-200 text-slate-500'}`}>
                {step > s ? '✓' : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-[#2B3B6F]' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-12 text-xs text-slate-500 mb-8">
          <span className={step >= 1 ? 'text-[#2B3B6F] font-semibold' : ''}>Data Diri</span>
          <span className={step >= 2 ? 'text-[#2B3B6F] font-semibold' : ''}>Sekolah & Jurusan</span>
          <span className={step >= 3 ? 'text-[#2B3B6F] font-semibold' : ''}>Konfirmasi</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Data Diri Calon Siswa</h2>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap *</label>
                <input value={form.full_name} onChange={(e) => set('full_name', e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nama sesuai KK" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">NISN *</label>
                  <input value={form.nisn} onChange={(e) => set('nisn', e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="10 digit" maxLength={10} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal Lahir *</label>
                  <input type="date" value={form.date_of_birth} onChange={(e) => set('date_of_birth', e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Jenis Kelamin *</label>
                <select value={form.gender} onChange={(e) => set('gender', e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Pilih...</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Alamat Lengkap *</label>
                <textarea value={form.address} onChange={(e) => set('address', e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Alamat sesuai KK" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">No. HP *</label>
                  <input value={form.phone} onChange={(e) => set('phone', e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="08xx" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="email@example.com" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Data Sekolah & Orang Tua</h2>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Asal Sekolah *</label>
                <input value={form.previous_school} onChange={(e) => set('previous_school', e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nama SMP/MTs asal" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Pilihan Jurusan *</label>
                <select value={form.major_choice} onChange={(e) => set('major_choice', e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Pilih Jurusan...</option>
                  {MAJORS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Orang Tua/Wali *</label>
                <input value={form.parent_name} onChange={(e) => set('parent_name', e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nama lengkap orang tua" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">No. HP Orang Tua *</label>
                <input value={form.parent_phone} onChange={(e) => set('parent_phone', e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="08xx" />
              </div>
            </div>
          )}

          {/* Step 3 — Konfirmasi */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Konfirmasi Data</h2>
              <div className="space-y-3 text-sm">
                {[
                  ['Nama Lengkap', form.full_name],
                  ['NISN', form.nisn],
                  ['Tanggal Lahir', form.date_of_birth],
                  ['Jenis Kelamin', form.gender === 'L' ? 'Laki-laki' : 'Perempuan'],
                  ['Email', form.email],
                  ['No. HP', form.phone],
                  ['Asal Sekolah', form.previous_school],
                  ['Pilihan Jurusan', form.major_choice],
                  ['Nama Orang Tua', form.parent_name],
                  ['No. HP Orang Tua', form.parent_phone],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-semibold text-slate-900">{val || '—'}</span>
                  </div>
                ))}
              </div>
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button onClick={() => setStep((s) => (s - 1) as Step)}
                className="px-6 py-2.5 border border-slate-200 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition-colors">
                ← Kembali
              </button>
            ) : <div />}
            {step < 3 ? (
              <button onClick={() => setStep((s) => (s + 1) as Step)}
                className="px-6 py-2.5 bg-[#2B3B6F] text-white rounded-lg font-bold hover:bg-[#1E2B58] transition-colors">
                Lanjutkan →
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={isSubmitting}
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50">
                {isSubmitting ? 'Mengirim...' : 'Kirim Pendaftaran ✓'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
