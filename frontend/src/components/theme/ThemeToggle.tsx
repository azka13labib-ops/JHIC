'use client';

import React, { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

function emptySubscribe() {
  return () => {};
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full bg-slate-800/40 border border-slate-700/50 flex items-center justify-center text-slate-400 ${className}`}>
        <span className="w-4 h-4" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
      title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
      className={`relative p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
        theme === 'dark'
          ? 'bg-slate-800/80 hover:bg-slate-700 text-amber-400 border border-slate-700 hover:border-amber-400/40 shadow-sm'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 hover:border-slate-300 shadow-sm'
      } ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 transition-transform hover:rotate-45 duration-300" />
      ) : (
        <Moon className="w-4 h-4 transition-transform hover:-rotate-12 duration-300" />
      )}
    </button>
  );
}
