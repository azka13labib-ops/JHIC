"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const { data: session } = useSession();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/news/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            Accept: "application/json",
          }
        });
        if (!res.ok) throw new Error("Gagal mengambil data berita.");
        
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        if (data.image_path) {
          // Assuming Laravel storage URL configuration
          setCurrentImageUrl(`http://localhost:8000/storage/${data.image_path}`);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    if (session?.accessToken) {
      fetchNews();
    }
  }, [id, session]);

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
      // Laravel uses _method=PUT when submitting FormData
      formData.append("_method", "PUT");
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/news/${id}`, {
        method: "POST", // Must be POST with _method=PUT for multipart/form-data in Laravel
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          Accept: "application/json",
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal mengubah berita.");
      }

      router.push("/admin/news");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-8">Memuat data berita...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Edit Berita</h1>
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
            <Label htmlFor="image">Gambar (Opsional, abaikan jika tidak ingin mengubah)</Label>
            {currentImageUrl && !image && (
              <div className="mb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={currentImageUrl} alt="Current thumbnail" className="w-48 rounded-md object-cover" />
              </div>
            )}
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
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </form>
      </div>
    </div>
  );
}
