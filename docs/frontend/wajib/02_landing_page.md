# Task Frontend: Fitur 1 - Landing Page (Profil Sekolah)

## Deskripsi
Pembuatan halaman statis/SSG untuk informasi profil sekolah, jurusan, alumni, prestasi, dan mitra.

## Todo List
- [ ] Buat halaman Homepage `app/page.tsx` (gunakan rendering SSG/Static).
  - [ ] Hero Section dengan Call-to-Action (CTA) ke PPDB.
  - [ ] Section Sambutan Kepala Sekolah & Visi Misi.
  - [ ] Section Lulusan Terbaik.
  - [ ] Section Daftar Jurusan/Program Keahlian.
  - [ ] Section Kerja Sama Industri (cantumkan logo mitra).
- [ ] Buat halaman khusus:
  - [ ] `/prestasi` (Daftar prestasi lengkap).
  - [ ] `/berita` (List berita).
  - [ ] `/berita/[slug]` (Detail berita).
- [ ] Integrasikan API Endpoint: `/api/school-info`, `/api/partners`, `/api/news`, dll.
- [ ] Optimasi Performa:
  - [ ] Gunakan `<Image />` Next.js dengan pengaturan `priority` pada gambar Hero.
  - [ ] Implementasikan *Lazy Loading* untuk gambar di *below-the-fold*.
- [ ] Cantumkan 5 Logo Wajib di Footer: JHIC, Jagoan Hosting, Komdigi, Garuda Spark, Ngalup.
