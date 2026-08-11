# Struktur Folder Frontend (Next.js)

Menggunakan **Next.js App Router** dengan pola **Server Components + Client Components** untuk memaksimalkan performa (SSG/ISR) dan meminimalisir JavaScript yang dikirim ke browser.

---

## 📁 Struktur Lengkap

```
frontend/
├── public/                         # Aset statis (gambar, favicon, logo)
│   ├── images/
│   │   ├── logo-sekolah.png
│   │   └── sponsors/               # 5 logo wajib JHIC
│   └── fonts/
│
└── src/
    ├── app/                        # Next.js App Router (setiap folder = route)
    │   ├── (public)/               # Route group: halaman publik (tanpa layout admin)
    │   │   ├── layout.tsx          # Layout utama (Navbar + Footer)
    │   │   ├── page.tsx            # / → Landing Page (SSG)
    │   │   ├── profil/
    │   │   │   └── page.tsx        # /profil (SSG)
    │   │   ├── jurusan/
    │   │   │   └── page.tsx        # /jurusan (SSG)
    │   │   ├── prestasi/
    │   │   │   └── page.tsx        # /prestasi (SSG)
    │   │   ├── berita/
    │   │   │   ├── page.tsx        # /berita (ISR)
    │   │   │   └── [slug]/
    │   │   │       └── page.tsx    # /berita/[slug] (ISR)
    │   │   ├── produk/
    │   │   │   ├── page.tsx        # /produk (SSR - ada filter dinamis)
    │   │   │   └── [slug]/
    │   │   │       └── page.tsx    # /produk/[slug] (ISR)
    │   │   ├── karir/
    │   │   │   ├── page.tsx        # /karir (SSR)
    │   │   │   └── [id]/
    │   │   │       └── page.tsx    # /karir/[id] (ISR)
    │   │   └── ppdb/
    │   │       ├── page.tsx        # /ppdb - Info PPDB (SSG)
    │   │       ├── login/
    │   │       │   └── page.tsx    # /ppdb/login
    │   │       ├── daftar/
    │   │       │   └── page.tsx    # /ppdb/daftar
    │   │       └── dashboard/
    │   │           └── page.tsx    # /ppdb/dashboard (Protected, CSR)
    │   │
    │   ├── api/                    # Next.js Route Handlers (API internal)
    │   │   └── chat/
    │   │       └── route.ts        # POST /api/chat → Proxy ke Gemini API
    │   │
    │   ├── layout.tsx              # Root layout (font, metadata global)
    │   └── not-found.tsx           # Halaman 404 kustom
    │
    ├── components/                 # Komponen React yang bisa dipakai ulang
    │   ├── ui/                     # Komponen atomik (tidak ada business logic)
    │   │   ├── Button.tsx
    │   │   ├── Card.tsx
    │   │   ├── Input.tsx
    │   │   ├── Badge.tsx
    │   │   └── Spinner.tsx
    │   ├── layout/                 # Komponen layout
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx          # Wajib ada 5 logo JHIC di sini!
    │   │   └── Sidebar.tsx
    │   ├── sections/               # Seksi besar dari halaman (Hero, About, dll)
    │   │   ├── HeroSection.tsx
    │   │   ├── AchievementsSection.tsx
    │   │   └── PartnersSection.tsx
    │   ├── forms/                  # Komponen form (selalu Client Component)
    │   │   ├── PpdbForm.tsx
    │   │   ├── InquiryForm.tsx
    │   │   └── JobApplicationForm.tsx
    │   └── chat/                   # Komponen ChatBot AI
    │       ├── ChatWidget.tsx      # Tombol floating
    │       └── ChatWindow.tsx      # Jendela percakapan
    │
    ├── lib/                        # Utilitas inti yang bukan komponen
    │   ├── api/                    # API Client (Fetching Layer)
    │   │   ├── client.ts           # Axios instance / fetch wrapper
    │   │   ├── server.ts           # Fetch untuk Server Component (dengan token server)
    │   │   ├── school.ts           # Fungsi fetch: profil, alumni, prestasi
    │   │   ├── ppdb.ts             # Fungsi fetch: submit PPDB, cek status
    │   │   ├── products.ts         # Fungsi fetch: katalog produk
    │   │   ├── jobs.ts             # Fungsi fetch: lowongan kerja
    │   │   └── chat.ts             # Fungsi streaming: Gemini chatbot
    │   ├── auth.ts                 # Helper autentikasi (get token, cek login)
    │   └── utils.ts                # Fungsi helper umum (format tanggal, dll)
    │
    ├── hooks/                      # Custom React Hooks (Client-side)
    │   ├── useAuth.ts              # Hook untuk state autentikasi user
    │   ├── useChat.ts              # Hook untuk streaming chat AI
    │   └── useDebounce.ts          # Hook untuk debounce input search
    │
    ├── stores/                     # Global State Management
    │   └── authStore.ts            # Zustand store untuk data user & token
    │
    └── types/                      # TypeScript type definitions
        ├── api.ts                  # Tipe untuk response API (generik)
        ├── school.ts               # Tipe: SchoolProfile, Achievement, Alumni
        ├── ppdb.ts                 # Tipe: Registration, RegistrationStatus
        ├── product.ts              # Tipe: Product, ProductCategory
        └── job.ts                  # Tipe: Job, Company, Application
```

---

## 🔄 Strategi Fetching Data (Kapan Pakai Apa?)

