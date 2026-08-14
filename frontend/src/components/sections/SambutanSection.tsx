import type { SchoolProfile } from '@/types/school';
import { Quote, Eye, Rocket } from 'lucide-react';

export default function SambutanSection({ profile }: { profile: SchoolProfile }) {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Bagian Kiri: Sambutan Kepsek */}
          <div className="w-full md:w-1/2">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl relative">
              <Quote className="absolute -top-4 -left-4 w-12 h-12 text-blue-100" />
              <p className="text-slate-700 leading-relaxed text-lg italic relative z-10 mb-8">
                {profile.principal_message}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  {profile.principal_name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{profile.principal_name}</h4>
                  <p className="text-sm text-slate-500">Kepala Sekolah {profile.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bagian Kanan: Visi Misi */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Visi & Misi</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-blue-600 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Eye className="w-4 h-4" />
                </span>
                Visi
              </h3>
              <p className="text-slate-600 leading-relaxed pl-10 border-l-2 border-slate-200 ml-4">
                {profile.vision}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Rocket className="w-4 h-4" />
                </span>
                Misi
              </h3>
              <div className="text-slate-600 leading-relaxed pl-10 border-l-2 border-slate-200 ml-4">
                {profile.mission.split('\n').map((item, idx) => (
                  <p key={idx} className="mb-2">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
