'use client';

import Link from 'next/link';
import { 
  ChevronDown, 
  Laptop, 
  FileText, 
  BarChart3, 
  GraduationCap, 
  Landmark, 
  Target, 
  Mic,
  Newspaper,
  Users,
  Sparkles
} from 'lucide-react';

export function NavDesktopMenu() {
  return (
    <div className="hidden lg:flex items-center gap-1 xl:gap-2">
      <Link 
        href="/" 
        className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors"
      >
        HOME
      </Link>
      
      {/* Profil Dropdown */}
      <div className="relative group py-4">
        <button className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors flex items-center gap-1">
          PROFIL
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-60" />
        </button>
        
        <div className="absolute top-16 left-0 w-80 bg-[#0d0d0d] border border-neutral-800 shadow-2xl rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            Tentang Sekolah
          </div>
          <Link 
            href="/profil/sejarah" 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-blue-400 flex items-center justify-center shrink-0 border border-neutral-800">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white group-hover/item:text-blue-400">
                Sejarah Sekolah
              </div>
              <div className="text-[11px] text-neutral-400">
                Perjalanan sejak 1985 hingga era digital
              </div>
            </div>
          </Link>

          <Link 
            href="/profil/visi-misi" 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-[#c99b38] flex items-center justify-center shrink-0 border border-neutral-800">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white group-hover/item:text-[#c99b38]">
                Visi & Misi
              </div>
              <div className="text-[11px] text-neutral-400">
                Fondasi karakter unggul dan religius
              </div>
            </div>
          </Link>

          <Link 
            href="/profil/sambutan" 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-emerald-400 flex items-center justify-center shrink-0 border border-neutral-800">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white group-hover/item:text-emerald-400">
                Sambutan Kepala Sekolah
              </div>
              <div className="text-[11px] text-neutral-400">
                Pesan kepemimpinan & masa depan
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Akademik Dropdown */}
      <div className="relative group py-4">
        <button className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors flex items-center gap-1">
          AKADEMIK
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-60" />
        </button>
        
        <div className="absolute top-16 left-0 w-72 bg-[#0d0d0d] border border-neutral-800 shadow-2xl rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            Program Belajar
          </div>
          <Link 
            href="/jurusan" 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-blue-400 flex items-center justify-center shrink-0 border border-neutral-800">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white group-hover/item:text-blue-400">
                Peminatan & Jurusan
              </div>
              <div className="text-[11px] text-neutral-400">
                MIPA, IPS, & Bahasa Budaya
              </div>
            </div>
          </Link>

          <Link 
            href="/guru" 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-purple-400 flex items-center justify-center shrink-0 border border-neutral-800">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white group-hover/item:text-purple-400">
                Direktori Guru & Staf
              </div>
              <div className="text-[11px] text-neutral-400">
                Tenaga pendidik profesional
              </div>
            </div>
          </Link>
        </div>
      </div>

      <Link 
        href="/ekstrakurikuler" 
        className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors"
      >
        EKSTRAKURIKULER
      </Link>

      <Link 
        href="/prestasi" 
        className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors"
      >
        PRESTASI
      </Link>
      
      {/* Portal Layanan Dropdown */}
      <div className="relative group py-4">
        <button className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors flex items-center gap-1">
          PORTAL
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-60" />
        </button>
        
        <div className="absolute top-16 left-0 w-72 bg-[#0d0d0d] border border-neutral-800 shadow-2xl rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            Layanan Digital
          </div>
          <a 
            href="#" 
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
          >
            <div className="w-7 h-7 rounded-lg bg-neutral-900 text-blue-400 flex items-center justify-center shrink-0 border border-neutral-800">
              <Laptop className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-neutral-200 group-hover/item:text-blue-400">
              E-Learning Siswa
            </span>
          </a>
          <a 
            href="#" 
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
          >
            <div className="w-7 h-7 rounded-lg bg-neutral-900 text-[#c99b38] flex items-center justify-center shrink-0 border border-neutral-800">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-neutral-200 group-hover/item:text-[#c99b38]">
              Ujian CBT Online
            </span>
          </a>
          <a 
            href="#" 
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group/item"
          >
            <div className="w-7 h-7 rounded-lg bg-neutral-900 text-emerald-400 flex items-center justify-center shrink-0 border border-neutral-800">
              <BarChart3 className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-neutral-200 group-hover/item:text-emerald-400">
              E-Rapor Digital
            </span>
          </a>
        </div>
      </div>

      {/* Megamenu / Dropdown Lainnya */}
      <div className="relative group py-4">
        <button className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors flex items-center gap-1">
          LAINNYA
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-60" />
        </button>
        
        <div className="absolute top-16 right-0 w-[500px] bg-[#0d0d0d] border border-neutral-800 shadow-2xl rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 grid grid-cols-2 gap-4">
          {/* Kolom 1 */}
          <div className="space-y-1">
            <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Newspaper className="w-3.5 h-3.5 text-blue-500" /> Informasi & Karya
            </div>
            <Link href="/berita" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
              Berita Sekolah
            </Link>
            <Link href="/agenda" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
              Agenda & Event
            </Link>
            <Link href="/artikel" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
              Artikel & Edukasi
            </Link>
            <Link href="/karya-siswa" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
              Karya Kreatif Siswa
            </Link>
            <Link href="/galeri" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
              Galeri Dokumentasi
            </Link>
            <Link href="/opini" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
              Opini & Gagasan
            </Link>
          </div>

          {/* Kolom 2 */}
          <div className="space-y-1">
            <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c99b38]" /> Komunitas & Layanan
            </div>
            <Link href="/blog-siswa" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
              Blog Siswa
            </Link>
            <Link href="/alumni" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
              Tracer Alumni
            </Link>
            <Link href="/buku-tamu" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
              Buku Tamu Publik
            </Link>
            <Link href="/link-penting" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
              Tautan Cepat
            </Link>
            <Link href="/kontak" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
              Kontak & Alamat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
