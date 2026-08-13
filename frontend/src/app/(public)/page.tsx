import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import AnnouncementBanner from '@/components/sections/AnnouncementBanner';
import SambutanSection from '@/components/sections/SambutanSection';
import JurusanSection from '@/components/sections/JurusanSection';
import PrestasiSection from '@/components/sections/PrestasiSection';
import PartnersSection from '@/components/sections/PartnersSection';

import { 
  getSchoolProfile, 
  getDepartments, 
  getAchievements, 
  getPartners,
  getFeatures,
  getAnnouncements
} from '@/lib/api/school';

// Next.js Revalidate untuk ISR (waktu dalam detik)
export const revalidate = 86400; // 1 Hari

export default async function LandingPage() {
  // Ambil semua data statis dari backend secara paralel
  const [profile, departments, achievements, partners, features, announcements] = await Promise.all([
    getSchoolProfile(),
    getDepartments(),
    getAchievements(),
    getPartners(),
    getFeatures(),
    getAnnouncements()
  ]);

  return (
    <>
      <HeroSection />
      <FeaturesSection features={features} />
      <AnnouncementBanner announcements={announcements} />
      <SambutanSection profile={profile} />
      <JurusanSection departments={departments} />
      <PrestasiSection achievements={achievements} />
      <PartnersSection partners={partners} />
    </>
  );
}
