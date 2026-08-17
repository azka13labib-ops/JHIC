'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ArrowRight, 
  Loader2, 
  AlertTriangle,
  XCircle
} from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: email.trim(),
        password: password,
      });

      if (result?.error) {
        setError('Email atau kata sandi yang Anda masukkan salah. Akses ditolak.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 600);
        setLoading(false);
      } else if (result?.ok) {
        // Gunakan window.location.href untuk navigasi penuh agar cookie sesi langsung tersinkronisasi
        window.location.href = '/x9j2k4m7/dashboard';
      } else {
        setError('Gagal memverifikasi akun. Silakan coba kembali.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 600);
        setLoading(false);
      }
    } catch {
      setError('Terjadi kendala koneksi ke server backend.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans relative overflow-hidden">
      
      {/* Main Split Container */}
      <div className={`w-full min-h-screen grid grid-cols-1 md:grid-cols-2 relative z-10 transition-all duration-300 ${
        isShaking ? 'animate-shake' : ''
      }`}>
        
        {/* Left Half: School Photo & Motto */}
        <div className="relative hidden md:flex flex-col justify-between p-8 lg:p-14 bg-slate-950 text-white min-h-screen overflow-hidden group">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/image.png"
              alt="SMA PGRI 1 Lumajang"
              fill
              className="object-cover object-center brightness-90 contrast-105 transform group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/65 to-slate-900/40" />
          </div>

          {/* School Crest */}
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/95 p-1.5 flex items-center justify-center shadow-lg border border-white/40 shrink-0">
              <Image
                src="/logo-sekolah.jpg"
                alt="Logo SMA PGRI 1"
                width={46}
                height={46}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-bold text-xl text-white tracking-tight leading-tight">
                  SMA PGRI 1
                </h2>
              </div>
              <span className="text-xs font-bold tracking-[0.2em] text-slate-300 uppercase">
                Lumajang
              </span>
            </div>
          </div>

          {/* Motto */}
          <div className="relative z-10 space-y-3 pb-8">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-300 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
              <span>Sistem Manajemen Resmi</span>
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-200 leading-relaxed max-w-sm">
              “Mewujudkan generasi unggul yang religius, cerdas, berkarakter, dan siap bersaing di era digital.”
            </p>
          </div>
        </div>

        {/* Right Half: Form Container */}
        <div className="flex items-center justify-center p-6 sm:p-12 lg:p-16 min-h-screen relative">
          {/* Form Content Wrapper */}
          <div className="w-full max-w-md flex flex-col justify-between min-h-[500px]">
            
            {/* Mobile Top Crest */}
            <div className="flex items-center gap-3 md:hidden mb-8">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-1.5 flex items-center justify-center shadow-sm">
                <Image
                  src="/logo-sekolah.jpg"
                  alt="Logo SMA PGRI 1"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900">SMA PGRI 1 Lumajang</h2>
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Portal Admin</span>
              </div>
            </div>

            <div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Portal Admin
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Masukkan kredensial Anda untuk masuk ke dashboard.
              </p>
            </div>

            {/* Error Notification Alert Banner */}
            {error && (
              <div className="mt-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-2">
                <div className="p-1 rounded-lg bg-rose-100 text-rose-600 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="font-bold text-rose-900">Akses Masuk Ditolak</div>
                  <div className="leading-relaxed text-rose-700">{error}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setError('')}
                  className="text-rose-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              
              {/* Email Field */}
              <div className="space-y-1.5 group/input">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors group-focus-within/input:text-blue-600">
                  Email Administrator
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-600 transition-colors pointer-events-none">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="admin@smapgri1lmj.sch.id"
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-50 focus:bg-white border rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all duration-200 shadow-xs ${
                      error
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/15'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-blue-500/15'
                    }`}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5 group/input">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors group-focus-within/input:text-blue-600">
                  Kata Sandi
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-600 transition-colors pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="••••••••••••"
                    className={`w-full pl-10 pr-11 py-2.5 bg-slate-50 hover:bg-slate-50 focus:bg-white border rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all duration-200 shadow-xs ${
                      error
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/15'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-blue-500/15'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 hover:scale-110 active:scale-95 transition-all p-1 cursor-pointer"
                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group/btn relative w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 overflow-hidden"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Memverifikasi Akses...</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk ke Dashboard</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Return to Website */}
          <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center text-xs text-slate-500">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-blue-600 font-semibold transition-colors group/back"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover/back:-translate-x-1 transition-transform duration-200 text-slate-400 group-hover/back:text-blue-600" />
              <span>Kembali ke Website</span>
            </Link>
            <span className="text-[11px] text-slate-400 font-medium">SMA PGRI 1</span>
          </div>

        </div>
      </div>
      </div>
    </div>
  );
}
