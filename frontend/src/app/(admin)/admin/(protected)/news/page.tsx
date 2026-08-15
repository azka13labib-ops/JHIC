import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { fetchApi } from "@/lib/api-client";
import { Plus, Edit } from "lucide-react";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const res = await fetchApi("/admin/news", { cache: "no-store" });
  
  if (!res.ok) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-500">Gagal mengambil data berita.</h1>
      </div>
    );
  }

  const newsList = await res.json();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Berita</h1>
          <p className="text-muted-foreground">Kelola berita dan pengumuman sekolah.</p>
        </div>
        <Link href="/admin/news/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Berita
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">Judul</th>
              <th className="px-6 py-4">Penulis</th>
              <th className="px-6 py-4">Tanggal Publikasi</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {newsList.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Belum ada berita.
                </td>
              </tr>
            ) : (
              newsList.map((item: any) => (
                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4">{item.author?.name || "-"}</td>
                  <td className="px-6 py-4">
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/admin/news/${item.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DeleteConfirmButton endpoint="/admin/news" id={item.id} title={item.title} entityName="berita" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
