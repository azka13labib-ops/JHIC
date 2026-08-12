# Skema Database (MySQL) - JHIC 2.0 Web Development

Dokumen ini memuat rancangan skema database untuk memenuhi 5 fitur wajib dalam lomba JHIC 2.0.

---

## 🗺️ Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USERS ||--o{ NEWS : writes
    USERS ||--o{ REGISTRATIONS : has
    USERS ||--o{ INQUIRIES : submits
    USERS ||--o{ JOB_APPLICATIONS : submits

    REGISTRATIONS ||--o{ REGISTRATION_DOCUMENTS : owns

    PRODUCT_CATEGORIES ||--o{ PRODUCTS : categorizes
    PRODUCTS ||--o{ INQUIRIES : receives

    COMPANIES ||--o{ JOBS : posts
    JOBS ||--o{ JOB_APPLICATIONS : receives

    USERS {
        bigint id PK
        string name
        string email
        string password
        enum role "admin, student"
        timestamp created_at
    }

    SCHOOL_PROFILES {
        bigint id PK
        string name
        text tagline
        text vision
        text mission
        string phone
        string email
        text address
        string headmaster_name
        string headmaster_image
        text headmaster_message
    }

    NEWS {
        bigint id PK
        string title
        string slug
        text content
        string image_path
        bigint author_id FK
        timestamp published_at
    }

    ACHIEVEMENTS {
        bigint id PK
        string title
        text description
        string level "sekolah, kota, provinsi, nasional"
        int year
        string image_path
    }

    ALUMNI {
        bigint id PK
        string name
        int graduation_year
        string current_job
        string company
        text testimonial
        string image_path
    }

    PARTNERS {
        bigint id PK
        string name
        string logo_path
        text description
    }

    REGISTRATIONS {
        bigint id PK
        bigint user_id FK
        string registration_number
        enum status "pending, verified, accepted, rejected"
        string full_name
        string nisn
        date date_of_birth
        string gender
        text address
        string previous_school
        string major_choice
    }

    REGISTRATION_DOCUMENTS {
        bigint id PK
        bigint registration_id FK
        enum document_type "kk, akta, ijazah, pas_foto"
        string file_path
        enum status "pending, valid, invalid"
    }

    PRODUCT_CATEGORIES {
        bigint id PK
        string name
        string slug
    }

    PRODUCTS {
        bigint id PK
        bigint category_id FK
        string department "TKJ, RPL, Tata Boga, dll"
        string name
        string slug
        text description
        decimal price
        string image_path
        boolean is_active
    }

    INQUIRIES {
        bigint id PK
        bigint product_id FK
        bigint user_id FK "nullable"
        string name
        string phone
        string email
        text message
        enum status "unread, read, replied"
    }

    COMPANIES {
        bigint id PK
        string name
        string logo_path
        string industry
        text description
        string website
    }

    JOBS {
        bigint id PK
        bigint company_id FK
        string title
        string slug
        enum type "pkl, full_time, part_time"
        text description
        text requirements
        date deadline
        boolean is_active
    }

    JOB_APPLICATIONS {
        bigint id PK
        bigint job_id FK
        bigint user_id FK
        string cv_file_path
        text message
        enum status "pending, reviewed, accepted, rejected"
    }
```

---

## 📊 Detail Tabel

### 1. Autentikasi & Pengguna
- **`users`**: Tabel pengguna utama.
  - `role`: Membedakan antara `admin` (punya akses CMS) dan `student` (calon siswa/siswa yang login untuk PPDB atau melamar kerja).

### 2. Fitur 1 - Profil Sekolah (Landing Page)
Tabel-tabel ini relatif statis dan **sangat direkomendasikan untuk di-cache via Redis**.
- **`school_profiles`**: Informasi dasar sekolah (hanya butuh 1 row/record).
- **`news`**: Berita dan pengumuman sekolah. Relasi ke `users` (admin) sebagai author.
- **`achievements`**: Data prestasi siswa/sekolah.
- **`alumni`**: Profil lulusan terbaik/sukses.
- **`partners`**: Kerja sama industri (DUDI) untuk menampilkan logo mitra.

### 3. Fitur 2 - PPDB
- **`registrations`**: Data pendaftaran utama siswa baru. Satu `user` (student) idealnya hanya memiliki satu pendaftaran aktif. Memuat data diri, pilihan jurusan.
- **`registration_documents`**: Tabel relasi untuk menyimpan file dokumen syarat PPDB (KK, Akta Kelahiran, dll). Dipisah agar mudah mengelola status validasi per dokumen.

### 4. Fitur 3 - Produk Unggulan (BLUD)
- **`product_categories`**: Kategori produk.
- **`products`**: Data produk unggulan karya siswa. Memiliki kolom `department` (jurusan pembuat) dan `price`.
- **`inquiries`**: Pesan ketertarikan (order/tanya) dari pengunjung terkait suatu produk. Bisa dilakukan oleh `user` terdaftar maupun tamu (tamu = `user_id` null, pakai nama & email manual).

### 5. Fitur 4 - BKK (Pusat Karir & PKL)
- **`companies`**: Profil perusahaan mitra yang membuka lowongan/magang.
- **`jobs`**: Lowongan pekerjaan atau magang (PKL). Berelasi ke `companies`. Punya tipe khusus (`pkl` vs `full_time`).
- **`job_applications`**: Lamaran yang disubmit oleh siswa/alumni (`user`). Menyimpan path file CV dan status lamaran.

### 6. Fitur 5 - AI ChatBot
- *Catatan: AI ChatBot (Gemini) biasanya tidak memerlukan tabel khusus untuk menyimpan pesan jika kita murni menggunakan `sessionStorage` di sisi Frontend untuk memori percakapan sementara.*
- Jika di masa depan ingin menyimpan riwayat percakapan untuk analitik, bisa ditambahkan tabel `chat_sessions` dan `chat_messages`. Untuk sekarang (demi efisiensi dan performa), lebih baik tidak disimpan di DB.
