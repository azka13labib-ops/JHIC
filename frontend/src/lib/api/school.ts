/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from './server';
import type { SchoolProfile, Achievement, Department, Partner } from '@/types/school';

const MOCK_SCHOOL_PROFILE: SchoolProfile = {
  id: 1,
  name: "SMA PGRI 1 Lumajang",
  description: "Selamat datang di SMA PGRI 1 Lumajang! Kami bangga menjadi tempat di mana masa depan dibentuk. Mari bergabung dan wujudkan mimpimu menjadi generasi unggul bersertifikasi internasional yang siap kerja di era digital.",
  vision: "Menjadi lembaga pendidikan terdepan yang mencetak talenta unggul berstandar global dengan tetap menjunjung tinggi nilai-nilai agama dan budaya bangsa.",
  mission: "1. Menyelenggarakan pendidikan berkualitas yang adaptif terhadap perkembangan zaman.\n2. Mengembangkan potensi peserta didik melalui kegiatan akademik dan non-akademik.\n3. Membekali peserta didik dengan keterampilan praktis, sertifikasi industri, dan jiwa kewirausahaan.",
  principal_name: "Bapak Kepala Sekolah, M.Pd",
  principal_message: "SMA PGRI 1 Lumajang bukan sekadar sekolah, melainkan inkubator bagi para inovator muda. Kami membekali siswa tidak hanya dengan teori, namun juga skill praktis yang langsung relevan dengan kebutuhan industri masa depan. Bergabunglah bersama kami, dan jadilah bagian dari revolusi industri!",
  email: "info@smapgri1lmj.sch.id",
  phone: "(0334) 881234",
  address: "Jl. Contoh Alamat No. 123, Lumajang, Jawa Timur"
};

// Generic resource fetch helpers
async function fetchList<T = any>(endpoint: string, tag: string, revalidate = 60): Promise<T[]> {
  try {
    const res = await serverFetch<{ data: T[] }>(endpoint, { revalidate, tags: [tag] });
    return res.data || [];
  } catch (error) {
    console.error(`Failed to fetch ${tag}`, error);
    return [];
  }
}

async function fetchItem<T = any>(endpoint: string, tag: string, revalidate = 60): Promise<T | null> {
  try {
    const res = await serverFetch<{ data: T }>(endpoint, { revalidate, tags: [tag] });
    return res.data || null;
  } catch (error) {
    console.error(`Failed to fetch ${tag}`, error);
    return null;
  }
}

// School Info & Profile
export async function getSchoolProfile(): Promise<SchoolProfile> {
  try {
    const res = await serverFetch<{ data: SchoolProfile }>('/school-info', { revalidate: 86400, tags: ['school'] });
    return res.data || MOCK_SCHOOL_PROFILE;
  } catch (error) {
    console.warn("Failed to fetch school profile from API, using dummy data.", error);
    return MOCK_SCHOOL_PROFILE;
  }
}

export async function getDepartments(): Promise<Department[]> {
  try {
    const res = await serverFetch<{ data: Department[] }>('/departments', { revalidate: 86400 });
    return res.data;
  } catch {
    return [
      { id: 1, name: "MIPA", description: "Matematika dan Ilmu Pengetahuan Alam. Mempersiapkan siswa di bidang sains, kedokteran, dan teknik.", icon: "Microscope" },
      { id: 2, name: "IPS", description: "Ilmu Pengetahuan Sosial. Berfokus pada sosiologi, ekonomi, geografi, dan sejarah.", icon: "Globe" },
      { id: 3, name: "Ilmu Bahasa dan Budaya", description: "Mempelajari linguistik, sastra, dan budaya dari berbagai bahasa dunia.", icon: "BookText" },
    ];
  }
}

export async function getAchievements(): Promise<Achievement[]> {
  try {
    const res = await serverFetch<{ data: Achievement[] }>('/achievements', { revalidate: 86400, tags: ['achievements'] });
    return res.data || [];
  } catch {
    return [
      { id: 1, title: "Juara 1 Web Development", description: "LKS Tingkat Nasional 2025", level: "Nasional", date: "2025-10-12", student_name: "Ahmad Rizky" },
      { id: 2, title: "Medali Emas UI/UX Design", description: "Asean Skills Competition", level: "Internasional", date: "2025-08-20", student_name: "Siti Aminah" },
    ];
  }
}

export async function getPartners(): Promise<Partner[]> {
  try {
    const res = await serverFetch<{ data: Partner[] }>('/partners', { revalidate: 86400 });
    return res.data;
  } catch {
    return [
      { id: 1, name: "Jagoan Hosting", logo_url: "/images/partners/jagoan-hosting.png" },
      { id: 2, name: "Komdigi", logo_url: "/images/partners/komdigi.png" },
      { id: 3, name: "Garuda Spark", logo_url: "/images/partners/garuda-spark.png" },
      { id: 4, name: "Ngalup", logo_url: "/images/partners/ngalup.png" },
    ];
  }
}

// News
export const getNews = () => fetchList('/news', 'news');
export const getNewsBySlug = (slug: string) => fetchItem(`/news/${slug}`, `news-${slug}`);

// Features & Announcements
export const getFeatures = () => fetchList('/features', 'features');
export const getAnnouncements = () => fetchList('/announcements', 'announcements');

// Agendas
export const getAgendas = () => fetchList('/agendas', 'agendas');
export const getAgendaBySlug = (slug: string) => fetchItem(`/agendas/${slug}`, `agenda-${slug}`);

// Articles
export const getArticles = () => fetchList('/articles', 'articles');
export const getArticle = getArticles;
export const getArticleById = (id: string) => fetchItem(`/articles/${id}`, `article-${id}`);
export const getArticleBySlug = (slug: string) => fetchItem(`/articles/${slug}`, `article-${slug}`);

// Galleries
export const getGalleries = () => fetchList('/galleries', 'galleries');
export const getGalleryBySlug = (slug: string) => fetchItem(`/galleries/${slug}`, `gallery-${slug}`);

// Student Works
export const getStudentWorks = () => fetchList('/student-works', 'student-works');
export const getStudentWorkBySlug = (slug: string) => fetchItem(`/student-works/${slug}`, `student-work-${slug}`);

// Opinions
export const getOpinions = () => fetchList('/opinions', 'opinions');
export const getOpinion = getOpinions;
export const getOpinionById = (id: string) => fetchItem(`/opinions/${id}`, `opinion-${id}`);
export const getOpinionBySlug = (slug: string) => fetchItem(`/opinions/${slug}`, `opinion-${slug}`);

// Blogs
export const getBlogs = () => fetchList('/blogs', 'blogs');

// Quick Links & Guestbooks
export const getQuickLinks = () => fetchList('/quick-links', 'quick-links');
export const getGuestbooks = () => fetchList('/guestbooks', 'guestbooks');
