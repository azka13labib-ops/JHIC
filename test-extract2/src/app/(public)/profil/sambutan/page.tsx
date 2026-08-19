import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Mic, 
  User, 
  Laptop, 
  Handshake, 
  Building2, 
  Trophy, 
  Quote 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sambutan Kepala Sekolah | SMA PGRI 1 Lumajang',
  description: 'Sambutan resmi Kepala Sekolah SMA PGRI 1 Lumajang kepada siswa, wali murid, dan seluruh masyarakat.',
};

export const revalidate = 86400;

export default function SambutanPage() {
  const highlights = [
    {
      title: 'Kurikulum Berbasis Karakter & Digital',
      desc: 'Memadukan pembentukan adab, nilai spiritual, dan literasi teknologi modern.',
      icon: Laptop,
    },
    {
      title: 'Bursa Kerja Khusus & Kemitraan DUDI',
      desc: 'Kerjasama aktif dengan industri ternama dan perguruan tinggi terkemuka.',
      icon: Handshake,
    },
    {
      title: 'Fasilitas Belajar Standar Industri',
      desc: 'Laboratorium modern, ruang kelas nyaman ber-AC, dan lingkungan belajar asri.',
      icon: Building2,
    },
    {
      title: 'Ekstrakurikuler & Prestasi Multidimensi',
      desc: 'Wadah pengembangan bakat seni, olahraga, sains, kepemimpinan, dan kewirausahaan.',
      icon: Trophy,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="relative bg-linear-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b border-slate-200 py-16 sm:py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 text-blue-700">
            <Mic className="w-3.5 h-3.5" /> Pesan Pimpinan
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight text-slate-900">
            Sambutan Kepala Sekolah
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Menyambut generasi baru dengan penuh kehangatan, komitmen mutu, dan visi masa depan yang gemilang.
          </p>

          {/* Breadcrumb */}
          <div className="flex justify-center items-center gap-2 text-xs sm:text-sm text-slate-500 mt-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span>Profil</span>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Sambutan Kepala Sekolah</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Card Sambutan */}
          <div className="bg-white rounded-3xl p-8 sm:p-14 shadow-sm border border-slate-100 mb-16">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              {/* Profil Kepsek */}
              <div className="w-full md:w-1/3 flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-36 h-36 rounded-full bg-linear-to-br from-[#1E2B58] to-blue-600 flex items-center justify-center text-white text-6xl shadow-xl ring-4 ring-white mb-4">
                  <User className="w-16 h-16" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Bapak Kepala Sekolah, M.Pd</h3>
                <p className="text-sm font-semibold text-blue-600 mt-1">Kepala SMA PGRI 1 Lumajang</p>
                <div className="h-px bg-slate-200 w-full my-4"></div>
                <div className="text-xs text-slate-500 space-y-1">
                  <p>Dedikasi: <span className="font-semibold text-slate-700">Pendidikan Karakter & Vokasi</span></p>
                  <p>Periode: <span className="font-semibold text-slate-700">2020 - Sekarang</span></p>
                </div>
              </div>

              {/* Teks Sambutan Lengkap */}
              <div className="w-full md:w-2/3 relative">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-blue-100 pointer-events-none" />
                <div className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-2">Assalamu&apos;alaikum Warahmatullahi Wabarakatuh</div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
                  Selamat Datang di Portal Resmi SMA PGRI 1 Lumajang
                </h2>

                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base sm:text-lg space-y-4 relative z-10">
                  <p>
                    Puji syukur kita panjatkan ke hadirat Allah SWT, Tuhan Yang Maha Esa, atas limpahan rahmat, hidayah, dan karunia-Nya sehingga website resmi SMA PGRI 1 Lumajang (SMAGRISA) dapat hadir sebagai media informasi, komunikasi, dan transparansi publik bagi seluruh masyarakat, pemerhati pendidikan, orang tua, serta siswa-siswi tercinta.
                  </p>
                  <p>
                    Dunia saat ini bergerak dengan akselerasi yang luar biasa cepat di era Revolusi Industri 4.0 dan Society 5.0. Tantangan masa depan tidak lagi hanya menuntut penguasaan teori akademis semata, namun kemampuan adaptasi, penguasaan teknologi digital, kreativitas berpikir kritis, kecakapan komunikasi, serta integritas moral dan spiritual yang kokoh.
                  </p>
                  <p>
                    Di SMA PGRI 1 Lumajang, kami mengusung visi holistik: membentuk generasi yang religius, berprestasi tinggi, mandiri, dan berdaya saing global. Kami menghadirkan program pembelajaran interaktif, laboratorium komprehensif, sarana Teaching Factory, bursa kerja khusus, serta beragam pilihan ekstrakurikuler yang dirancang untuk menggali potensi setiap siswa secara optimal.
                  </p>
                  <p>
                    Kepada seluruh anak-anakku para peserta didik, manfaatkanlah setiap waktu dan kesempatan di kampus tercinta ini untuk terus berkarya, mengasah keterampilan, dan menjunjung tinggi adab kesantunan. Jadilah pribadi yang membawa manfaat luas bagi bangsa dan negara.
                  </p>
                  <p>
                    Kepada bapak/ibu orang tua dan mitra dunia industri, kami menyampaikan terima kasih yang tak terhingga atas kepercayaan dan sinergi yang terus terjalin harmonis. Mari bersama-sama kita antarkan putra-putri kita menuju gerbang kesuksesan masa depan.
                  </p>
                  <p className="font-semibold text-slate-900 pt-4">
                    Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Tertanda,</p>
                    <p className="font-bold text-slate-900 text-lg">Bapak Kepala Sekolah, M.Pd</p>
                    <p className="text-xs text-slate-500">Kepala Sekolah SMA PGRI 1 Lumajang</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-xl text-xs font-bold">
                      SMAGRISA Hebat & Berprestasi
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program & Komitmen Keunggulan */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Komitmen Layanan Pendidikan</h2>
              <p className="text-slate-500 mt-2">Empat pilar utama yang menjadi fokus pengembangan kami</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((h, i) => {
                const IconComp = h.icon;
                return (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex items-start gap-4 group">
                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{h.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Nav */}
          <div className="pt-10 border-t border-slate-200 flex flex-wrap justify-between items-center gap-4">
            <Link href="/profil/sejarah" className="inline-flex items-center gap-2 text-slate-600 font-semibold hover:text-blue-600">
              <span>&larr;</span> Baca Sejarah Singkat
            </Link>
            <Link href="/profil/visi-misi" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
              Lihat Visi & Misi Sekolah <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
