# Task Backend: Fitur Wajib 8 - Performa & Stress Test

## Sumber Wajib dari PDF Guideline
> Final Day Kriteria Penilaian **40%**: "Website dinilai dari **kestabilan akses, kecepatan loading, & kemampuannya menghadapi trafik tinggi tanpa gangguan**."
> Final Day PPT Halaman 4 (WAJIB ADA): "**Uji Performa & Hasil Analisis** — Metode pengujian (tools yang digunakan dan skema pengujian), Rencana peningkatan performa jika traffic lebih tinggi"

## Deskripsi
Bobot penilaian TERTINGGI (40%). Backend harus mampu menangani trafik tinggi dengan response time rendah. Gunakan strategi **berlapis** agar server tidak kewalahan.

---

## Arsitektur Caching Berlapis

```
User Request
     │
     ▼
[1] Cloudflare CDN (Global Cache - Gratis!)
     │  Cache hit → langsung kirim ke user, VPS tidak tersentuh
     │  Cache miss ↓
     ▼
[2] Nginx (Static Files & Gzip)
     │  File .js/.css/gambar → langsung serve dari disk
     │  Request ke /api/* ↓
     ▼
[3] Laravel (PHP-FPM + OPcache)
     │  Cek Redis Cache dulu
     │  Redis hit → kembalikan response, tidak sentuh database
     │  Redis miss ↓
     ▼
[4] MySQL (Database)
     │  Query dioptimasi dengan Index & Eager Loading
     └─ Hasil di-cache ke Redis untuk request berikutnya
```

---

## Todo List

### 1. Layer 1 — Next.js SSG/ISR (Paling Efektif, Effort Rendah)
> **Strategi terbaik: jangan biarkan request sampai ke Laravel sama sekali.**

- [ ] Gunakan **Static Site Generation (SSG)** (`generateStaticParams`) untuk halaman:
  - Landing Page, Profil Sekolah, Daftar Jurusan, Prestasi, Daftar Produk.
  - Halaman ini di-generate saat build, disajikan sebagai HTML statis — **Laravel tidak pernah dipanggil.**
- [ ] Gunakan **Incremental Static Regeneration (ISR)** (`revalidate`) untuk halaman semi-dinamis:
  - Berita, Detail Produk → re-generate otomatis setiap X menit di background.
- [ ] **Impact:** Mengurangi beban VPS hingga **80-90%** untuk trafik besar.

### 2. Layer 2 — Cloudflare (CDN Gratis, Wajib Dipasang!)
- [ ] Daftarkan domain ke **Cloudflare (gratis)**.
- [ ] Aktifkan Cloudflare **Caching Rules** untuk cache halaman publik di edge server global.
- [ ] Aktifkan **"Under Attack Mode"** jika trafik stress test terlalu tinggi (sebagai fallback).
- [ ] Aktifkan **Rocket Loader** & **Auto Minify** di Cloudflare.
- [ ] **Bonus:** Cloudflare juga memblokir DDoS secara otomatis — VPS aman dari serangan.

### 3. Layer 3 — Redis Full-Stack Caching di Laravel
- [ ] Install package `spatie/laravel-responsecache`:
  ```bash
  composer require spatie/laravel-responsecache
  ```
  Tambahkan middleware ke route publik → **cache seluruh HTTP response otomatis**, tanpa perubahan kode Controller.
- [ ] Implementasikan **manual Redis cache** di setiap Controller yang melayani data statis:
  ```php
  return Cache::remember('school-info', now()->addDay(), fn() => SchoolProfile::first());
  ```
- [ ] Set TTL (Time-To-Live) yang tepat:
  - Landing Page / Profil: **24 jam**
  - Berita / Produk: **1 jam**
  - Data PPDB (real-time): **tidak di-cache**
- [ ] Gunakan **Cache Tags** untuk invalidasi cache secara presisi saat admin update data:
  ```php
  Cache::tags(['news'])->flush(); // Hanya hapus cache berita
  ```

### 4. Layer 4 — Optimasi PHP & Laravel (Effort Sangat Rendah)
- [ ] Aktifkan **OPcache** di `php.ini` (bytecode caching — PHP tidak perlu parse file setiap request):
  ```ini
  opcache.enable=1
  opcache.memory_consumption=128
  opcache.max_accelerated_files=10000
  opcache.validate_timestamps=0  # Nonaktifkan di production!
  ```
- [ ] Jalankan semua perintah optimasi artisan saat deploy:
  ```bash
  php artisan config:cache    # +20% lebih cepat
  php artisan route:cache     # Parse route sekali saja
  php artisan view:cache      # Compile Blade sekali saja
  php artisan event:cache     # Cache event listeners
  composer install --optimize-autoloader --no-dev
  ```

