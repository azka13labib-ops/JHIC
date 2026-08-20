import {
  LayoutDashboard,
  Newspaper,
  Trophy,
  Users,
  BookOpen,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  PenTool,
  GraduationCap,
  FolderOpen,
  Link as LinkIcon
} from 'lucide-react';

export interface NavGroup {
  group: string;
  items: {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

export const navigationGroups: NavGroup[] = [
  {
    group: 'UTAMA',
    items: [
      { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      { title: 'Pendaftaran PPDB', href: '/admin/ppdb', icon: Users, badge: 'PPDB 2026' },
    ],
  },
  {
    group: 'KONTEN & PUBLIKASI',
    items: [
      { title: 'Berita & Pengumuman', href: '/admin/news', icon: Newspaper },
      { title: 'Agenda Kegiatan', href: '/admin/agendas', icon: Calendar },
      { title: 'Artikel Edukasi', href: '/admin/articles', icon: BookOpen },
      { title: 'Galeri Foto', href: '/admin/galleries', icon: ImageIcon },
      { title: 'Karya Siswa', href: '/admin/student-works', icon: PenTool },
      { title: 'Opini & Gagasan', href: '/admin/opinions', icon: MessageSquare },
      { title: 'Blog Siswa', href: '/admin/blogs', icon: FolderOpen },
    ],
  },
  {
    group: 'AKADEMIK & KESISWAAN',
    items: [
      { title: 'Prestasi Siswa', href: '/admin/achievements', icon: Trophy },
      { title: 'Tracer Alumni', href: '/admin/alumni', icon: GraduationCap },
      { title: 'Buku Tamu Publik', href: '/admin/guestbooks', icon: MessageSquare },
      { title: 'Tautan Cepat', href: '/admin/quick-links', icon: LinkIcon },
    ],
  },
  {
    group: 'LAYANAN & PRODUK',
    items: [
      { title: 'Kotak Suara Aman', href: '/admin/reports', icon: MessageSquare, badge: 'Laporan' },
      { title: 'Produk (BLUD)', href: '/admin/products', icon: FolderOpen },
      { title: 'Lowongan (BKK)', href: '/admin/jobs', icon: Users },
    ],
  },
];
