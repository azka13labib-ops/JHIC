import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import NewsMediaSection from '@/components/sections/NewsMediaSection';

import { 
  getNews,
} from '@/lib/api/school';

export const revalidate = 0; // Dynamic real-time revalidation

export default async function LandingPage() {
  const newsList = await getNews();

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. Hero Section with image.png background, emblem, and 3-Card Strip */}
      <HeroSection />

      {/* 2. About Section (2-Column narrative & student achievement photo) */}
      <AboutSection />

      {/* 3. News & Media Center (Grid news, podcast, calendar, agenda, and PPDB CTA) */}
      <NewsMediaSection initialNews={newsList} />
    </div>
  );
}
