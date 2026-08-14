import { GraduationCap, Play, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-24 sm:pt-32 sm:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bagian Teks (Kiri) */}
          <div className="text-left max-w-2xl">
            <div className="inline-flex px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-800 font-semibold text-sm mb-6 items-center gap-2 max-w-fit shadow-sm">
              <GraduationCap className="w-4 h-4 text-blue-500 inline mr-1" /> Religius, Cerdas, Terampil, Profesional
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
              SMA PGRI 1 Lumajang <span className="text-slate-800">Mencetak Generasi Emas</span> <br className="hidden sm:block" />
              <span className="text-blue-700">
                Bersama Kita Bisa!
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              SMA PGRI 1 Lumajang hadir sebagai institusi pendidikan terkemuka. Kami berkomitmen untuk mencetak lulusan unggul yang religius, cerdas, terampil, berkarakter, dan siap berinovasi di masa depan.
            </p>
            
            {/* Stats Row */}
            <div className="flex bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8 divide-x divide-slate-100">
              <div className="flex-1 text-center px-4">
                <div className="text-3xl font-extrabold text-blue-900 mb-1">98%</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kelulusan Kerja</div>
              </div>
              <div className="flex-1 text-center px-4">
                <div className="text-3xl font-extrabold text-blue-900 mb-1">50+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prestasi/Tahun</div>
              </div>
              <div className="flex-1 text-center px-4">
                <div className="text-3xl font-extrabold text-blue-900 mb-1">100%</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Guru Kompeten</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                href="/ppdb" 
                className="w-full sm:w-auto px-8 py-3.5 bg-[#2B3B6F] hover:bg-[#1E2B58] text-white font-bold rounded-lg shadow-lg transition-all duration-300 text-center"
              >
                Daftar Sekarang
              </Link>
              <Link 
                href="/profil/sejarah" 
                className="w-full sm:w-auto px-8 py-3.5 bg-white border-2 border-amber-400 text-slate-800 font-bold rounded-lg hover:bg-amber-50 transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-amber-500 text-amber-500 inline mr-1" /> Profil Sekolah
              </Link>
            </div>
          </div>

          {/* Bagian Gambar/Ilustrasi (Kanan) */}
          <div className="relative mx-auto w-full lg:h-150 flex items-center justify-end">
            <div className="relative w-full h-100 sm:h-125 lg:h-full rounded-[2rem] overflow-hidden shadow-2xl">
                 <Image 
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop" 
                    alt="Gedung Sekolah JIHC" 
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority 
                    className="object-cover"
                 />
            </div>
              
            {/* Floating Badge (Pemanis) */}
            <div className="absolute -bottom-6 left-10 lg:-left-12 bg-white py-4 px-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 z-20">
              <div className="w-12 h-12 bg-[#2B3B6F] rounded-full flex items-center justify-center text-white">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-base font-bold text-[#2B3B6F]">Terakreditasi A</div>
                <div className="text-sm text-slate-500">Unggul & Berkualitas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
