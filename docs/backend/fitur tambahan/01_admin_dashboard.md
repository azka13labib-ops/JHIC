# Task: Fitur Tambahan - Admin Dashboard (CMS)

## Deskripsi
Panel admin untuk mengelola konten website (berita, prestasi, produk, PPDB) tanpa perlu edit kode. Ini penting karena juri bisa menanyakan "bagaimana cara update konten website-mu?".

---

## Backend (Laravel) — Rekomendasi: Filament PHP
- [ ] Install Filament PHP (`composer require filament/filament`).
- [ ] Buat Filament Resource untuk:
  - [ ] `NewsResource` (CRUD Berita & Pengumuman).
  - [ ] `AchievementResource` (CRUD Prestasi).
  - [ ] `ProductResource` (CRUD Produk BLUD).
  - [ ] `JobResource` (CRUD Lowongan BKK).
  - [ ] `RegistrationResource` (Verifikasi & manajemen status PPDB).
- [ ] Proteksi panel Admin dengan login Filament (role admin).
- [ ] Buat seeder untuk akun admin awal.

## Frontend (Next.js)
- [ ] Tidak perlu membangun ulang UI Admin di Next.js — gunakan Filament.
- [ ] Pastikan ada link/navigasi ke panel admin Filament di halaman yang tepat (tidak publik).
