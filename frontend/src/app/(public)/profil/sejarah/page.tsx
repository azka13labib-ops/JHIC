import type { Metadata } from 'next';
import Link from 'next/link';

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
      icon: '🏛️',
    },
    {
      year: '1995',
      title: 'Status Disamakan dari Pemerintah',
      badge: 'Akreditasi',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      description:
        'Setelah satu dekade membuktikan dedikasi dan kualitas belajar mengajar, SMA PGRI 1 Lumajang berhasil meraih status "Disamakan" oleh Departemen Pendidikan dan Kebudayaan RI, membuktikan standarisasi mutu pendidikan yang setara dengan SMA Negeri.',
      icon: '📜',
    },
    {
      year: '2005',
      title: 'Ekspansi Gedung & Laboratorium Modern',
      badge: 'Fasilitas',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description:
        'Pembangunan gedung kampus terpadu, laboratorium komputer berjejaring, laboratorium IPA lengkap, serta perpustakaan representatif guna menunjang kurikulum yang semakin berbasis sains dan teknologi terapan.',
      icon: '🏢',
    },
    {
      year: '2015',
      title: 'Akreditasi "A" & Prestasi Nasional',
      badge: 'Prestasi',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      description:
        'Meraih predikat Akreditasi "A" Unggul dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M) secara berkelanjutan. Di era ini, siswa-siswi SMAGRISA mulai menorehkan prestasi bergengsi di ajang lomba olimpiade sains, olahraga, seni, dan karya ilmiah remaja tingkat nasional.',
      icon: '🏆',
    },
    {
      year: '2020 - Sekarang',
      title: 'Transformasi Digital, Teaching Factory & BLUD',
      badge: 'Era Modern',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      description:
        'Mengimplementasikan Kurikulum Merdeka dengan penguatan ekosistem Smart School (CBT, E-Rapor, E-Learning), sertifikasi industri, Bursa Kerja Khusus (BKK), serta unit produksi Teaching Factory berbasis Badan Layanan Umum Daerah (BLUD).',
      icon: '🚀',
    },
  ];

  const values = [
    {
      title: 'Jiwa Perjuangan PGRI',
      desc: 'Menanamkan semangat patriotisme guru dan pengabdian tanpa henti mencerdaskan kehidupan bangsa.',
      icon: '✊',
    },
    {
      title: 'Inklusivitas & Kesetaraan',
      desc: 'Membuka kesempatan seluas-luasnya bagi putra-putri daerah untuk mengenyam pendidikan bermutu tinggi.',
      icon: '🤝',
    },
    {
      title: 'Adaptif Terhadap Zaman',
      desc: 'Konsisten bertransformasi menyelaraskan kurikulum dengan perkembangan teknologi dan tuntutan era digital.',
      icon: '💡',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="relative bg-linear-to-br from-[#1E2B58] via-[#2B3B6F] to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6 text-amber-300">
            🏛️ Profil Sekolah
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            Sejarah Singkat Sekolah
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Perjalanan dedikasi SMA PGRI 1 Lumajang dari masa ke masa dalam membentuk generasi cerdas, berkarakter, dan berdaya saing tinggi.
          </p>

          {/* Breadcrumb */}
          <div className="flex justify-center items-center gap-2 text-sm text-blue-200 mt-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-blue-200">Profil</span>
            <span>/</span>
            <span className="text-white font-medium">Sejarah</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Intro Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold shadow-inner">
              📖
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
            {milestones.map((item, index) => (
              <div key={index} className="relative pl-8 sm:pl-12 group">
                {/* Marker */}
                <div className="absolute -left-4 sm:-left-5 top-1.5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-4 border-blue-600 shadow-md flex items-center justify-center text-sm sm:text-base group-hover:scale-110 transition-transform">
                  {item.icon}
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
            ))}
          </div>
        </div>

        {/* Nilai-Nilai Historis */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Nilai Historis yang Terus Terjaga</h2>
            <p className="text-slate-500 mt-2">Fondasi moral dan filosofis yang diwariskan para perintis sekolah</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigasi Cepat Profil */}
        <div className="max-w-4xl mx-auto mt-20 pt-10 border-t border-slate-200 flex flex-wrap justify-between items-center gap-4">
          <Link href="/profil/visi-misi" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
            <span>&rarr;</span> Lanjut ke Halaman Visi & Misi
          </Link>
          <Link href="/profil/sambutan" className="inline-flex items-center gap-2 text-slate-600 font-semibold hover:text-blue-600">
            Baca Sambutan Kepala Sekolah <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
