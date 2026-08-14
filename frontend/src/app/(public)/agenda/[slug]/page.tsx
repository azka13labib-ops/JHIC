import { getImageUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAgendaBySlug } from "@/lib/api/school";

export const revalidate = 60;

export default async function DetailAgendaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getAgendaBySlug(slug);

  if (!item) notFound();

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link href="/agenda" className="text-blue-600 hover:underline mb-8 inline-block">
          &larr; Kembali ke Daftar Agenda
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          {item.title}
        </h1>
        
        <div className="flex items-center gap-4 text-slate-500 mb-8 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-700 bg-blue-100 text-blue-700 px-3 py-1 rounded-md">
                {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          {item.location && (
            <>
                <span className="text-slate-300">|</span>
                <span>📍 {item.location}</span>
            </>
          )}
        </div>

        {item.image && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={getImageUrl(item.image)} 
              alt={item.title} 
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
          {item.description}
        </div>
      </div>
    </div>
  );
}
