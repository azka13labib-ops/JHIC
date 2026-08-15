'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  XCircle, 
  Sparkles, 
  PartyPopper, 
  Printer, 
  Copy, 
  Check, 
  ArrowLeft, 
  School, 
  User, 
  Calendar, 
  FileText, 
  Phone, 
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

interface RegistrationStatus {
  registration_number: string;
  full_name: string;
  nisn?: string;
  previous_school?: string;
  major_choice?: string;
  status: 'pending' | 'verified' | 'accepted' | 'rejected';
  notes?: string;
  created_at: string;
}

const STATUS_DETAILS = {
  accepted: {
    label: 'DITERIMA',
    badgeText: 'Selamat! Anda Dinyatakan Lulus & Diterima',
    subText: 'Sebagai Calon Peserta Didik Baru SMA PGRI 1 Lumajang Tahun Ajaran 2026/2027',
    gradient: 'from-emerald-600 via-teal-600 to-emerald-700',
    borderLight: 'border-emerald-200',
    bgLight: 'bg-emerald-50/70',
    badgeColor: 'bg-emerald-500/20 text-emerald-100 border border-emerald-300/30',
    Icon: CheckCircle2,
    HeaderIcon: PartyPopper,
  },
  verified: {
    label: 'TERVERIFIKASI',
    badgeText: 'Berkas Pendaftaran Telah Terverifikasi',
    subText: 'Dokumen dan data calon siswa telah diverifikasi lengkap oleh Panitia PPDB.',
    gradient: 'from-blue-600 via-indigo-600 to-blue-700',
    borderLight: 'border-blue-200',
    bgLight: 'bg-blue-50/70',
    badgeColor: 'bg-blue-500/20 text-blue-100 border border-blue-300/30',
    Icon: FileCheck,
    HeaderIcon: ShieldCheck,
  },
  pending: {
    label: 'DALAM PROSES VERIFIKASI',
    badgeText: 'Pendaftaran Sedang Ditinjau Panitia',
    subText: 'Formulir telah diterima sistem dan sedang dalam antrean verifikasi administrasi.',
    gradient: 'from-amber-600 via-amber-700 to-orange-700',
    borderLight: 'border-amber-200',
    bgLight: 'bg-amber-50/70',
    badgeColor: 'bg-amber-500/20 text-amber-100 border border-amber-300/30',
    Icon: Clock,
    HeaderIcon: Clock,
  },
  rejected: {
    label: 'TIDAK DITERIMA',
    badgeText: 'Hasil Seleksi Administrasi Belum Memenuhi Kriteria',
    subText: 'Terima kasih telah berpartisipasi dalam proses seleksi PPDB SMA PGRI 1 Lumajang.',
    gradient: 'from-rose-600 via-slate-800 to-slate-900',
    borderLight: 'border-rose-200',
    bgLight: 'bg-rose-50/70',
    badgeColor: 'bg-rose-500/20 text-rose-100 border border-rose-300/30',
    Icon: XCircle,
    HeaderIcon: XCircle,
  },
};

