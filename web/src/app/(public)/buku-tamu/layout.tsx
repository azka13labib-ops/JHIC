import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buku Tamu Digital',
  description: 'Ruang pesan, kesan, dan kunjungan tamu kehormatan, alumni, dan masyarakat di SMA PGRI 1 Lumajang.',
  alternates: {
    canonical: '/buku-tamu',
  },
};

export default function BukuTamuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
