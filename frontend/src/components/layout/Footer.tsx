import Link from 'next/link';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">SMA PGRI 1 Lumajang</h3>
            <p className="text-sm text-slate-400">
              Mencetak generasi unggul siap kerja di industri masa depan.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/profil/sejarah" className="hover:text-blue-400 transition-colors">Sejarah Sekolah</Link></li>
              <li><Link href="/profil/visi-misi" className="hover:text-blue-400 transition-colors">Visi & Misi</Link></li>
              <li><Link href="/profil/sambutan" className="hover:text-blue-400 transition-colors">Sambutan Kepala Sekolah</Link></li>
              <li><Link href="/peminatan" className="hover:text-blue-400 transition-colors">Peminatan</Link></li>
              <li><Link href="/prestasi" className="hover:text-blue-400 transition-colors">Prestasi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Layanan</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/ppdb" className="hover:text-blue-400 transition-colors">PPDB Online</Link></li>
              <li><Link href="/berita" className="hover:text-blue-400 transition-colors">Berita & Informasi</Link></li>
              <li><Link href="/kontak" className="hover:text-blue-400 transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Kontak</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Jl. Contoh Alamat No. 123, Lumajang, Jawa Timur</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>info@smapgri1lmj.sch.id</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>(0334) 881234</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Logo Mitra Wajib */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <h4 className="text-center text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wider">Didukung Oleh</h4>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Menggunakan teks placeholder atau logo eksternal sementara karena belum ada file logonya */}
            <span className="font-bold text-lg text-white">JIHC</span>
            <span className="font-bold text-lg text-white">Jagoan Hosting</span>
            <span className="font-bold text-lg text-white">Komdigi</span>
            <span className="font-bold text-lg text-white">Garuda Spark</span>
            <span className="font-bold text-lg text-white">Ngalup</span>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} SMA PGRI 1 Lumajang. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
