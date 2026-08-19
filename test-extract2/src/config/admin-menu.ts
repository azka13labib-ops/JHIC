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
      { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { title: 'Pendaftaran PPDB', href: '/ppdb', icon: Users, badge: 'PPDB 2026' },
    ],
  },
  {
    group: 'KONTEN & PUBLIKASI',
    items: [
      { title: 'Berita & Pengumuman', href: '/news', icon: Newspaper },
      { title: 'Agenda Kegiatan', href: '/agendas', icon: Calendar },
      { title: 'Artikel Edukasi', href: '/articles', icon: BookOpen },
      { title: 'Galeri Foto', href: '/galleries', icon: ImageIcon },
      { title: 'Karya Siswa', href: '/student-works', icon: PenTool },
      { title: 'Opini & Gagasan', href: '/opinions', icon: MessageSquare },
      { title: 'Blog Siswa', href: '/blogs', icon: FolderOpen },
    ],
  },
  {
    group: 'AKADEMIK & KESISWAAN',
    items: [
      { title: 'Prestasi Siswa', href: '/achievements', icon: Trophy },
      { title: 'Tracer Alumni', href: '/alumni', icon: GraduationCap },
      { title: 'Buku Tamu Publik', href: '/guestbooks', icon: MessageSquare },
      { title: 'Tautan Cepat', href: '/quick-links', icon: LinkIcon },
    ],
  },
];
