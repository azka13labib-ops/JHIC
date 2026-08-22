import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Landmark, 
  Award, 
  Building2, 
  Trophy, 
  Rocket, 
  HeartHandshake, 
  Lightbulb, 
  BookOpen, 
  Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sejarah Singkat | SMA PGRI 1 Lumajang',
  description: 'Sejarah panjang berdirinya SMA PGRI 1 Lumajang sejak tahun 1985 hingga menjadi sekolah unggulan berstandar nasional.',
};

export const revalidate = 86400;

export default function SejarahPage() {
  const milestones = [
    {
      year: '1985',
      title: 'Awal Pendirian & Perintisan',
      badge: 'Tonggak Awal',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      description:
        'SMA PGRI 1 Lumajang resmi didirikan oleh Yayasan Pembina Lembaga Pendidikan (YPLP) PGRI Kabupaten Lumajang sebagai wujud nyata kepedulian para pendidik terhadap ketersediaan akses pendidikan tingkat menengah atas yang berkualitas dan terjangkau di kawasan Lumajang.',
      icon: Landmark,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      year: '1995',
      title: 'Status Disamakan dari Pemerintah',
      badge: 'Akreditasi',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      description:
        'Setelah satu dekade membuktikan dedikasi dan kualitas belajar mengajar, SMA PGRI 1 Lumajang berhasil meraih status "Disamakan" oleh Departemen Pendidikan dan Kebudayaan RI, membuktikan standarisasi mutu pendidikan yang setara dengan SMA Negeri.',
      icon: Award,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      year: '2005',
      title: 'Ekspansi Gedung & Laboratorium Modern',
      badge: 'Fasilitas',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description:
        'Pembangunan gedung kampus terpadu, laboratorium komputer berjejaring, laboratorium IPA lengkap, serta perpustakaan representatif guna menunjang kurikulum yang semakin berbasis sains dan teknologi terapan.',
      icon: Building2,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      year: '2015',
      title: 'Akreditasi "A" & Prestasi Nasional',
      badge: 'Prestasi',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      description:
        'Meraih predikat Akreditasi "A" Unggul dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M) secara berkelanjutan. Di era ini, siswa-siswi SMAGRISA mulai menorehkan prestasi bergengsi di ajang lomba olimpiade sains, olahraga, seni, dan karya ilmiah remaja tingkat nasional.',
      icon: Trophy,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      year: '2020 - Sekarang',
      title: 'Transformasi Digital & Sekolah Unggul Akademik',
      badge: 'Era Modern',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      description:
        'Mengimplementasikan Kurikulum Merdeka dengan penguatan ekosistem Smart School (CBT, E-Rapor, E-Learning), bimbingan intensif masuk Perguruan Tinggi Negeri (SNBP/SNBT), riset karya ilmiah siswa, dan pengembangan kepemimpinan global.',
      icon: Rocket,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    },
  ];

  const values = [
    {
      title: 'Jiwa Perjuangan PGRI',
      desc: 'Menanamkan semangat patriotisme guru dan pengabdian tanpa henti mencerdaskan kehidupan bangsa.',
      icon: Sparkles,
      iconColor: 'text-amber-500',
    },
    {
      title: 'Inklusivitas & Kesetaraan',
      desc: 'Membuka kesempatan seluas-luasnya bagi putra-putri daerah untuk mengenyam pendidikan bermutu tinggi.',
      icon: HeartHandshake,
      iconColor: 'text-blue-500',
    },
    {
      title: 'Adaptif Terhadap Zaman',
      desc: 'Konsisten bertransformasi menyelaraskan kurikulum dengan perkembangan teknologi dan tuntutan era digital.',
      icon: Lightbulb,
      iconColor: 'text-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="relative bg-linear-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b border-slate-200 py-16 sm:py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 text-blue-700">
            <Landmark className="w-3.5 h-3.5" /> Profil Sekolah
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight text-slate-900">
            Sejarah Singkat Sekolah
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Perjalanan dedikasi SMA PGRI 1 Lumajang dari masa ke masa dalam membentuk generasi cerdas, berkarakter, dan berdaya saing tinggi.
          </p>

          {/* Breadcrumb */}
          <div className="flex justify-center items-center gap-2 text-xs sm:text-sm text-slate-500 mt-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span>Profil</span>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Sejarah</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Intro Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Latar Belakang Berdirinya SMAGRISA</h2>
              <p className="text-sm text-slate-500">Mendedikasikan diri untuk masa depan generasi muda Lumajang</p>
            </div>
          </div>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base sm:text-lg space-y-4">
            <p>
              SMA PGRI 1 Lumajang lahir dari cita-cita luhur para tokoh pendidik yang tergabung dalam Persatuan Guru Republik Indonesia (PGRI) di Kabupaten Lumajang pada tahun 1985. Didorong oleh meningkatnya kebutuhan masyarakat akan sekolah menengah atas yang memiliki komitmen tinggi terhadap pembinaan karakter dan keunggulan akademik, lembaga ini tumbuh menjadi salah satu pilar pendidikan terpercaya di Jawa Timur.
            </p>
            <p>
              Dengan mengusung semangat kebersamaan dan integritas moral, SMA PGRI 1 Lumajang terus berbenah secara berkesinambungan. Mulai dari pembenahan kurikulum, peningkatan kompetensi tenaga pendidik, kelengkapan sarana laboratorium berstandar industri, hingga pembangunan ekosistem digital yang mempersiapkan peserta didik menghadapi persaingan global.
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Linimasa & Jejak Langkah</h2>
            <p className="text-slate-500 mt-2">Momen-momen bersejarah yang membentuk jati diri SMAGRISA hari ini</p>
          </div>

          <div className="relative border-l-2 border-blue-200 ml-4 sm:ml-8 space-y-12">
            {milestones.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="relative pl-8 sm:pl-12 group">
                  {/* Marker */}
                  <div className="absolute -left-4 sm:-left-5 top-1.5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-4 border-blue-600 shadow-md flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-2xl font-extrabold text-[#1E2B58]">{item.year}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nilai-Nilai Historis */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Nilai Historis yang Terus Terjaga</h2>
            <p className="text-slate-500 mt-2">Fondasi moral dan filosofis yang diwariskan para perintis sekolah</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow text-center group">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComp className={`w-7 h-7 ${v.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
