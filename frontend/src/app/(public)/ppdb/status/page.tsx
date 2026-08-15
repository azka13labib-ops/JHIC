'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  Printer, 
  Copy, 
  Check, 
  ArrowLeft, 
  FileText, 
  Phone, 
  XCircle,
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

const STATUS_TEXT: Record<string, { label: string; badgeClass: string; alertClass: string; desc: string }> = {
  accepted: {
    label: 'DINYATAKAN DITERIMA',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    alertClass: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    desc: 'Selamat! Anda dinyatakan LULUS dan DITERIMA sebagai calon siswa baru SMA PGRI 1 Lumajang Tahun Ajaran 2026/2027.',
  },
  verified: {
    label: 'TERVERIFIKASI',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    alertClass: 'bg-blue-50 border-blue-200 text-blue-900',
    desc: 'Berkas dan data pendaftaran Anda telah diverifikasi oleh Panitia PPDB.',
  },
  pending: {
    label: 'MENUNGGU VERIFIKASI',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    alertClass: 'bg-amber-50 border-amber-200 text-amber-900',
    desc: 'Pendaftaran Anda telah tercatat dan sedang dalam proses peninjauan berkas oleh panitia.',
  },
  rejected: {
    label: 'TIDAK DITERIMA',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    alertClass: 'bg-rose-50 border-rose-200 text-rose-900',
    desc: 'Mohon maaf, hasil seleksi administrasi belum memenuhi kriteria penerimaan.',
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
        throw new Error('Data pendaftaran tidak ditemukan. Pastikan Nomor Pendaftaran atau NISN sudah benar.');
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

  const statusInfo = result ? (STATUS_TEXT[result.status] || STATUS_TEXT.pending) : null;
  const formattedToday = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-100/70 py-10 sm:py-16 print:bg-white print:py-0">
      <div className="container mx-auto px-4 max-w-3xl print:max-w-full print:p-0">
        
        {/* Navigation & Search (Hidden when printing) */}
        <div className="print:hidden">
          <div className="mb-6">
            <Link 
              href="/ppdb" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-800 transition mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman PPDB</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Cek Status Pendaftaran PPDB
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Ketik Nomor Pendaftaran atau 10 digit NISN calon peserta didik.
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-6">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                checkStatus();
              }}
              className="flex flex-col sm:flex-row gap-2.5"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 30))}
                  placeholder="Contoh: PPDB-2026-XXXXXX atau NISN"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 focus:border-blue-600 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="bg-[#1E2B58] hover:bg-[#2B3B6F] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Memeriksa...' : 'Cari Data'}
              </button>
            </form>

            {error && (
              <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Result Area */}
        {result && statusInfo && (
          <div className="space-y-4">
            
            {/* Status Alert Bar - Hidden when printing */}
            <div className={`print:hidden p-4 rounded-2xl border ${statusInfo.alertClass} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
              <div className="text-xs sm:text-sm">
                <span className="font-bold block sm:inline mr-2">{statusInfo.label}:</span>
                <span>{statusInfo.desc}</span>
              </div>
              <button
                type="button"
                onClick={handlePrint}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl transition cursor-pointer shrink-0"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Bukti</span>
              </button>
            </div>

            {/* ========================================================================= */}
            {/* OFFICIAL LETTER DOCUMENT (SURAT BUKTI PENERIMAAN)                          */}
            {/* ========================================================================= */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 text-black font-sans print:border-none print:shadow-none print:p-0 print:m-0 print:rounded-none">
              
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

              {/* JUDUL SURAT */}
              <div className="text-center my-5">
                <h3 className="font-serif font-black text-sm sm:text-base uppercase underline tracking-wider">
                  SURAT TANDA BUKTI PENERIMAAN PPDB ONLINE
                </h3>
                <p className="font-mono text-[10px] sm:text-xs text-slate-700 mt-1">
                  Nomor: 421.3 / {result.registration_number} / PPDB.SMA.PGRI1 / 2026
                </p>
              </div>

              {/* PENGANTAR */}
              <p className="text-[11px] sm:text-xs leading-relaxed text-slate-800 mb-4">
                Panitia Penerimaan Peserta Didik Baru (PPDB) SMA PGRI 1 Lumajang Tahun Ajaran 2026/2027 menerangkan bahwa calon peserta didik di bawah ini:
              </p>

              {/* TABEL IDENTITAS */}
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
                    <td className="py-2 font-semibold text-slate-600">Asal Sekolah</td>
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
                      <span className={`inline-flex items-center gap-1 px-3 py-0.5 rounded text-xs font-black uppercase tracking-wider border ${statusInfo.badgeClass}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* CATATAN DARI ADMIN JIKA ADA */}
              {result.notes && (
                <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-0.5">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-600" />
                    Catatan Panitia:
                  </span>
                  <p className="text-slate-700 pl-5">
                    {result.notes}
                  </p>
                </div>
              )}

              {/* KETENTUAN DAFTAR ULANG FISIK */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-[11px] leading-relaxed text-slate-700 mb-6">
                <p className="font-bold text-slate-900 mb-1 uppercase">Ketentuan Daftar Ulang Fisik:</p>
                <ol className="list-decimal pl-4 space-y-0.5 text-slate-800">
                  <li>Membawa dan menyerahkan lembar cetak Surat Tanda Bukti Penerimaan ini ke Sekretariat PPDB.</li>
                  <li>Menyerahkan fotokopi Ijazah / Surat Keterangan Lulus (SKL) SMP legalisir, Kartu Keluarga, dan Akta Kelahiran (masing-masing 2 lembar).</li>
                  <li>Menyerahkan pas foto terbaru ukuran 3x4 berwarna latar belakang merah (4 lembar).</li>
                </ol>
              </div>

              {/* TANDA TANGAN & PENGESAHAN */}
              <div className="flex justify-between items-end text-xs pt-4">
                {/* Validasi QR / Hash */}
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 border border-slate-300 p-2 rounded-xl bg-slate-50">
                    <QrCode className="w-8 h-8 text-slate-800 shrink-0" />
                    <div className="text-[9px] font-mono leading-tight">
                      <div className="font-bold text-slate-800">VERIFIKASI SISTEM</div>
                      <div className="text-[8px] text-slate-500 truncate max-w-[120px]">{result.registration_number}</div>
                    </div>
                  </div>
                </div>

                {/* Pengesahan Panitia */}
                <div className="text-center w-52 space-y-1">
                  <p className="text-slate-700 text-[11px]">Lumajang, {formattedToday}</p>
                  <p className="font-bold text-slate-900 text-xs">Panitia PPDB 2026/2027,</p>
                  
                  <div className="h-12 flex items-center justify-center">
                    <div className="border border-blue-900/40 rounded-full px-3 py-0.5 rotate-[-5deg] bg-blue-50/50">
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

            {/* Bottom Actions Bar - Hidden when printing */}
            <div className="print:hidden flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
              <span className="text-xs text-slate-500">
                Butuh konfirmasi jadwal atau informasi lanjutan?
              </span>
              
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Panitia%20PPDB%20SMA%20PGRI%201%20Lumajang,%20saya%20ingin%20konfirmasi%20daftar%20ulang%20penerimaan%20siswa%20baru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-xl font-bold transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Panitia</span>
                </a>
                
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Bukti</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Footer info */}
        <div className="text-center text-slate-400 text-xs mt-10 print:hidden">
          <span>Belum mendaftar PPDB Online? </span>
          <Link href="/ppdb/daftar" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
            Isi Formulir Pendaftaran Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
