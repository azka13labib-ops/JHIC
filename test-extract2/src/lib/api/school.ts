/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from './server';
import type { Achievement, Department } from '@/types/school';

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


export async function getDepartments(): Promise<Department[]> {
  return [
    { id: 1, name: "MIPA", description: "Matematika dan Ilmu Pengetahuan Alam. Mempersiapkan siswa di bidang sains, kedokteran, dan teknik.", icon: "Microscope" },
    { id: 2, name: "IPS", description: "Ilmu Pengetahuan Sosial. Berfokus pada sosiologi, ekonomi, geografi, dan sejarah.", icon: "Globe" },
    { id: 3, name: "Ilmu Bahasa dan Budaya", description: "Mempelajari linguistik, sastra, dan budaya dari berbagai bahasa dunia.", icon: "BookText" },
  ];
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

export const getAchievementById = (id: string) => fetchItem<Achievement>(`/achievements/${id}`, `achievement-${id}`, 3600);


// News
export const getNews = () => fetchList('/news', 'news');
export const getNewsBySlug = (slug: string) => fetchItem(`/news/${slug}`, `news-${slug}`);

// Agendas
export const getAgendas = () => fetchList('/agendas', 'agendas');
export const getAgendaBySlug = (slug: string) => fetchItem(`/agendas/${slug}`, `agenda-${slug}`);

// Articles
export const getArticles = () => fetchList('/articles', 'articles');
export const getArticle = getArticles;
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
export const getOpinionBySlug = (slug: string) => fetchItem(`/opinions/${slug}`, `opinion-${slug}`);

// Blogs
export const getBlogs = () => fetchList('/blogs', 'blogs');

// Quick Links
export const getQuickLinks = () => fetchList('/quick-links', 'quick-links');
