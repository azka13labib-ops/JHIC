'use client';

import Link from 'next/link';
import { 
  ChevronDown, 
  Laptop, 
  FileText, 
  BarChart3, 
  GraduationCap, 
  Landmark, 
  Building2,
  Target, 
  Mic, 
  Users,
  Newspaper,
  CalendarDays,
  BookOpen,
  MessageSquareQuote,
  Image as ImageIcon,
  Palette,
  PenTool,
  BookUser,
  Link as LinkIcon,
  Phone
} from 'lucide-react';

export function NavDesktopMenu() {
  return (
    <div className="hidden lg:flex items-center gap-1 xl:gap-2">
      <Link 
        href="/" 
        className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 rounded-xl transition-colors"
      >
        HOME
      </Link>
      
      {/* Profil Dropdown */}
      <div className="relative group py-4">
        <button className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 rounded-xl transition-colors flex items-center gap-1 cursor-pointer">
          PROFIL
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-60" />
        </button>
        
        <div className="absolute top-16 left-0 w-80 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Tentang Sekolah
          </div>
          <Link 
            href="/profil/sejarah" 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover/item:text-blue-600">
                Sejarah Sekolah
              </div>
              <div className="text-[11px] text-slate-500">
                Perjalanan sejak 1985 hingga era digital
              </div>
            </div>
          </Link>

          <Link 
            href="/profil/visi-misi" 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover/item:text-amber-600">
                Visi & Misi
              </div>
              <div className="text-[11px] text-slate-500">
                Fondasi karakter unggul dan religius
              </div>
            </div>
          </Link>

          <Link 
            href="/profil/fasilitas" 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover/item:text-indigo-600">
                Fasilitas Sekolah
              </div>
              <div className="text-[11px] text-slate-500">
                Lab komputer, sains, studio & olahraga
              </div>
            </div>
          </Link>

          <Link 
            href="/profil/sambutan" 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover/item:text-emerald-600">
                Sambutan Kepala Sekolah
              </div>
              <div className="text-[11px] text-slate-500">
                Pesan kepemimpinan & masa depan
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Akademik Dropdown */}
      <div className="relative group py-4">
        <button className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 rounded-xl transition-colors flex items-center gap-1 cursor-pointer">
          AKADEMIK
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-60" />
        </button>
        
        <div className="absolute top-16 left-0 w-72 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Program Belajar
          </div>
          <Link 
            href="/jurusan" 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover/item:text-blue-600">
                Peminatan & Jurusan
              </div>
              <div className="text-[11px] text-slate-500">
                MIPA, IPS, & Bahasa Budaya
              </div>
            </div>
          </Link>

          <Link 
            href="/guru" 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover/item:text-purple-600">
                Direktori Guru & Staf
              </div>
              <div className="text-[11px] text-slate-500">
                Tenaga pendidik profesional
              </div>
            </div>
          </Link>
        </div>
      </div>

      <Link 
        href="/ekstrakurikuler" 
        className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 rounded-xl transition-colors"
      >
        EKSTRAKURIKULER
      </Link>

      <Link 
        href="/prestasi" 
        className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 rounded-xl transition-colors"
      >
        PRESTASI
      </Link>

      <Link 
        href="/alumni" 
        className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 rounded-xl transition-colors"
      >
        ALUMNI
      </Link>
      
      {/* Portal Layanan Dropdown */}
      <div className="relative group py-4">
        <button className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 rounded-xl transition-colors flex items-center gap-1 cursor-pointer">
          PORTAL
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-60" />
        </button>
        
        <div className="absolute top-16 left-0 w-72 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Layanan Digital
          </div>
          <a 
            href="#" 
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <Laptop className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover/item:text-blue-600">
              E-Learning Siswa
            </span>
          </a>
          <a 
            href="#" 
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover/item:text-amber-600">
              Ujian CBT Online
            </span>
          </a>
          <a 
            href="#" 
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <BarChart3 className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover/item:text-emerald-600">
              E-Rapor Digital
            </span>
          </a>
        </div>
      </div>

      {/* Informasi Dropdown */}
      <div className="relative group py-4">
        <button className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 rounded-xl transition-colors flex items-center gap-1 cursor-pointer">
          INFORMASI
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-60" />
        </button>
        
        <div className="absolute top-16 left-0 w-64 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Publikasi
          </div>
          <Link href="/berita" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <Newspaper className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover/item:text-blue-600">Berita Sekolah</span>
          </Link>
          <Link href="/agenda" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <CalendarDays className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover/item:text-amber-600">Agenda & Event</span>
          </Link>
          <Link href="/artikel" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover/item:text-emerald-600">Artikel & Edukasi</span>
          </Link>
          <Link href="/opini" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item">
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
              <MessageSquareQuote className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover/item:text-purple-600">Opini & Gagasan</span>
          </Link>
        </div>
      </div>

      {/* Karya Dropdown */}
      <div className="relative group py-4">
        <button className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 rounded-xl transition-colors flex items-center gap-1 cursor-pointer">
          KARYA
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-60" />
        </button>
        
        <div className="absolute top-16 left-0 w-64 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Kumpulan Karya
          </div>
          <Link href="/galeri" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item">
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
              <ImageIcon className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover/item:text-rose-600">Galeri Dokumentasi</span>
          </Link>
          <Link href="/karya-siswa" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <Palette className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover/item:text-indigo-600">Karya Kreatif Siswa</span>
          </Link>
          <Link href="/blog-siswa" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item">
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
              <PenTool className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover/item:text-teal-600">Blog Siswa</span>
          </Link>
        </div>
      </div>

      {/* Kontak Dropdown */}
      <div className="relative group py-4">
        <button className="px-3 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 rounded-xl transition-colors flex items-center gap-1 cursor-pointer">
          KONTAK
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-60" />
        </button>
        
        <div className="absolute top-16 right-0 w-64 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Hubungi Kami
          </div>
          <Link href="/buku-tamu" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <BookUser className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover/item:text-blue-600">Buku Tamu Publik</span>
          </Link>
          <Link href="/link-penting" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <LinkIcon className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover/item:text-emerald-600">Tautan Cepat</span>
          </Link>
          <Link href="/kontak" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover/item:text-amber-600">Kontak & Alamat</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
