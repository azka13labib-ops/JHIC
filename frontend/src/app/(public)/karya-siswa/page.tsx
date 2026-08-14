import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { getStudentWorks } from "@/lib/api/school";

export const revalidate = 60; // Revalidate every minute

export default async function StudentWorkPage() {
  const works = await getStudentWorks();

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Karya Siswa</h1>
      <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
        Kumpulan karya kreatif, inovatif, dan inspiratif dari siswa-siswi SMA PGRI 1 Lumajang.
      </p>

      {works.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-lg">Belum ada karya siswa yang diunggah.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {item.image ? (
                  <div className="relative aspect-video w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={getImageUrl(item.image)} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <span className="text-4xl">🎨</span>
                  </div>
                )}
                <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h2>
                    <p className="text-sm font-medium text-blue-600 mb-4">Oleh: {item.student_name}</p>
                    <p className="text-slate-600 line-clamp-3">
                      {item.description}
                    </p>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
