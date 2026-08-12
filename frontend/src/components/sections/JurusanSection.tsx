import type { Department } from '@/types/school';
import { Microscope, Globe, BookText } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Microscope: <Microscope className="w-10 h-10 text-blue-600" />,
  Globe: <Globe className="w-10 h-10 text-indigo-500" />,
  BookText: <BookText className="w-10 h-10 text-emerald-500" />,
};

export default function JurusanSection({ departments }: { departments: Department[] }) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Program Peminatan</h2>
          <p className="text-slate-600 text-lg">
            Kami menyediakan program peminatan yang dirancang untuk mengakomodasi minat dan bakat peserta didik menuju jenjang pendidikan tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <div 
              key={dept.id} 
              className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center mb-6 transition-colors">
                {dept.icon && iconMap[dept.icon] ? iconMap[dept.icon] : <BookText className="w-10 h-10 text-slate-400" />}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{dept.name}</h3>
              <p className="text-slate-600 leading-relaxed">
                {dept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
