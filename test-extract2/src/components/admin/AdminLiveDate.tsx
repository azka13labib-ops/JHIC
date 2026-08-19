'use client';

import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

export function AdminLiveDate() {
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(now);
      setDateStr(formatted);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  if (!dateStr) {
    return (
      <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-400">
        <Calendar className="w-3.5 h-3.5" />
        <span>Memuat tanggal...</span>
      </div>
    );
  }

  return (
    <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
      <Calendar className="w-3.5 h-3.5 text-blue-600" />
      <span>{dateStr}</span>
    </div>
  );
}
