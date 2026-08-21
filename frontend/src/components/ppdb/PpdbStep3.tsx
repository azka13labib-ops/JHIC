import { GraduationCap, Loader2 } from 'lucide-react';
import { FormData } from './types';

interface PpdbStep3Props {
  form: FormData;
  set: (key: keyof FormData, val: string) => void;
  onSubmit: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
  setError: (err: string) => void;
}

export function PpdbStep3({ form, set, onSubmit, onPrev, isSubmitting, setError }: PpdbStep3Props) {
  const handleSubmit = () => {
    if (!form.parent_name || !form.parent_phone) {
      setError('Mohon lengkapi data orang tua / wali.');
      return;
    }
    if (form.parent_phone.length < 10) {
      setError('Nomor WhatsApp orang tua/wali minimal 10 digit angka.');
      return;
    }
    setError('');
    onSubmit();
  };

  return (
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
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={15}
          value={form.parent_phone}
          onChange={(e) => set('parent_phone', e.target.value.replace(/\D/g, '').slice(0, 15))}
          onKeyDown={(e) => {
            if (['e', 'E', '+', '-', '.', ',', ' '].includes(e.key)) e.preventDefault();
          }}
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
          onClick={onPrev}
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
  );
}
