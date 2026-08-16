'use client';

import React from 'react';
import { ShieldCheck, UserCheck } from 'lucide-react';

interface AdminUserBadgeProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  } | null;
}

export function AdminUserBadge({ user }: AdminUserBadgeProps) {
  const role = user?.role || 'admin';
  const roleLabel = role === 'admin' ? 'Administrator' : 'Operator Portal';

  return (
    <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold shadow-2xs">
        {role === 'admin' ? (
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        ) : (
          <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        )}
        <span className="capitalize">{roleLabel}</span>
      </div>
    </div>
  );
}
