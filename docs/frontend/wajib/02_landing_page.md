# Task Frontend: Fitur 1 - Landing Page (Profil Sekolah)

## Deskripsi
Pembuatan halaman statis/SSG untuk informasi profil sekolah, jurusan, alumni, prestasi, dan mitra.

## Todo List
- [x] Buat halaman Homepage `app/page.tsx` (gunakan rendering SSG/Static).
  - [x] Hero Section dengan Call-to-Action (CTA) ke PPDB.
  - [x] Section Sambutan Kepala Sekolah & Visi Misi.
  - [x] Section Lulusan Terbaik.
  - [x] Section Daftar Jurusan/Program Keahlian.
  - [x] Section Kerja Sama Industri (cantumkan logo mitra).
- [x] Buat halaman khusus:
  - [x] `/prestasi` (Daftar prestasi lengkap).
  - [x] `/berita` (List berita).
  - [x] `/berita/[slug]` (Detail berita).
- [x] Integrasikan API Endpoint: `/api/school-info`, `/api/partners`, `/api/news`, dll.
- [ ] Optimasi Performa:
  - [ ] Gunakan `<Image />` Next.js dengan pengaturan `priority` pada gambar Hero.
  - [ ] Implementasikan *Lazy Loading* untuk gambar di *below-the-fold*.
- [ ] Cantumkan 5 Logo Wajib di Footer: JHIC, Jagoan Hosting, Komdigi, Garuda Spark, Ngalup.
