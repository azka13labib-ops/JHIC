# SMA PGRI 1 Lumajang - Integrated School Information System

Sistem Informasi Terpadu SMA PGRI 1 Lumajang adalah platform digital komprehensif yang dirancang untuk mendigitalisasi seluruh aspek informasi, pendaftaran, dan layanan interaktif sekolah. Platform ini memodernisasi cara sekolah berinteraksi dengan siswa, orang tua, alumni, dan masyarakat luas melalui antarmuka pengguna yang responsif dan sistem manajemen konten yang dinamis.

Proyek ini dibangun menggunakan arsitektur Decoupled (Pemisahan antara Client-side dan Server-side API), yang memastikan skalabilitas tinggi, keamanan berlapis, serta pengalaman pengguna yang mulus dan cepat.

---

## Arsitektur Sistem

Platform ini terdiri dari dua sistem utama yang berkomunikasi melalui RESTful API:

### 1. Frontend (Antarmuka Pengguna & Panel Admin)
Bagian ini bertanggung jawab atas semua tampilan dan interaksi pengguna, baik untuk pengunjung publik maupun administrator sekolah.
- **Framework Utama:** Next.js 16 (App Router)
- **Library UI & Styling:** React 19, Tailwind CSS v4, Lucide Icons, Headless UI
- **Manajemen State & Fetching:** React Hooks, Server-Side Fetching (SSR), dan Incremental Static Regeneration (ISR)
- **Autentikasi & Otorisasi:** NextAuth.js (JWT Strategy)
- **Bahasa Pemrograman:** TypeScript (Strict Typing)

### 2. Backend (REST API & Database Management)
Bagian ini berfungsi sebagai mesin utama yang memproses logika bisnis, mengelola basis data, dan menyediakan antarmuka pemrograman (API) yang aman.
- **Framework Utama:** Laravel 13
- **Bahasa Pemrograman:** PHP 8.4
- **Sistem Basis Data:** MySQL (Relational Database Management System)
- **Autentikasi API:** Laravel Sanctum
- **Manajemen File:** Local Storage dengan optimasi path symlink

---

## Modul dan Fitur Sistem

Platform ini mencakup berbagai modul fungsional yang dirancang khusus untuk kebutuhan manajemen sekolah menengah atas:

### Modul Profil dan Informasi Publik
- **Profil Sekolah:** Menyajikan sejarah, visi dan misi, fasilitas sekolah, dan sambutan kepala sekolah secara terstruktur.
- **Program Akademik:** Detail informasi mengenai jurusan (MIPA, IPS, Ilmu Bahasa dan Budaya) beserta deskripsi kompetensi.
- **Ekstrakurikuler & Prestasi:** Katalog kegiatan di luar jam pelajaran dan rekam jejak penghargaan yang diraih oleh siswa maupun sekolah.
- **Direktori Guru & Tenaga Kependidikan:** Daftar lengkap staf pengajar dengan keahlian masing-masing.

### Modul Penerimaan Peserta Didik Baru (PPDB) Online
- **Pendaftaran Mandiri:** Calon siswa dapat mengisi formulir pendaftaran secara daring.
- **Manajemen Berkas:** Fasilitas unggah dokumen persyaratan (Ijazah, KK, Akta Kelahiran, dll) secara terpusat.
- **Pelacakan Status:** Calon siswa dapat memantau status verifikasi pendaftaran dan hasil seleksi.

### Modul Interaktif dan Komunitas
- **Buku Tamu Digital:** Rekaman kunjungan virtual dan umpan balik dari pengunjung website.
- **Sistem Pelaporan (Lapor):** Saluran komunikasi untuk menyampaikan keluhan, saran, atau masukan secara formal.
- **Karya Siswa & Blog:** Media publikasi hasil kreativitas, opini, dan tulisan dari para siswa.

### Modul Bursa Kerja Khusus (BKK) dan Alumni
- **Direktori Alumni:** Database lulusan dengan informasi pekerjaan saat ini atau instansi pendidikan lanjutan.
- **Portal Karir:** Publikasi lowongan pekerjaan dari perusahaan mitra yang dapat dilamar langsung melalui platform oleh para alumni.
- **Produk Kewirausahaan:** Etalase digital untuk mempromosikan produk hasil karya kewirausahaan siswa dan sekolah.

### Modul Manajemen Konten (Admin Dashboard)
- **Manajemen Berita & Artikel:** CMS dinamis untuk menerbitkan buletin, pengumuman, dan artikel sekolah.
- **Manajemen Agenda:** Kalender kegiatan akademik dan non-akademik.
- **Galeri Multimedia:** Pengelolaan album foto dokumentasi kegiatan sekolah.
- **Pengaturan Modul:** Administrator memiliki kontrol penuh untuk mengaktifkan, menonaktifkan, mengedit, atau menghapus data pada seluruh entitas di dalam website.

---

## Keunggulan Teknis

1. **Kecepatan dan Performa Tinggi:** Penggunaan metode pre-rendering (Static Generation) pada Next.js memastikan halaman publik dimuat dalam hitungan milidetik, sementara data dinamis tetap diperbarui secara mulus di latar belakang.
2. **Search Engine Optimization (SEO):** Implementasi meta tag dinamis, sitemap otomatis, dan struktur semantik HTML membuat seluruh halaman informasi sekolah mudah diindeks oleh mesin pencari seperti Google.
3. **Desain Responsif:** Antarmuka (User Interface) dirancang dengan prinsip Mobile-First, menjamin kenyamanan navigasi baik melalui perangkat seluler, tablet, maupun desktop.
4. **Keamanan Data (Data Security):** Komunikasi antara frontend dan backend diamankan melalui pertukaran token terenkripsi. Kata sandi (password) dan data sensitif pengguna dilindungi menggunakan algoritma hashing standar industri (Bcrypt).

---

## Lisensi dan Kepemilikan Hak Cipta

Perangkat lunak ini dikembangkan dan disesuaikan sepenuhnya untuk operasional dan manajemen internal SMA PGRI 1 Lumajang. Seluruh kode sumber, desain antarmuka, dan struktur basis data tunduk pada kebijakan kepemilikan dan tata kelola sistem informasi sekolah.
