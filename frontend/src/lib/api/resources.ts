import { serverFetch } from './server';
import type { Product, Vacancy, Company, Registration, PpdbInfo, Achievement } from '@/types';

// ======= PRODUCTS =======
export async function getProducts(params?: { category?: string; search?: string }): Promise<Product[]> {
  try {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.search) query.set('search', params.search);
    const qs = query.toString() ? `?${query.toString()}` : '';
    const res = await serverFetch<{ data: Product[] }>(`/products${qs}`, { revalidate: 300 });
    return res.data || [];
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await serverFetch<{ data: Product }>(`/products/${slug}`, { revalidate: 300, tags: [`product-${slug}`] });
    return res.data;
  } catch {
    return null;
  }
}

// ======= JOBS / VACANCIES =======
export async function getJobs(params?: { type?: string; search?: string }): Promise<Vacancy[]> {
  try {
    const query = new URLSearchParams();
    if (params?.type) query.set('type', params.type);
    if (params?.search) query.set('search', params.search);
    const qs = query.toString() ? `?${query.toString()}` : '';
    const res = await serverFetch<{ data: Vacancy[] }>(`/jobs${qs}`, { revalidate: 600 });
    return res.data || [];
  } catch {
    return MOCK_JOBS;
  }
}

export async function getJobById(id: number): Promise<Vacancy | null> {
  try {
    const res = await serverFetch<{ data: Vacancy }>(`/jobs/${id}`, { revalidate: 600 });
    return res.data;
  } catch {
    return null;
  }
}

export async function getCompanies(): Promise<Company[]> {
  try {
    const res = await serverFetch<{ data: Company[] }>('/companies', { revalidate: 3600 });
    return res.data || [];
  } catch {
    return [];
  }
}

// ======= PPDB =======
export async function getPpdbInfo(): Promise<Record<string, unknown>> {
  try {
    const res = await serverFetch<{ data: Record<string, unknown> }>('/ppdb/info', { revalidate: 3600 });
    return res.data || {};
  } catch {
    return MOCK_PPDB_INFO;
  }
}

// Mock fallback data
const MOCK_JOBS: Vacancy[] = [
  {
    id: 1,
    title: 'Praktik Kerja Lapangan — PT Teknindo Maju',
    slug: 'pkl-teknindo-maju',
    type: 'pkl',
    description: 'PKL selama 3 bulan di divisi IT dan digital marketing.',
    requirements: 'Siswa aktif kelas XI, jurusan MIPA/IPS, bersedia hadir full time.',
    deadline: '2026-09-30',
    is_active: true,
    company: { id: 1, name: 'PT Teknindo Maju', location: 'Lumajang, Jawa Timur' },
  },
  {
    id: 2,
    title: 'Staff Administrasi — CV Sentosa Abadi',
    slug: 'staff-admin-sentosa',
    type: 'full_time',
    description: 'Dibutuhkan staff administrasi untuk pengelolaan dokumen.',
    requirements: 'Lulusan SMA/SMK, mampu MS Office, komunikatif.',
    deadline: '2026-08-31',
    is_active: true,
    company: { id: 2, name: 'CV Sentosa Abadi', location: 'Jember, Jawa Timur' },
  },
];

const MOCK_PPDB_INFO = {
  registration_start: '2026-07-01',
  registration_end: '2026-08-31',
  announcement_date: '2026-09-10',
  requirements: [
    'Ijazah / Surat Keterangan Lulus SMP',
    'Kartu Keluarga (KK)',
    'Akta Kelahiran',
    'Pas Foto 3x4 (background merah)',
    'NISN',
  ],
  tracks: ['Jalur Reguler', 'Jalur Prestasi', 'Jalur Afirmasi'],
};

// ======= ACHIEVEMENTS =======
export async function getAchievements(): Promise<Achievement[]> {
  try {
    const res = await serverFetch<{ data: Achievement[] }>('/achievements', { revalidate: 3600 });
    return res.data || [];
  } catch {
    return [];
  }
}
