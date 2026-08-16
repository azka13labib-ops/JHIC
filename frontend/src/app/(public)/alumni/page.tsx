'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  GraduationCap, 
  Building, 
  Briefcase, 
  Send, 
  CheckCircle2, 
  Quote
} from 'lucide-react';

interface AlumniStory {
  id: string;
  name: string;
  gradYear: string;
  currentRole: string;
  institution: string;
  majorOrDept: string;
  quote: string;
  image: string;
  badge: string;
}

const FEATURED_ALUMNI: AlumniStory[] = [
  {
    id: '1',
    name: 'Muhammad Ilham Maulana, S.Kom.',
    gradYear: 'Alumni 2021',
    currentRole: 'Software Engineer',
    institution: 'PT Telkom Indonesia Tbk',
    majorOrDept: 'Teknik Informatika - Institut Teknologi Sepuluh Nopember (ITS)',
    quote: 'Fondasi logika dan kedisiplinan di SMAGRISA sangat membantu saya bersaing di kampus teknologi dan industri digital nasional.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
    badge: 'Teknologi & BUMN',
  },
  {
    id: '2',
    name: 'dr. Anisa Permatasari',
    gradYear: 'Alumni 2019',
    currentRole: 'Dokter Umum',
    institution: 'RSUD Dr. Haryoto Lumajang',
    majorOrDept: 'Pendidikan Dokter - Universitas Airlangga (UNAIR)',
    quote: 'Bimbingan guru-guru SMAGRISA dalam membina karakter dan sains membuka jalan mimpi saya menjadi tenaga medis untuk mengabdi kepada masyarakat.',
    image: 'https://images.unsplash.com/photo-1594824813639-5b722d3b2591?q=80&w=600&auto=format&fit=crop',
    badge: 'Kesehatan & Medis',
  },
  {
    id: '3',
    name: 'Bagas Aditya Pratama, S.E.',
    gradYear: 'Alumni 2020',
    currentRole: 'Financial Analyst',
    institution: 'Bank Central Asia (BCA)',
    majorOrDept: 'Ilmu Ekonomi & Bisnis - Universitas Brawijaya (UB)',
    quote: 'Ekstrakurikuler dan kepemimpinan di sekolah melatih kemampuan public speaking serta mental tangguh di dunia perbankan.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    badge: 'Finansial & Perbankan',
  },
  {
    id: '4',
    name: 'Salsabila Putri Utami, S.Pd.',
    gradYear: 'Alumni 2022',
    currentRole: 'Dosen Muda & Peneliti',
    institution: 'Universitas Negeri Malang (UM)',
    majorOrDept: 'Pendidikan Bahasa Inggris - UM',
    quote: 'English Club dan program riset di SMAGRISA menjadi pijakan awal kecintaan saya pada dunia literasi dan pendidikan.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    badge: 'Pendidikan & Riset',
  },
  {
    id: '5',
    name: 'Dimas Wahyu Kurniawan',
    gradYear: 'Alumni 2023',
    currentRole: 'Mahasiswa Berprestasi',
    institution: 'Universitas Gadjah Mada (UGM)',
    majorOrDept: 'Teknik Sipil - Jalur SNBP Prestasi',
    quote: 'Terima kasih SMAGRISA atas dukungan penuh fasilitas dan portofolio prestasi sehingga saya berhasil menembus UGM lewat jalur undangan.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    badge: 'Prestasi SNBP UGM',
  },
  {
    id: '6',
    name: 'Rizky Dwi Anggoro',
    gradYear: 'Alumni 2018',
    currentRole: 'Founder & CEO',
    institution: 'Lumajang Creative Digital Agency',
    majorOrDept: 'Wirausaha Muda Sektor Industri Kreatif',
    quote: 'Jiwa kemandirian yang ditanamkan sejak bangku SMA menjadi modal utama membangun ekosistem bisnis kreatif sendiri.',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600&auto=format&fit=crop',
    badge: 'Wirausaha Kreatif',
  },
];