```
Pertanyaan: "Apakah data ini BERUBAH SERING?"
           "Apakah data ini BERBEDA per USER?"
                         │
          ───────────────┼───────────────
          │                             │
         TIDAK                          YA
          │                             │
    ┌─────▼──────────────┐    ┌─────────▼──────────┐
    │   SSG / ISR        │    │   SSR / CSR        │
    │ (Static / Cache)   │    │ (Server/Client)    │
    └────────────────────┘    └────────────────────┘
    - Landing Page            - Katalog Produk (filter)
    - Profil Sekolah          - Lowongan (filter)
    - Daftar Jurusan          - Dashboard PPDB (per user)
    - Daftar Prestasi         - Form submit
    - Detail Produk*          - Chat AI
```

---

## 📦 `lib/api/` — Layer Fetching Lengkap

### `client.ts` — Axios Instance (untuk Client Components)
```typescript
// lib/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // http://domain-vps.com/api
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  timeout: 10000,
});

// Interceptor: otomatis sisipkan token Sanctum ke setiap request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor: handle error 401 (token expired) → redirect ke login
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/ppdb/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### `server.ts` — Fetch untuk Server Components (SSG/ISR/SSR)
```typescript
// lib/api/server.ts
// Digunakan di dalam Server Component (file tanpa 'use client')
// Next.js secara otomatis meng-cache hasil fetch ini!

const BASE_URL = process.env.API_URL; // URL internal (server-to-server, lebih cepat)

export async function serverFetch<T>(
  endpoint: string,
  options?: { revalidate?: number | false; tags?: string[] }
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: {
      revalidate: options?.revalidate ?? 3600, // Default: cache 1 jam (ISR)
      tags: options?.tags,
    },
  });
  if (!res.ok) throw new Error(`API Error: ${res.status} on ${endpoint}`);
  return res.json();
}
```

### `school.ts` — Contoh Penggunaan di Halaman
```typescript
// lib/api/school.ts
import { serverFetch } from './server';
import apiClient from './client';
import type { SchoolProfile, Achievement, News } from '@/types/school';

// --- SERVER SIDE (untuk SSG/ISR di Server Component) ---

export async function getSchoolProfile(): Promise<SchoolProfile> {
  // Cache selama 24 jam, tag 'school' untuk invalidasi manual
  return serverFetch('/school-info', { revalidate: 86400, tags: ['school'] });
}

export async function getAchievements(): Promise<Achievement[]> {
  return serverFetch('/achievements', { revalidate: 86400, tags: ['achievements'] });
}

export async function getNews(page = 1): Promise<{ data: News[]; meta: any }> {
  // ISR: re-generate setiap 1 jam
  return serverFetch(`/news?page=${page}`, { revalidate: 3600, tags: ['news'] });
}

// --- CLIENT SIDE (untuk interaksi dinamis di Client Component) ---

export async function submitContactForm(data: { nama: string; pesan: string }) {
  const response = await apiClient.post('/contact', data);
  return response.data;
}
```

### `ppdb.ts` — Fetching dengan Auth Token
```typescript
// lib/api/ppdb.ts
import apiClient from './client';
import type { Registration } from '@/types/ppdb';

export async function login(email: string, password: string) {
  const { data } = await apiClient.post('/login', { email, password });
  // Simpan token ke localStorage
  localStorage.setItem('auth_token', data.token);
  return data.user;
}

export async function submitPpdb(formData: FormData) {
  // FormData untuk upload file
  const { data } = await apiClient.post('/ppdb/submit', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function getPpdbStatus(): Promise<Registration> {
  const { data } = await apiClient.get('/ppdb/status');
  return data.data;
}
```

---

## 🧩 Contoh Penerapan di Halaman

### Server Component (Tidak ada 'use client' — Data di-fetch di server)
```typescript
// app/(public)/page.tsx
import { getSchoolProfile, getAchievements } from '@/lib/api/school';
import HeroSection from '@/components/sections/HeroSection';

// Ini adalah SSG! Dijalankan saat BUILD, bukan saat user request.
export default async function HomePage() {
  // Fetch berjalan di server → user tidak perlu tunggu loading
  const [profile, achievements] = await Promise.all([
    getSchoolProfile(),
    getAchievements(),
  ]);

  return (
    <main>
      <HeroSection profile={profile} />
      <AchievementsSection achievements={achievements} />
    </main>
  );
}

// Konfigurasi ISR: halaman di-regenerasi setiap 1 hari
export const revalidate = 86400;
```

### Client Component (Ada interaksi user, state, form)
```typescript
// components/forms/InquiryForm.tsx
'use client'; // ← Wajib ditulis untuk Client Component

import { useState } from 'react';
import apiClient from '@/lib/api/client';

export default function InquiryForm({ productId }: { productId: number }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiClient.post('/inquiries', { product_id: productId, ...formData });
      alert('Pesan berhasil dikirim!');
    } finally {
      setIsLoading(false);
    }
  }

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

---

## ⚡ Keuntungan Struktur Ini

| Keuntungan | Penjelasan |
|---|---|
| **Performa tinggi** | Server Components = tidak ada JS di browser, loading sangat cepat |
| **Cache otomatis** | `fetch` di Server Component di-cache Next.js secara built-in |
| **Separation of Concerns** | Fetching, UI, dan logic dipisah dengan jelas |
| **Type-safe** | Semua data punya tipe TypeScript → tidak ada bug `undefined` |
| **Mudah di-maintain** | Perubahan API hanya di `lib/api/`, komponen tidak perlu diubah |
