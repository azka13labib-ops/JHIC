import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ekstrakurikuler & Pengembangan Bakat Siswa',
  description: 'Daftar kegiatan ekstrakurikuler wajib dan pilihan di SMA PGRI 1 Lumajang: olahraga, seni, sains, kepramukaan, dan keagamaan.',
  alternates: {
    canonical: '/ekstrakurikuler',
  },
};

export default function EkstrakurikulerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
