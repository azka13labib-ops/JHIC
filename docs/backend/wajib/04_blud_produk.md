# Task Backend: Fitur 3 - Produk Unggulan Sekolah (BLUD)

## Deskripsi
Katalog produk/jasa yang dibuat oleh jurusan di sekolah beserta fitur untuk melakukan inquiry pembelian.

## Todo List
- [x] Buat Migration & Model untuk `Products`, `ProductCategories`, dan `Inquiries`.
- [x] Endpoint Katalog Produk:
  - [x] `GET /api/products` (Tampilkan semua produk dengan Pagination).
  - [x] `GET /api/products/{slug}` (Detail produk).
- [x] Fitur Filter & Search:
  - [x] Tambahkan parameter filter di `GET /api/products` berdasarkan Kategori atau Jurusan.
  - [x] Tambahkan parameter search kata kunci.
- [x] Endpoint Inquiry:
  - [x] `POST /api/inquiries` (Endpoint untuk menerima form pemesanan/pertanyaan produk).
    - *Security*: Terapkan rate limit (max 5 kali submit per jam per IP) untuk hindari spam.
- [x] Performa: Tambahkan index database pada kolom `category_id` dan `jurusan` untuk mempercepat query filtering.
