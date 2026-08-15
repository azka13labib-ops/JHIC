"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteConfirmButtonProps {
  endpoint: string; // e.g. "/admin/news"
  id: string | number;
  title: string;
  entityName?: string; // e.g. "berita", "agenda", "artikel"
}

export function DeleteConfirmButton({
  endpoint,
  id,
  title,
  entityName = "data",
}: DeleteConfirmButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}/${id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Gagal menghapus ${entityName}`);
      }

      setOpen(false);
      router.refresh();
    } catch {
      alert(`Terjadi kesalahan saat menghapus ${entityName}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        <Trash2 className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus {entityName.charAt(0).toUpperCase() + entityName.slice(1)}?</DialogTitle>
            <DialogDescription>
              Anda yakin ingin menghapus {entityName} &quot;{title}&quot;? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? "Menghapus..." : "Ya, Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
