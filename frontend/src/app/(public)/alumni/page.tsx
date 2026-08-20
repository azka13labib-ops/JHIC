import { getAlumni } from "@/lib/api/school";
import { GraduationCap, Briefcase, Building2, Search, Quote } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: 'Direktori Alumni - SMA PGRI 1 Lumajang',
  description: 'Jejak langkah dan kisah sukses alumni SMA PGRI 1 Lumajang di berbagai bidang dan institusi.',
};

export default async function AlumniPage() {
  const alumni = await getAlumni();

  // Statistics
  const totalAlumni = alumni.length;
  
  // Hitung jumlah alumni yang bekerja vs kuliah vs lainnya berdasarkan isi current_job atau company
  // Ini hanya estimasi sederhana untuk demo statistik
  const workingAlumni = alumni.filter(a => a.current_job?.toLowerCase().includes('kerja') || a.company).length;
  const studyingAlumni = alumni.filter(a => a.current_job?.toLowerCase().includes('kuliah') || a.current_job?.toLowerCase().includes('mahasiswa')).length;

  return (
    <div className="flex flex-col w-full bg-white text-slate-900 pb-20">
      
      {/* Hero Section */}
      <section className="bg-slate-50 py-16 lg:py-24 border-b border-slate-100 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest mb-6">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Tracer Study & Jejaring</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-slate-900 tracking-tight leading-tight mb-6">
            Jejak Langkah <span className="text-blue-700 italic">Alumni</span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Kisah sukses dan perjalanan karir lulusan SMA PGRI 1 Lumajang. Dari kampus ternama hingga perusahaan terkemuka, alumni kami terus berkarya dan menginspirasi.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
              <div className="text-3xl font-black text-slate-900 mb-1">{totalAlumni > 0 ? `${totalAlumni}+` : '0'}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Total Terdaftar</div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
              <div className="text-3xl font-black text-blue-600 mb-1">{workingAlumni > 0 ? `${workingAlumni}+` : '0'}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Bekerja Profesional</div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
              <div className="text-3xl font-black text-emerald-600 mb-1">{studyingAlumni > 0 ? `${studyingAlumni}+` : '0'}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Melanjutkan Studi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Section */}
      <section className="py-16 container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Direktori Alumni</h2>
            <p className="text-slate-500">Temukan rekan seangkatan dan inspirasi dari para pendahulu.</p>
          </div>
        </div>

        {alumni.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Belum Ada Data</h3>
            <p className="text-slate-500">Data alumni saat ini sedang dalam proses pembaruan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumni.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200 transition-all duration-300 group overflow-hidden flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-16 h-16 shrink-0 rounded-full bg-slate-100 overflow-hidden relative border-2 border-white shadow-xs">
                      {item.image_path ? (
                        <Image src={item.image_path} alt={item.name} fill sizes="64px" className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-600 font-bold text-xl uppercase">
                          {item.name.substring(0, 2)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                        Lulusan {item.graduation_year}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1 mb-6">
                    {item.current_job && (
                      <div className="flex items-start gap-2.5 text-sm text-slate-600">
                        <Briefcase className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item.current_job}</span>
                      </div>
                    )}
                    {item.company && (
                      <div className="flex items-start gap-2.5 text-sm text-slate-600">
                        <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span className="leading-tight font-medium text-slate-700">{item.company}</span>
                      </div>
                    )}
                  </div>

                  {item.testimonial && (
                    <div className="relative bg-slate-50 p-4 rounded-xl mt-auto">
                      <Quote className="absolute top-2 right-2 w-10 h-10 text-slate-200 rotate-180" />
                      <p className="text-sm text-slate-600 italic relative z-10 leading-relaxed line-clamp-3">
                        &quot;{item.testimonial}&quot;
                      </p>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
