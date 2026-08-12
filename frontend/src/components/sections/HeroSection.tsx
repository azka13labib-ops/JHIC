import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-24 sm:pt-32 sm:pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
            Wujudkan Mimpimu Menjadi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Talenta Digital Profesional
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Jagoan Indonesia Hackathon Camp (JIHC) adalah institusi pendidikan terkemuka yang mencetak generasi unggul siap kerja di industri teknologi masa depan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/ppdb" 
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Daftar PPDB Sekarang
            </Link>
            <Link 
              href="/profil" 
              className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 hover:border-blue-200 hover:bg-blue-50 text-slate-700 font-semibold rounded-lg transition-all duration-300"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
