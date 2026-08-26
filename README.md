# SMA PGRI 1 Lumajang - Integrated School Information System

Proyek ini adalah sistem informasi digital dan website profil terpadu untuk **SMA PGRI 1 Lumajang**. Sistem ini dibangun dengan arsitektur modern (*decoupled*) yang memisahkan frontend (tampilan publik dan panel admin) dengan backend (API dan pengelolaan database) untuk menjamin kecepatan, keamanan, dan kemudahan skalabilitas.

---

## 🚀 Arsitektur & Teknologi

Proyek ini terbagi menjadi dua direktori utama: `frontend` dan `backend`.

### 1. Frontend (Client-side & Admin Panel)
Dibangun menggunakan framework modern untuk performa maksimal dan SEO yang optimal.
- **Framework:** Next.js 16 (App Router)
- **Library UI:** React 19, Tailwind CSS v4, Lucide Icons
- **Autentikasi:** NextAuth.js
- **Bahasa:** TypeScript

### 2. Backend (REST API)
Berfungsi sebagai pusat data, logika bisnis, dan API provider untuk frontend.
- **Framework:** Laravel 13
- **Bahasa:** PHP 8.4
- **Database:** MySQL
- **Autentikasi API:** Laravel Sanctum

---

## ✨ Fitur Utama

- **Portal Publik Informatif:** Menyajikan sejarah, visi misi, daftar guru, galeri, agenda, dan berita sekolah secara dinamis.
- **PPDB Online:** Sistem Pendaftaran Peserta Didik Baru terintegrasi (unggah dokumen, pelacakan status).
- **Bursa Kerja Khusus (BKK):** Informasi lowongan pekerjaan dan program karir untuk alumni.
- **Wadah Karya & Opini Siswa:** Fasilitas untuk mempublikasikan artikel, blog, dan karya seni siswa.
- **Dashboard Admin:** Panel kontrol komprehensif bagi staf sekolah untuk mengelola konten web tanpa perlu keahlian pemrograman.
- **Buku Tamu Digital:** Form aspirasi dan umpan balik pengunjung.

---

## 🛠 Panduan Instalasi (Development)

Pastikan komputer Anda sudah terinstal **PHP 8.3+**, **Composer**, **Node.js (LTS)**, **pnpm**, dan **MySQL**.

### 1. Setup Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Sesuaikan konfigurasi database (DB_*) di file .env
php artisan migrate:fresh --seed
php artisan serve
```

### 2. Setup Frontend (Next.js)
```bash
cd frontend
pnpm install
cp .env.example .env
# Pastikan NEXT_PUBLIC_API_URL menunjuk ke backend Anda (misal: http://127.0.0.1:8000/api)
pnpm dev
```

---

## 🌍 Deployment

Sistem ini dirancang untuk di-*deploy* di server Linux (VPS).
- **Web Server:** Nginx (Reverse Proxy)
- **Process Manager:** PM2 (menjalankan service Next.js dan Laravel di latar belakang)
- **Jaringan:** Terhubung menggunakan Tailscale untuk VPN dan isolasi jaringan privat.

---

## 📝 Lisensi

Proyek ini dikembangkan secara spesifik untuk kebutuhan internal SMA PGRI 1 Lumajang.
