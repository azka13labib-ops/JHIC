# 📋 PRD — Website Sekolah JHIC 2.0
> **Jagoan Hosting Innovation Competition 2.0 — Web Development**
> Stack: **Laravel (Backend API) + Next.js (Frontend)** | Deployment: **VPS Jagoan Hosting**

---

## 📌 Ringkasan Kompetisi

| Item | Detail |
|---|---|
| **Penyelenggara** | Jagoan Hosting x Ngalup x Komdigi |
| **Tema** | Website Sekolah SMA/SMK (Profil, PPDB, Produk, Karir, AI) |
| **Deadline Preliminary** | 30 Agustus 2026 pukul 16.59 WIB |
| **Short Bootcamp** | 21–24 September 2026 |
| **Final Day** | 17 Oktober 2026 (Offline, UNY Yogyakarta) |
| **Deployment Wajib** | VPS Jagoan Hosting (diberikan saat Bootcamp) |
| **Tim** | 3–5 orang, tiap orang punya role spesifik |

---

## 🏆 Kriteria Penilaian Final (Bobot Tertinggi)

| Kriteria | Bobot | Keterangan |
|---|---|---|
| **Performa Website** | **40%** | Kestabilan akses, kecepatan loading, tahan trafik tinggi |
| **Kreativitas & Inovasi** | **25%** | Keunikan desain dan fungsionalitas |
| **Copywriting & Digital Business** | **20%** | Strategi promosi, konten terstruktur |
| **Presentasi & QnA** | **15%** | Komunikasi ide, tenang menjawab pertanyaan |

> PENTING: **Performa Website** adalah bobot TERTINGGI (40%). Fokus utama adalah: kecepatan loading, ketahanan trafik (stress test), dan kestabilan di VPS.

---

## 🗂️ Role Tim

| Role | Tanggung Jawab |
|---|---|
| **System Administrator** | Setup server VPS, monitoring, maintain infrastruktur |
| **DevOps** | Otomatisasi deployment, CI/CD, scalability |
| **UI/UX** | Desain tampilan, wireframe Figma, interaktivitas |
| **Copywriter** | Konten tulisan website, komunikasi nilai sekolah |
| **Digital Business** | Strategi promosi, analitik, business impact |

---

## 🚀 Fitur Wajib — Breakdown Lengkap

---

### FITUR 1: Landing Page Utama (Profil Sekolah)
> **Halaman utama** yang menampilkan identitas sekolah, prestasi, jurusan, alumni terbaik, dan kerjasama industri.

#### Sub-halaman / Konten:
- Hero section (nama sekolah, tagline, CTA)
- Lulusan Terbaik / Alumni Unggulan
- Kerja Sama Industri (logo mitra)
- Daftar Jurusan / Program Keahlian
- Prestasi Sekolah (akademik & non-akademik)
- Visi, Misi, Sambutan Kepala Sekolah
- Galeri Foto / Kegiatan
- Berita & Pengumuman terbaru
- Footer (kontak, sosmed, peta)

#### Task Breakdown:
- [ ] Desain wireframe & mockup di Figma (UI/UX)
- [ ] Implementasi layout responsive (mobile-first) dengan Tailwind CSS
- [ ] Buat LandingPage component di Next.js dengan SSG (Static Site Generation)
- [ ] Buat API endpoint Laravel: GET /api/school-info, GET /api/achievements, GET /api/alumni, GET /api/news
- [ ] CMS Admin panel untuk update konten (Kepala Sekolah, visi-misi, prestasi)
- [ ] Implementasi Lazy Loading untuk gambar galeri
- [ ] Integrasi komponen Image Next.js (auto WebP + kompresi)
- [ ] Animasi scroll (Framer Motion / AOS)
- [ ] SEO: meta tags, Open Graph, sitemap.xml, robots.txt
- [ ] Cantumkan 5 logo wajib: JHIC, Jagoan Hosting, Komdigi, Garuda Spark, Ngalup

