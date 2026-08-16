import { getBlogs } from "@/lib/api/school";
import Link from "next/link";
import { BookOpen, ExternalLink, Globe, User } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Kreasi Siswa | SMA PGRI 1 Lumajang',
  description: 'Kumpulan portofolio, tulisan, dan web blog pribadi karya kreatif siswa-siswi SMA PGRI 1 Lumajang.',
};

export const revalidate = 60;

interface StudentBlog {
  id: number;
  title: string;
  url: string;
  author?: string;
  category?: string;
}

const FALLBACK_BLOGS: StudentBlog[] = [
  {
    id: 1,
    title: 'Eksplorasi Pemrograman Web & AI untuk Pelajar',
    url: 'https://medium.com/@smagrisa_siswa/web-dev-journey',
    author: 'Ahmad Fauzi (Fase E - MIPA)',
    category: 'Teknologi & Koding',
  },
  {
    id: 2,
    title: 'Catatan Literasi: Menyelami Sastra Nusantara di Era Digital',
    url: 'https://literasisiswa.blogspot.com',
    author: 'Nabila Safitri (Fase F - Bahasa)',
    category: 'Sastra & Literasi',
  },
  {
    id: 3,
    title: 'Riset Biologi: Pemanfaatan Pupuk Organik di Kebun Sekolah',
    url: 'https://smagrisa-greenbiotech.wordpress.com',
    author: 'Rian Pratama (Fase F - MIPA)',
    category: 'Sains & Lingkungan',
  },
];

export default async function BlogPage() {
  let blogs: StudentBlog[] = [];
  try {
    blogs = await getBlogs();
  } catch {
    blogs = [];
  }

  const displayBlogs = blogs && blogs.length > 0 ? blogs : FALLBACK_BLOGS;

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <section className="relative bg-linear-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b border-slate-200 py-16 sm:py-20 overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 text-blue-700">
            <BookOpen className="w-3.5 h-3.5" /> Literasi & Kreasi Digital
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight text-slate-900">
            Blog & Portofolio Siswa
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Kumpulan artikel, catatan riset, dan web blog karya siswa-siswi berprestasi SMA PGRI 1 Lumajang.
          </p>

          {/* Breadcrumb */}
          <div className="flex justify-center items-center gap-2 text-xs sm:text-sm text-slate-500 mt-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Blog Siswa</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayBlogs.map((item: StudentBlog) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-50 border border-slate-200 text-slate-600">
                    {item.category || 'Blog Siswa'}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                  {item.title}
                </h2>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.author || 'Siswa SMAGRISA'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span className="truncate max-w-50 text-slate-400 font-normal">
                  {item.url}
                </span>
                <span className="flex items-center gap-1 shrink-0">
                  Buka Blog <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
