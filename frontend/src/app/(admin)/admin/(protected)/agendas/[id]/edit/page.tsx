"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function EditAgendaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const { data: session } = useSession();
  
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/agendas/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            Accept: "application/json",
          }
        });
        if (!res.ok) throw new Error("Gagal mengambil data berita.");
        
        const data = await res.json();
        setTitle(data.title);
        setDate(data.date ? data.date.split('T')[0] : "");
        setLocation(data.location || "");
        setContent(data.description);
        if (data.image) {
          // Assuming Laravel storage URL configuration
          setCurrentImageUrl(`http://localhost:8000/storage/${data.image}`);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    if (session?.accessToken) {
      fetchAgenda();
    }
  }, [id, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date) {
      setError("Judul, Tanggal, dan Deskripsi harus diisi.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("location", location);
      formData.append("description", description);
      // Laravel uses _method=PUT when submitting FormData
      formData.append("_method", "PUT");
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/agendas/${id}`, {
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

      router.push("/admin/agendas");
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
        <h1 className="text-3xl font-bold tracking-tight">Edit Agenda</h1>
        <Button variant="outline" onClick={() => router.back()}>Batal</Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Agenda</Label>
            <Input 
              id="title" 
              placeholder="Masukkan judul agenda..." 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Tanggal Agenda</Label>
            <Input 
              id="date" 
              type="date"
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Lokasi (Opsional)</Label>
            <Input 
              id="location" 
              placeholder="Misal: Aula Utama" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
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
            <Label htmlFor="description">Deskripsi Agenda</Label>
            <Textarea 
              id="description" 
              placeholder="Tulis deskripsi agenda di sini..." 
              className="min-h-50"
              value={description} 
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