#### Keamanan:
- Rate limiting pada API publik (max 100 req/menit per IP via Laravel Throttle)
- Sanitasi input pada form kontak / newsletter (XSS prevention)
- HTTPS (SSL via Let's Encrypt, dikonfigurasi Nginx)
- Tidak mengekspos informasi sensitif server di response header

#### Performa:
- Target Lighthouse Score: **90+** (Performance, SEO, Accessibility)
- Gunakan SSG Next.js untuk halaman statis → Time to First Byte (TTFB) < 200ms
- Image optimization: WebP format, lazy loading, srcset
- Font: Google Fonts dengan display: swap agar tidak blocking render
- Cache static assets: Cache-Control max-age=31536000 via Nginx

#### Pertanyaan Terbuka:
- Sekolah apa yang dijadikan subjek? Nama sekolah, jurusan, dan data nyata apa yang sudah tersedia?
- Apakah ada desain/branding sekolah (warna, logo) yang harus diikuti?
- Apakah perlu fitur multi-bahasa (Indonesia/English)?

---

### FITUR 2: Website PPDB (Penerimaan Peserta Didik Baru)
> Sistem pendaftaran siswa baru secara online, dengan formulir, upload dokumen, dan tracking status.

#### Sub-fitur:
- Informasi PPDB (persyaratan, jalur masuk, jadwal)
- Formulir pendaftaran online (data diri calon siswa)
- Upload dokumen (ijazah, foto, dll)
- Sistem tracking status pendaftaran
- Dashboard admin untuk verifikasi & seleksi
- Pengumuman hasil seleksi
- Login/register untuk calon siswa

#### Task Breakdown:
- [ ] Desain flow PPDB (user flow diagram)
- [ ] Buat sistem autentikasi calon siswa (Laravel Sanctum / JWT)
- [ ] Formulir multi-step (Personal Info → Dokumen → Konfirmasi)
- [ ] Endpoint Laravel: POST /api/ppdb/register, GET /api/ppdb/status/{id}, PATCH /api/ppdb/verify/{id}
- [ ] File upload dengan validasi (max 2MB, format PDF/JPG/PNG)
- [ ] Storage: Laravel Storage (local disk / S3-compatible)
- [ ] Dashboard Admin: tabel peserta, filter status, export CSV
- [ ] Email notifikasi otomatis (Laravel Mail + Queue) saat status berubah
- [ ] Halaman pengumuman publik hasil seleksi
- [ ] Fitur countdown timer PPDB

#### Keamanan:
- **Autentikasi**: Laravel Sanctum dengan token expiry 24 jam
- **Validasi file upload**: MIME type whitelist (PDF, JPG, PNG), scan nama file (no path traversal)
- **CSRF Protection**: Laravel middleware VerifyCsrfToken aktif
- **Authorization**: Role-based (calon siswa vs admin) via Laravel Gates/Policies
- **Data sensitif**: Field NIS/NIK di-hash atau dienkripsi di database
- **SQL Injection**: Selalu gunakan Eloquent ORM / Query Builder (prepared statements)
- **Brute force login**: Throttle 5 attempt/menit per IP

#### Performa:
- Gunakan **Laravel Queue** (Redis driver) untuk pengiriman email → tidak blocking request
- Paginasi server-side untuk tabel peserta (1000+ data)
- Index database pada kolom: status, created_at, sekolah_asal
- Lazy loading dokumen (hanya fetch saat tab dibuka)

#### Pertanyaan Terbuka:
- Apakah PPDB perlu fitur **pembayaran online** (misal biaya pendaftaran)?
- Berapa jalur penerimaan yang perlu didukung? (Reguler, Prestasi, Afirmasi, dll)
- Apakah perlu **notifikasi WhatsApp** (via WhatsApp API) selain email?
- Berapa kapasitas siswa per tahun? (untuk estimasi ukuran database)

---

### FITUR 3: Promosi Produk Unggulan Sekolah (BLUD)
> Halaman promosi produk/jasa yang dihasilkan oleh siswa dan unit usaha sekolah (BLUD).

#### Sub-fitur:
- Katalog produk/jasa sekolah
- Detail produk (foto, deskripsi, harga)
- Filter & search produk per kategori/jurusan
- Form pemesanan / inquiry
- Galeri showcase karya siswa
- Testimonial pelanggan
- Integrasi dengan admin untuk manajemen produk

#### Task Breakdown:
- [ ] Desain halaman katalog (card grid layout, filter sidebar)
- [ ] Endpoint Laravel: GET /api/products, GET /api/products/{id}, POST /api/products (admin)
- [ ] Filter produk: by kategori, jurusan, harga (server-side filtering)
- [ ] Implementasi search full-text (Laravel Scout / LIKE query)
- [ ] Form inquiry/pesan: nama, email, produk, pesan → simpan ke DB + kirim email
- [ ] Admin CRUD produk (nama, foto, harga, stok, kategori, jurusan)
- [ ] Upload foto produk multiple (max 5 foto per produk)
- [ ] Halaman showcase (portfolio karya siswa per jurusan)
- [ ] Sistem rating/testimonial dari pembeli

#### Keamanan:
- Admin hanya bisa akses via authenticated route (middleware auth:sanctum + role admin)
- Validasi harga: pastikan bilangan positif, bukan negatif/manipulasi
- XSS prevention pada field deskripsi produk (strip HTML tags atau gunakan library sanitizer)
- Validasi file foto: MIME whitelist, max size 5MB

#### Performa:
- **Redis Cache**: Cache list produk dengan TTL 5 menit
- **Database Indexing**: Index pada category, jurusan, is_active
- **Image Optimization**: Resize otomatis saat upload (Intervention Image library)
- Infinite scroll atau pagination (lebih baik pagination untuk SEO)

#### Pertanyaan Terbuka:
- Apakah perlu fitur **keranjang belanja** dan **checkout** penuh, atau cukup **form inquiry**?
- Produk apa saja yang dimiliki sekolah saat ini? (butuh data nyata untuk demo)
- Apakah perlu integrasi **payment gateway** (Midtrans/Xendit)?

---

### FITUR 4: PKL & Career Center (BKK — Bursa Kerja Khusus)
> Portal magang (PKL), informasi lowongan kerja, dan penghubung alumni dengan industri.

#### Sub-fitur:
- Lowongan PKL (magang) dari perusahaan mitra
- Lowongan Kerja untuk alumni
- Profil perusahaan mitra
- Formulir pendaftaran PKL/Kerja
- Database alumni (opsional)
- Statistik penempatan kerja / PKL
- Admin manajemen lowongan

#### Task Breakdown:
- [ ] Desain halaman job board (kartu lowongan, filter, search)
- [ ] Endpoint Laravel: GET /api/jobs, POST /api/jobs (admin), POST /api/jobs/{id}/apply
- [ ] Filter lowongan: by tipe (PKL/Kerja), lokasi, jurusan, status
- [ ] Form lamaran: upload CV (PDF), data diri
- [ ] Dashboard admin: manajemen lowongan, list pelamar per lowongan
- [ ] Halaman statistik: jumlah lulusan terserap, partner industri aktif
- [ ] Email konfirmasi otomatis saat apply
- [ ] Halaman profil perusahaan mitra (logo, deskripsi, sosmed)

#### Keamanan:
- File CV upload: scan MIME type, max 5MB, hanya PDF
- Data pelamar (NIK, tanggal lahir) harus dienkripsi at-rest jika disimpan
- Admin endpoint dilindungi middleware role admin
- Rate limiting pada endpoint apply: max 3 apply per user per hari

#### Performa:
- Cache list lowongan aktif (TTL 10 menit)
- Full-text search dengan index atau Laravel Scout
- Soft delete untuk lowongan yang expired (tidak dihapus permanen)

#### Pertanyaan Terbuka:
- Apakah BKK sudah punya daftar perusahaan mitra yang nyata?
- Apakah alumni perlu punya akun/login untuk apply, atau cukup isi form tanpa login?
- Apakah perlu fitur **notifikasi ke perusahaan** saat ada pelamar baru?

---

### FITUR 5: AI Integrated Website (ChatBot)
> Chatbot berbasis AI yang bisa menjawab pertanyaan tentang sekolah, PPDB, produk, dan informasi lainnya.

#### Sub-fitur:
- Widget chat floating di semua halaman
- Menjawab pertanyaan umum tentang sekolah
- Panduan PPDB (cara daftar, syarat, jadwal)
- Informasi produk BLUD
- Info lowongan PKL/Kerja
- Fallback ke kontak manusia jika tidak bisa jawab
- History percakapan (session-based)

#### Task Breakdown:
- [ ] Pilih AI provider: **Google Gemini API** (gratis tier cukup untuk demo) atau OpenAI
- [ ] Buat sistem RAG (Retrieval-Augmented Generation): feed data sekolah (FAQ, PPDB, jurusan) ke context AI
- [ ] Endpoint Next.js: POST /api/chat (Route Handler) → streaming response
- [ ] Implementasi **streaming UI** (tampilan mengetik per kata, bukan muncul sekaligus)
- [ ] Widget chat UI: floating button, modal chat, bubble message (user vs bot)
- [ ] Simpan session chat di sessionStorage (tidak perlu login)
- [ ] Fallback message: "Silakan hubungi admin di 0812-xxxx" jika tidak tahu
- [ ] Knowledge base: file JSON/markdown berisi info sekolah → inject ke system prompt
- [ ] Admin panel: update knowledge base tanpa deploy ulang
- [ ] Rate limiting: max 20 pesan per session per jam

#### Keamanan:
- API key AI (Gemini/OpenAI) **WAJIB di server-side** (Next.js Route Handler / Laravel), TIDAK boleh di client-side/browser
- Input sanitasi: strip HTML, limit panjang pesan (max 500 karakter)
- Rate limiting per IP untuk prevent abuse API key
- Prompt injection prevention: system prompt dikunci, user tidak bisa override instruksi AI
- Tidak boleh menampilkan informasi sensitif (data siswa, password, dll) via chatbot

#### Performa:
- Gunakan **streaming response** (Server-Sent Events) agar UX terasa cepat
- Cache jawaban untuk pertanyaan yang sama/mirip (Redis dengan TTL 1 jam)
- Batasi panjang context/history yang dikirim ke API (max 10 pesan terakhir) untuk hemat token

#### Pertanyaan Terbuka:
- Pakai AI provider mana? **Gemini** (gratis, cocok untuk lomba) atau OpenAI?
- Apakah bot perlu bisa **beralih bahasa** (Indonesia/English/Jawa)?
- Seberapa detail pengetahuan bot? Apakah perlu bisa jawab info spesifik jurusan?

---

## Arsitektur Sistem (Laravel + Next.js + VPS)

```
+-----------------------------------------------+
|              VPS Jagoan Hosting               |
|                                               |
|  +----------+   +----------+   +----------+  |
|  |  Nginx   |-->| Next.js  |-->|  Laravel |  |
|  |(Reverse  |   | :3000    |   |  API     |  |
|  | Proxy)   |   |(Frontend)|   |  :8000   |  |
|  +----------+   +----------+   +----------+  |
|                                    |          |
|            +----------+   +--------v------+  |
|            |  Redis   |   |  MySQL        |  |
|            | (Cache + |   | (Database)    |  |
|            |  Queue)  |   |               |  |
|            +----------+   +---------------+  |
|  SSL/HTTPS via Let's Encrypt                  |
+-----------------------------------------------+
        |
        v
  External Services:
  - Gemini API / OpenAI API (ChatBot)
  - SMTP / Mailtrap (Email notifikasi)
```

---

## Tech Stack Detail

| Layer | Teknologi | Alasan |
|---|---|---|
| **Frontend** | Next.js 16 + TypeScript | SSG/SSR untuk performa, SEO optimal |
| **Styling** | Tailwind CSS v4 | Sudah ada di project, cepat develop |
| **Backend** | Laravel 12 (PHP 8.3+) | Ekosistem lengkap, cepat develop |
| **Database** | MySQL | Familiar, stabil, sudah via Laragon |
| **Cache** | Redis | Queue email + cache API response |
| **Web Server** | Nginx | Reverse proxy, SSL termination |
| **Process Manager** | PM2 (Next.js) + PHP-FPM (Laravel) | Production-ready |
| **Containerization** | Docker + Docker Compose | Portabilitas, nilai DevOps tinggi |
| **CI/CD** | GitHub Actions | Auto deploy ke VPS saat push main |
| **AI** | Google Gemini API | Gratis tier, tidak perlu kartu kredit |
| **Email** | Laravel Mail + Mailtrap (dev) | Email notifikasi |
| **Monitoring** | Uptime Kuma / Prometheus + Grafana | Nilai SysAdmin tinggi |

---

## Halaman yang Wajib Ada (14 Halaman)

| No | Halaman | Route | Rendering |
|---|---|---|---|
| 1 | Landing Page | / | SSG |
| 2 | Profil Sekolah | /profil | SSG |
| 3 | Daftar Jurusan | /jurusan | SSG |
| 4 | Detail Jurusan | /jurusan/[slug] | SSG |
| 5 | Prestasi | /prestasi | SSG |
| 6 | Berita | /berita, /berita/[slug] | ISR |
| 7 | PPDB - Info | /ppdb | SSG |
| 8 | PPDB - Daftar | /ppdb/daftar | CSR (butuh login) |
| 9 | PPDB - Status | /ppdb/status | CSR (butuh login) |
| 10 | Produk BLUD | /produk | SSR |
| 11 | Detail Produk | /produk/[slug] | SSR |
| 12 | PKL & BKK | /karir | SSR |
| 13 | Admin Dashboard | /admin | CSR (protected) |
| 14 | Kontak | /kontak | SSG |

---

## Keamanan Global (Berlaku untuk Semua Fitur)

- [ ] HTTPS via SSL Let's Encrypt (dikonfigurasi di Nginx)
- [ ] CORS dikonfigurasi di Laravel: hanya izinkan origin dari domain Next.js
- [ ] Laravel Sanctum untuk API authentication
- [ ] .env tidak pernah di-commit ke Git (wajib ada di .gitignore)
- [ ] Environment variable AI API key hanya di server (Next.js server-side / Laravel)
- [ ] Input validation di semua endpoint (Laravel Form Request)
- [ ] Response tidak mengekspos stack trace di production (APP_DEBUG=false)
- [ ] Database credentials tidak ada di kode source
- [ ] Semua query menggunakan Eloquent ORM (anti SQL injection)
- [ ] Headers keamanan via Nginx: X-Frame-Options, X-Content-Type-Options, Referrer-Policy

---

## Target Performa (Untuk Menang di Kriteria 40%)

| Metrik | Target |
|---|---|
| Lighthouse Performance Score | >= 90 |
| Time to First Byte (TTFB) | < 200ms |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Stress Test (concurrent users) | >= 100 concurrent tanpa error |

### Strategi Performa:
1. **Next.js SSG** untuk semua halaman publik yang jarang berubah
2. **Redis caching** untuk semua response API yang dipanggil sering
3. **Image optimization** via Next.js Image component (auto WebP, lazy load)
4. **Database indexing** pada semua kolom yang dipakai di WHERE clause
5. **Laravel Queue** untuk operasi berat (email, notifikasi) agar non-blocking
6. **Stress test** menggunakan k6 atau Apache JMeter → tampilkan hasilnya di slide presentasi

---

## Timeline Pengerjaan (Rekomendasi)

| Periode | Target |
|---|---|
| **Minggu 1 (sekarang)** | Setup project, database schema, autentikasi, CI/CD pipeline |
| **Minggu 2** | Landing page + Fitur PPDB (frontend + backend) |
| **Minggu 3** | Fitur BLUD produk + BKK Career Center |
| **Minggu 4** | ChatBot AI + Admin Dashboard |
| **Minggu 5** | Optimasi performa (Redis, Lighthouse, stress test) |
| **Minggu 6** | Polish UI/UX, konten nyata sekolah, persiapan slide |
| **Bootcamp (21-24 Sep)** | Deploy ke VPS Jagoan Hosting, finalisasi |
| **1-12 Okt** | Final polish, stress test live, siapkan PPT Final |
| **17 Okt** | FINAL DAY |

---

## Pertanyaan Kritis ke Tim (Harus Dijawab Sebelum Development)

WAJIB jawab semua pertanyaan di bawah sebelum coding dimulai.

### A. Tentang Sekolah (Konten)
1. **Nama sekolah** yang akan dijadikan subject website? (SMK X / SMA Y)
2. **Jurusan/Program keahlian** apa saja yang ada?
3. **Data nyata** apa yang sudah tersedia? (foto, prestasi, alumni, mitra industri)
4. **Logo & branding sekolah** (warna primer, sekunder, font)?
5. Apakah sekolah sudah punya **website lama** yang perlu di-refer?

### B. Tentang Fitur
6. PPDB: Apakah perlu **pembayaran online** atau cukup verifikasi manual?
7. BLUD: Apakah perlu **keranjang + checkout**, atau cukup **form inquiry**?
8. BKK: Apakah alumni perlu **buat akun** untuk melamar kerja?
9. ChatBot: AI provider mana? **Gemini** (gratis) atau OpenAI?
10. Apakah perlu fitur **multi-bahasa**?

### C. Tentang Tim & Teknis
11. Siapa yang jadi **System Administrator** (setup VPS, Nginx, Docker)?
12. Siapa yang jadi **DevOps** (CI/CD pipeline)?
13. Apakah ada tim yang **sudah bisa Laravel**? Siapa yang pegang backend?
14. Apakah ada yang sudah bisa **Figma** untuk UI/UX?
15. **Domain** apa yang akan dipakai? (diberikan panitia atau beli sendiri?)

### D. Tentang Pitch Deck (Deadline 30 Agustus!)
16. Sekolah apa yang dijadikan pain point utama? (Website lama kurang apa?)
17. Apa **business impact** yang akan diklaim? (efisiensi admin, peningkatan pendaftar PPDB, dll)

---

*Dokumen ini dibuat berdasarkan: Web Development Guideline - Jagoan Hosting Innovation Competition 2.0 (PDF Resmi)*
*Last updated: 2026-08-11*
