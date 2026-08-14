"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateQuickLinkPage() {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [title, setTitle] = useState("");
  
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Judul dan Konten harus diisi.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("title", title);
      
      

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/quick-links`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          Accept: "application/json",
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal menyimpan berita.");
      }

      router.push("/admin/quick-links");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Tambah QuickLink Siswa</h1>
        <Button variant="outline" onClick={() => router.back()}>Batal</Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul QuickLink Siswa</Label>
            <Input 
              id="title" 
              placeholder="Masukkan judul..." 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required
            />
          </div>

          

          

          <Button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan QuickLink Siswa"}
          </Button>
        </form>
      </div>
    </div>
  );
}
