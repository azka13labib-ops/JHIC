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

export async function getSchoolProfile(): Promise<SchoolProfile> {
  try {
    const res = await serverFetch<{ data: SchoolProfile }>('/school-info', { revalidate: 86400, tags: ['school'] });
    if (!res.data) {
      return MOCK_SCHOOL_PROFILE;
    }
    return res.data;
  } catch (error) {
    console.warn("Failed to fetch school profile from API, using dummy data.", error);
    return MOCK_SCHOOL_PROFILE;
  }
}

export async function getDepartments(): Promise<Department[]> {
  try {
    const res = await serverFetch<{ data: Department[] }>('/departments', { revalidate: 86400 });
    return res.data;
  } catch (error) {
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
    return res.data;
  } catch (error) {
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
  } catch (error) {
    return [
      { id: 1, name: "Jagoan Hosting", logo_url: "/images/partners/jagoan-hosting.png" },
      { id: 2, name: "Komdigi", logo_url: "/images/partners/komdigi.png" },
      { id: 3, name: "Garuda Spark", logo_url: "/images/partners/garuda-spark.png" },
      { id: 4, name: "Ngalup", logo_url: "/images/partners/ngalup.png" },
    ];
  }
}

export async function getNews(): Promise<any[]> {
  try {
    const res = await serverFetch<{ data: any[] }>('/news', { revalidate: 60, tags: ['news'] });
    return res.data || [];
  } catch (error) {
    console.error("Failed to fetch news", error);
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<any> {
  try {
    const res = await serverFetch<{ data: any }>(`/news/${slug}`, { revalidate: 60, tags: [`news-${slug}`] });
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch news ${slug}`, error);
    return null;
  }
}

export async function getFeatures(): Promise<any[]> {
  try {
    const res = await serverFetch<{ data: any[] }>('/features', { revalidate: 60, tags: ['features'] });
    return res.data || [];
  } catch (error) {
    console.error("Failed to fetch features", error);
    return [];
  }
}

export async function getAnnouncements(): Promise<any[]> {
  try {
    const res = await serverFetch<{ data: any[] }>('/announcements', { revalidate: 60, tags: ['announcements'] });
    return res.data || [];
  } catch (error) {
    console.error("Failed to fetch announcements", error);
    return [];
  }
}

export async function getAgendas(): Promise<any[]> {
  try {
    const res = await serverFetch<{ data: any[] }>('/agendas', { revalidate: 60, tags: ['agendas'] });
    return res.data || [];
  } catch (error) {
    console.error('Failed to fetch agendas', error);
    return [];
  }
}

export async function getAgendaBySlug(slug: string): Promise<any> {
  try {
    const res = await serverFetch<{ data: any }>(`/agendas/${slug}`, { revalidate: 60, tags: [`agenda-${slug}`] });
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch agenda ${slug}`, error);
    return null;
  }
}

export async function getArticles(): Promise<any[]> {
  try {
    const res = await serverFetch<{ data: any[] }>('/articles', { revalidate: 60, tags: ['articles'] });
    return res.data || [];
  } catch (error) {
    console.error('Failed to fetch articles', error);
    return [];
  }
}

export async function getArticleById(id: string): Promise<any> {
  try {
    const res = await serverFetch<{ data: any }>(`/articles/${id}`, { revalidate: 60, tags: [`article-${id}`] });
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch article ${id}`, error);
    return null;
  }
}

export async function getGalleries(): Promise<any[]> {
  try {
    const res = await serverFetch<{ data: any[] }>('/galleries', { revalidate: 60, tags: ['galleries'] });
    return res.data || [];
  } catch (error) {
    console.error('Failed to fetch galleries', error);
    return [];
  }
}

export async function getGalleryBySlug(slug: string): Promise<any> {
  try {
    const res = await serverFetch<{ data: any }>(`/galleries/${slug}`, { revalidate: 60, tags: [`gallery-${slug}`] });
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch gallery ${slug}`, error);
    return null;
  }
}

export async function getStudentWorks(): Promise<any[]> {
  try {
    const res = await serverFetch<{ data: any[] }>('/student-works', { revalidate: 60, tags: ['student-works'] });
    return res.data || [];
  } catch (error) {
    console.error('Failed to fetch student works', error);
    return [];
  }
}

export async function getStudentWorkBySlug(slug: string): Promise<any> {
  try {
    const res = await serverFetch<{ data: any }>(`/student-works/${slug}`, { revalidate: 60, tags: [`student-work-${slug}`] });
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch student work ${slug}`, error);
    return null;
  }
}

export async function getOpinions(): Promise<any[]> {
  try {
    const res = await serverFetch<{ data: any[] }>('/opinions', { revalidate: 60, tags: ['opinions'] });
    return res.data || [];
  } catch (error) {
    console.error('Failed to fetch opinions', error);
    return [];
  }
}

export async function getOpinionById(id: string): Promise<any> {
  try {
    const res = await serverFetch<{ data: any }>(`/opinions/${id}`, { revalidate: 60, tags: [`opinion-${id}`] });
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch opinion ${id}`, error);
    return null;
  }
}

export async function getBlogs(): Promise<any[]> {
  try {
    const res = await serverFetch<{ data: any[] }>('/blogs', { revalidate: 60, tags: ['blogs'] });
    return res.data || [];
  } catch (error) {
    console.error('Failed to fetch blogs', error);
    return [];
  }
}

export async function getQuickLinks(): Promise<any[]> {
  try {
    const res = await serverFetch<{ data: any[] }>('/quick-links', { revalidate: 60, tags: ['quick-links'] });
    return res.data || [];
  } catch (error) {
    console.error('Failed to fetch quick links', error);
    return [];
  }
}

export async function getGuestbooks(): Promise<any[]> {
  try {
    const res = await serverFetch<{ data: any[] }>('/guestbooks', { revalidate: 60, tags: ['guestbooks'] });
    return res.data || [];
  } catch (error) {
    console.error('Failed to fetch guestbooks', error);
    return [];
  }
}
