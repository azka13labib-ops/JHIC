# Task Frontend: Fitur Wajib 8 - SEO & Performa (Penilaian 40%)

## Sumber Wajib dari PDF Guideline
> Final Day Kriteria Penilaian 40%: "Website dinilai dari **kestabilan akses, kecepatan loading**, & kemampuannya menghadapi trafik tinggi tanpa gangguan."
> Final Day PPT Halaman 3 (WAJIB ADA): "**Optimasi yang dilakukan untuk menurunkan latency dan meningkatkan kapasitas traffic**"

## Deskripsi
Performa frontend adalah salah satu hal paling terlihat oleh juri. Lighthouse Score yang tinggi = bukti konkret yang bisa ditunjukkan dalam hitungan detik. Target: **Lighthouse Score > 90 di semua kategori.**

---

## Todo List

### 1. SEO On-Page (Wajib di Setiap Halaman)
- [ ] Buat komponen `<Metadata />` generik menggunakan Next.js `generateMetadata`.
- [ ] Setiap halaman harus memiliki:
  - `<title>` yang unik dan deskriptif.
  - `<meta name="description">` yang relevan.
  - Open Graph tags (`og:title`, `og:description`, `og:image`) untuk share di WhatsApp/Socmed.
- [ ] Buat file `sitemap.xml` otomatis menggunakan package `next-sitemap`.
- [ ] Buat file `robots.txt` yang mengizinkan crawler Google.
- [ ] Tambahkan **JSON-LD Structured Data** (Schema.org) untuk profil sekolah di Homepage.

### 2. Optimasi Performa Gambar
- [ ] Gunakan komponen `<Image />` dari Next.js untuk **semua** tag `<img>`.
  - Otomatis menghasilkan format WebP/AVIF yang jauh lebih kecil.
- [ ] Set `priority={true}` pada gambar Hero Section (di-load pertama kali — LCP).
- [ ] Set `loading="lazy"` pada semua gambar yang berada di bawah layar (below-the-fold).
- [ ] Kompres semua aset gambar sebelum di-upload (gunakan Squoosh/TinyPNG).

### 3. Optimasi Performa JavaScript & CSS
- [ ] Gunakan **Dynamic Import** (`next/dynamic`) untuk komponen berat yang tidak perlu di-load saat halaman pertama kali dibuka (contoh: Chat Widget, Peta/Map).
- [ ] Pastikan tidak ada library yang diimpor secara penuh jika hanya butuh satu fungsi (Tree Shaking).
- [ ] Minimalkan penggunaan `useEffect` yang tidak perlu untuk mengurangi re-render.

### 4. Core Web Vitals — Target Skor
- [ ] **LCP (Largest Contentful Paint)** < 2.5 detik: Pastikan gambar hero di-compress dan pakai `priority`.
- [ ] **CLS (Cumulative Layout Shift)** < 0.1: Selalu set `width` dan `height` pada semua gambar/elemen dinamis.
- [ ] **INP/FID** < 200ms: Hindari blokade thread utama dengan kode berat.

### 5. Pengujian & Bukti untuk Pitch Deck (WAJIB!)
- [ ] Jalankan **Google Lighthouse** di versi production (bukan dev mode).
  - **Screenshot hasil Lighthouse** untuk dimasukkan ke slide PPT Final Day.
- [ ] Jalankan **PageSpeed Insights** (https://pagespeed.web.dev) dan screenshot hasilnya.
- [ ] Gunakan **WebPageTest.org** untuk mengukur Time-to-First-Byte (TTFB) dari server VPS.

### 6. Logo 5 Wajib (JANGAN SAMPAI LUPA!)
- [ ] Cantumkan 5 logo wajib di Footer website:
  - JHIC
  - Jagoan Hosting
  - Komdigi
  - Garuda Spark
  - Ngalup
- [ ] Download logo resmi dari link yang disediakan panitia.
