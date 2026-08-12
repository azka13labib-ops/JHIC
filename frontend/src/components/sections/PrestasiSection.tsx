import type { Achievement } from '@/types/school';
import { Trophy, Medal, Award } from 'lucide-react';
import Link from 'next/link';

export default function PrestasiSection({ achievements }: { achievements: Achievement[] }) {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Lulusan Terbaik & Prestasi</h2>
            <p className="text-slate-400 text-lg">
              Siswa-siswi kami telah membuktikan kemampuan mereka di kancah nasional maupun internasional, membawa pulang kebanggaan untuk institusi.
            </p>
          </div>
          <Link 
            href="/prestasi"
            className="mt-6 md:mt-0 px-6 py-3 border border-slate-700 hover:border-blue-500 hover:bg-blue-600/10 rounded-lg transition-colors inline-block"
          >
            Lihat Semua Prestasi →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.slice(0, 4).map((item, idx) => (
            <div 
              key={item.id} 
              className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl flex gap-6 hover:bg-slate-800 transition-colors"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                {idx === 0 ? <Trophy className="w-8 h-8" /> : idx === 1 ? <Medal className="w-8 h-8" /> : <Award className="w-8 h-8" />}
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
                  {item.level} &bull; {new Date(item.date).getFullYear()}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{item.description}</p>
                <div className="text-sm font-medium text-slate-300">
                  🏆 <span className="text-white">{item.student_name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
