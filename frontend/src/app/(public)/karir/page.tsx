import { getImageUrl } from "@/lib/utils";
import type { Metadata } from 'next';
import Link from 'next/link';
import { getJobs, getCompanies } from '@/lib/api/resources';
import type { Vacancy } from '@/types';
import JobApplyForm from './JobApplyForm';

export const metadata: Metadata = {
  title: 'Karir & PKL | SMA PGRI 1 Lumajang',
  description: 'Informasi lowongan PKL dan kerja untuk siswa dan alumni SMA PGRI 1 Lumajang melalui Bursa Kerja Khusus (BKK).',
  openGraph: {
    title: 'Karir & PKL | SMA PGRI 1 Lumajang',
    description: 'Portal lowongan kerja dan PKL BKK SMA PGRI 1 Lumajang.',
  },
};

export const revalidate = 600;

const TYPE_MAP: Record<string, { label: string; color: string }> = {
  pkl:       { label: 'PKL / Magang', color: 'bg-blue-100 text-blue-700' },
  full_time: { label: 'Full Time', color: 'bg-green-100 text-green-700' },
  part_time: { label: 'Part Time', color: 'bg-amber-100 text-amber-700' },
};

export default async function KarirPage({
  searchParams,
}: {
  searchParams: { type?: string; search?: string };
}) {
  const [jobs, companies] = await Promise.all([
    getJobs({ type: searchParams.type, search: searchParams.search }),
    getCompanies(),
  ]);

  const activeJobs = jobs.filter((j) => j.is_active);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-linear-to-br from-violet-600 to-purple-700 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
            💼 Bursa Kerja Khusus (BKK)
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Portal Karir & PKL</h1>
          <p className="text-purple-200 max-w-xl mx-auto text-lg">
            Temukan peluang PKL dan karir terbaik dari mitra industri SMA PGRI 1 Lumajang
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-center">
            <div className="bg-white/10 rounded-xl px-6 py-3">
              <div className="text-2xl font-bold text-amber-400">{activeJobs.length}+</div>
              <div className="text-xs text-purple-200">Lowongan Aktif</div>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-3">
              <div className="text-2xl font-bold text-amber-400">{companies.length}+</div>
              <div className="text-xs text-purple-200">Perusahaan Mitra</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filter */}
        <form className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <input
              name="search"
              defaultValue={searchParams.search}
              placeholder="Cari lowongan..."
              className="w-full border border-slate-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm text-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          </div>
          <select
            name="type"
            defaultValue={searchParams.type ?? ''}
            className="border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm text-sm bg-white"
          >
            <option value="">Semua Tipe</option>
            <option value="pkl">PKL / Magang</option>
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
          </select>
          <button
            type="submit"
            className="bg-violet-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-violet-700 transition-colors text-sm"
          >
            Filter
          </button>
        </form>

        {/* Jobs Grid */}
        {activeJobs.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <span className="text-5xl block mb-4">💼</span>
            <p className="text-slate-500 text-lg">Belum ada lowongan yang tersedia saat ini.</p>
            <Link href="/karir" className="text-violet-600 text-sm hover:underline mt-2 block">Lihat semua lowongan</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {activeJobs.map((job: Vacancy) => (
              <div key={job.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-14 h-14 bg-linear-to-br from-violet-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                    {job.type === 'pkl' ? '🎓' : job.type === 'full_time' ? '💼' : '⏰'}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${TYPE_MAP[job.type]?.color ?? 'bg-slate-100 text-slate-600'}`}>
                        {TYPE_MAP[job.type]?.label ?? job.type}
                      </span>
                      {job.deadline && (
                        <span className="text-xs text-slate-400">
                          ⏰ Deadline: {new Date(job.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-1">{job.title}</h2>
                    <p className="text-violet-600 font-semibold text-sm mb-2">
                      {job.company?.name}
                      {job.company?.location && <span className="text-slate-400 font-normal"> — {job.company.location}</span>}
                    </p>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">{job.description}</p>
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-semibold text-violet-600 hover:text-violet-800">
                        Lihat syarat & form lamaran ↓
                      </summary>
                      <div className="mt-4 space-y-4">
                        <div className="bg-slate-50 rounded-xl p-4">
                          <h4 className="font-semibold text-slate-800 mb-2 text-sm">Persyaratan:</h4>
                          <p className="text-slate-600 text-sm whitespace-pre-line">{job.requirements}</p>
                        </div>
                        <JobApplyForm jobId={job.id} jobTitle={job.title} />
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mitra Industri */}
        {companies.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Perusahaan Mitra Kami</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {companies.map((company) => (
                <div key={company.id} className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                  {company.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={getImageUrl(company.logo_url)} alt={company.name} className="h-10 object-contain mx-auto mb-2" />
                  ) : (
                    <div className="text-3xl mb-2">🏢</div>
                  )}
                  <p className="font-semibold text-slate-800 text-sm">{company.name}</p>
                  {company.location && <p className="text-xs text-slate-400 mt-0.5">{company.location}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
