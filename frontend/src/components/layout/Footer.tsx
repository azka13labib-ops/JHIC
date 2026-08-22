import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CP_SITE_URL } from '@/lib/site';
import { 
  MapPin, 
  Mail, 
  Phone, 
  BookMarked
} from 'lucide-react';

export default async function Footer() {
  const sponsors = [
    { name: 'Jagoan Hosting', desc: 'Cloud & Infrastructure', tag: 'Web Hosting', image: '/images/sponsors/images.jpg' },
    { name: 'Komdigi RI', desc: 'Kementerian Komunikasi & Digital', tag: 'Government', image: '/images/sponsors/komdigi.jpeg' },
    { name: 'Garuda Spark', desc: 'Digital Innovation Hub', tag: 'Industry Partner', image: '/images/sponsors/garudaspark.jpg' },
    { name: 'Ngalup.co', desc: 'Talent & Startup Ecosystem', tag: 'Community Partner', image: '/images/sponsors/ngalup1.png' },
  ];

  let ppdbOpen = true;
  let academicYear = "2026/2027";

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    const res = await fetch(`${apiUrl}/ppdb/info`, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        ppdbOpen = json.data.is_open !== false;
        academicYear = json.data.academic_year || "2026/2027";
      }
    }
  } catch (_e) {
    // silently fail and use defaults
  }

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200 pt-16 pb-12 relative overflow-hidden">
      

      {/* 2. Main Multi-Column Footer Grid */}
      <div className="container mx-auto px-4 max-w-7xl pt-10 sm:pt-12 relative">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10">
          
          {/* Col 1 (3 cols): Circular Seal + School Title in Serif + 5 Social Dots */}
          <div className="col-span-2 lg:col-span-3 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-xs border border-slate-200 overflow-hidden">
              <Image
                src="/logo-sekolah.png"
                alt="Logo SMA PGRI 1 Lumajang"
                width={40}
                height={40}
                className="object-contain rounded-lg"
              />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-slate-900 leading-tight">
                SMA PGRI 1
              </h4>
              <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#d4af37] uppercase block">
                LUMAJANG
              </span>
            </div>

            {/* 3 Social Media Icons (YT, IG, TikTok) */}
            <div className="flex items-center gap-2 pt-2">
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-600 hover:border-red-300 hover:bg-slate-50 shadow-sm transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-pink-600 hover:border-pink-300 hover:bg-slate-50 shadow-sm transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50 shadow-sm transition-colors">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.24-1.7.06-3.45.96-4.94 1.06-1.78 2.97-2.93 5.04-3.15v4.06c-1.12.16-2.18.84-2.73 1.83-.56 1.01-.61 2.27-.12 3.3.49 1.02 1.48 1.77 2.61 2.01 1.13.25 2.37-.02 3.23-.76.86-.74 1.34-1.87 1.34-3.03V.02z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 (2 cols): TENTANG KAMI */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Tentang Kami
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/profil/sejarah" className="hover:text-blue-600 transition-colors">Sejarah Sekolah</Link></li>
              <li><Link href="/profil/visi-misi" className="hover:text-blue-600 transition-colors">Visi & Misi</Link></li>
              <li><Link href="/profil/fasilitas" className="hover:text-blue-600 transition-colors">Fasilitas Sekolah</Link></li>
              <li><Link href="/profil/sambutan" className="hover:text-blue-600 transition-colors">Sambutan</Link></li>
              <li><Link href="/jurusan" className="hover:text-blue-600 transition-colors">Jurusan</Link></li>
              <li><Link href="/guru" className="hover:text-blue-600 transition-colors">Direktori Guru</Link></li>
            </ul>
          </div>

          {/* Col 3 (2 cols): INFORMASI */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Informasi
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/berita" className="hover:text-blue-600 transition-colors">Berita Terkini</Link></li>
              <li><Link href="/agenda" className="hover:text-blue-600 transition-colors">Agenda Kegiatan</Link></li>
              <li><Link href="/artikel" className="hover:text-blue-600 transition-colors">Artikel Edukasi</Link></li>
              <li><Link href="/galeri" className="hover:text-blue-600 transition-colors">Dokumentasi</Link></li>
              <li><Link href="/karya-siswa" className="hover:text-blue-600 transition-colors">Karya Siswa</Link></li>
            </ul>
          </div>

          {/* Col 4 (2 cols): LAYANAN & PPDB */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Layanan
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              {ppdbOpen && (
                <li>
                  <Link href="/ppdb" className="text-blue-600 hover:text-blue-700 font-bold transition-colors flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    PPDB {academicYear}
                  </Link>
                </li>
              )}
              <li><Link href="/prestasi" className="hover:text-blue-600 transition-colors">Prestasi Siswa</Link></li>
              <li><Link href="/ekstrakurikuler" className="hover:text-blue-600 transition-colors">Ekstrakurikuler</Link></li>
              <li><Link href="/alumni" className="hover:text-blue-600 transition-colors">Tracer Alumni</Link></li>
              <li><Link href="/buku-tamu" className="hover:text-blue-600 transition-colors">Buku Tamu</Link></li>
            </ul>
          </div>

          {/* Col 5 (3 cols): KONTAK & ALAMAT */}
          <div className="col-span-2 lg:col-span-3 space-y-3 lg:pr-8 pt-4 lg:pt-0">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Kontak & Alamat
            </h5>
            <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Jl. Brigjend Katamso No. 35, Tompokersan, Lumajang, Jawa Timur 67316</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>info@smapgri1lmj.sch.id</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>(0334) 881234</span>
              </div>
            </div>

            <div className="pt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-slate-700 shadow-2xs">
                <BookMarked className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>NPSN: 20521478 • Akreditasi A</span>
              </div>
            </div>
          </div>

        </div>


        {/* Sponsors - Small Logos */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-start gap-4 sm:gap-8">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 whitespace-nowrap">
            Didukung Oleh:
          </span>
          <div className="flex flex-wrap items-center justify-start gap-3">
            {sponsors.map((s, idx) => (
              <div 
                key={idx} 
                title={s.desc} 
                className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-center"
              >
                <Image 
                  src={s.image || '/logo-sekolah.jpg'} 
                  alt={s.name} 
                  width={32} 
                  height={32} 
                  className="object-cover w-full h-full" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} SMA PGRI 1 Lumajang. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/profil/visi-misi" className="hover:text-blue-600 transition-colors">Visi Misi</Link>
            <Link href="/kontak" className="hover:text-blue-600 transition-colors">Kontak</Link>
            <a 
              href={CP_SITE_URL} 
              className="hover:text-blue-600 transition-colors"
            >
              Portal Admin
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
