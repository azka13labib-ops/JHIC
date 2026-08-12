import { serverFetch } from './server';
import type { SchoolProfile, Achievement, Department, Partner } from '@/types/school';

export async function getSchoolProfile(): Promise<SchoolProfile> {
  try {
    const res = await serverFetch<{ data: SchoolProfile }>('/school-info', { revalidate: 86400, tags: ['school'] });
    return res.data;
  } catch (error) {
    console.warn("Failed to fetch school profile from API, using dummy data.", error);
    return {
      id: 1,
      name: "Jagoan Indonesia Hackathon Camp (JIHC)",
      description: "Pusat keunggulan pendidikan vokasi yang berfokus pada teknologi dan industri kreatif digital.",
      vision: "Menjadi lembaga pendidikan terdepan yang mencetak talenta digital berstandar global.",
      mission: "1. Mengedepankan pendidikan berbasis proyek nyata.\n2. Berkolaborasi erat dengan industri teknologi.\n3. Membentuk karakter inovatif dan problem solver.",
      address: "Jl. Teknologi No. 1, Malang",
      email: "info@jihc.sch.id",
      phone: "(0341) 123456",
      principal_name: "Dr. Budi Santoso, M.Kom",
      principal_message: "Selamat datang di JIHC! Kami bangga menjadi tempat di mana masa depan teknologi Indonesia dibentuk. Mari bergabung dan wujudkan mimpimu bersama kami."
    };
  }
}

export async function getDepartments(): Promise<Department[]> {
  try {
    const res = await serverFetch<{ data: Department[] }>('/departments', { revalidate: 86400 });
    return res.data;
  } catch (error) {
    return [
      { id: 1, name: "Rekayasa Perangkat Lunak", description: "Fokus pada pengembangan aplikasi web dan mobile masa depan.", icon: "Laptop" },
      { id: 2, name: "Desain Komunikasi Visual", description: "Mencetak desainer kreatif untuk UI/UX, branding, dan animasi.", icon: "Palette" },
      { id: 3, name: "Teknik Komputer Jaringan", description: "Membangun dan mengelola infrastruktur jaringan dan komputasi awan.", icon: "Server" },
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
