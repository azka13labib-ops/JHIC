# Task Backend: Fitur 3 - Produk Unggulan Sekolah (BLUD)

## Deskripsi
Katalog produk/jasa yang dibuat oleh jurusan di sekolah beserta fitur untuk melakukan inquiry pembelian.

## Todo List
- [ ] Buat Migration & Model untuk `Products`, `ProductCategories`, dan `Inquiries`.
- [ ] Endpoint Katalog Produk:
  - [ ] `GET /api/products` (Tampilkan semua produk dengan Pagination).
  - [ ] `GET /api/products/{slug}` (Detail produk).
- [ ] Fitur Filter & Search:
  - [ ] Tambahkan parameter filter di `GET /api/products` berdasarkan Kategori atau Jurusan.
  - [ ] Tambahkan parameter search kata kunci.
- [ ] Endpoint Inquiry:
  - [ ] `POST /api/inquiries` (Endpoint untuk menerima form pemesanan/pertanyaan produk).
    - *Security*: Terapkan rate limit (max 5 kali submit per jam per IP) untuk hindari spam.
- [ ] Performa: Tambahkan index database pada kolom `category_id` dan `jurusan` untuk mempercepat query filtering.
