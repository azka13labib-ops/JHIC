import { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

interface AlumniItem {
  id: number;
  name: string;
  graduation_year: number | string;
  major?: string;
  current_job?: string;
  company?: string;
  image_path?: string;
  testimonial?: string;
  created_at: string;
}

interface AlumniDetailModalProps {
  alumni: AlumniItem | null;
  onClose: () => void;
}

export function AlumniDetailModal({ alumni, onClose }: AlumniDetailModalProps) {
  if (!alumni) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">Detail Tracer Alumni</h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-3">
            {alumni.image_path ? (
              <Image src={alumni.image_path} alt={alumni.name} width={64} height={64} className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-slate-200" />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-2xl">
                {alumni.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h4 className="font-bold text-sm text-slate-900">{alumni.name}</h4>
              <p className="text-slate-500">Angkatan / Tahun Lulus: {alumni.graduation_year}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Profesi</span>
              <p className="font-bold text-slate-800 mt-0.5">{alumni.current_job || '-'}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Instansi / Kampus</span>
              <p className="font-bold text-slate-800 mt-0.5">{alumni.company || '-'}</p>
            </div>
          </div>
          {alumni.major && (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Jurusan / Program Studi</span>
              <p className="font-bold text-slate-800 mt-0.5">{alumni.major}</p>
            </div>
          )}
          {alumni.testimonial && (
            <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100/60">
              <span className="text-[10px] text-blue-600 font-bold uppercase">Kesan & Pesan Alumni</span>
              <p className="text-slate-700 italic mt-1 leading-relaxed">&ldquo;{alumni.testimonial}&rdquo;</p>
            </div>
          )}
        </div>
        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
