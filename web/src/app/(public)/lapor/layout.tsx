import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Layanan Pengaduan & Aspirasi (WBS)',
  description: 'Saluran pengaduan, kritik, saran, dan aspirasi terpercaya (Whistleblowing System) SMA PGRI 1 Lumajang.',
  alternates: {
    canonical: '/lapor',
  },
};

export default function LaporLayout({ children }: { children: React.ReactNode }) {
  return children;
}
