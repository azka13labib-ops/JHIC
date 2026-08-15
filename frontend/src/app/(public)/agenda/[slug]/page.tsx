import { MapPin } from 'lucide-react';
import { getImageUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAgendaBySlug } from "@/lib/api/school";

export const revalidate = 60; // Revalidate every minute

export default async function DetailAgendaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getAgendaBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link href="/agenda" className="text-blue-600 hover:underline mb-8 inline-block">
          &larr; Kembali ke Daftar Agenda
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          {item.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-slate-500 mb-8 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-md text-sm">
                {new Date(item.date).toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
            </span>
          </div>
          {item.location && (
            <>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-500" /> {item.location}</span>
            </>
          )}
        </div>

        {item.image && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-sm relative aspect-video w-full max-h-125 bg-slate-100">
            <Image 
              src={getImageUrl(item.image)} 
              alt={item.title} 
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
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