### 5. Layer 5 — Nginx Gzip & Static File Serving
- [ ] Aktifkan **Gzip compression** di Nginx config:
  ```nginx
  gzip on;
  gzip_types text/plain text/css application/json application/javascript;
  gzip_min_length 1024;
  ```
  Ukuran response turun **60-80%** → loading lebih cepat.
- [ ] Nginx melayani file statis (gambar, JS, CSS) langsung dari disk, **tanpa menyentuh PHP atau Node**.
- [ ] Tambahkan **browser caching header** untuk aset statis:
  ```nginx
  location ~* \.(jpg|jpeg|png|webp|css|js)$ {
      expires 30d;
      add_header Cache-Control "public, immutable";
  }
  ```

### 6. Layer 6 — Database Query Optimization
- [ ] **Hindari N+1 Query Problem** — selalu gunakan Eager Loading:
  ```php
  // ❌ Buruk (N+1)
  $products = Product::all();
  foreach ($products as $p) { $p->category->name; }

  // ✅ Benar (1 query)
  $products = Product::with('category')->get();
  ```
- [ ] Tambahkan **Database Index** pada kolom yang sering digunakan untuk filter/search:
  ```php
  $table->index('category_id');
  $table->index(['status', 'created_at']); // Composite index
  ```
- [ ] Gunakan **Pagination** (`paginate(15)`) pada semua endpoint list — jangan return semua data sekaligus.
- [ ] Gunakan `select('id', 'name', 'slug')` — hanya ambil kolom yang dibutuhkan, jangan `SELECT *`.

### 7. Layer 7 — Async Queue (Jangan Bikin User Tunggu)
- [ ] Semua operasi berat dipindah ke background Queue:
  ```
  User submit PPDB → API: 200 OK (instant) → Queue Worker:
                                                - Kirim email notifikasi
                                                - Resize foto upload
                                                - Log aktivitas
  ```
- [ ] Gunakan **Redis** sebagai queue driver (`QUEUE_CONNECTION=redis` di `.env`).
- [ ] Jalankan queue worker via **Supervisor** agar tidak mati saat server restart:
  ```ini
  [program:laravel-worker]
  command=php /var/www/backend/artisan queue:work redis --sleep=3 --tries=3
  autostart=true
  autorestart=true
  ```

### 8. Konfigurasi PHP-FPM untuk Trafik Tinggi
- [ ] Sesuaikan `pm.max_children` dengan RAM VPS:
  ```ini
  ; Rumus: max_children = (RAM tersedia) / (RAM per proses PHP)
  ; Contoh VPS 2GB: (1.5GB) / (30MB per PHP) ≈ 50 proses
  pm = dynamic
  pm.max_children = 50
  pm.start_servers = 10
  pm.min_spare_servers = 5
  pm.max_spare_servers = 20
  ```

---

## Stress Test & Bukti untuk Pitch Deck (WAJIB!)

### Tools yang Digunakan
- [ ] **k6** (cloud atau CLI) — pilihan utama, mudah digunakan, hasilnya visual
  ```bash
  # Skenario: 100 virtual users selama 30 detik
  k6 run --vus 100 --duration 30s script.js
  ```
- [ ] **Apache JMeter** — alternatif dengan GUI, mudah di-screenshot

### Skenario Test yang Wajib Dijalankan
| Skenario | Virtual Users | Durasi | Target |
|---|---|---|---|
| Normal Load | 50 VU | 1 menit | Baseline |
| Peak Load | 200 VU | 1 menit | Masih stabil |
| Stress Test | 500 VU | 2 menit | Error rate < 1% |

### Hasil yang Didokumentasikan untuk Slide PPT
- [ ] Rata-rata **Response Time** (target: < 500ms)
- [ ] **Throughput** (request per detik)
- [ ] **Error Rate** (target: < 1%)
- [ ] Screenshot grafik dari k6 atau JMeter
- [ ] Perbandingan **sebelum vs sesudah** optimasi (Redis cache on vs off)

---

## Security Hardening (Bonus Poin)
- [ ] Set `APP_DEBUG=false` dan `APP_ENV=production` di `.env` production.
- [ ] Semua response error **tidak mengekspos stack trace** ke client.
- [ ] Rate limiting pada semua endpoint publik (max 100 req/menit per IP).
- [ ] Header keamanan HTTP via Nginx: `X-Content-Type-Options`, `X-Frame-Options`, `HSTS`.
