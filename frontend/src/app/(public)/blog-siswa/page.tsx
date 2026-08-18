import { getBlogs } from "@/lib/api/school";
import Link from "next/link";
import { BookOpen, ExternalLink, Globe, User } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Siswa | SMA PGRI 1 Lumajang',
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-900 uppercase block mb-1">
              Publikasi & Literasi Mandiri
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Blog & Portofolio Siswa
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Kumpulan web blog, portofolio digital, dan catatan eksplorasi mandiri siswa-siswi SMA PGRI 1 Lumajang.
            </p>
          </div>
        </div>
      </section>

      {/* Main Listing */}
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayBlogs.map((item: StudentBlog) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {item.category || 'Blog Siswa'}
                  </span>
                </div>

                <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug mb-2">
                  {item.title}
                </h2>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{item.author || 'Siswa SMAGRISA'}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Kunjungi Blog</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
