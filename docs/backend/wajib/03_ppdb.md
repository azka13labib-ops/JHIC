# Task Backend: Fitur 2 - Website PPDB

## Deskripsi
Sistem registrasi, autentikasi, dan pengumpulan berkas calon siswa baru.

## Todo List
- [x] Buat Migration & Model untuk `Registrations` dan `RegistrationDocuments`.
- [x] Endpoint Autentikasi Calon Siswa (Pendaftaran PPDB):
  - [x] `POST /api/register` (Registrasi akun siswa baru).
  - [x] `POST /api/login` (Login siswa).
  - [x] `POST /api/logout`.
- [x] Endpoint Proses PPDB (Perlu Middleware `auth:sanctum` & role siswa):
  - [x] `POST /api/ppdb/submit` (Kirim data personal & akademik formulir PPDB).
  - [x] `POST /api/ppdb/upload-doc` (Upload dokumen spt KK, Akta, Ijazah).
    - *Security*: Validasi ketat max size (2MB) dan MIME type (JPG, PNG, PDF).
  - [x] `GET /api/ppdb/status` (Melihat status pendaftaran siswa yang sedang login).
- [x] Keamanan: 
  - Enkripsi NIK / NISN di database jika diperlukan.
  - Hindari eksploitasi SQL Injection dengan validasi Form Request.
- [x] (Opsional/Performa) Konfigurasi *Laravel Queue* untuk kirim Email notifikasi pendaftaran berhasil secara asinkron (tidak bikin lambat response API).
