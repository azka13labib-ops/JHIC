import { MapPin, ArrowLeft, Calendar } from 'lucide-react';
import { getImageUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAgendaBySlug } from "@/lib/api/school";
import type { Metadata } from 'next';

export const revalidate = 60;

function cleanExcerpt(content?: string, length = 160): string {
  if (!content) return "Agenda dan kegiatan resmi SMA PGRI 1 Lumajang.";
  const plain = content.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();
  return plain.length > length ? plain.slice(0, length) + "..." : plain;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getAgendaBySlug(slug);

  if (!item) {
    return {
      title: "Agenda Tidak Ditemukan",
      description: "Agenda sekolah yang Anda cari tidak tersedia.",
    };
  }

  const description = cleanExcerpt(item.content || item.description);
  const imageUrl = item.image ? getImageUrl(item.image) : "https://smapgri1lumajang.sch.id/image.png";

  return {
    title: item.title,
    description,
    alternates: {
      canonical: `/agenda/${slug}`,
    },
    openGraph: {
      title: item.title,
      description,
      url: `https://smapgri1lumajang.sch.id/agenda/${slug}`,
      siteName: "SMA PGRI 1 Lumajang",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function DetailAgendaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getAgendaBySlug(slug);

  if (!item) {
    notFound();
  }

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: item.title,
    description: cleanExcerpt(item.content || item.description),
    startDate: item.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: item.location || "Kampus SMA PGRI 1 Lumajang",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. K.H. Wachid Hasyim No.20-B",
        addressLocality: "Lumajang",
        addressRegion: "Jawa Timur",
        postalCode: "67311",
        addressCountry: "ID",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "SMA PGRI 1 Lumajang",
      url: "https://smapgri1lumajang.sch.id",
    },
    image: [item.image ? getImageUrl(item.image) : "https://smapgri1lumajang.sch.id/image.png"],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
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
                className="max-h-150 w-full sm:w-auto h-auto object-contain rounded-xl border border-slate-200 shadow-2xs"
              />
            </div>
          )}

          <div className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-4 whitespace-pre-wrap">
            {item.content || item.description}
          </div>
        </article>

      </div>
    </div>
  );
}
