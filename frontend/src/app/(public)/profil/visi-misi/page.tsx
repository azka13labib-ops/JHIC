import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Target, 
  Compass, 
  GraduationCap, 
  Laptop, 
  Sparkles, 
  Sprout, 
  Handshake, 
  Check, 
  Heart
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Visi & Misi | SMA PGRI 1 Lumajang',
  description: 'Visi, misi, tujuan pendidikan, dan tata nilai luhur SMA PGRI 1 Lumajang dalam mendidik generasi penerus bangsa.',
};

export const revalidate = 86400;

export default function VisiMisiPage() {
  const missions = [
    {
      no: '01',
      title: 'Pendidikan Karakter & Spiritual',
      desc: 'Menyelenggarakan pembelajaran yang berlandaskan iman, taqwa, serta nilai-nilai budi pekerti luhur guna mencetak peserta didik berakhlakul karimah.',
      icon: Heart,
    },
    {
      no: '02',
      title: 'Keunggulan Akademik & Prestasi',
      desc: 'Mengembangkan kurikulum yang adaptif, inovatif, dan berstandar nasional untuk mengoptimalkan potensi intelektual dan prestasi di berbagai kompetisi sains maupun seni.',
      icon: GraduationCap,
    },
    {
      no: '03',
      title: 'Keterampilan Digital & Sertifikasi Industri',
      desc: 'Membekali peserta didik dengan literasi digital tingkat lanjut, keterampilan teknologi informasi, dan sertifikasi keahlian yang diakui industri global.',
      icon: Laptop,
    },
    {
      no: '04',
      title: 'Kepemimpinan, Riset & Kreativitas Mandiri',
      desc: 'Menumbuhkan karakter kepemimpinan, kemampuan riset ilmiah, dan daya cipta mandiri melalui kegiatan kesiswaan serta Projek Penguatan Profil Pelajar Pancasila (P5).',
      icon: Sparkles,
    },
    {
      no: '05',
      title: 'Wawasan Lingkungan & Sosial',
      desc: 'Mewujudkan budaya sekolah yang ramah anak, peduli kelestarian lingkungan hidup, tanggap bencana, dan menjunjung tinggi kearifan lokal.',
      icon: Sprout,
    },
    {
      no: '06',
      title: 'Kemitraan Strategis Dunia Kerja',
      desc: 'Membangun jejaring kolaborasi erat dengan Perguruan Tinggi Terkemuka, Industri, Dunia Usaha, dan Lembaga Sertifikasi Profesi.',
      icon: Handshake,
    },
  ];

  const goals = [
    {
      category: 'Jangka Pendek',
      points: [
        'Peningkatan rata-rata nilai akademik dan tingkat kelulusan 100%.',
        'Peningkatan prestasi ekstrakurikuler di tingkat kabupaten dan provinsi.',
        'Implementasi penuh e-learning dan manajemen sekolah berbasis digital.',
      ],
    },
    {
      category: 'Jangka Menengah',
      points: [
        'Meningkatkan persentase lulusan yang diterima di PTN favorit dan ikatan dinas hingga >70%.',
        'Mencapai prestasi medali emas pada ajang LKS, OSN, dan FLS2N tingkat nasional.',
        'Penguatan kemitraan strategis dengan lebih dari 20 industri terkemuka.',
      ],
    },
    {
      category: 'Jangka Panjang',
      points: [
        'Menjadi sekolah rujukan nasional untuk integrasi kurikulum akademik dan vokasional digital.',
        'Melahirkan wirausahawan muda dan profesional yang berdaya saing di kancah internasional.',
        'Menjadi pusat keunggulan (Center of Excellence) pendidikan berwawasan global di Jawa Timur.',
      ],
    },
  ];

  const coreValues = [
    { code: 'S', name: 'Santun', desc: 'Menghormati sesama dan bertutur kata baik dalam setiap pergaulan.' },
    { code: 'M', name: 'Mandiri', desc: 'Mampu mengambil inisiatif, bertanggung jawab, dan menyelesaikan tantangan hidup.' },
    { code: 'A', name: 'Adaptif', desc: 'Cepat menyesuaikan diri dengan perkembangan zaman dan teknologi modern.' },
    { code: 'R', name: 'Religius', desc: 'Menjadikan nilai-nilai keagamaan sebagai pedoman utama bertindak.' },
    { code: 'T', name: 'Tangguh', desc: 'Pantang menyerah, ulet, dan selalu berorientasi pada pencapaian prestasi tertinggi.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="relative bg-linear-to-br from-[#1E2B58] via-[#2B3B6F] to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6 text-amber-300">
            <Target className="w-3.5 h-3.5" /> Arah & Panduan Sekolah
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            Visi, Misi & Tata Nilai
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Komitmen dan panduan strategis SMA PGRI 1 Lumajang dalam mendidik generasi unggul yang siap memimpin di masa depan.
          </p>

          {/* Breadcrumb */}
          <div className="flex justify-center items-center gap-2 text-sm text-blue-200 mt-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-blue-200">Profil</span>
            <span>/</span>
            <span className="text-white font-medium">Visi Misi</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Visi Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-linear-to-br from-blue-600 to-indigo-800 rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden group">
            <Target className="absolute -right-10 -bottom-10 w-72 h-72 opacity-10 group-hover:scale-110 transition-transform duration-500" />
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Compass className="w-3.5 h-3.5" /> Visi Utama Sekolah
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-snug mb-6 text-amber-300">
              &ldquo;Terwujudnya Generasi Emas yang Religius, Unggul dalam Prestasi, Terampil dalam Teknologi, Berkarakter Mandiri, dan Berdaya Saing Global.&rdquo;
            </h2>
            <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl">
              Visi ini mencerminkan komitmen kuat SMA PGRI 1 Lumajang untuk tidak hanya mentransfer ilmu pengetahuan, melainkan juga menanamkan fondasi keimanan yang kokoh, kompetensi keahlian yang relevan dengan industri masa depan, serta kepribadian yang tangguh.
            </p>
          </div>
        </div>

        {/* Misi Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Misi SMA PGRI 1 Lumajang</h2>
            <p className="text-slate-500 mt-2">Langkah-langkah strategis untuk mewujudkan visi sekolah secara konsisten</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missions.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all flex gap-5 items-start group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-blue-600 tracking-wider uppercase mb-1">Misi #{item.no}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Values: S-M-A-R-T */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Tata Nilai Budaya (SMAGRISA S-M-A-R-T)</h2>
            <p className="text-slate-500 mt-2">Prinsip karakter yang dijiwai oleh seluruh civitas akademika</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {coreValues.map((val, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100 hover:border-amber-400 hover:shadow-lg transition-all group">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl font-black mb-4 group-hover:scale-110 transition-transform">
                  {val.code}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{val.name}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tujuan Pendidikan */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Tujuan Strategis Pendidikan</h2>
            <p className="text-slate-500 mt-2">Target pencapaian berjenjang demi kualitas berkelanjutan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {goals.map((g, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {g.category}
                  </div>
                  <ul className="space-y-3">
                    {g.points.map((pt, j) => (
                      <li key={j} className="text-sm text-slate-600 flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Nav */}
        <div className="max-w-4xl mx-auto mt-20 pt-10 border-t border-slate-200 flex flex-wrap justify-between items-center gap-4">
          <Link href="/profil/sejarah" className="inline-flex items-center gap-2 text-slate-600 font-semibold hover:text-blue-600">
            <span>&larr;</span> Baca Sejarah Singkat
          </Link>
          <Link href="/profil/sambutan" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
            Lanjut ke Sambutan Kepala Sekolah <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
