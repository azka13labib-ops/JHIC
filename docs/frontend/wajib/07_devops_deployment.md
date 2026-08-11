# Task Frontend: Fitur Wajib 7 - DevOps & Deployment (VPS Jagoan Hosting)

## Sumber Wajib dari PDF Guideline
> "Hasil karya yang dibuat peserta **wajib di-deploy di server Jagoan Hosting**" — bukan Vercel!
> Bootcamp Day 4: "Deployment using VPS Hosting – Demo deploy hasil web/app melalui VPS Hosting"
> Final Day PPT Halaman 2: **"Fitur & Teknologi"** — Teknologi yang digunakan harus dicantumkan di slide.

## Deskripsi
Next.js **TIDAK** boleh di-deploy ke Vercel. Harus di-deploy ke VPS Jagoan Hosting. Task ini memastikan build Next.js siap untuk dijalankan di VPS via Docker.

---

## Todo List

### 1. Konfigurasi Build Production
- [ ] Pastikan semua environment variables API URL sudah dikonfigurasi di `.env.production`.
- [ ] Jalankan `npm run build` dan pastikan tidak ada error.
- [ ] Konfigurasi `next.config.ts` untuk output yang optimal:
  - Aktifkan `output: 'standalone'` untuk mempermudah deploy via Docker.
  - Konfigurasi `images.remotePatterns` untuk domain backend.

### 2. Dockerfile untuk Next.js
- [ ] Buat `frontend/Dockerfile` dengan multi-stage build:
  - Stage 1 (builder): Install dependencies & build.
  - Stage 2 (runner): Jalankan hanya file output (lebih kecil).
- [ ] Pastikan image Docker menggunakan Node.js versi yang sesuai.

### 3. Konfigurasi Environment Production
- [ ] Variabel `NEXT_PUBLIC_API_URL` mengarah ke domain backend di VPS (bukan localhost).
- [ ] Variabel `NEXT_PUBLIC_GEMINI_API_KEY` hanya boleh diakses dari server (bukan di client/browser).

### 4. Testing Pre-Deploy
- [ ] Jalankan build production secara lokal dengan Docker (`docker compose up`).
- [ ] Verifikasi semua halaman terbuka tanpa error di browser.
- [ ] Verifikasi komunikasi dengan API Laravel berjalan via endpoint `/api/*`.
