# Task Backend: Fitur Wajib 7 - DevOps & Deployment (VPS Jagoan Hosting)

## Sumber Wajib dari PDF Guideline
> "Website sekolah dan seluruh halaman PPT yang dikembangkan **wajib mencantumkan 5 logo**"
> "Hasil karya yang dibuat peserta **wajib di-deploy di server Jagoan Hosting**"
> Bootcamp Day 4: "Deployment using VPS Hosting – Demo deploy hasil web/app melalui VPS Hosting"
> Final Day PPT Halaman 2: "**Optimasi & Strategi Skalabilitas**" — harus bisa dijelaskan ke juri!
> Final Day PPT Halaman 3: "Optimasi yang dilakukan untuk **menurunkan latency** dan meningkatkan **kapasitas traffic**"

## Deskripsi
Setup server VPS, containerisasi dengan Docker, konfigurasi Nginx sebagai reverse proxy, SSL, CI/CD, dan monitoring — semua ini **akan dinilai oleh juri** dan harus bisa dipresentasikan.

---

## Todo List

### 1. Konfigurasi VPS Awal (SysAdmin)
- [ ] Akses VPS Jagoan Hosting via SSH.
- [ ] Update & upgrade sistem (`apt update && apt upgrade`).
- [ ] Buat user non-root (jangan jalankan app sebagai `root`).
- [ ] Konfigurasi UFW Firewall (hanya buka port 22, 80, 443).
- [ ] Amankan SSH (nonaktifkan login root, gunakan SSH Key).
- [ ] Install Docker & Docker Compose di VPS.

### 2. Dockerisasi Aplikasi
- [ ] Buat `Dockerfile` untuk Laravel (`backend/Dockerfile`).
  - Base image: `php:8.3-fpm`.
  - Copy composer, install dependencies.
  - Expose via PHP-FPM.
- [ ] Buat `Dockerfile` untuk Next.js (`frontend/Dockerfile`).
  - Build Next.js dengan `npm run build`.
  - Jalankan dengan `node server.js` atau PM2.
- [ ] Buat `docker-compose.yml` di root project yang mengorkestrasi:
  - Service `laravel` (PHP-FPM).
  - Service `nextjs`.
  - Service `nginx` (Reverse Proxy).
  - Service `mysql`.
  - Service `redis`.

### 3. Konfigurasi Nginx
- [ ] Buat konfigurasi Nginx sebagai reverse proxy.
  - Traffic ke domain utama → Next.js (port 3000).
  - Traffic ke `/api/*` → Laravel (PHP-FPM port 9000).
- [ ] Aktifkan SSL/HTTPS menggunakan Let's Encrypt (Certbot).
- [ ] Tambahkan header keamanan HTTP (HSTS, X-Content-Type, dll.).

### 4. CI/CD dengan GitHub Actions
- [ ] Buat workflow `.github/workflows/deploy.yml`.
  - Trigger: setiap `push` ke branch `main`.
  - Steps: SSH ke VPS → `git pull` → `docker compose up -d --build`.
- [ ] Simpan secrets di GitHub Repository (VPS IP, SSH Key, dsb).

### 5. Performa & Kesiapan Stress Test
- [ ] Pastikan Redis aktif dan digunakan untuk caching API responses.
- [ ] Aktifkan Nginx `gzip` compression pada response teks/JS/CSS.
- [ ] Konfigurasi PHP-FPM `pm.max_children` sesuai RAM VPS.
- [ ] Aktifkan `opcache` di PHP untuk mempercepat eksekusi skrip Laravel.

### 6. Monitoring (Nilai SysAdmin Tinggi!)
- [ ] Install **Uptime Kuma** di VPS untuk monitoring uptime.
- [ ] Buat *Status Page* publik dari Uptime Kuma (tunjukkan ke juri sebagai bukti kestabilan).
- [ ] (Bonus) Setup Prometheus + Grafana untuk metrik server (CPU, RAM, Request/s).
