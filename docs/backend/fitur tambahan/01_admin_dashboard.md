# Task: Fitur Tambahan - Admin Dashboard (Terintegrasi di Next.js)

## Deskripsi
Panel admin untuk mengelola konten website (berita, prestasi, produk, PPDB) tanpa perlu edit kode. Mengingat keputusan arsitektur terbaru, panel admin ini **disatukan di dalam proyek Next.js** (berada di bawah route `/admin`), sementara Laravel hanya bertindak sebagai Headless API untuk menyuplai data.

---

## Backend (Laravel - Headless API)
- [ ] Batal menggunakan Filament PHP.
- [ ] Buat dan konfigurasi Laravel Sanctum untuk otentikasi API (Login Admin).
- [ ] Buat API Controllers & Resources untuk:
  - [ ] `NewsController` (CRUD Berita & Pengumuman).
  - [ ] `AchievementController` (CRUD Prestasi).
  - [ ] `ProductController` (CRUD Produk BLUD).
  - [ ] `JobController` (CRUD Lowongan BKK).
  - [ ] `RegistrationController` (Verifikasi & manajemen status PPDB).
- [ ] Proteksi route API admin dengan middleware `auth:sanctum`.
- [ ] Buat seeder untuk akun admin awal.

## Frontend (Next.js - Fullstack UI)
- [ ] Buat route group `(admin)` di dalam folder `src/app`.
- [ ] Setup dan integrasikan UI Library (misal: Shadcn UI / Tailwind UI) untuk mempercepat pembuatan komponen admin.
- [ ] Buat sistem Otentikasi menggunakan NextAuth.js (Auth.js) yang terhubung dengan API Login Laravel Sanctum.
- [ ] Bangun layout dasar admin dashboard (Sidebar navigasi & Topbar).
- [ ] Bangun halaman CRUD untuk Berita, Prestasi, Produk, Lowongan, dan PPDB dengan mengambil data dari Laravel API.
- [ ] Lindungi route `/admin` dengan middleware Next.js agar hanya admin yang sudah login yang bisa mengaksesnya.
