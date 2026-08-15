'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Trash2, X, AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteConfirmButtonProps {
  endpoint: string; // e.g. "/admin/news"
  id: string | number;
  title: string;
  entityName?: string; // e.g. "berita", "agenda", "artikel"
  onDeleted?: () => void | Promise<void>;
}

export function DeleteConfirmButton({
  endpoint,
  id,
  title,
  entityName = 'data',
  onDeleted,
}: DeleteConfirmButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}${endpoint}/${id}`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Gagal menghapus ${entityName}`);
      }

      setOpen(false);
      if (onDeleted) {
        await onDeleted();
      } else {
        router.refresh();
      }
    } catch {
      alert(`Terjadi kesalahan saat menghapus ${entityName}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-lg transition-colors cursor-pointer"
        title={`Hapus ${entityName}`}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

      {/* Confirmation Modal Backdrop */}
      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          
          {/* Modal Container */}
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 pb-0 flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <button
                type="button"
                onClick={() => !loading && setOpen(false)}
                disabled={loading}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-2">
              <h3 className="text-lg font-bold text-slate-900">
                Hapus {entityName.charAt(0).toUpperCase() + entityName.slice(1)}?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Apakah Anda yakin ingin menghapus {entityName} <strong className="text-slate-900 font-semibold">&quot;{title}&quot;</strong>? Tindakan ini bersifat permanen dan tidak dapat dipulihkan.
              </p>
            </div>

            {/* Actions */}
            <div className="p-6 pt-2 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-xs font-bold text-slate-700 transition-colors cursor-pointer disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Ya, Hapus</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      )}
    </>
  );
}
