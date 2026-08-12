import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-sekolah.png" alt="Logo Sekolah" className="h-8 w-auto" />
          <span className="font-bold text-xl tracking-tight text-blue-900">JIHC</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600">Beranda</Link>
          <Link href="/profil" className="text-sm font-medium hover:text-blue-600">Profil</Link>
          <Link href="/jurusan" className="text-sm font-medium hover:text-blue-600">Jurusan</Link>
          <Link href="/prestasi" className="text-sm font-medium hover:text-blue-600">Prestasi</Link>
          <Link href="/berita" className="text-sm font-medium hover:text-blue-600">Berita</Link>
          <Link href="/ppdb" className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            PPDB Online
          </Link>
        </div>
      </div>
    </nav>
  );
}
