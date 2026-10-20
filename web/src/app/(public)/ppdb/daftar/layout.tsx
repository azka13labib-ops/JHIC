import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formulir Pendaftaran Online PPDB',
  description: 'Formulir pendaftaran online peserta didik baru (PPDB) SMA PGRI 1 Lumajang.',
  alternates: {
    canonical: '/ppdb/daftar',
  },
};

export default function PpdbDaftarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
