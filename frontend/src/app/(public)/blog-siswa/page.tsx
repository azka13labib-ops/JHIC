import { getBlogs } from "@/lib/api/school";
import Link from "next/link";

export const revalidate = 60;

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Siswa</h1>
      <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
        Kumpulan blog dan artikel pribadi karya siswa-siswi SMA PGRI 1 Lumajang.
      </p>

      {blogs.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-lg">Belum ada blog siswa yang ditambahkan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((item) => (
            <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h2>
                  <p className="text-sm text-blue-500 truncate">{item.url}</p>
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-slate-400">
                  <span>Kunjungi Blog</span>
                  <span className="ml-2">→</span>
                </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
