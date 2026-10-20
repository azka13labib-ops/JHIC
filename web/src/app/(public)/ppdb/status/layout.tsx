import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cek Status Pendaftaran PPDB',
  description: 'Cek status verifikasi dan pengumuman hasil seleksi PPDB SMA PGRI 1 Lumajang.',
  alternates: {
    canonical: '/ppdb/status',
  },
};

export default function PpdbStatusLayout({ children }: { children: React.ReactNode }) {
  return children;
}
