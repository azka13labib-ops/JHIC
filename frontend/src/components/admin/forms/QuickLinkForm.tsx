"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";

interface QuickLinkFormProps {
  isEdit?: boolean;
  initialData?: {
    id?: number;
    title?: string;
    url?: string;
  };
}

export function QuickLinkForm({ isEdit = false, initialData }: QuickLinkFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [title, setTitle] = useState(initialData?.title || "");
  const [url, setUrl] = useState(initialData?.url || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) {
      setError("Judul dan URL harus diisi.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const endpoint = isEdit ? `/admin/quick-links/${initialData?.id}` : `/admin/quick-links`;

      const payload = { title, url };

      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || (isEdit ? "Gagal mengubah link." : "Gagal menyimpan link."));
      }

      router.push('/admin/quick-links');
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {isEdit ? "Edit Link Penting" : "Tambah Link Penting"}
        </h1>
        <Button variant="outline" onClick={() => router.back()} disabled={loading}>Batal</Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Link Penting</Label>
            <Input 
              id="title" 
              placeholder="Masukkan judul link..." 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL Link</Label>
            <Input 
              id="url" 
              type="url"
              placeholder="https://..." 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              required
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : (isEdit ? "Simpan Perubahan" : "Simpan Link")}
          </Button>
        </form>
      </div>
    </div>
  );
}
