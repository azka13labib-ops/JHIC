import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, Building, MapPin, CalendarDays, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getJobBySlug } from "@/lib/api/school";
import JobApplyForm from "./JobApplyForm";

export const revalidate = 60;

export default async function JobDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const job = await getJobBySlug(params.slug);

  if (!job || !job.is_active) {
    notFound();
  }

  const isClosed = new Date(job.closing_date) < new Date();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <section className="bg-white border-b border-slate-200 pt-8 pb-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link 
            href="/karir" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Bursa Karir
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
              job.type === 'Full-time' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              job.type === 'Part-time' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              'bg-purple-50 text-purple-700 border-purple-200'
            }`}>
              {job.type}
            </span>
            {isClosed && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-red-50 text-red-700 border border-red-200">
                Ditutup
              </span>
            )}
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight leading-tight mb-4">
            {job.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-400" />
              <span className="font-semibold text-slate-800">{job.company_name}</span>
            </div>
            {job.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{job.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-slate-400" />
              <span>Batas Lamaran: <span className="font-semibold">{new Date(job.closing_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span></span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                Deskripsi Pekerjaan
              </h2>
              <div className="prose prose-slate prose-sm sm:prose-base max-w-none text-slate-600">
                <div dangerouslySetInnerHTML={{ __html: job.description }} />
              </div>
            </div>
            
            {job.requirements && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Kualifikasi / Persyaratan
                </h2>
                <div className="prose prose-slate prose-sm sm:prose-base max-w-none text-slate-600">
                  <div dangerouslySetInnerHTML={{ __html: job.requirements }} />
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            {isClosed ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-red-800 mb-1">Lowongan Ditutup</h3>
                <p className="text-sm text-red-700/80">Batas waktu pengiriman lamaran telah berakhir pada {new Date(job.closing_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
              </div>
            ) : (
              <JobApplyForm jobId={job.id} jobTitle={job.title} />
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
