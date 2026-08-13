"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateNewsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
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
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/news`, {
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

      router.push("/admin/news");
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
        <h1 className="text-3xl font-bold tracking-tight">Tambah Berita</h1>
        <Button variant="outline" onClick={() => router.back()}>Batal</Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Berita</Label>
            <Input 
              id="title" 
              placeholder="Masukkan judul..." 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Gambar (Opsional, maks 2MB)</Label>
            <Input 
              id="image" 
              type="file" 
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Konten Berita</Label>
            <Textarea 
              id="content" 
              placeholder="Tulis isi berita di sini..." 
              className="min-h-[200px]"
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Berita"}
          </Button>
        </form>
      </div>
    </div>
  );
}
