'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Pin, Loader2 } from 'lucide-react';
import LimitModal from '@/components/ui/LimitModal';

interface PinAgendaButtonProps {
  id: number;
  initialPinned: boolean;
  title: string;
}

export function PinAgendaButton({ id, initialPinned, title }: PinAgendaButtonProps) {
  const [pinned, setPinned] = useState(initialPinned);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState<{isOpen: boolean, title: string, message: string}>({
    isOpen: false,
    title: '',
    message: ''
  });

  const router = useRouter();
  const { data: session } = useSession();

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}/admin/agendas/${id}/toggle-pin`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          Accept: 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400 && data.error === 'Batas Maksimal Tercapai') {
          setModalData({
            isOpen: true,
            title: data.error,
            message: data.message
          });
          return;
        }
        throw new Error('Gagal memperbarui status sematan agenda');
      }

      setPinned(data.is_pinned);
      router.refresh();
    } catch {
      alert(`Gagal mengubah status sematan untuk "${title}".`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleToggle}
        disabled={loading}
        className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
          pinned
            ? 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100 shadow-2xs'
            : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
        }`}
        title={pinned ? 'Disematkan di Beranda (Klik untuk lepas sematan)' : 'Sematkan ke Beranda'}
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-500" />
        ) : (
          <Pin className={`w-3.5 h-3.5 ${pinned ? 'fill-amber-500 text-amber-600' : ''}`} />
        )}
        <span className="hidden sm:inline text-[10px]">
          {pinned ? 'Disematkan' : 'Sematkan'}
        </span>
      </button>

      <LimitModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        title={modalData.title}
        message={modalData.message}
      />
    </>
  );
}
