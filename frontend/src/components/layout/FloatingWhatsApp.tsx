'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 group">
      {/* Tooltip Chat Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2.5 bg-white text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200/90 animate-bounce duration-1000">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Tanya PPDB & Info Sekolah?</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 ml-1 p-0.5"
            aria-label="Tutup pesan"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href="https://wa.me/6281234567890?text=Halo%20Admin%20SMA%20PGRI%201%20Lumajang,%20saya%20ingin%20bertanya%20informasi%20sekolah%20dan%20PPDB"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi WhatsApp Panitia Sekolah"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white flex items-center justify-center shadow-xl shadow-emerald-500/35 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer relative"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 text-[9px] font-black text-emerald-950 items-center justify-center">1</span>
        </span>
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
