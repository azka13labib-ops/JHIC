"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { QuickLinkForm } from "@/components/admin/forms/QuickLinkForm";

export default function EditQuickLinkPage() {
  const params = useParams();
  const id = params.id;
  const { data: session } = useSession();
  
  const [data, setData] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuickLink = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/quick-links/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            Accept: "application/json",
          }
        });
        if (!res.ok) throw new Error("Gagal mengambil data link.");
        
        const result = await res.json();
        setData(result);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(message);
      } finally {
        setFetching(false);
      }
    };

    if (session?.accessToken) {
      fetchQuickLink();
    }
  }, [id, session]);

  if (fetching) {
    return <div className="p-8">Memuat data link...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  return <QuickLinkForm isEdit={true} initialData={data} />;
}