export default function PpdbStatusPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<RegistrationStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const checkStatus = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}/ppdb/check-status?q=${encodeURIComponent(query.trim())}`,
        { headers: { Accept: 'application/json' } }
      );
      if (!res.ok) {
        throw new Error('Data tidak ditemukan. Pastikan Nomor Pendaftaran atau NISN yang dimasukkan sudah benar.');
      }
      const data = await res.json();
      setResult(data.data ?? data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memeriksa data.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentConfig = result ? (STATUS_DETAILS[result.status] || STATUS_DETAILS.pending) : null;

  return (
    <div className="min-h-screen bg-slate-50/60 py-12 sm:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header Navigation */}
        <div className="text-center mb-8 print:hidden">
          <Link 
            href="/ppdb" 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-700 bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shadow-2xs hover:shadow-xs transition-all mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Portal PPDB</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cek Status Pendaftaran PPDB
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md mx-auto">
            Masukkan Nomor Pendaftaran (contoh: <code className="font-mono text-xs bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800">PPDB-2026-XXXXXX</code>) atau 10 digit NISN Anda.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 sm:p-7 mb-8 print:hidden">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              checkStatus();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 30))}
                placeholder="Masukkan Nomor Pendaftaran atau NISN..."
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-[#1E2B58] hover:bg-[#2B3B6F] active:bg-[#151F3F] text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Memeriksa...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Periksa Status</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-200">
              <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Status Result Card */}
        {result && currentConfig && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Banner Header Card */}
            <div className={`relative overflow-hidden rounded-3xl bg-linear-to-br ${currentConfig.gradient} text-white p-6 sm:p-8 shadow-xl border border-white/20`}>
              {/* Background ambient glowing spheres */}
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-white/15 border border-white/20">
                    <currentConfig.HeaderIcon className="w-3.5 h-3.5 text-amber-300" />
                    <span>Hasil Seleksi PPDB 2026/2027</span>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase ${currentConfig.badgeColor}`}>
                    <currentConfig.Icon className="w-3.5 h-3.5" />
                    {currentConfig.label}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-white drop-shadow-xs">
                  {currentConfig.badgeText}
                </h2>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-xl">
                  {currentConfig.subText}
                </p>
              </div>
            </div>

            {/* Official Credential / Certificate Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-black text-xs">
                    SMA
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      SMA PGRI 1 LUMAJANG
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Surat Keterangan Hasil Penerimaan Calon Peserta Didik Baru
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs hover:bg-slate-50 transition print:hidden cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Bukti</span>
                </button>
              </div>

              {/* Data Grid */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Nomor Pendaftaran */}
                  <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block mb-1">
                      Nomor Pendaftaran Resmi
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-black text-sm text-blue-900 tracking-wide">
                        {result.registration_number}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(result.registration_number)}
                        className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 transition print:hidden"
                        title="Salin nomor pendaftaran"
                      >
                        {copied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Nama Lengkap */}
                  <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block mb-1">
                      Nama Calon Peserta Didik
                    </span>
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <User className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">{result.full_name}</span>
                    </div>
                  </div>

                  {/* NISN */}
                  {result.nisn && (
                    <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                      <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block mb-1">
                        Nomor Induk Siswa Nasional (NISN)
                      </span>
                      <span className="font-mono font-bold text-sm text-slate-800">
                        {result.nisn}
                      </span>
                    </div>
                  )}

                  {/* Asal Sekolah */}
                  {result.previous_school && (
                    <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                      <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block mb-1">
                        Sekolah Asal (SMP / MTs)
                      </span>
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                        <School className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">{result.previous_school}</span>
                      </div>
                    </div>
                  )}

                  {/* Program & Jenjang */}
                  <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block mb-1">
                      Jenjang & Kurikulum
                    </span>
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                      <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{result.major_choice || 'Kelas 10 (Fase E - Umum)'}</span>
                    </div>
                  </div>

                  {/* Tanggal Pendaftaran */}
                  <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block mb-1">
                      Waktu Registrasi Masuk
                    </span>
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>
                        {new Date(result.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Catatan Khusus dari Admin */}
                {result.notes && (
                  <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs space-y-1">
                    <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      Catatan Resmi Panitia PPDB:
                    </span>
                    <p className="text-amber-800 leading-relaxed pl-5 font-medium">
                      {result.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps for Accepted Students */}
            {result.status === 'accepted' && (
              <div className="bg-white rounded-3xl border border-emerald-200/80 p-6 sm:p-8 shadow-sm space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Petunjuk Daftar Ulang & Langkah Selanjutnya
                    </h3>
                    <p className="text-xs text-slate-500">
                      Harap diperhatikan oleh Calon Peserta Didik Baru & Orang Tua / Wali
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-2.5">
                        1
                      </div>
                      <h4 className="font-bold text-slate-900 mb-1">Cetak Bukti</h4>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Cetak atau simpan lembar bukti penerimaan ini sebagai syarat berkas verifikasi fisik.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-2.5">
                        2
                      </div>
                      <h4 className="font-bold text-slate-900 mb-1">Daftar Ulang Fisik</h4>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Hadir ke Sekretariat PPDB SMA PGRI 1 Lumajang membawa fotokopi KK, Akta Kelahiran, dan Ijazah/SKL.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-2.5">
                        3
                      </div>
                      <h4 className="font-bold text-slate-900 mb-1">Persiapan MPLS</h4>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Ikuti Masa Pengenalan Lingkungan Sekolah (MPLS) dan asesmen pemetaan potensi belajar Fase E.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">
                    Butuh bantuan konfirmasi?
                  </span>
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Panitia%20PPDB%20SMA%20PGRI%201%20Lumajang,%20saya%20ingin%20konfirmasi%20daftar%20ulang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp Panitia PPDB</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer info */}
        <div className="text-center text-slate-400 text-xs mt-10 print:hidden">
          <span>Belum mendaftar PPDB Online? </span>
          <Link href="/ppdb/daftar" className="text-blue-600 hover:text-blue-700 font-bold hover:underline">
            Isi Formulir Pendaftaran Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
