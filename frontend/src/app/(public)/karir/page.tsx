import { Briefcase, ArrowRight, Building, MapPin } from 'lucide-react';
import Link from "next/link";
import { getJobs } from "@/lib/api/school";

export const revalidate = 60;

export default async function KarirPage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-900 uppercase block mb-1">
              Bursa Kerja Khusus (BKK)
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Peluang Karir & Lowongan
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Informasi lowongan pekerjaan terbaru dari mitra industri untuk alumni SMA PGRI 1 Lumajang.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        {jobs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-md mx-auto shadow-sm">
            <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">Belum Ada Lowongan</h3>
            <p className="text-xs text-slate-500 mt-1">Saat ini belum ada informasi lowongan pekerjaan yang tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job: any) => (
              <Link href={`/karir/${job.slug}`} key={job.id} className="group">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors h-full flex flex-col p-6">
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                        <Building className="w-6 h-6 text-slate-400" />
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                        job.type === 'Full-time' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        job.type === 'Part-time' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                        {job.type || 'Pekerjaan'}
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-1 line-clamp-2">
                      {job.title}
                    </h2>
                    
                    <div className="text-sm font-semibold text-slate-700 mb-3">
                      {job.company_name}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="line-clamp-1">{job.location || 'Tidak disebutkan'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                    <div className="text-[11px] text-slate-500">
                      Batas lamaran: <span className="font-semibold text-slate-700">{new Date(job.closing_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
