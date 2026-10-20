import { MetadataRoute } from 'next';
import { 
  getNews, 
  getAgendas, 
  getArticles, 
  getGalleries, 
  getJobs, 
  getStudentWorks, 
  getOpinions, 
  getProducts,
  getAchievements 
} from '@/lib/api/school';

export const revalidate = 3600; // Revalidate dynamic sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://smapgri1lumajang.sch.id';

  // 1. Core static routes (without /admin or private routes)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/profil`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/profil/sejarah`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/profil/visi-misi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/profil/fasilitas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/profil/sambutan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/jurusan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/jurusan/mipa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/jurusan/ips`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/jurusan/ilmu-bahasa-dan-budaya`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ppdb`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/ppdb/daftar`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/ppdb/status`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/prestasi`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/guru`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/ekstrakurikuler`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/alumni`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/berita`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/artikel`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/agenda`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/galeri`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/karir`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/karya-siswa`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/opini`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/produk`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blog-siswa`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/link-penting`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/kontak`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/lapor`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/buku-tamu`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/sitemap`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];

  // 2. Fetch all dynamic content asynchronously
  try {
    const [
      newsList,
      agendaList,
      articleList,
      galleryList,
      jobList,
      studentWorkList,
      opinionList,
      productList,
      achievementList
    ] = await Promise.allSettled([
      getNews(),
      getAgendas(),
      getArticles(),
      getGalleries(),
      getJobs(),
      getStudentWorks(),
      getOpinions(),
      getProducts(),
      getAchievements()
    ]);

    const dynamicRoutes: MetadataRoute.Sitemap = [];

    // News
    if (newsList.status === 'fulfilled' && Array.isArray(newsList.value)) {
      newsList.value.forEach((item: any) => {
        if (item?.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/berita/${item.slug}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      });
    }

    // Agendas
    if (agendaList.status === 'fulfilled' && Array.isArray(agendaList.value)) {
      agendaList.value.forEach((item: any) => {
        if (item?.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/agenda/${item.slug}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
      });
    }

    // Articles
    if (articleList.status === 'fulfilled' && Array.isArray(articleList.value)) {
      articleList.value.forEach((item: any) => {
        if (item?.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/artikel/${item.slug}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
      });
    }

    // Galleries
    if (galleryList.status === 'fulfilled' && Array.isArray(galleryList.value)) {
      galleryList.value.forEach((item: any) => {
        if (item?.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/galeri/${item.slug}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      });
    }

    // Jobs (BKK)
    if (jobList.status === 'fulfilled' && Array.isArray(jobList.value)) {
      jobList.value.forEach((item: any) => {
        if (item?.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/karir/${item.slug}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
      });
    }

    // Student Works
    if (studentWorkList.status === 'fulfilled' && Array.isArray(studentWorkList.value)) {
      studentWorkList.value.forEach((item: any) => {
        if (item?.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/karya-siswa/${item.slug}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      });
    }

    // Opinions
    if (opinionList.status === 'fulfilled' && Array.isArray(opinionList.value)) {
      opinionList.value.forEach((item: any) => {
        if (item?.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/opini/${item.slug}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      });
    }

    // Products
    if (productList.status === 'fulfilled' && Array.isArray(productList.value)) {
      productList.value.forEach((item: any) => {
        if (item?.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/produk/${item.slug}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      });
    }

    // Achievements
    if (achievementList.status === 'fulfilled' && Array.isArray(achievementList.value)) {
      achievementList.value.forEach((item: any) => {
        if (item?.id) {
          dynamicRoutes.push({
            url: `${baseUrl}/prestasi/${item.id}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      });
    }

    return [...staticRoutes, ...dynamicRoutes];
  } catch (err) {
    console.error('Error generating dynamic sitemap:', err);
    return staticRoutes;
  }
}
