import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Microscope, 
  Globe, 
  BookOpen, 
  ClipboardList, 
  Briefcase, 
  Trophy, 
  ArrowLeft, 
  CheckCircle2 
} from 'lucide-react';
import { getDepartments } from '@/lib/api/school';

export const revalidate = 86400;

export async function generateStaticParams() {
  const departments = await getDepartments();
  return departments.map((d) => ({ slug: d.name.toLowerCase().replace(/\s+/g, '-') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const departments = await getDepartments();
  const dept = departments.find(
    (d) => d.name.toLowerCase().replace(/\s+/g, '-') === slug
  );
  return {
    title: `${dept?.name ?? 'Peminatan'} (Fase F) | SMA PGRI 1 Lumajang`,
    description: dept?.description ?? 'Detail program peminatan Fase F (Kelas 11 & 12) SMA PGRI 1 Lumajang',
  };
}

const DEPT_DETAILS: Record<string, {
  icon: React.ElementType;
  prospects: string[];
  subjects: string[];
  activities: string[];
}> = {
  mipa: {
    icon: Microscope,
    prospects: ['Kedokteran & Kesehatan', 'Teknik Informatika & Robotika', 'Farmasi & Bioteknologi', 'Teknik Sipil & Arsitektur', 'Matematika & Sains Terapan'],
    subjects: ['Matematika Lanjut / Peminatan', 'Biologi Terapan & Riset', 'Fisika Eksperimental', 'Kimia Laboratorium'],
    activities: ['Olimpiade Sains Nasional (OSN)', 'Mathematics Study Club', 'PMR & Medis Dasar', 'Penelitian Karya Ilmiah Remaja (KIR)'],
  },
  ips: {
    icon: Globe,
    prospects: ['Ilmu Hukum & Hubungan Internasional', 'Ekonomi, Bisnis & Manajemen', 'Perbankan & Akuntansi', 'Ilmu Komunikasi & Jurnalistik', 'Sosiologi & Diplomasi'],
    subjects: ['Ekonomi & Analisis Pasar', 'Geografi Spasial', 'Sosiologi Masyarakat Modern', 'Sejarah Tingkat Lanjut'],
    activities: ['Debat Bahasa & Diplomasi Pelajar', 'Simulasi Perdagangan & Pasar Modal', 'Ekonomi Kreatif Club', 'KIR Sosial Humaniora'],
  },
};

export default async function JurusanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const departments = await getDepartments();
  const dept = departments.find(
    (d) => d.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!dept) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center max-w-md shadow-2xs">
          <h1 className="text-base font-bold text-slate-900 mb-2">Program Peminatan Tidak Ditemukan</h1>
          <p className="text-xs text-slate-600 mb-4">Halaman kelompok peminatan yang Anda tuju belum terdaftar.</p>
          <Link href="/jurusan" className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Peminatan</span>
          </Link>
        </div>
      </div>
    );
  }

  const key = dept.name.toLowerCase().split('/')[0].trim().toLowerCase();
  const details = DEPT_DETAILS[key] ?? {
    icon: BookOpen,
    prospects: ['Perguruan Tinggi Negeri Unggulan', 'Pendidikan Karakter & Kedinasan', 'Industri Kreatif & Profesional'],
    subjects: ['Mata Pelajaran Kelompok Peminatan Terpadu'],
    activities: ['Ekstrakurikuler Pilihan & Pembinaan Prestasi'],
  };

  const IconComp = details.icon;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-5xl space-y-6">
        
        {/* Back Link */}
        <Link
          href="/jurusan"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Daftar Peminatan</span>
        </Link>

        {/* Header Hero Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs flex flex-col sm:flex-row items-start gap-5">
          <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
            <IconComp className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block mb-1">
              Fase F (Kelas XI - XII) • Kurikulum Merdeka
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 leading-tight">
              {dept.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {dept.description}
            </p>
          </div>
        </div>

        {/* 3 Structured Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. Subjects */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <ClipboardList className="w-4 h-4 text-blue-700" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Mata Pelajaran Pilihan</h2>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {details.subjects.map((subj, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{subj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Prospects */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Briefcase className="w-4 h-4 text-blue-700" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Prospek Studi & Karier</h2>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {details.prospects.map((pros, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{pros}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Activities */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Trophy className="w-4 h-4 text-blue-700" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Klub & Prestasi Terkait</h2>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {details.activities.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
