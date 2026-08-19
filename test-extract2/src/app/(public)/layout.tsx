import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FloatingChatbot } from '@/components/layout/FloatingChatbot';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingChatbot />
    </>
  );
}
