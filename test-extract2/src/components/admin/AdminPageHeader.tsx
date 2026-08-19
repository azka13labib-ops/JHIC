'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

interface AdminPageHeaderProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  badge?: string;
  actionButton?: {
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
  secondaryAction?: React.ReactNode;
}

export function AdminPageHeader({
  icon: Icon,
  title,
  description,
  badge,
  actionButton,
  secondaryAction,
}: AdminPageHeaderProps) {
  const ActionIcon = actionButton?.icon || Plus;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
      <div className="flex items-center gap-3.5">
        {Icon && (
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
            {badge && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-slate-500 mt-0.5 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {secondaryAction}
        {actionButton && (
          <Link
            href={actionButton.href}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <ActionIcon className="w-4 h-4" />
            <span>{actionButton.label}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
