import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import AnnouncementBanner from '@/components/sections/AnnouncementBanner';
import SambutanSection from '@/components/sections/SambutanSection';
import JurusanSection from '@/components/sections/JurusanSection';
import PrestasiSection from '@/components/sections/PrestasiSection';
import PartnersSection from '@/components/sections/PartnersSection';

import { 
  getLandingData, 
  getDepartments,
} from '@/lib/api/school';

// Next.js Revalidate untuk ISR (waktu dalam detik)
export const revalidate = 86400; // 1 Hari

export default async function LandingPage() {
  const [landingData, departments] = await Promise.all([
    getLandingData(),
    getDepartments(),
  ]);

  return (
    <>
      <HeroSection />
      <FeaturesSection features={landingData.features} />
      <AnnouncementBanner announcements={landingData.announcements} />
      {landingData.profile && <SambutanSection profile={landingData.profile} />}
      <JurusanSection departments={departments} />
      <PrestasiSection achievements={landingData.achievements} />
      <PartnersSection partners={landingData.partners} />
    </>
  );
}
