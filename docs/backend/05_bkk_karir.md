# Task Backend: Fitur 4 - PKL & Career Center (BKK)

## Deskripsi
Fitur lowongan pekerjaan bagi alumni dan informasi tempat magang/PKL bagi siswa.

## Todo List
- [ ] Buat Migration & Model: `Jobs` (Lowongan), `Companies` (Mitra Industri), `JobApplications`.
- [ ] Endpoint Lowongan:
  - [ ] `GET /api/jobs` (List lowongan, paginated).
  - [ ] `GET /api/jobs/{id}` (Detail lowongan).
- [ ] Filter Lowongan:
  - [ ] Tambahkan query params untuk filter berdasarkan tipe pekerjaan (PKL / Lulusan) dan lokasi.
- [ ] Endpoint Melamar:
  - [ ] `POST /api/jobs/{id}/apply` (Menerima data pelamar dan upload CV).
    - *Security*: Batasi tipe file hanya PDF, size max 5MB.
- [ ] Endpoint Mitra:
  - [ ] `GET /api/companies` (List profil perusahaan mitra yang bekerjasama dengan sekolah).
