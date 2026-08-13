'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PpdbInfo {
  registration_start?: string;
  registration_end?: string;
  announcement_date?: string;
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
    <div className="flex gap-4 justify-center">
      {[
        { val: timeLeft.days, label: 'Hari' },
        { val: timeLeft.hours, label: 'Jam' },
        { val: timeLeft.minutes, label: 'Menit' },
        { val: timeLeft.seconds, label: 'Detik' },
      ].map(({ val, label }) => (
        <div key={label} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-3 text-center min-w-[70px]">
          <div className="text-3xl font-extrabold">{String(val).padStart(2, '0')}</div>
          <div className="text-xs text-blue-200 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}

const DEFAULT_INFO: PpdbInfo = {
  registration_start: '2026-07-01',
  registration_end: '2026-08-31',
  announcement_date: '2026-09-10',
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
  const info = DEFAULT_INFO;

  const steps = [
    { num: 1, title: 'Buat Akun', desc: 'Daftar dengan email aktif untuk mendapatkan akun pendaftar.' },
    { num: 2, title: 'Isi Formulir', desc: 'Lengkapi data diri dan pilihan jurusan peminatan.' },
    { num: 3, title: 'Upload Dokumen', desc: 'Unggah dokumen yang dipersyaratkan dalam format PDF/JPG.' },
    { num: 4, title: 'Pantau Status', desc: 'Cek status verifikasi secara real-time di halaman status.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero dengan countdown */}
      <section className="relative bg-gradient-to-br from-[#1E2B58] to-[#2B3B6F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 rounded-full px-4 py-2 text-amber-300 text-sm font-semibold mb-6">
            🎓 PPDB 2026 / 2027 Dibuka!
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Penerimaan Peserta Didik Baru
          </h1>
          <p className="text-blue-200 max-w-xl mx-auto mb-8 text-lg">
            Daftar sekarang dan jadilah bagian dari keluarga besar SMA PGRI 1 Lumajang
          </p>

          {/* Countdown */}
          {info.registration_end && (
            <div className="mb-8">
              <p className="text-blue-200 text-sm mb-3">Pendaftaran ditutup dalam:</p>
              <CountdownTimer targetDate={info.registration_end} />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ppdb/daftar"
              className="px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Daftar Sekarang ✨
            </Link>
            <Link
              href="/ppdb/status"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-xl transition-all duration-300 backdrop-blur"
            >
              Cek Status Pendaftaran
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Jadwal PPDB */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Jadwal PPDB</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '📅', label: 'Pembukaan Pendaftaran', date: info.registration_start },
              { icon: '⏰', label: 'Penutupan Pendaftaran', date: info.registration_end },
              { icon: '📢', label: 'Pengumuman Hasil', date: info.announcement_date },
            ].map(({ icon, label, date }) => (
              <div key={label} className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
                <div className="text-4xl mb-3">{icon}</div>
                <div className="text-sm text-slate-500 mb-1">{label}</div>
                <div className="text-xl font-bold text-slate-900">
                  {date ? new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jalur Penerimaan */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Jalur Penerimaan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {(info.tracks ?? []).map((track, i) => {
              const icons = ['📝', '🏆', '🤝'];
              const colors = ['bg-blue-50 border-blue-100', 'bg-amber-50 border-amber-100', 'bg-emerald-50 border-emerald-100'];
              return (
                <div key={i} className={`${colors[i % 3]} rounded-2xl p-6 border text-center`}>
                  <div className="text-4xl mb-3">{icons[i % 3]}</div>
                  <h3 className="text-lg font-bold text-slate-900">{track}</h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Persyaratan */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Persyaratan Dokumen</h2>
          <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
            <ul className="space-y-4">
              {(info.requirements ?? []).map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">✓</span>
                  <span className="text-slate-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alur Pendaftaran */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Alur Pendaftaran</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="relative text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-[#2B3B6F] to-blue-500 rounded-full flex items-center justify-center text-white font-extrabold text-xl mx-auto mb-4 shadow-lg">
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/ppdb/daftar"
            className="inline-flex items-center gap-2 bg-[#2B3B6F] text-white px-10 py-4 rounded-xl font-extrabold text-lg hover:bg-[#1E2B58] transition-colors shadow-xl"
          >
            Mulai Pendaftaran Sekarang →
          </Link>
        </div>
      </div>
    </div>
  );
}
