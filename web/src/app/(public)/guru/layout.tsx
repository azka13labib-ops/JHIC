import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Direktori Guru & Tenaga Pendidik',
  description: 'Profil dewan guru dan tenaga kependidikan berdedikasi SMA PGRI 1 Lumajang.',
  alternates: {
    canonical: '/guru',
  },
};

export default function GuruLayout({ children }: { children: React.ReactNode }) {
  return children;
}
