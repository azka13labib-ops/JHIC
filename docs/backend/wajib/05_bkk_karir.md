# Task Backend: Fitur 4 - PKL & Career Center (BKK)

## Deskripsi
Fitur lowongan pekerjaan bagi alumni dan informasi tempat magang/PKL bagi siswa.

## Todo List
- [x] Buat Migration & Model: `Jobs` (Lowongan), `Companies` (Mitra Industri), `JobApplications`.
- [x] Endpoint Lowongan:
  - [x] `GET /api/jobs` (List lowongan, paginated).
  - [x] `GET /api/jobs/{id}` (Detail lowongan).
- [x] Filter Lowongan:
  - [x] Tambahkan query params untuk filter berdasarkan tipe pekerjaan (PKL / Lulusan) dan lokasi.
- [x] Endpoint Melamar:
  - [x] `POST /api/jobs/{id}/apply` (Menerima data pelamar dan upload CV).
    - *Security*: Batasi tipe file hanya PDF, size max 5MB.
- [x] Endpoint Mitra:
  - [x] `GET /api/companies` (List profil perusahaan mitra yang bekerjasama dengan sekolah).
