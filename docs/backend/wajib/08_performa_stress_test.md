# Task Backend: Fitur Wajib 8 - Performa & Stress Test

## Sumber Wajib dari PDF Guideline
> Final Day Kriteria Penilaian 40%: "Website dinilai dari **kestabilan akses, kecepatan loading, & kemampuannya menghadapi trafik tinggi tanpa gangguan**."
> Final Day PPT Halaman 4 (WAJIB ADA): "**Uji Performa & Hasil Analisis** — Metode pengujian (tools yang digunakan dan skema pengujian), Rencana peningkatan performa jika traffic lebih tinggi"

## Deskripsi
Ini adalah **bobot penilaian TERTINGGI (40%)**. Backend Laravel harus mampu menangani lonjakan trafik, memiliki response time rendah, dan bukti pengujian harus bisa dipresentasikan ke juri.

---

## Todo List

### 1. Optimasi Response Time Laravel
- [ ] Aktifkan **Route Caching** (`php artisan route:cache`).
- [ ] Aktifkan **Config Caching** (`php artisan config:cache`).
- [ ] Aktifkan **View Caching** (`php artisan view:cache`).
- [ ] Implementasikan Redis caching pada semua endpoint yang bersifat statis (Landing Page, Profil, dll).
- [ ] Pastikan semua query database menggunakan **Eager Loading** (hindari N+1 Query Problem).
- [ ] Tambahkan **Database Index** pada kolom yang sering digunakan sebagai filter/search.

### 2. Konfigurasi Queue untuk Performa
- [ ] Jalankan **Laravel Queue Worker** (proses email & notifikasi secara asinkron).
- [ ] Gunakan Redis sebagai queue driver (bukan database).
- [ ] Pastikan queue worker berjalan via `supervisor` agar tidak mati jika server restart.

### 3. Stress Test & Load Testing (WAJIB UNTUK PITCH DECK)
- [ ] Install **Apache JMeter** atau gunakan tool online seperti **k6** / **Locust**.
- [ ] Buat skenario stress test (simulasi 100, 500, 1000 concurrent users).
  - Target URL: Homepage, Halaman PPDB, Endpoint API.
- [ ] **Dokumentasikan hasilnya** (screenshot/grafik) untuk dimasukkan ke slide PPT Final Day.
- [ ] Hasil yang perlu dicatat:
  - Rata-rata Response Time (ms).
  - Throughput (request/s).
  - Error rate (%).

### 4. Keamanan API (Security Hardening)
- [ ] Pastikan semua endpoint publik dilindungi oleh **Rate Limiter** Laravel.
- [ ] Semua request yang mengubah data memerlukan **CSRF atau Sanctum Token**.
- [ ] Nonaktifkan mode debug (`APP_DEBUG=false`) di environment production.
- [ ] Semua response API **tidak mengekspos stack trace** error ke client.
