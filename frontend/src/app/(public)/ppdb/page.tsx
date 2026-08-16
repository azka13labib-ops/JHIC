'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Sparkles, 
  FileCheck, 
  Calendar, 
  Clock, 
  Megaphone, 
  FileText, 
  Trophy, 
  Handshake,
  AlertTriangle,
  MessageCircle
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

// Countdown timer component
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
    <div className="flex gap-3 sm:gap-4 justify-center">
      {[
        { val: timeLeft.days, label: 'Hari' },
        { val: timeLeft.hours, label: 'Jam' },
        { val: timeLeft.minutes, label: 'Menit' },
        { val: timeLeft.seconds, label: 'Detik' },
      ].map(({ val, label }) => (
        <div key={label} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3.5 sm:px-5 py-3 text-center min-w-16 sm:min-w-20 shadow-lg">
          <div className="text-2xl sm:text-3xl font-black text-white">{String(val).padStart(2, '0')}</div>
          <div className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider mt-0.5">{label}</div>
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
    'Ijazah / Surat Keterangan Lulus SMP/MTs',
    'Kartu Keluarga (KK)',
    'Akta Kelahiran',
    'Pas Foto 3x4 background merah (2 lembar)',
    'NISN (Nomor Induk Siswa Nasional)',
  ],
  tracks: ['Jalur Reguler', 'Jalur Prestasi', 'Jalur Afirmasi'],
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
    { num: 1, title: 'Buat Akun & Login', desc: 'Daftar dengan email & data diri calon peserta didik baru.' },
    { num: 2, title: 'Isi Formulir Pendaftaran', desc: 'Lengkapi biodata diri, data asal sekolah, dan kontak siswa.' },
    { num: 3, title: 'Upload Berkas Persyaratan', desc: 'Unggah berkas KK, Akta, dan Ijazah secara digital.' },
    { num: 4, title: 'Verifikasi & Pengumuman', desc: 'Pantau status verifikasi dan hasil seleksi secara real-time.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b border-slate-200 py-16 sm:py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          
          {/* Open/Close Dynamic Badge */}
          {isOpen ? (
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 text-emerald-700 text-xs sm:text-sm font-extrabold mb-6 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>PPDB {info.academic_year || '2026/2027'} DIBUKA!</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-full px-4 py-2 text-rose-700 text-xs sm:text-sm font-extrabold mb-6">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>PENDAFTARAN PPDB PERIODE INI DITUTUP</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight leading-tight text-slate-900">
            Penerimaan Peserta Didik Baru
          </h1>
          <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
            {isOpen 
              ? 'Wujudkan mimpimu meraih prestasi dan sertifikasi industri global bersama SMA PGRI 1 Lumajang.'
              : (info.closed_message || 'Masa pendaftaran calon siswa baru saat ini telah berakhir. Pantau pengumuman kelulusan di portal status.')}
          </p>

          {/* Countdown timer when open */}
          {isOpen && info.registration_end && (
            <div className="mb-10">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">Masa Pendaftaran Berakhir Dalam:</p>
              <CountdownTimer targetDate={info.registration_end} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
            {isOpen ? (
              <Link
                href="/ppdb/daftar"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black rounded-2xl shadow-xl shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>Daftar Sekarang Online</span>
              </Link>
            ) : (
              <a
                href="https://wa.me/6281234567890?text=Halo%20Panitia%20PPDB%20SMA%20PGRI%201%20Lumajang,%20saya%20ingin%20bertanya%20mengenai%20pendaftaran"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-600/25 transition-all inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Hubungi Panitia PPDB</span>
              </a>
            )}

            <Link
              href="/ppdb/status"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold rounded-2xl shadow-xs transition-all duration-200 inline-flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <FileCheck className="w-5 h-5 text-blue-600" />
              <span>Cek Status Pendaftaran</span>
            </Link>
          </div>

        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        
        {/* Closed Announcement Notice */}
        {!isOpen && (
          <div className="mb-14 p-6 sm:p-8 bg-amber-50 border border-amber-200 rounded-3xl text-amber-900 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
              <Megaphone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-extrabold text-base text-amber-950">Informasi Penutupan Pendaftaran</h3>
              <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                {info.closed_message || 'Pendaftaran PPDB periode ini telah resmi ditutup. Peserta yang telah mendaftar dapat memeriksa hasil seleksi berkas melalui menu Cek Status Pendaftaran.'}
              </p>
            </div>
          </div>
        )}

        {/* Jadwal PPDB */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-900 mb-8">Jadwal & Agenda PPDB</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Calendar, iconColor: 'text-blue-600', iconBg: 'bg-blue-50', label: 'Pembukaan Pendaftaran', date: info.registration_start },
              { icon: Clock, iconColor: 'text-amber-600', iconBg: 'bg-amber-50', label: 'Batas Penutupan', date: info.registration_end },
              { icon: Megaphone, iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50', label: 'Pengumuman Hasil Seleksi', date: info.announcement_date },
            ].map(({ icon: IconComponent, iconColor, iconBg, label, date }) => (
              <div key={label} className="bg-slate-50/80 rounded-3xl p-6 text-center border border-slate-200/70 shadow-xs hover:border-slate-300 transition-all">
                <div className={`w-12 h-12 mx-auto rounded-2xl ${iconBg} flex items-center justify-center mb-3`}>
                  <IconComponent className={`w-6 h-6 ${iconColor}`} />
                </div>
                <div className="text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wider">{label}</div>
                <div className="text-base sm:text-lg font-bold text-slate-900">
                  {date ? new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jalur Penerimaan */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-900 mb-8">Jalur Pendaftaran</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {(info.tracks ?? []).map((track, i) => {
              const icons = [FileText, Trophy, Handshake];
              const styles = [
                { bg: 'bg-blue-50/80 border-blue-200/80 text-blue-700', iconBg: 'bg-blue-500 text-white' },
                { bg: 'bg-amber-50/80 border-amber-200/80 text-amber-700', iconBg: 'bg-amber-500 text-white' },
                { bg: 'bg-emerald-50/80 border-emerald-200/80 text-emerald-700', iconBg: 'bg-emerald-500 text-white' },
              ];
              const st = styles[i % 3];
              const IconComp = icons[i % 3];
              return (
                <div key={i} className={`${st.bg} rounded-3xl p-6 border text-center shadow-xs`}>
                  <div className={`w-12 h-12 mx-auto rounded-2xl ${st.iconBg} flex items-center justify-center mb-3 shadow-md`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{track}</h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Persyaratan */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-900 mb-8">Dokumen Persyaratan</h2>
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs max-w-2xl mx-auto">
            <ul className="space-y-3.5">
              {(info.requirements ?? []).map((req, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-black shrink-0">✓</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alur Pendaftaran */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-900 mb-8">Alur Pendaftaran</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="bg-slate-50/80 rounded-3xl p-6 border border-slate-200/70 text-center relative shadow-xs">
                <div className="w-12 h-12 bg-linear-to-br from-[#1E2B58] to-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-lg mx-auto mb-3 shadow-md">
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        {isOpen && (
          <div className="text-center pt-4">
            <Link
              href="/ppdb/daftar"
              className="inline-flex items-center gap-2 bg-[#1E2B58] hover:bg-[#2B3B6F] text-white px-10 py-4 rounded-2xl font-black text-base transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <span>Mulai Pendaftaran Siswa Baru Sekarang →</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
