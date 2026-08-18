'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
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
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-900 uppercase block mb-1">
              Jejak Lulusan & Tracer Study
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Portal Alumni SMA PGRI 1 Lumajang
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Dokumentasi kiprah ribuan alumni SMAGRISA di perguruan tinggi negeri unggulan, badan usaha milik negara, instansi pemerintah, dan dunia profesional.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl space-y-8">
        
        {/* Statistics Metric Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-bold text-blue-700 mb-1">78%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900">Lolos PTN Favorit</div>
            <div className="text-[11px] text-slate-500 mt-0.5">UB, UNAIR, ITS, UM, UNEJ, UGM</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-bold text-blue-700 mb-1">15%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900">Karier Profesional & BUMN</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Perbankan, Medis, IT & Industri</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-bold text-blue-700 mb-1">7%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900">Wirausaha Kreatif</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Industri Digital & Startup</div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center">
          <div className="bg-slate-200/80 p-1 rounded-lg inline-flex gap-1">
            <button
              onClick={() => setActiveTab('stories')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'stories'
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kisah Sukses Alumni
            </button>
            <button
              onClick={() => setActiveTab('tracer')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'tracer'
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Formulir Tracer Study
            </button>
          </div>
        </div>

        {/* TAB 1: Featured Alumni Stories */}
        {activeTab === 'stories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_ALUMNI.map((alumni) => (
              <div
                key={alumni.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-100 border-b border-slate-200">
                    <Image
                      src={alumni.image}
                      alt={alumni.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-white/95 text-blue-800 border border-slate-200 shadow-2xs">
                        {alumni.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <span className="text-[11px] font-semibold text-blue-700 block">
                        {alumni.gradYear}
                      </span>
                      <h2 className="text-sm font-bold text-slate-900 leading-snug">
                        {alumni.name}
                      </h2>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-1 border-t border-slate-100">
                      <div className="flex items-start gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-slate-800">{alumni.currentRole}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Building className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-700">{alumni.institution}</span>
                          <div className="text-[10px] text-slate-500">{alumni.majorOrDept}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 text-xs italic text-slate-600 border-t border-slate-100 flex gap-2 items-start">
                      <Quote className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                      <p className="line-clamp-3">"{alumni.quote}"</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Tracer Study Form */}
        {activeTab === 'tracer' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs max-w-2xl mx-auto">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">Data Tracer Study Berhasil Dikirim</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Terima kasih atas partisipasi Anda dalam memperbarui data alumni SMA PGRI 1 Lumajang.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
                >
                  Kirim Data Lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Formulir Pemutakhiran Data Alumni</h3>
                  <p className="text-xs text-slate-500">
                    Bantu sekolah dalam pemetaan karier dan re-akreditasi dengan mengisi data terkini Anda.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ahmad Faisal, S.T."
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Tahun Kelulusan</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: 2022"
                        value={formData.gradYear}
                        onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Aktivitas Utama Saat Ini</label>
                      <select
                        value={formData.activityType}
                        onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        <option value="kuliah">Melanjutkan Studi (Kuliah)</option>
                        <option value="kerja">Bekerja / Berkarier</option>
                        <option value="wirausaha">Wirausaha / Usaha Mandiri</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Universitas / Perusahaan / Tempat Usaha</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Universitas Brawijaya / PT Bank Mandiri"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Program Studi / Posisi Jabatan</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: S1 Teknik Elektro / Relationship Manager"
                      value={formData.majorOrRole}
                      onChange={(e) => setFormData({ ...formData, majorOrRole: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp Aktif</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 081234567890"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Pesan / Kesan untuk Almamater SMAGRISA</label>
                    <textarea
                      rows={3}
                      placeholder="Tuliskan pengalaman atau pesan inspiratif Anda..."
                      value={formData.testimonial}
                      onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submitting ? 'Mengirim Data...' : 'Kirim Data Tracer Study'}</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
