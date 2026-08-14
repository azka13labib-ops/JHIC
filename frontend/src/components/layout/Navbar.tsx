import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronDown, 
  Mail, 
  Phone, 
  Laptop, 
  FileText, 
  BarChart3, 
  ShoppingBag, 
  Briefcase, 
  GraduationCap, 
  Landmark, 
  Target, 
  Mic 
} from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 py-2 text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400" /> info@smapgri1lmj.sch.id
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> (0334) 881234
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Youtube</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/logo-sekolah.jpg" 
              alt="Logo Sekolah" 
              width={48} 
              height={48} 
              className="h-12 w-auto rounded-md object-contain group-hover:scale-105 transition-transform" 
              priority
            />
            <span className="font-extrabold text-2xl tracking-tight text-slate-800 hidden sm:block">SMA PGRI 1</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link href="/" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">Home</Link>
            
            {/* Profil Dropdown */}
            <div className="relative group pt-4 pb-4">
              <button className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                Profil
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 duration-200" />
              </button>
              <div className="absolute top-12 left-0 mt-2 w-60 bg-white border border-slate-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden z-50">
                <Link href="/profil/sejarah" className="px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-2.5">
                  <Landmark className="w-4 h-4 text-blue-600" />
                  Sejarah
                </Link>
                <Link href="/profil/visi-misi" className="px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-2.5">
                  <Target className="w-4 h-4 text-amber-500" />
                  Visi Misi
                </Link>
                <Link href="/profil/sambutan" className="px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-2.5">
                  <Mic className="w-4 h-4 text-emerald-600" />
                  Sambutan Kepala Sekolah
                </Link>
              </div>
            </div>
            
            {/* Akademik Dropdown */}
            <div className="relative group pt-4 pb-4">
              <button className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                Akademik
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 duration-200" />
              </button>
              <div className="absolute top-12 left-0 mt-2 w-52 bg-white border border-slate-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden">
                <Link href="/peminatan" className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  Peminatan
                </Link>
                <Link href="/guru" className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-amber-500" />
                  Direktori Guru
                </Link>
              </div>
            </div>

            <Link href="/ekstrakurikuler" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">Ekstrakurikuler</Link>
            
            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Portal Layanan */}
            <div className="relative group pt-4 pb-4">
              <button className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                Portal
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 duration-200" />
              </button>
              <div className="absolute top-12 right-0 mt-2 w-48 bg-slate-900 border border-slate-800 shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden">
                <a href="#" className="px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2.5">
                  <Laptop className="w-4 h-4 text-blue-400" /> E-Learning
                </a>
                <a href="#" className="px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-amber-400" /> Ujian CBT
                </a>
                <a href="#" className="px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4 text-emerald-400" /> E-Rapor
                </a>
              </div>
            </div>

            {/* Dropdown Lainnya */}
            <div className="relative group pt-4 pb-4">
              <button className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                Lainnya
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 duration-200" />
              </button>
              <div className="absolute top-12 right-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden max-h-[70vh] overflow-y-auto">
                <Link href="/berita" className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">Berita</Link>
                <Link href="/agenda" className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">Agenda</Link>
                <Link href="/prestasi" className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">Prestasi</Link>
                <Link href="/karya" className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">Karya Siswa</Link>
                <Link href="/artikel" className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">Artikel</Link>
                <Link href="/info" className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">Info</Link>
                <Link href="/galeri" className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">Galeri</Link>
                <Link href="/alumni" className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">Alumni</Link>
                <div className="h-px bg-slate-100 my-1 mx-4"></div>
                <Link href="/buku-tamu" className="px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors">Buku Tamu</Link>
                <Link href="/opini" className="px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors">Opini</Link>
                <Link href="/blog" className="px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors">Daftar Blog</Link>
                <Link href="/link" className="px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors">Link Penting</Link>
                <Link href="/sitemap" className="px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors">Peta Situs</Link>
                <Link href="/kontak" className="px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors">Kontak Sekolah</Link>
                
                <div className="h-px bg-slate-100 my-1 mx-4"></div>
                <Link href="/produk" className="px-4 py-2.5 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Produk / BLUD
                </Link>
                <Link href="/karir" className="px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Karir / BKK
                </Link>
              </div>
            </div>

            <Link href="/ppdb" className="text-sm font-bold px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md shrink-0 ml-2">
              PPDB Online
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
