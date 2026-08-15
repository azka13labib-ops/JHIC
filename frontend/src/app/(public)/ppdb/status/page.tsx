'use client';

import { useState } from 'react';
import Image from 'next/image';
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
  GraduationCap,
  Eye,
  X,
  Award,
  QrCode
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
  const [showPreviewModal, setShowPreviewModal] = useState(false);

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
  const formattedToday = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. ON-SCREEN WEB INTERFACE (Hidden when printing via print:hidden)       */}
      {/* ========================================================================= */}
      <div className="min-h-screen bg-slate-50/60 py-12 sm:py-20 print:hidden">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header Navigation */}
          <div className="text-center mb-8">
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
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 sm:p-7 mb-8">
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
                {/* Background ambient light */}
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
                <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white border border-slate-200 p-0.5 shadow-2xs">
                      <Image 
                        src="/logo-sekolah.jpg" 
                        alt="Logo SMA PGRI 1 Lumajang" 
                        fill 
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                        SMA PGRI 1 LUMAJANG
                      </h3>
                      <p className="text-[10px] text-slate-400 font-medium">
                        Surat Tanda Bukti Penerimaan Calon Peserta Didik Baru
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPreviewModal(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-2 rounded-xl transition cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Surat Resmi</span>
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl shadow-xs transition cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Cetak Bukti</span>
                    </button>
                  </div>
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
                          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 transition"
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
                      <span className="font-bold text-amber-900 flex items-center gap-1.5">
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
                        <h4 className="font-bold text-slate-900 mb-1">Cetak Bukti Resmi</h4>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          Cetak surat tanda bukti penerimaan ini sebagai syarat berkas daftar ulang fisik.
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
                          Hadir ke Sekretariat PPDB SMA PGRI 1 Lumajang membawa fotokopi KK, Akta Kelahiran, dan SKL/Ijazah.
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
                      Butuh bantuan konfirmasi jadwal daftar ulang?
                    </span>
                    <a
                      href="https://wa.me/6281234567890?text=Halo%20Panitia%20PPDB%20SMA%20PGRI%201%20Lumajang,%20saya%20ingin%20konfirmasi%20daftar%20ulang%20penerimaan%20siswa%20baru"
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
          <div className="text-center text-slate-400 text-xs mt-10">
            <span>Belum mendaftar PPDB Online? </span>
            <Link href="/ppdb/daftar" className="text-blue-600 hover:text-blue-700 font-bold hover:underline">
              Isi Formulir Pendaftaran Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MODAL PREVIEW SURAT RESMI (Interactive Screen Preview)                 */}
      {/* ========================================================================= */}
      {showPreviewModal && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs print:hidden animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Pratinjau Surat Tanda Bukti Penerimaan
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Format cetak resmi A4 Panitia PPDB SMA PGRI 1 Lumajang
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-slate-200 rounded-xl text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Scrollable Document Preview */}
            <div className="p-6 sm:p-8 overflow-y-auto bg-slate-100/60 flex justify-center">
              <div className="bg-white shadow-md border border-slate-200 rounded-lg p-6 sm:p-8 w-full max-w-xl text-black">
                {/* Kop Surat Modal */}
                <div className="flex items-center gap-4 pb-3 border-b-2 border-black">
                  <div className="relative w-16 h-16 shrink-0">
                    <Image 
                      src="/logo-sekolah.jpg" 
                      alt="Logo Sekolah" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center flex-1">
                    <h5 className="text-[9px] font-serif font-bold uppercase tracking-tight text-slate-700">
                      YPLP DASMEN PGRI KABUPATEN LUMAJANG
                    </h5>
                    <h4 className="text-base sm:text-lg font-serif font-black uppercase text-black tracking-wide">
                      SMA PGRI 1 LUMAJANG
                    </h4>
                    <p className="text-[9px] font-sans font-semibold text-slate-600">
                      TERAKREDITASI "A" • NPSN: 20521456
                    </p>
                    <p className="text-[8px] font-sans text-slate-500 mt-0.5">
                      Jl. Contoh Alamat No. 123, Lumajang 67316 • Telp: (0334) 881234 • Email: info@smapgri1lmj.sch.id
                    </p>
                  </div>
                </div>

                {/* Judul Dokumen */}
                <div className="text-center my-4">
                  <h3 className="font-serif font-black text-sm uppercase underline tracking-wider">
                    SURAT TANDA BUKTI PENERIMAAN PPDB ONLINE
                  </h3>
                  <p className="font-mono text-[10px] text-slate-600 mt-0.5">
                    Nomor: 421.3 / {result.registration_number} / PPDB.SMA.PGRI1 / 2026
                  </p>
                </div>

                {/* Pernyataan */}
                <p className="text-[11px] leading-relaxed text-slate-800 mb-3">
                  Panitia Penerimaan Peserta Didik Baru (PPDB) SMA PGRI 1 Lumajang Tahun Ajaran 2026/2027 menerangkan bahwa calon peserta didik di bawah ini:
                </p>

                {/* Tabel Identitas */}
                <table className="w-full text-[11px] border-collapse mb-4">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-1.5 font-semibold text-slate-600 w-40">Nomor Registrasi</td>
                      <td className="py-1.5 font-mono font-bold text-slate-900">: {result.registration_number}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-1.5 font-semibold text-slate-600">Nama Lengkap Siswa</td>
                      <td className="py-1.5 font-bold uppercase text-slate-900">: {result.full_name}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-1.5 font-semibold text-slate-600">NISN</td>
                      <td className="py-1.5 font-mono text-slate-900">: {result.nisn || '-'}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-1.5 font-semibold text-slate-600">Asal Sekolah</td>
                      <td className="py-1.5 text-slate-900">: {result.previous_school || '-'}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-1.5 font-semibold text-slate-600">Jenjang / Kurikulum</td>
                      <td className="py-1.5 font-semibold text-slate-900">: {result.major_choice || 'Kelas X (Fase E - Umum)'}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-1.5 font-semibold text-slate-600">Waktu Mendaftar</td>
                      <td className="py-1.5 text-slate-900">: {new Date(result.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-slate-600">Status Kelulusan</td>
                      <td className="py-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                          result.status === 'accepted' 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : result.status === 'verified' 
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {result.status === 'accepted' ? 'DINYATAKAN DITERIMA' : (currentConfig?.label || 'DITERIMA')}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Ketentuan Daftar Ulang */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-[10px] leading-relaxed text-slate-700 mb-5">
                  <p className="font-bold text-slate-900 mb-1">Ketentuan Daftar Ulang Fisik:</p>
                  <ol className="list-decimal pl-4 space-y-0.5">
                    <li>Membawa cetak Surat Tanda Bukti Penerimaan ini ke Sekretariat PPDB SMA PGRI 1 Lumajang.</li>
                    <li>Menyerahkan fotokopi Ijazah / SKL SMP legalisir, Kartu Keluarga, dan Akta Kelahiran (masing-masing 2 lembar).</li>
                    <li>Menyerahkan pas foto 3x4 berwarna latar belakang merah (4 lembar).</li>
                  </ol>
                </div>

                {/* Tanda Tangan & Cap */}
                <div className="flex justify-between items-end text-[10px] pt-2">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-[9px] font-mono text-slate-500 border border-slate-200 p-1.5 rounded bg-slate-50">
                      <QrCode className="w-7 h-7 text-slate-700" />
                      <div>
                        <div className="font-bold text-slate-700">VERIFIKASI RESMI</div>
                        <div>ID: {result.registration_number}</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center w-48 space-y-1">
                    <p className="text-slate-600">Lumajang, {formattedToday}</p>
                    <p className="font-bold text-slate-900">Panitia PPDB 2026/2027,</p>
                    <div className="h-12 flex items-center justify-center">
                      <span className="text-[9px] font-serif uppercase tracking-widest text-blue-900 border border-blue-900/40 px-2 py-0.5 rounded-full rotate-[-6deg] opacity-80">
                        SMA PGRI 1 LUMAJANG
                      </span>
                    </div>
                    <p className="font-bold underline text-slate-900">PANITIA PPDB RESMI</p>
                    <p className="text-[9px] text-slate-500">NIP / NUPTK Panitia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-end gap-3 bg-white">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPreviewModal(false);
                  setTimeout(() => window.print(), 200);
                }}
                className="px-6 py-2.5 bg-[#1E2B58] hover:bg-[#2B3B6F] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Dokumen Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DEDICATED PRINT-ONLY OFFICIAL DOCUMENT TEMPLATE (A4 Official Letter)   */}
      {/* This renders ONLY during window.print() and is pixel-perfect on paper     */}
      {/* ========================================================================= */}
      {result && (
        <div className="hidden print:block print:w-full print:bg-white text-black p-4 font-sans">
          {/* KOP SURAT RESMI */}
          <div className="flex items-center gap-5 pb-3 border-b-2 border-black">
            <div className="relative w-20 h-20 shrink-0">
              <Image 
                src="/logo-sekolah.jpg" 
                alt="Logo SMA PGRI 1 Lumajang" 
                fill 
                className="object-contain"
                priority
              />
            </div>
            <div className="text-center flex-1">
              <h4 className="text-[12px] font-serif uppercase tracking-tight font-bold text-slate-800">
                YAYASAN PEMBINA LEMBAGA PENDIDIKAN DASAR DAN MENENGAH PERSATUAN GURU REPUBLIK INDONESIA
              </h4>
              <h5 className="text-[11px] font-serif font-bold uppercase text-slate-800">
                YPLP DASMEN PGRI KABUPATEN LUMAJANG
              </h5>
              <h2 className="text-xl font-serif font-black uppercase text-black tracking-wider my-0.5">
                SMA PGRI 1 LUMAJANG
              </h2>
              <p className="text-[11px] font-sans font-bold text-slate-700">
                STATUS TERAKREDITASI "A" • NPSN: 20521456
              </p>
              <p className="text-[10px] font-sans text-slate-600">
                Jl. Contoh Alamat No. 123, Lumajang, Jawa Timur 67316 • Telp: (0334) 881234 • Email: info@smapgri1lmj.sch.id
              </p>
            </div>
          </div>

          {/* JUDUL SURAT */}
          <div className="text-center my-6">
            <h1 className="font-serif font-black text-lg uppercase underline tracking-wider">
              SURAT TANDA BUKTI PENERIMAAN PPDB ONLINE
            </h1>
            <p className="text-xs font-semibold text-slate-800 mt-1">
              Tahun Ajaran 2026/2027
            </p>
            <p className="font-mono text-[11px] text-slate-700 mt-0.5">
              Nomor: 421.3 / {result.registration_number} / PPDB.SMA.PGRI1 / 2026
            </p>
          </div>

          {/* PERNYATAAN */}
          <p className="text-xs leading-relaxed text-slate-900 mb-4">
            Berdasarkan hasil verifikasi administrasi dan keputusan Panitia Penerimaan Peserta Didik Baru (PPDB) SMA PGRI 1 Lumajang, dengan ini menerangkan bahwa calon peserta didik:
          </p>

          {/* TABEL BIODATA LENGKAP */}
          <table className="w-full text-xs border border-black border-collapse mb-5">
            <tbody>
              <tr className="border-b border-black">
                <td className="py-2 px-3 font-bold bg-slate-100 w-48 border-r border-black">Nomor Pendaftaran Resmi</td>
                <td className="py-2 px-3 font-mono font-black text-sm">{result.registration_number}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="py-2 px-3 font-bold bg-slate-100 border-r border-black">Nama Lengkap Siswa</td>
                <td className="py-2 px-3 font-bold uppercase">{result.full_name}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="py-2 px-3 font-bold bg-slate-100 border-r border-black">NISN</td>
                <td className="py-2 px-3 font-mono font-semibold">{result.nisn || '-'}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="py-2 px-3 font-bold bg-slate-100 border-r border-black">Sekolah Asal (SMP/MTs)</td>
                <td className="py-2 px-3">{result.previous_school || '-'}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="py-2 px-3 font-bold bg-slate-100 border-r border-black">Program & Jenjang</td>
                <td className="py-2 px-3 font-semibold">{result.major_choice || 'Kelas 10 (Fase E - Kurikulum Merdeka)'}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="py-2 px-3 font-bold bg-slate-100 border-r border-black">Tanggal & Waktu Pendaftaran</td>
                <td className="py-2 px-3">{new Date(result.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold bg-slate-100 border-r border-black">Status Kelulusan</td>
                <td className="py-2.5 px-3">
                  <span className="font-black text-xs uppercase px-2 py-0.5 border border-black rounded">
                    {result.status === 'accepted' ? 'DINYATAKAN DITERIMA' : (currentConfig?.label || 'DITERIMA')}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* KETENTUAN DAFTAR ULANG */}
          <div className="border border-black p-3.5 rounded text-[11px] leading-relaxed mb-8">
            <p className="font-bold mb-1.5 uppercase text-black">Ketentuan & Prosedur Daftar Ulang:</p>
            <ol className="list-decimal pl-4 space-y-1 text-slate-900">
              <li>Membawa dan menyerahkan lembar cetak Surat Tanda Bukti Penerimaan resmi ini.</li>
              <li>Menyerahkan fotokopi Ijazah / Surat Keterangan Lulus (SKL) SMP/MTs yang dilegalisir (2 lembar).</li>
              <li>Menyerahkan fotokopi Kartu Keluarga (KK) dan Akta Kelahiran (masing-masing 2 lembar).</li>
              <li>Menyerahkan pas foto terbaru ukuran 3x4 berwarna latar belakang merah (4 lembar).</li>
              <li>Seluruh berkas dimasukkan ke dalam map snelhechter (Biru untuk Laki-laki / Merah untuk Perempuan).</li>
            </ol>
          </div>

          {/* TANDA TANGAN & PENGESAHAN */}
          <div className="flex justify-between items-end text-xs pt-4">
            {/* Validasi QR / Hash */}
            <div className="w-52 space-y-1.5">
              <div className="border border-black p-2 rounded flex items-center gap-2">
                <QrCode className="w-10 h-10 shrink-0 text-black" />
                <div className="text-[9px] font-mono leading-tight">
                  <div className="font-bold">VERIFIKASI SISTEM</div>
                  <div className="text-[8px] text-slate-700">PPDB-VERIFIED-AUTH</div>
                  <div className="text-[8px] text-slate-500 truncate">{result.registration_number}</div>
                </div>
              </div>
              <p className="text-[8px] text-slate-500 leading-tight">
                *Dokumen ini sah dan diterbitkan secara digital oleh Sistem PPDB Online SMA PGRI 1 Lumajang.
              </p>
            </div>

            {/* Pengesahan Panitia */}
            <div className="text-center w-56 space-y-1">
              <p className="text-slate-800">Lumajang, {formattedToday}</p>
              <p className="font-bold text-black">Panitia Penerimaan Siswa Baru,</p>
              
              <div className="h-16 flex items-center justify-center">
                <div className="border-2 border-dashed border-blue-900/40 rounded-full px-4 py-1 rotate-[-4deg] opacity-70">
                  <span className="text-[9px] font-bold text-blue-900 uppercase">
                    PANITIA PPDB 2026/2027
                  </span>
                </div>
              </div>

              <p className="font-bold underline text-black uppercase">PANITIA PPDB RESMI</p>
              <p className="text-[10px] text-slate-600">SMA PGRI 1 Lumajang</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
