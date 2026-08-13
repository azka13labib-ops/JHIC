"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-8">Memuat...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="destructive" onClick={() => signOut()}>Logout</Button>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-2">Selamat Datang, {session.user?.name}!</h2>
        <p className="text-gray-500">Anda login sebagai: {session.user?.email}</p>
        <p className="text-gray-500">Role: {session.user?.role}</p>
      </div>
    </div>
  );
}
