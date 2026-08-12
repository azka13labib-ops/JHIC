import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">JIHC</h3>
            <p className="text-sm leading-relaxed mb-4">
              Jagoan Indonesia Hackathon Camp.<br />
              Mencetak generasi unggul di bidang teknologi dan digital kreatif.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/profil" className="hover:text-blue-400">Profil Sekolah</Link></li>
              <li><Link href="/ppdb" className="hover:text-blue-400">Pendaftaran PPDB</Link></li>
              <li><Link href="/berita" className="hover:text-blue-400">Berita & Informasi</Link></li>
              <li><Link href="/karir" className="hover:text-blue-400">Bursa Kerja</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm">
              <li>📍 Jl. Teknologi No. 1, Malang</li>
              <li>📞 (0341) 123456</li>
              <li>✉️ info@jihc.sch.id</li>
            </ul>
          </div>
        </div>

        {/* Sponsor Logos Section */}
        <div className="border-t border-slate-700 pt-8 mt-8">
          <p className="text-center text-sm font-semibold text-slate-400 mb-6 uppercase tracking-wider">
            Didukung Oleh
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {/* 5 Logo Wajib JHIC */}
            <div className="text-white font-bold text-xl">JHIC</div>
            <div className="text-white font-bold text-xl">Jagoan Hosting</div>
            <div className="text-white font-bold text-xl">Komdigi</div>
            <div className="text-white font-bold text-xl">Garuda Spark</div>
            <div className="text-white font-bold text-xl">Ngalup</div>
          </div>
        </div>
        
        <div className="text-center text-sm mt-12 text-slate-500">
          &copy; {new Date().getFullYear()} Jagoan Indonesia Hackathon Camp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
