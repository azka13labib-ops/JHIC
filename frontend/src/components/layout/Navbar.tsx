import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 py-2 text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">✉️ info@jihc.sch.id</span>
            <span className="flex items-center gap-1">📞 (0341) 123456</span>
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
            <span className="font-extrabold text-2xl tracking-tight text-slate-800">JIHC</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/profil" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">Profil</Link>
            <Link href="/jurusan" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">Jurusan</Link>
            <Link href="/prestasi" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">Prestasi</Link>
            <Link href="/berita" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">Berita</Link>
            <Link href="/ppdb" className="text-sm font-bold px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md">
              PPDB Online
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
