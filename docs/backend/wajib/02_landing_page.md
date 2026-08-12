# Task Backend: Fitur 1 - Landing Page (Profil Sekolah)

## Deskripsi
Penyediaan API untuk data dinamis yang akan ditampilkan di halaman utama dan profil sekolah. Karena datanya jarang berubah, implementasikan *caching* untuk skor performa tinggi (40% bobot penilaian).

## Todo List
- [x] Buat Migration, Model, dan Factory/Seeder untuk:
  - `SchoolProfiles` (Visi, Misi, Sambutan Kepala Sekolah, Kontak).
  - `Achievements` (Daftar prestasi).
  - `Alumnis` (Profil lulusan terbaik).
  - `Partners` (Kerja sama industri/mitra).
  - `News` (Berita sekolah).
- [x] Buat API Endpoint:
  - [x] `GET /api/school-info`
  - [x] `GET /api/achievements`
  - [x] `GET /api/alumni`
  - [x] `GET /api/partners`
  - [x] `GET /api/news`
- [x] Terapkan *Rate Limiting* (max 100 req/min per IP).
- [x] Terapkan Redis Caching pada endpoint tersebut dengan TTL (Time-To-Live) yang memadai (misal 1 hari).
