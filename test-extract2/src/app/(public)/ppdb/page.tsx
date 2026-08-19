'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileCheck, 
  Calendar, 
  Clock, 
  Megaphone, 
  FileText, 
  Trophy, 
  AlertTriangle,
  MessageCircle,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface PpdbInfo {
  is_open?: boolean;
  academic_year?: string;
  registration_start?: string;
  registration_end?: string;
  announcement_date?: string;
  closed_message?: string;
  requirements?: string[];
  tracks?: string[];
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {[
        { val: timeLeft.days, label: 'Hari' },
        { val: timeLeft.hours, label: 'Jam' },
        { val: timeLeft.minutes, label: 'Menit' },
        { val: timeLeft.seconds, label: 'Detik' },
      ].map(({ val, label }) => (
        <div key={label} className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-center min-w-14 sm:min-w-16 shadow-2xs">
          <div className="text-xl sm:text-2xl font-bold text-blue-700">{String(val).padStart(2, '0')}</div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{label}</div>
        </div>
      ))}
    </div>
  );
}

const DEFAULT_INFO: PpdbInfo = {
  is_open: true,
  academic_year: '2026/2027',
  registration_start: '2026-07-01',
  registration_end: '2026-08-31',
  announcement_date: '2026-09-10',
  closed_message: 'Pendaftaran PPDB SMA PGRI 1 Lumajang saat ini sedang ditutup. Pantau pengumuman resmi berkala.',
  requirements: [
    'Ijazah / Surat Keterangan Lulus (SKL) SMP/MTs sederajat',
    'Kartu Keluarga (KK) asli atau legalisir',
    'Akta Kelahiran calon siswa',
    'Pas foto formal ukuran 3x4 berwarna latar belakang merah (2 lembar)',
    'Nomor Induk Siswa Nasional (NISN) aktif',
  ],
  tracks: ['Jalur Reguler', 'Jalur Prestasi'],
};

export default function PpdbPage() {
  const [info, setInfo] = useState<PpdbInfo>(DEFAULT_INFO);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
        const res = await fetch(`${apiUrl}/ppdb/info`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data) setInfo(json.data);
        }
      } catch (e) {
        console.error('Failed to fetch PPDB info:', e);
      }
    };
    fetchInfo();
  }, []);

  const isOpen = info.is_open !== false;

  const steps = [
    { num: '01', title: 'Registrasi Online', desc: 'Isi formulir biodata dan data asal sekolah melalui portal PPDB resmi.' },
    { num: '02', title: 'Unggah Berkas', desc: 'Upload dokumen KK, Akta Kelahiran, dan Ijazah/SKL berformat digital.' },
    { num: '03', title: 'Verifikasi & Pemetaan', desc: 'Panitia memverifikasi berkas dan menjadwalkan tes pemetaan minat bakat.' },
    { num: '04', title: 'Pengumuman Hasil', desc: 'Hasil seleksi diumumkan secara transparan melalui portal status kelulusan.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          
          {isOpen ? (
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-1 text-emerald-800 text-xs font-bold mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>PPDB Tahun Ajaran {info.academic_year || '2026/2027'} Telah Dibuka</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-md px-3 py-1 text-rose-800 text-xs font-bold mb-4">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Pendaftaran PPDB Periode Ini Telah Ditutup</span>
            </div>
          )}

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-slate-900 tracking-tight leading-tight mb-3">
            Penerimaan Peserta Didik Baru
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6">
            {isOpen 
              ? 'Selamat datang calon generasi berprestasi. Bergabunglah bersama SMA PGRI 1 Lumajang untuk mewujudkan cita-cita akademik dan karier masa depan Anda.'
              : (info.closed_message || 'Masa pendaftaran calon siswa baru saat ini telah berakhir. Pantau pengumuman kelulusan di portal status.')}
          </p>

          {isOpen && info.registration_end && (
            <div className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-md mx-auto">
              <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-2">Batas Pendaftaran Berakhir Dalam:</p>
              <CountdownTimer targetDate={info.registration_end} />
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {isOpen ? (
              <Link
                href="/ppdb/daftar"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-lg shadow-xs transition-colors inline-flex items-center gap-2"
              >
                <span>Isi Formulir Pendaftaran</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <a
                href="https://wa.me/6281234567890?text=Halo%20Panitia%20PPDB%20SMA%20PGRI%201%20Lumajang,%20saya%20ingin%20bertanya%20mengenai%20pendaftaran"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-xs transition-colors inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi Panitia PPDB</span>
              </a>
            )}

            <Link
              href="/ppdb/status"
              className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm rounded-lg shadow-2xs transition-colors inline-flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4 text-blue-600" />
              <span>Cek Status Pendaftaran</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Main PPDB Information Body */}
      <div className="container mx-auto px-4 py-12 max-w-5xl space-y-12">
        
        {/* Jadwal Pelaksanaan */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-1">Tahapan Waktu</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900">Jadwal & Agenda Penting</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Calendar, label: 'Pembukaan Pendaftaran', date: info.registration_start },
              { icon: Clock, label: 'Batas Akhir Pendaftaran', date: info.registration_end },
              { icon: Megaphone, label: 'Pengumuman Hasil Seleksi', date: info.announcement_date },
            ].map(({ icon: IconComponent, label, date }) => (
              <div key={label} className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs text-center">
                <div className="w-10 h-10 mx-auto rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1">{label}</div>
                <div className="text-sm sm:text-base font-bold text-slate-900">
                  {date ? new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2 Jalur Pendaftaran & Persyaratan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Jalur Pendaftaran (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-1">Pilihan Seleksi</span>
              <h3 className="font-serif text-xl font-normal text-slate-900">2 Jalur Penerimaan</h3>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Jalur Reguler</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Terbuka untuk seluruh lulusan SMP/MTs sederajat dengan seleksi berbasis rata-rata nilai rapor dan tes pemetaan minat bakat.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                  <Trophy className="w-4 h-4 text-blue-600" />
                  <span>Jalur Prestasi</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dikhususkan bagi calon siswa pemegang sertifikat kejuaraan akademik (OSN), olahraga (O2SN), seni budaya (FLS2N), atau Tahfidz Quran.
                </p>
              </div>
            </div>
          </div>

          {/* Persyaratan Dokumen (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-1">Dokumen Berkas</span>
              <h3 className="font-serif text-xl font-normal text-slate-900">Syarat Pendaftaran</h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              {(info.requirements ?? []).map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 p-2 rounded-md hover:bg-slate-50">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 4 Alur Pendaftaran Chronological */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-1">Alur Proses</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900">Tahapan Pendaftaran Online</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div key={step.num} className="p-4 rounded-lg bg-slate-50 border border-slate-200 relative">
                <div className="text-xs font-black text-blue-700 font-mono mb-2">
                  LANGKAH {step.num}
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">{step.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Help Banner */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Butuh panduan atau informasi lebih lanjut seputar PPDB?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Hubungi layanan informasi panitia PPDB SMA PGRI 1 Lumajang melalui WhatsApp: +62 812-3456-7890.
            </p>
          </div>
          <Link
            href="/ppdb/status"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors"
          >
            Cek Status Pendaftaran
          </Link>
        </div>

      </div>

    </div>
  );
}
