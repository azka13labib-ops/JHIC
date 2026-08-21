import Image from 'next/image';
import { Clock, UserCheck } from 'lucide-react';
import { Extracurricular } from './data';

interface EkstrakurikulerCardProps {
  item: Extracurricular;
}

export function EkstrakurikulerCard({ item }: EkstrakurikulerCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:border-blue-300 transition-colors flex flex-col justify-between">
      <div>
        <div className="relative h-40 w-full bg-slate-100 border-b border-slate-200">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/95 text-slate-800 border border-slate-200 shadow-2xs">
              {item.category}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
            {item.day} • {item.badge}
          </div>

          <h3 className="text-sm font-bold text-slate-900 leading-snug">
            {item.name}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>

      <div className="p-4 pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
          <Clock className="w-3 h-3 text-blue-600 shrink-0" />
          <span>{item.schedule}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <UserCheck className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="truncate">{item.mentor}</span>
        </div>
      </div>
    </div>
  );
}
