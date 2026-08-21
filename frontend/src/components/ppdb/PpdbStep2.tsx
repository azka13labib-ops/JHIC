import { GraduationCap, ChevronRight } from 'lucide-react';
import { FormData } from './types';

interface PpdbStep2Props {
  form: FormData;
  set: (key: keyof FormData, val: string) => void;
  onNext: () => void;
  onPrev: () => void;
  setError: (err: string) => void;
}

export function PpdbStep2({ form, set, onNext, onPrev, setError }: PpdbStep2Props) {
  const handleNext = () => {
    if (!form.previous_school || !form.phone || !form.email) {
      setError('Mohon lengkapi semua field pada Langkah 2.');
      return;
    }
    if (form.phone.length < 10) {
      setError('Nomor HP/WhatsApp calon siswa minimal 10 digit angka.');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-blue-600" />
        <span>Langkah 2: Asal Sekolah & Kontak Calon Siswa</span>
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

      {/* Kurikulum Merdeka Fase E Information Notice */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 text-blue-900 space-y-1">
        <div className="flex items-center gap-2 font-bold text-xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>Program Kurikulum Merdeka (Fase E - Kelas X)</span>
        </div>
        <p className="text-[11px] text-blue-700 leading-relaxed">
          Calon peserta didik baru Kelas 10 menempuh program pembelajaran umum secara terpadu. Pemilihan kelompok mata pelajaran peminatan (MIPA, IPS, atau Bahasa & Budaya) akan dilaksanakan pada kenaikan Kelas 11 (Fase F) berdasarkan minat, bakat, dan bimbingan karir.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Nomor HP / WhatsApp Calon Siswa *</label>
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={15}
            value={form.phone}
            onChange={(e) => set('phone', e.target.value.replace(/\D/g, '').slice(0, 15))}
            onKeyDown={(e) => {
              if (['e', 'E', '+', '-', '.', ',', ' '].includes(e.key)) e.preventDefault();
            }}
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
          onClick={onPrev}
          className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
        >
          ← Kembali
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2.5 bg-[#1E2B58] hover:bg-[#2B3B6F] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Lanjut ke Langkah 3</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
