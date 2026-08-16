'use client';

import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

export function TopHeaderBar() {
  return (
    <div className="bg-slate-900 text-slate-300 py-1.5 text-xs border-b border-slate-800 hidden sm:block">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5 text-blue-400" /> info@smapgri1lmj.sch.id
          </span>
          <span className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-emerald-400" /> (0334) 881234
          </span>
        </div>

        <div className="flex gap-5 items-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            YouTube
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Facebook
          </a>
          <Link
            href="/admin/login"
            className="text-slate-300 hover:text-amber-400 transition-colors font-semibold ml-2"
          >
            Portal Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
