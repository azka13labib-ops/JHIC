# Task Backend: Fase 1 - Inisialisasi & Setup Dasar

## Deskripsi
Setup awal untuk backend Laravel, termasuk konfigurasi keamanan, database, dan environment.

## Todo List
- [x] Setup Laravel Sanctum untuk Autentikasi API (API Tokens).
- [x] Konfigurasi CORS agar bisa menerima request dari domain/port Next.js (port 3000).
- [x] Buat database MySQL di Laragon dan konfigurasikan `.env`.
- [x] Buat Model & Migration untuk `User` (Siswa dan Admin).
- [x] Setup *Role & Permission* (Menggunakan enum `role` di tabel users).
- [x] Konfigurasi Laravel Storage (jalankan `php artisan storage:link`) untuk upload file.
- [x] (Opsional) Setup Redis untuk Caching dan Queue.
