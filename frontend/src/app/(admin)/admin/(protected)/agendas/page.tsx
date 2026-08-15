import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { fetchApi } from "@/lib/api-client";
import { Plus, Edit } from "lucide-react";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";

export const dynamic = "force-dynamic";

export default async function AgendaPage() {
  const res = await fetchApi("/admin/agendas", { cache: "no-store" });
  
  if (!res.ok) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-500">Gagal mengambil data agenda.</h1>
      </div>
    );
  }

  const agendasList = await res.json();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Agenda</h1>
          <p className="text-muted-foreground">Kelola agenda sekolah sekolah.</p>
        </div>
        <Link href="/admin/agendas/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Agenda
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">Judul</th>
              <th className="px-6 py-4">Lokasi</th>
              <th className="px-6 py-4">Tanggal Agenda</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {agendasList.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Belum ada agenda.
                </td>
              </tr>
            ) : (
              agendasList.map((item: any) => (
                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4">{item.location || "-"}</td>
                  <td className="px-6 py-4">
                    {new Date(item.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/admin/agendas/${item.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DeleteConfirmButton endpoint="/admin/agendas" id={item.id} title={item.title} entityName="agenda" />
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
