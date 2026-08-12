import HeroSection from '@/components/sections/HeroSection';
import SambutanSection from '@/components/sections/SambutanSection';
import JurusanSection from '@/components/sections/JurusanSection';
import PrestasiSection from '@/components/sections/PrestasiSection';
import PartnersSection from '@/components/sections/PartnersSection';

import { 
  getSchoolProfile, 
  getDepartments, 
  getAchievements, 
  getPartners 
} from '@/lib/api/school';

// Next.js Revalidate untuk ISR (waktu dalam detik)
export const revalidate = 86400; // 1 Hari

export default async function LandingPage() {
  // Ambil semua data statis dari backend secara paralel
  const [profile, departments, achievements, partners] = await Promise.all([
    getSchoolProfile(),
    getDepartments(),
    getAchievements(),
    getPartners()
  ]);

  return (
    <>
      <HeroSection />
      <SambutanSection profile={profile} />
      <JurusanSection departments={departments} />
      <PrestasiSection achievements={achievements} />
      <PartnersSection partners={partners} />
    </>
  );
}
