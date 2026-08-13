"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  LayoutDashboard,
  Newspaper,
  Trophy,
  Package,
  Briefcase,
  Users,
  LogOut,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
  },
  {
    title: "Berita & Pengumuman",
    href: "/admin/news",
    icon: <Newspaper className="w-5 h-5 mr-3" />,
  },
  {
    title: "Prestasi",
    href: "/admin/achievements",
    icon: <Trophy className="w-5 h-5 mr-3" />,
  },
  {
    title: "Produk BLUD",
    href: "/admin/products",
    icon: <Package className="w-5 h-5 mr-3" />,
  },
  {
    title: "Lowongan BKK",
    href: "/admin/jobs",
    icon: <Briefcase className="w-5 h-5 mr-3" />,
  },
  {
    title: "PPDB",
    href: "/admin/ppdb",
    icon: <Users className="w-5 h-5 mr-3" />,
  },
];

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Memuat...</div>;
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-white md:flex">
        <div className="flex h-14 items-center border-b px-6">
          <span className="font-bold text-lg text-primary">Admin SMA PGRI 1</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="grid gap-1 px-4">
            {sidebarNavItems.map((item, index) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {item.icon}
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={() => signOut()}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Topbar (Mobile) */}
        <header className="flex h-14 items-center gap-4 border-b bg-white px-6 md:hidden">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <span className="font-bold">Admin SMA PGRI 1</span>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
