# Skema Migrasi Database (Laravel)

Berikut adalah struktur kode migrasi Laravel (`Schema::create`) untuk semua tabel yang dibutuhkan untuk memenuhi 5 fitur wajib JHIC 2.0.

---

### 1. Update Tabel Users (Autentikasi & Role)
Tambahkan kolom `role` pada tabel bawaan Laravel.

```php
Schema::table('users', function (Blueprint $table) {
    // Tambahkan setelah kolom password
    $table->enum('role', ['admin', 'student'])->default('student')->after('password');
});
```

---

### 2. Fitur 1 - Profil Sekolah (Landing Page)

```php
Schema::create('school_profiles', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('tagline')->nullable();
    $table->text('vision')->nullable();
    $table->text('mission')->nullable();
    $table->string('phone')->nullable();
    $table->string('email')->nullable();
    $table->text('address')->nullable();
    $table->string('headmaster_name')->nullable();
    $table->string('headmaster_image')->nullable();
    $table->text('headmaster_message')->nullable();
    $table->timestamps();
});

Schema::create('news', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('slug')->unique();
    $table->text('content');
    $table->string('image_path')->nullable();
    $table->foreignId('author_id')->constrained('users')->cascadeOnDelete();
    $table->timestamp('published_at')->nullable();
    $table->timestamps();
});

Schema::create('achievements', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('description')->nullable();
    $table->enum('level', ['sekolah', 'kota', 'provinsi', 'nasional', 'internasional']);
    $table->year('year');
    $table->string('image_path')->nullable();
    $table->timestamps();
});

Schema::create('alumnis', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->year('graduation_year');
    $table->string('current_job')->nullable();
    $table->string('company')->nullable();
    $table->text('testimonial')->nullable();
    $table->string('image_path')->nullable();
    $table->timestamps();
});

Schema::create('partners', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('logo_path');
    $table->text('description')->nullable();
    $table->timestamps();
});
```

---

### 3. Fitur 2 - PPDB

```php
Schema::create('registrations', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
    $table->string('registration_number')->unique();
    $table->enum('status', ['pending', 'verified', 'accepted', 'rejected'])->default('pending');
    
    // Data Diri
    $table->string('full_name');
    $table->string('nisn', 20)->unique();
    $table->date('date_of_birth');
    $table->enum('gender', ['L', 'P']);
    $table->text('address');
    $table->string('previous_school');
    $table->string('major_choice'); // Jurusan yang dipilih
    
    $table->timestamps();
});

Schema::create('registration_documents', function (Blueprint $table) {
    $table->id();
    $table->foreignId('registration_id')->constrained('registrations')->cascadeOnDelete();
    $table->enum('document_type', ['kk', 'akta_kelahiran', 'ijazah', 'pas_foto']);
    $table->string('file_path');
    $table->enum('status', ['pending', 'valid', 'invalid'])->default('pending');
    $table->timestamps();
});
```

---

### 4. Fitur 3 - Produk Unggulan Sekolah (BLUD)

```php
Schema::create('product_categories', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('slug')->unique();
    $table->timestamps();
});

Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->foreignId('category_id')->constrained('product_categories')->cascadeOnDelete();
    $table->string('department'); // Jurusan pembuat produk, misal: TKJ, RPL
    $table->string('name');
    $table->string('slug')->unique();
    $table->text('description');
    $table->decimal('price', 15, 2);
    $table->string('image_path')->nullable();
    $table->boolean('is_active')->default(true);
    $table->timestamps();
    
    // Optimasi performa untuk filter
    $table->index('category_id');
    $table->index('department');
});

Schema::create('inquiries', function (Blueprint $table) {
    $table->id();
    $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
    $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
    $table->string('name');
    $table->string('phone')->nullable();
    $table->string('email');
    $table->text('message');
    $table->enum('status', ['unread', 'read', 'replied'])->default('unread');
    $table->timestamps();
});
```

---

### 5. Fitur 4 - PKL & Career Center (BKK)

```php
Schema::create('companies', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('logo_path')->nullable();
    $table->string('industry')->nullable();
    $table->text('description')->nullable();
    $table->string('website')->nullable();
    $table->timestamps();
});

Schema::create('jobs', function (Blueprint $table) {
    $table->id();
    $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();
    $table->string('title');
    $table->string('slug')->unique();
    $table->enum('type', ['pkl', 'full_time', 'part_time']);
    $table->text('description');
    $table->text('requirements');
    $table->date('deadline')->nullable();
    $table->boolean('is_active')->default(true);
    $table->timestamps();
    
    // Optimasi performa untuk filter
    $table->index('type');
    $table->index('is_active');
});

Schema::create('job_applications', function (Blueprint $table) {
    $table->id();
    $table->foreignId('job_id')->constrained('jobs')->cascadeOnDelete();
    $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
    $table->string('cv_file_path');
    $table->text('message')->nullable();
    $table->enum('status', ['pending', 'reviewed', 'accepted', 'rejected'])->default('pending');
    $table->timestamps();
});
```
