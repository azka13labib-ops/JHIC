'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  AlertTriangle, 
  MessageCircle, 
  FileCheck, 
  GraduationCap, 
  Loader2, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft 
} from 'lucide-react';

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

interface PpdbInfo {
  is_open?: boolean;
  academic_year?: string;
  closed_message?: string;
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
  
  // Dynamic status check
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [ppdbInfo, setPpdbInfo] = useState<PpdbInfo>({ is_open: true });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
        const res = await fetch(`${apiUrl}/ppdb/info`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data) setPpdbInfo(json.data);
        }
      } catch (e) {
        console.error('Check PPDB status error:', e);
      } finally {
        setLoadingInfo(false);
      }
    };
    fetchInfo();
  }, []);

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

  if (loadingInfo) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#1E2B58] animate-spin" />
          <span className="text-xs font-bold text-slate-500">Memeriksa status portal PPDB...</span>
        </div>
      </div>
    );
  }

  // If PPDB is closed by Admin
  if (ppdbInfo.is_open === false) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-16">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-12 max-w-lg w-full text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-rose-50 border border-rose-200 rounded-3xl flex items-center justify-center text-rose-600 mx-auto">
            <AlertTriangle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <div className="inline-block px-3 py-1 bg-rose-100 text-rose-800 text-xs font-black uppercase rounded-full tracking-wider">
              Pendaftaran Ditutup
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Masa PPDB Telah Ditutup
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {ppdbInfo.closed_message || 'Mohon maaf, masa penerimaan peserta didik baru (PPDB) SMA PGRI 1 Lumajang saat ini sedang tidak menerima pendaftaran.'}
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/ppdb/status"
              className="w-full py-3.5 bg-[#1E2B58] hover:bg-[#2B3B6F] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Cek Status Kelulusan Pendaftar</span>
            </Link>

            <a
              href="https://wa.me/6281234567890?text=Halo%20Panitia%20PPDB%20SMA%20PGRI%201%20Lumajang,%20saya%20ingin%20bertanya%20informasi%20PPDB"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Panitia Sekolah (WhatsApp)</span>
            </a>

            <Link
              href="/ppdb"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 pt-2"
            >
              ← Kembali ke Beranda PPDB
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 max-w-lg w-full text-center animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Pendaftaran Berhasil Disubmit!</h1>
          <p className="text-slate-600 text-xs sm:text-sm mb-6">Berikut adalah nomor pendaftaran resmi Anda:</p>
          
          <div className="bg-slate-100 rounded-2xl p-4 font-mono font-black text-xl text-[#1E2B58] mb-6 tracking-widest border border-slate-200">
            {submitted.registration_number}
          </div>
          
          <p className="text-slate-500 text-xs mb-6 leading-relaxed">
            Simpan nomor ini untuk memeriksa status verifikasi dan pengumuman hasil seleksi di portal PPDB.
          </p>
          
          <Link href="/ppdb/status" className="block w-full bg-[#1E2B58] text-white py-3.5 rounded-xl font-bold text-xs hover:bg-[#2B3B6F] transition-all shadow-md">
            Cek Status Pendaftaran Sekarang →
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
          <Link href="/ppdb" className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:underline mb-3">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Informasi PPDB</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Form Pendaftaran PPDB</h1>
          <p className="text-slate-500 text-xs mt-1">SMA PGRI 1 Lumajang — Tahun Ajaran {ppdbInfo.academic_year || '2026/2027'}</p>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {([1, 2, 3] as Step[]).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${step >= s ? 'bg-[#1E2B58] text-white shadow-sm' : 'bg-slate-200 text-slate-500'}`}>
                {step > s ? '✓' : s}
              </div>
              <span className={`text-xs font-bold hidden sm:inline ${step === s ? 'text-[#1E2B58]' : 'text-slate-400'}`}>
                {s === 1 ? 'Data Diri' : s === 2 ? 'Peminatan & Sekolah' : 'Data Orang Tua'}
              </span>
              {s < 3 && <span className="text-slate-300 mx-1">―</span>}
            </div>
          ))}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
          {/* STEP 1: Data Diri */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span>Langkah 1: Data Diri Calon Siswa</span>
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap Siswa *</label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => set('full_name', e.target.value)}
                  placeholder="Sesuai Akta Kelahiran / Ijazah SMP"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">NISN (10 Digit) *</label>
                  <input
                    type="text"
                    maxLength={10}
                    value={form.nisn}
                    onChange={(e) => set('nisn', e.target.value)}
                    placeholder="e.g. 0081234567"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Tanggal Lahir *</label>
                  <input
                    type="date"
                    value={form.date_of_birth}
                    onChange={(e) => set('date_of_birth', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Jenis Kelamin *</label>
                <div className="flex gap-4">
                  {[
                    { val: 'L', label: 'Laki-Laki' },
                    { val: 'P', label: 'Perempuan' },
                  ].map(({ val, label }) => (
                    <label key={val} className={`flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer text-xs font-bold transition-all ${
                      form.gender === val 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}>
                      <input
                        type="radio"
                        name="gender"
                        value={val}
                        checked={form.gender === val}
                        onChange={() => set('gender', val)}
                        className="hidden"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Alamat Tempat Tinggal *</label>
                <textarea
                  rows={2}
                  value={form.address}
                  onChange={(e) => set('address', e.target.value)}
                  placeholder="Nama jalan, RT/RW, Dusun, Desa/Kelurahan, Kecamatan"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!form.full_name || !form.nisn || !form.date_of_birth || !form.gender || !form.address) {
                      setError('Mohon lengkapi semua field pada Langkah 1.');
                      return;
                    }
                    setError('');
                    setStep(2);
                  }}
                  className="px-6 py-2.5 bg-[#1E2B58] hover:bg-[#2B3B6F] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Lanjut ke Langkah 2</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Peminatan & Asal Sekolah */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span>Langkah 2: Pilihan Peminatan & Asal Sekolah</span>
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Asal Sekolah (SMP / MTs) *</label>
                <input
                  type="text"
                  value={form.previous_school}
                  onChange={(e) => set('previous_school', e.target.value)}
                  placeholder="e.g. SMPN 1 Lumajang / MTsN 1 Lumajang"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Pilihan Jurusan Peminatan *</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MAJORS.map((m) => (
                    <label key={m} className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-1 cursor-pointer transition-all ${
                      form.major_choice === m
                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}>
                      <input
                        type="radio"
                        name="major"
                        value={m}
                        checked={form.major_choice === m}
                        onChange={() => set('major_choice', m)}
                        className="hidden"
                      />
                      <span className="font-extrabold text-xs">{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nomor HP / WhatsApp Calon Siswa *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="e.g. 08123456789"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Calon Siswa *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder="e.g. siswa@gmail.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  ← Kembali
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!form.previous_school || !form.major_choice || !form.phone || !form.email) {
                      setError('Mohon lengkapi semua field pada Langkah 2.');
                      return;
                    }
                    setError('');
                    setStep(3);
                  }}
                  className="px-6 py-2.5 bg-[#1E2B58] hover:bg-[#2B3B6F] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Lanjut ke Langkah 3</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Data Orang Tua */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span>Langkah 3: Data Orang Tua / Wali</span>
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Orang Tua / Wali *</label>
                <input
                  type="text"
                  value={form.parent_name}
                  onChange={(e) => set('parent_name', e.target.value)}
                  placeholder="Nama Ayah / Ibu / Wali"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">No. WhatsApp Orang Tua / Wali *</label>
                <input
                  type="tel"
                  value={form.parent_phone}
                  onChange={(e) => set('parent_phone', e.target.value)}
                  placeholder="e.g. 08129876543"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                  required
                />
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-xs text-blue-900">
                <p className="font-bold mb-1">Konfirmasi Pernyataan Pendaftaran:</p>
                <p className="text-blue-700">Dengan menekan tombol submit, saya menyatakan bahwa data yang diisikan adalah benar dan dapat dipertanggungjawabkan sesuai dokumen aslinya.</p>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  ← Kembali
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengirim Formulir...</span>
                    </>
                  ) : (
                    <span>Kirim Pendaftaran PPDB</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
