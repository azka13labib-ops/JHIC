import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Penerimaan Peserta Didik Baru (PPDB)',
  description: 'Informasi resmi pendaftaran peserta didik baru (PPDB) SMA PGRI 1 Lumajang. Jalur prestasi, zonasi, dan reguler.',
  alternates: {
    canonical: '/ppdb',
  },
  openGraph: {
    title: 'PPDB SMA PGRI 1 Lumajang',
    description: 'Informasi resmi pendaftaran peserta didik baru (PPDB) SMA PGRI 1 Lumajang. Jalur prestasi, zonasi, dan reguler.',
    url: 'https://smapgri1lumajang.sch.id/ppdb',
  },
};

export default function PpdbLayout({ children }: { children: React.ReactNode }) {
  return children;
}
