'use client';

import { Users, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Registration } from '@/types/ppdb';

interface PpdbStatsOverviewProps {
  registrations: Registration[];
}

export function PpdbStatsOverview({ registrations }: PpdbStatsOverviewProps) {
  const stats = {
    total: registrations.length,
    pending: registrations.filter((r) => r.status === 'pending').length,
    accepted: registrations.filter((r) => r.status === 'accepted').length,
    rejected: registrations.filter((r) => r.status === 'rejected').length,
  };

  const statCards = [
    {
      label: 'Total Pendaftar',
      value: stats.total,
      icon: Users,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      label: 'Menunggu Verifikasi',
      value: stats.pending,
      icon: Clock,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      label: 'Diterima',
      value: stats.accepted,
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      label: 'Ditolak',
      value: stats.rejected,
      icon: AlertCircle,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statCards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {c.label}
              </span>
              <div className={`p-2.5 rounded-xl border ${c.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {c.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
