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
  PartyPopper, 
  Printer, 
  Copy, 
  Check, 
  ArrowLeft, 
  FileText, 
  Phone, 
  ShieldCheck,
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
    badgeColor: 'bg-emerald-500/20 text-emerald-100 border border-emerald-300/30',
    Icon: CheckCircle2,
    HeaderIcon: PartyPopper,
  },
  verified: {
    label: 'TERVERIFIKASI',
    badgeText: 'Berkas Pendaftaran Telah Terverifikasi',
    subText: 'Dokumen dan data calon siswa telah diverifikasi lengkap oleh Panitia PPDB.',
    gradient: 'from-blue-600 via-indigo-600 to-blue-700',
    badgeColor: 'bg-blue-500/20 text-blue-100 border border-blue-300/30',
    Icon: FileCheck,
    HeaderIcon: ShieldCheck,
  },
  pending: {
    label: 'DALAM PROSES VERIFIKASI',
    badgeText: 'Pendaftaran Sedang Ditinjau Panitia',
    subText: 'Formulir telah diterima sistem dan sedang dalam antrean verifikasi administrasi.',
    gradient: 'from-amber-600 via-amber-700 to-orange-700',
    badgeColor: 'bg-amber-500/20 text-amber-100 border border-amber-300/30',
    Icon: Clock,
    HeaderIcon: Clock,
  },
  rejected: {
    label: 'TIDAK DITERIMA',
    badgeText: 'Hasil Seleksi Administrasi Belum Memenuhi Kriteria',
    subText: 'Terima kasih telah berpartisipasi dalam proses seleksi PPDB SMA PGRI 1 Lumajang.',
    gradient: 'from-rose-600 via-slate-800 to-slate-900',
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
  const formattedToday = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-50/60 py-12 sm:py-20 print:bg-white print:py-0 print:m-0">
      <div className="container mx-auto px-4 max-w-3xl print:max-w-full print:p-0">
        
        {/* Navigation & Search - Hidden during print */}
        <div className="print:hidden">
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
        </div>

        {/* Result Area */}
        {result && currentConfig && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Banner Header Card - Hidden on print */}
            <div className={`print:hidden relative overflow-hidden rounded-3xl bg-linear-to-br ${currentConfig.gradient} text-white p-6 sm:p-8 shadow-xl border border-white/20`}>
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

            {/* Top Action Bar (ONLY Cetak Bukti button) - Hidden on print */}
            <div className="print:hidden flex items-center justify-between bg-white border border-slate-200/80 px-6 py-4 rounded-2xl shadow-xs">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Surat Bukti Resmi PPDB Online
                </h3>
                <p className="text-[11px] text-slate-400">
                  Gunakan tombol cetak untuk mencetak fisik atau simpan sebagai PDF
                </p>
              </div>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#1E2B58] hover:bg-[#2B3B6F] active:bg-[#151F3F] px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Bukti</span>
              </button>
            </div>

            {/* ========================================================================= */}
            {/* OFFICIAL DOCUMENT CERTIFICATE (Rendered on Screen & Printed on Paper)      */}
            {/* ========================================================================= */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 text-black font-sans print:border-none print:shadow-none print:p-0 print:m-0 print:rounded-none">
              
              {/* KOP SURAT RESMI */}
              <div className="flex items-center gap-4 pb-3 border-b-2 border-black">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                  <Image 
                    src="/logo-sekolah.jpg" 
                    alt="Logo SMA PGRI 1 Lumajang" 
                    fill 
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="text-center flex-1">
                  <h4 className="text-[10px] sm:text-[11px] font-serif font-bold uppercase tracking-tight text-slate-800">
                    YPLP DASMEN PGRI KABUPATEN LUMAJANG
                  </h4>
                  <h2 className="text-base sm:text-xl font-serif font-black uppercase text-black tracking-wide my-0.5">
                    SMA PGRI 1 LUMAJANG
                  </h2>
                  <p className="text-[10px] sm:text-[11px] font-sans font-semibold text-slate-700">
                    TERAKREDITASI "A" • NPSN: 20521456
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-sans text-slate-500 mt-0.5">
                    Jl. Contoh Alamat No. 123, Lumajang 67316 • Telp: (0334) 881234 • Email: info@smapgri1lmj.sch.id
                  </p>
                </div>
              </div>

              {/* JUDUL DOKUMEN */}
              <div className="text-center my-5">
                <h3 className="font-serif font-black text-sm sm:text-base uppercase underline tracking-wider">
                  SURAT TANDA BUKTI PENERIMAAN PPDB ONLINE
                </h3>
                <p className="font-mono text-[10px] sm:text-xs text-slate-700 mt-1">
                  Nomor: 421.3 / {result.registration_number} / PPDB.SMA.PGRI1 / 2026
                </p>
              </div>

              {/* PERNYATAAN */}
              <p className="text-[11px] sm:text-xs leading-relaxed text-slate-800 mb-4">
                Panitia Penerimaan Peserta Didik Baru (PPDB) SMA PGRI 1 Lumajang Tahun Ajaran 2026/2027 menerangkan bahwa calon peserta didik di bawah ini:
              </p>

              {/* TABEL IDENTITAS CALON SISWA */}
              <table className="w-full text-xs border-collapse mb-5">
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 font-semibold text-slate-600 w-44 sm:w-52">Nomor Registrasi</td>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">: {result.registration_number}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(result.registration_number)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition print:hidden"
                          title="Salin nomor pendaftaran"
                        >
                          {copied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 font-semibold text-slate-600">Nama Lengkap Siswa</td>
                    <td className="py-2 font-bold uppercase text-slate-900">: {result.full_name}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 font-semibold text-slate-600">NISN</td>
                    <td className="py-2 font-mono text-slate-900">: {result.nisn || '-'}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 font-semibold text-slate-600">Asal Sekolah (SMP / MTs)</td>
                    <td className="py-2 text-slate-900">: {result.previous_school || '-'}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 font-semibold text-slate-600">Jenjang / Kurikulum</td>
                    <td className="py-2 font-semibold text-slate-900">: {result.major_choice || 'Kelas X (Fase E - Umum)'}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 font-semibold text-slate-600">Waktu Mendaftar</td>
                    <td className="py-2 text-slate-900">: {new Date(result.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-600">Status Kelulusan</td>
                    <td className="py-2.5">
                      <span className="font-bold text-slate-900 mr-1">:</span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-black uppercase tracking-wider ${
                        result.status === 'accepted' 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' 
                          : result.status === 'verified' 
                          ? 'bg-blue-50 text-blue-800 border border-blue-300'
                          : 'bg-amber-50 text-amber-800 border border-amber-300'
                      }`}>
                        {result.status === 'accepted' ? 'DINYATAKAN DITERIMA' : (currentConfig?.label || 'DITERIMA')}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* CATATAN KHUSUS (Jika ada) */}
              {result.notes && (
                <div className="mb-4 p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs space-y-0.5">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-600" />
                    Catatan Khusus Panitia:
                  </span>
                  <p className="text-amber-800 font-medium pl-5">
                    {result.notes}
                  </p>
                </div>
              )}

              {/* KETENTUAN DAFTAR ULANG FISIK */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] leading-relaxed text-slate-700 mb-6">
                <p className="font-bold text-slate-900 mb-1.5 uppercase">Ketentuan & Prosedur Daftar Ulang Fisik:</p>
                <ol className="list-decimal pl-4 space-y-1 text-slate-800">
                  <li>Membawa dan menyerahkan lembar cetak Surat Tanda Bukti Penerimaan ini ke Sekretariat PPDB SMA PGRI 1 Lumajang.</li>
                  <li>Menyerahkan fotokopi Ijazah / Surat Keterangan Lulus (SKL) SMP/MTs yang dilegalisir (masing-masing 2 lembar).</li>
                  <li>Menyerahkan fotokopi Kartu Keluarga (KK) dan Akta Kelahiran (masing-masing 2 lembar).</li>
                  <li>Menyerahkan pas foto terbaru ukuran 3x4 berwarna latar belakang merah (4 lembar).</li>
                  <li>Seluruh berkas dimasukkan ke dalam map snelhechter (Biru untuk Laki-laki / Merah untuk Perempuan).</li>
                </ol>
              </div>

              {/* TANDA TANGAN & PENGESAHAN */}
              <div className="flex justify-between items-end text-xs pt-4">
                {/* Validasi QR / Hash */}
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 border border-slate-300 p-2 rounded-xl bg-slate-50">
                    <QrCode className="w-9 h-9 text-slate-800 shrink-0" />
                    <div className="text-[9px] font-mono leading-tight">
                      <div className="font-bold text-slate-800">VERIFIKASI SISTEM</div>
                      <div className="text-[8px] text-slate-600">PPDB-VERIFIED-AUTH</div>
                      <div className="text-[8px] text-slate-500 truncate max-w-[120px]">{result.registration_number}</div>
                    </div>
                  </div>
                  <p className="text-[8px] text-slate-400">
                    *Dokumen ini diterbitkan secara sah oleh Sistem PPDB Online.
                  </p>
                </div>

                {/* Pengesahan Panitia */}
                <div className="text-center w-52 space-y-1">
                  <p className="text-slate-700 text-[11px]">Lumajang, {formattedToday}</p>
                  <p className="font-bold text-slate-900 text-xs">Panitia PPDB 2026/2027,</p>
                  
                  <div className="h-14 flex items-center justify-center">
                    <div className="border border-blue-900/40 rounded-full px-3 py-1 rotate-[-5deg] bg-blue-50/50">
                      <span className="text-[9px] font-serif font-bold text-blue-900 uppercase tracking-widest">
                        SMA PGRI 1 LUMAJANG
                      </span>
                    </div>
                  </div>

                  <p className="font-bold underline text-slate-900 text-xs uppercase">PANITIA PPDB RESMI</p>
                  <p className="text-[10px] text-slate-500">SMA PGRI 1 Lumajang</p>
                </div>
              </div>
            </div>

            {/* Bottom Floating/Action Bar - Hidden on print */}
            <div className="print:hidden flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Perlu bantuan konfirmasi daftar ulang?</span>
              </div>
              
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Panitia%20PPDB%20SMA%20PGRI%201%20Lumajang,%20saya%20ingin%20konfirmasi%20daftar%20ulang%20penerimaan%20siswa%20baru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-xl font-bold transition shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Panitia</span>
                </a>
                
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#1E2B58] hover:bg-[#2B3B6F] active:bg-[#151F3F] px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Bukti Sekarang</span>
                </button>
              </div>
            </div>

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
