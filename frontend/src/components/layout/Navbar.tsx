import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 py-2 text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">✉️ info@smapgri1lmj.sch.id</span>
            <span className="flex items-center gap-1">📞 (0334) 881234</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Youtube</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo-sekolah.jpg" 
              alt="Logo Sekolah" 
              width={48} 
              height={48} 
              className="h-12 w-auto rounded-md object-contain" 
              priority
            />
            <span className="font-extrabold text-2xl tracking-tight text-slate-800 hidden sm:block">SMA PGRI 1</span>
          </div>
          
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link href="/" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/profil" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">Profil</Link>
            
            {/* Akademik Dropdown */}
            <div className="relative group pt-4 pb-4">
              <button className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                Akademik
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute top-12 left-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden">
                <Link href="/peminatan" className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">Peminatan</Link>
                <Link href="/guru" className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">Direktori Guru</Link>
              </div>
            </div>

            <Link href="/ekstrakurikuler" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">Ekstrakurikuler</Link>
            
            {/* Spacer to push Portal and Lainnya to the right */}
            <div className="flex-1"></div>

            {/* Portal Layanan */}
            <div className="relative group pt-4 pb-4">
              <button className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                Portal
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute top-12 right-0 mt-2 w-44 bg-slate-900 border border-slate-800 shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden">
                <a href="#" className="px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2">
                  <span>💻</span> E-Learning
                </a>
                <a href="#" className="px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2">
                  <span>📝</span> Ujian CBT
                </a>
                <a href="#" className="px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2">
                  <span>📊</span> E-Rapor
                </a>
              </div>
            </div>

            {/* Dropdown Lainnya (Paling Kanan) */}
            <div className="relative group pt-4 pb-4">
              <button className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                Lainnya
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
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
                  <span>🛍️</span> Produk / BLUD
                </Link>
                <Link href="/karir" className="px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2">
                  <span>💼</span> Karir / BKK
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