export default function AlumniPage() {
  const [activeTab, setActiveTab] = useState<'stories' | 'tracer'>('stories');
  
  // Tracer Form State
  const [formData, setFormData] = useState({
    fullName: '',
    gradYear: '2024',
    activityType: 'kuliah',
    institution: '',
    majorOrRole: '',
    whatsapp: '',
    testimonial: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <section className="relative bg-linear-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b border-slate-200 py-16 sm:py-20 overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 text-blue-700">
            <GraduationCap className="w-3.5 h-3.5" /> Jejak Alumni & Tracer Study
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight text-slate-900">
            Portal Alumni SMAGRISA
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Menghubungkan ribuan alumni SMA PGRI 1 Lumajang yang telah berkiprah di Perguruan Tinggi Negeri unggulan, BUMN, instansi pemerintah, dan dunia profesional.
          </p>

          {/* Breadcrumb */}
          <div className="flex justify-center items-center gap-2 text-xs sm:text-sm text-slate-500 mt-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Alumni</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        
        {/* Statistics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50/80 border border-blue-100 rounded-3xl p-6 text-center">
            <div className="text-3xl sm:text-4xl font-black text-blue-700 mb-1">78%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-900">Lolos PTN Favorit</div>
            <div className="text-[11px] text-blue-600 mt-1">UB, UNAIR, ITS, UM, UNEJ, UGM</div>
          </div>
          <div className="bg-emerald-50/80 border border-emerald-100 rounded-3xl p-6 text-center">
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 mb-1">15%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Karier Profesional & BUMN</div>
            <div className="text-[11px] text-emerald-600 mt-1">Perbankan, Medis, IT & Industri</div>
          </div>
          <div className="bg-amber-50/80 border border-amber-100 rounded-3xl p-6 text-center">
            <div className="text-3xl sm:text-4xl font-black text-amber-700 mb-1">7%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900">Wirausaha & Start-up</div>
            <div className="text-[11px] text-amber-600 mt-1">Bisnis Kreatif & Agrobisnis</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-100 p-1.5 rounded-2xl inline-flex gap-1.5 border border-slate-200">
            <button
              onClick={() => setActiveTab('stories')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'stories'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⭐ Kisah Sukses & Testimoni Alumni
            </button>
            <button
              onClick={() => setActiveTab('tracer')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'tracer'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📝 Form Tracer Study Alumni
            </button>
          </div>
        </div>

        {/* TAB 1: Featured Alumni Stories */}
        {activeTab === 'stories' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {FEATURED_ALUMNI.map((alumni) => (
                <div
                  key={alumni.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={alumni.image}
                        alt={alumni.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                      
                      <div className="absolute top-3.5 left-3.5">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-blue-700 shadow-xs">
                          {alumni.badge}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[11px] font-bold text-amber-300 block">
                          {alumni.gradYear}
                        </span>
                        <h2 className="text-base sm:text-lg font-extrabold text-white leading-snug drop-shadow-xs">
                          {alumni.name}
                        </h2>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2">
                          <Briefcase className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-900 block">Profesi / Posisi:</span>
                            <span className="text-slate-600 font-medium">{alumni.currentRole}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                          <Building className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-900 block">Instansi / Kampus:</span>
                            <span className="text-slate-600 font-medium">{alumni.institution}</span>
                            <div className="text-[11px] text-slate-400 mt-0.5">{alumni.majorOrDept}</div>
                          </div>
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="pt-3 border-t border-slate-100 text-xs italic text-slate-600 bg-slate-50/70 p-3.5 rounded-2xl flex items-start gap-2">
                        <Quote className="w-4 h-4 text-blue-500 shrink-0 mt-0.5 opacity-60" />
                        <span>&ldquo;{alumni.quote}&rdquo;</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Call to Action for Alumni */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Apakah Anda Alumni SMA PGRI 1 Lumajang?</h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                Bantu adik-adik tingkatmu dengan membagikan jejak perkuliahan atau karier profesional Anda melalui pendataan Tracer Study resmi.
              </p>
              <button
                onClick={() => setActiveTab('tracer')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Isi Formulir Tracer Study Sekarang →
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Tracer Study Form */}
        {activeTab === 'tracer' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 border border-blue-100">
                  <Send className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Formulir Tracer Study Alumni</h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Data Anda akan membantu almamater dalam meningkatkan mutu kurikulum dan akreditasi sekolah.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Terima Kasih, Sahabat Alumni!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Data Tracer Study Anda telah berhasil terkirim dan tersimpan di database alumni SMA PGRI 1 Lumajang.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setActiveTab('stories'); }}
                    className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition"
                  >
                    Kembali ke Direktori Alumni
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nama Lengkap & Gelar (Jika Ada) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Muhammad Ilham Maulana, S.Kom."
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Tahun Kelulusan *
                      </label>
                      <select
                        value={formData.gradYear}
                        onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                      >
                        {Array.from({ length: 15 }, (_, i) => 2026 - i).map((yr) => (
                          <option key={yr} value={String(yr)}>
                            Tahun {yr}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Aktivitas Saat Ini *
                      </label>
                      <select
                        value={formData.activityType}
                        onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                      >
                        <option value="kuliah">Kuliah di Perguruan Tinggi</option>
                        <option value="kerja">Bekerja / Profesional</option>
                        <option value="wirausaha">Wirausaha / Bisnis Mandiri</option>
                        <option value="lainnya">Lainnya / Studi Lanjut</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nama Kampus / Tempat Kerja / Perusahaan *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Universitas Brawijaya / PT Telkom Indonesia"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Program Studi / Jabatan Pekerjaan
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Teknik Informatika / Software Engineer"
                      value={formData.majorOrRole}
                      onChange={(e) => setFormData({ ...formData, majorOrRole: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nomor WhatsApp Aktif (Untuk Jaringan Alumni)
                    </label>
                    <input
                      type="tel"
                      placeholder="Contoh: 081234567890"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Pesan, Kesan, atau Motivasi untuk Adik Tingkat di SMAGRISA
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tuliskan pengalaman berharga atau tips sukses belajar di SMA PGRI 1 Lumajang..."
                      value={formData.testimonial}
                      onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-lg shadow-blue-600/25 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submitting ? 'Sedang Mengirim Data...' : 'Kirim Data Tracer Study Alumni →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
