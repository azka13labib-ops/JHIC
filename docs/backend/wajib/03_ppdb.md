# Task Backend: Fitur 2 - Website PPDB

## Deskripsi
Sistem registrasi, autentikasi, dan pengumpulan berkas calon siswa baru.

## Todo List
- [ ] Buat Migration & Model untuk `Registrations` dan `RegistrationDocuments`.
- [ ] Endpoint Autentikasi Calon Siswa (Pendaftaran PPDB):
  - [ ] `POST /api/register` (Registrasi akun siswa baru).
  - [ ] `POST /api/login` (Login siswa).
  - [ ] `POST /api/logout`.
- [ ] Endpoint Proses PPDB (Perlu Middleware `auth:sanctum` & role siswa):
  - [ ] `POST /api/ppdb/submit` (Kirim data personal & akademik formulir PPDB).
  - [ ] `POST /api/ppdb/upload-doc` (Upload dokumen spt KK, Akta, Ijazah).
    - *Security*: Validasi ketat max size (2MB) dan MIME type (JPG, PNG, PDF).
  - [ ] `GET /api/ppdb/status` (Melihat status pendaftaran siswa yang sedang login).
- [ ] Keamanan: 
  - Enkripsi NIK / NISN di database jika diperlukan.
  - Hindari eksploitasi SQL Injection dengan validasi Form Request.
- [ ] (Opsional/Performa) Konfigurasi *Laravel Queue* untuk kirim Email notifikasi pendaftaran berhasil secara asinkron (tidak bikin lambat response API).
