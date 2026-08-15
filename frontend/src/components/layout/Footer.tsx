import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Mail, 
  Phone, 
  BookMarked,
  ArrowUpRight
} from 'lucide-react';

export default function Footer() {
  const sponsors = [
    { name: 'JIHC', desc: 'Jagoan Indonesia Hub & Center', tag: 'Technology Partner' },
    { name: 'Jagoan Hosting', desc: 'Cloud & Infrastructure', tag: 'Web Hosting' },
    { name: 'Komdigi RI', desc: 'Kementerian Komunikasi & Digital', tag: 'Government' },
    { name: 'Garuda Spark', desc: 'Digital Innovation Hub', tag: 'Industry Partner' },
    { name: 'Ngalup.co', desc: 'Talent & Startup Ecosystem', tag: 'Community Partner' },
  ];

  return (
    <footer className="bg-[#000000] text-neutral-400 border-t border-neutral-900 pt-16 pb-12 relative overflow-hidden">
      
      {/* 1. Sponsor / Industrial Partners Showcase Section */}
      <div className="container mx-auto px-4 max-w-7xl pb-12 border-b border-neutral-900">
        <div className="text-center mb-6">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#d4af37]">
            MITRA INDUSTRI & SPONSOR UTAMA
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
            Didukung Oleh Ekosistem Teknologi & Pendidikan Terkemuka
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {sponsors.map((s, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <span className="text-[8px] font-bold uppercase tracking-wider text-blue-400 block mb-0.5">
                  {s.tag}
                </span>
                <div className="text-xs sm:text-sm font-black text-white group-hover:text-blue-400 transition-colors">
                  {s.name}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5 leading-snug">
                  {s.desc}
                </div>
              </div>
              <div className="mt-2.5 pt-1.5 border-t border-neutral-900 flex items-center text-[9px] font-semibold text-neutral-400 group-hover:text-blue-400 transition-colors gap-1">
                <span>Terverifikasi</span>
                <ArrowUpRight className="w-2.5 h-2.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Multi-Column Footer Grid with Unique Clear Headings */}
      <div className="container mx-auto px-4 max-w-7xl pt-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Col 1 (3 cols): Circular Seal + School Title in Serif + 5 Social Dots */}
          <div className="lg:col-span-3 space-y-3">
            <div className="w-12 h-12 rounded-full bg-white p-1.5 flex items-center justify-center shadow-lg border border-white/20">
              <Image
                src="/logo-sekolah.jpg"
                alt="Logo SMA PGRI 1 Lumajang"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-white leading-tight">
                SMA PGRI 1
              </h4>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#d4af37] uppercase block">
                LUMAJANG
              </span>
            </div>

            {/* 5 Social Media Icon Dots */}
            <div className="flex items-center gap-2 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[9px] text-neutral-400 hover:text-white hover:border-blue-500 transition-colors">f</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[9px] text-neutral-400 hover:text-white hover:border-blue-400 transition-colors">𝕏</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[9px] text-neutral-400 hover:text-white hover:border-pink-500 transition-colors">ig</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[9px] text-neutral-400 hover:text-white hover:border-red-500 transition-colors">yt</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[9px] text-neutral-400 hover:text-white hover:border-blue-400 transition-colors">in</a>
            </div>
          </div>

          {/* Col 2 (2 cols): TENTANG KAMI */}
          <div className="lg:col-span-2 space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Tentang Kami
            </h5>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li><Link href="/profil/sejarah" className="hover:text-white transition-colors">Sejarah Sekolah</Link></li>
              <li><Link href="/profil/visi-misi" className="hover:text-white transition-colors">Visi & Misi</Link></li>
              <li><Link href="/profil/sambutan" className="hover:text-white transition-colors">Sambutan Kepala Sekolah</Link></li>
              <li><Link href="/jurusan" className="hover:text-white transition-colors">Peminatan Jurusan</Link></li>
              <li><Link href="/guru" className="hover:text-white transition-colors">Direktori Guru</Link></li>
            </ul>
          </div>

          {/* Col 3 (2 cols): INFORMASI */}
          <div className="lg:col-span-2 space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Informasi
            </h5>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li><Link href="/berita" className="hover:text-white transition-colors">Berita Terkini</Link></li>
              <li><Link href="/agenda" className="hover:text-white transition-colors">Agenda Kegiatan</Link></li>
              <li><Link href="/artikel" className="hover:text-white transition-colors">Artikel Edukasi</Link></li>
              <li><Link href="/galeri" className="hover:text-white transition-colors">Galeri Dokumentasi</Link></li>
              <li><Link href="/karya-siswa" className="hover:text-white transition-colors">Karya Siswa</Link></li>
            </ul>
          </div>

          {/* Col 4 (2 cols): LAYANAN & PPDB */}
          <div className="lg:col-span-2 space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Layanan & PPDB
            </h5>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>
                <Link href="/ppdb" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
                  PPDB Online 2026
                </Link>
              </li>
              <li><Link href="/prestasi" className="hover:text-white transition-colors">Prestasi Siswa</Link></li>
              <li><Link href="/ekstrakurikuler" className="hover:text-white transition-colors">Ekstrakurikuler</Link></li>
              <li><Link href="/alumni" className="hover:text-white transition-colors">Tracer Alumni</Link></li>
              <li><Link href="/link-penting" className="hover:text-white transition-colors">Tautan Cepat</Link></li>
              <li><Link href="/buku-tamu" className="hover:text-white transition-colors">Buku Tamu</Link></li>
            </ul>
          </div>

          {/* Col 5 (3 cols): KONTAK & ALAMAT */}
          <div className="lg:col-span-3 space-y-2.5 pr-8">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Kontak & Alamat
            </h5>
            <div className="space-y-1.5 text-xs text-neutral-400 leading-relaxed">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Jl. Brigjend Katamso No. 35, Tompokersan, Lumajang, Jawa Timur 67316</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>info@smapgri1lmj.sch.id</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>(0334) 881234</span>
              </div>
            </div>

            <div className="pt-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[9px] font-bold text-neutral-300">
                <BookMarked className="w-3 h-3 text-[#d4af37]" />
                <span>NPSN: 20521478 • Akreditasi A</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Right Bookmark Ribbon Accent */}
        <div className="hidden xl:block absolute -bottom-12 right-12 z-30 pointer-events-none">
          <div className="w-8 h-20 bg-gradient-to-b from-blue-600 to-blue-700 shadow-2xl clip-path-ribbon opacity-90" />
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 gap-3">
          <p>© {new Date().getFullYear()} SMA PGRI 1 Lumajang. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/profil/visi-misi" className="hover:text-white transition-colors">Visi Misi</Link>
            <Link href="/kontak" className="hover:text-white transition-colors">Kontak</Link>
            <Link href="/admin/login" className="hover:text-white transition-colors">Portal Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
