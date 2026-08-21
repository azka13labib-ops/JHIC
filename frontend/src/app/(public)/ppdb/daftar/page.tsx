'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Loader2, ArrowLeft } from 'lucide-react';
import { FormData, PpdbInfo } from '@/components/ppdb/types';
import { PpdbStep1 } from '@/components/ppdb/PpdbStep1';
import { PpdbStep2 } from '@/components/ppdb/PpdbStep2';
import { PpdbStep3 } from '@/components/ppdb/PpdbStep3';
import { PpdbClosedState } from '@/components/ppdb/PpdbClosedState';
import { PpdbSuccessState } from '@/components/ppdb/PpdbSuccessState';

type Step = 1 | 2 | 3;

const INITIAL: FormData = {
  full_name: '', nisn: '', date_of_birth: '', gender: '',
  address: '', previous_school: '', major_choice: 'Fase E (Umum)',
  phone: '', email: '', parent_name: '', parent_phone: '',
};

export default function PpdbDaftarPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ registration_number: string } | null>(null);
  const [error, setError] = useState('');
  
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

  if (ppdbInfo.is_open === false) {
    return <PpdbClosedState ppdbInfo={ppdbInfo} />;
  }

  if (submitted) {
    return <PpdbSuccessState registrationNumber={submitted.registration_number} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/ppdb" className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:underline mb-3">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Informasi PPDB</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Form Pendaftaran PPDB</h1>
          <p className="text-slate-500 text-xs mt-1">SMA PGRI 1 Lumajang — Tahun Ajaran {ppdbInfo.academic_year || '2026/2027'}</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          {([1, 2, 3] as Step[]).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${step >= s ? 'bg-[#1E2B58] text-white shadow-sm' : 'bg-slate-200 text-slate-500'}`}>
                {step > s ? '✓' : s}
              </div>
              <span className={`text-xs font-bold hidden sm:inline ${step === s ? 'text-[#1E2B58]' : 'text-slate-400'}`}>
                {s === 1 ? 'Data Diri' : s === 2 ? 'Sekolah & Kontak' : 'Data Orang Tua'}
              </span>
              {s < 3 && <span className="text-slate-300 mx-1">―</span>}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
          {step === 1 && (
            <PpdbStep1 form={form} set={set} onNext={() => setStep(2)} setError={setError} />
          )}

          {step === 2 && (
            <PpdbStep2 form={form} set={set} onNext={() => setStep(3)} onPrev={() => setStep(1)} setError={setError} />
          )}

          {step === 3 && (
            <PpdbStep3 form={form} set={set} onSubmit={handleSubmit} onPrev={() => setStep(2)} isSubmitting={isSubmitting} setError={setError} />
          )}
        </div>
      </div>
    </div>
  );
}
