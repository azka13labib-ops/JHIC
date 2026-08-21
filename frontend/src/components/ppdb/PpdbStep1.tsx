import { GraduationCap, ChevronRight } from 'lucide-react';
import { FormData } from './types';

interface PpdbStep1Props {
  form: FormData;
  set: (key: keyof FormData, val: string) => void;
  onNext: () => void;
  setError: (err: string) => void;
}

export function PpdbStep1({ form, set, onNext, setError }: PpdbStep1Props) {
  const handleNext = () => {
    if (!form.full_name || !form.nisn || !form.date_of_birth || !form.gender || !form.address) {
      setError('Mohon lengkapi semua field pada Langkah 1.');
      return;
    }
    if (form.nisn.length !== 10) {
      setError('NISN harus tepat berupa 10 digit angka murni.');
      return;
    }
    setError('');
    onNext();
  };

  return (
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
          <label className="block text-xs font-bold text-slate-700 mb-1.5">NISN (10 Digit Angka) *</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={10}
            value={form.nisn}
            onChange={(e) => set('nisn', e.target.value.replace(/\D/g, '').slice(0, 10))}
            onKeyDown={(e) => {
              if (['e', 'E', '+', '-', '.', ',', ' '].includes(e.key)) e.preventDefault();
            }}
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
          onClick={handleNext}
          className="px-6 py-2.5 bg-[#1E2B58] hover:bg-[#2B3B6F] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Lanjut ke Langkah 2</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
