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
  ArrowRight 
} from 'lucide-react';
import { getDepartments } from '@/lib/api/school';

export const revalidate = 86400;

export async function generateStaticParams() {
  const departments = await getDepartments();
  return departments.map((d) => ({ slug: d.name.toLowerCase().replace(/\s+/g, '-') }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const departments = await getDepartments();
  const dept = departments.find(
    (d) => d.name.toLowerCase().replace(/\s+/g, '-') === params.slug
  );
  return {
    title: `${dept?.name ?? 'Peminatan'} | SMA PGRI 1 Lumajang`,
    description: dept?.description ?? 'Detail program peminatan SMA PGRI 1 Lumajang',
  };
}

const DEPT_DETAILS: Record<string, {
  color: string;
  icon: React.ElementType;
  prospects: string[];
  subjects: string[];
  activities: string[];
}> = {
  mipa: {
    color: 'from-blue-600 to-indigo-700',
    icon: Microscope,
    prospects: ['Kedokteran', 'Teknik Informatika', 'Farmasi', 'Teknik Sipil', 'Biologi', 'Matematika'],
    subjects: ['Matematika Peminatan', 'Biologi', 'Fisika', 'Kimia'],
    activities: ['Olimpiade Sains Nasional', 'Robotik Club', 'Penelitian Ilmiah', 'Science Fair'],
  },
  ips: {
    color: 'from-emerald-600 to-teal-700',
    icon: Globe,
    prospects: ['Ekonomi', 'Hukum', 'Ilmu Komunikasi', 'Hubungan Internasional', 'Sosiologi'],
    subjects: ['Ekonomi', 'Geografi', 'Sejarah', 'Sosiologi'],
    activities: ['Debat Bahasa Indonesia', 'Simulasi PBB', 'Ekonomi Bisnis Club', 'KIR Sosial'],
  },
};

export default async function JurusanDetailPage({ params }: { params: { slug: string } }) {
  const departments = await getDepartments();
  const dept = departments.find(
    (d) => d.name.toLowerCase().replace(/\s+/g, '-') === params.slug
  );

  if (!dept) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Jurusan tidak ditemukan</h1>
          <Link href="/jurusan" className="text-blue-600 underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Peminatan
          </Link>
        </div>
      </div>
    );
  }

  const key = dept.name.toLowerCase().split('/')[0].trim().toLowerCase();
  const details = DEPT_DETAILS[key] ?? {
    color: 'from-slate-600 to-slate-800',
    icon: BookOpen,
    prospects: ['Perguruan Tinggi Negeri', 'Karir Profesional'],
    subjects: ['Mata Pelajaran Khusus'],
    activities: ['Ekstrakurikuler Terkait'],
  };

  const IconComp = details.icon;

  return (
    <div className="min-h-screen bg-white">
      <section className={`bg-linear-to-br ${details.color} text-white py-20`}>
        <div className="container mx-auto px-4">
          <Link href="/jurusan" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Semua Peminatan
          </Link>
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-6 shadow-inner">
            <IconComp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{dept.name}</h1>
          <p className="text-white/80 max-w-2xl text-lg">{dept.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mata Pelajaran */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-blue-600" /> Mata Pelajaran
            </h2>
            <ul className="space-y-2">
              {details.subjects.map((s, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Prospek Karir */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" /> Prospek Karir
            </h2>
            <ul className="space-y-2">
              {details.prospects.map((p, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Kegiatan */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" /> Kegiatan Unggulan
            </h2>
            <ul className="space-y-2">
              {details.activities.map((a, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700">
                  <span className="w-2 h-2 bg-amber-500 rounded-full shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/ppdb"
            className="inline-flex items-center gap-2 bg-[#2B3B6F] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1E2B58] transition-colors shadow-lg"
          >
            Daftar Sekarang via PPDB Online <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
