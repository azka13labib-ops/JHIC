import { MapPin, ArrowLeft, Calendar } from 'lucide-react';
import { getImageUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAgendaBySlug } from "@/lib/api/school";

export const revalidate = 60;

export default async function DetailAgendaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getAgendaBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Back Link */}
        <Link
          href="/agenda"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 mb-6 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Agenda Sekolah</span>
        </Link>

        {/* Article Box */}
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-2xs">
          
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 leading-tight mb-4">
            {item.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-6 mb-6 border-b border-slate-100">
            <div className="flex items-center gap-1 text-blue-700 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {new Date(item.date).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            {item.location && (
              <div className="flex items-center gap-1 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.location}</span>
              </div>
            )}
          </div>

          {/* Natural Uncropped Image Display */}
          {item.image && (
            <div className="mb-8 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={getImageUrl(item.image)} 
                alt={item.title} 
                className="max-h-[600px] w-full sm:w-auto h-auto object-contain rounded-xl border border-slate-200 shadow-2xs"
              />
            </div>
          )}

          <div className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-4 whitespace-pre-wrap">
            {item.description}
          </div>
        </article>

      </div>
    </div>
  );
}
