'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface AdminSearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  totalResults?: number;
  className?: string;
}

export function AdminSearchBar({
  value,
  onChange,
  placeholder = 'Cari data...',
  totalResults,
  className = '',
}: AdminSearchBarProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white border-b border-slate-100 ${className}`}>
      <div className="relative w-full sm:max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-900 transition-all placeholder:text-slate-400"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
            title="Hapus pencarian"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {typeof totalResults === 'number' && (
        <div className="text-[11px] font-semibold text-slate-500 shrink-0">
          Ditemukan <span className="font-bold text-slate-900">{totalResults}</span> data
        </div>
      )}
    </div>
  );
}
