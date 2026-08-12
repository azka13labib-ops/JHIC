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
