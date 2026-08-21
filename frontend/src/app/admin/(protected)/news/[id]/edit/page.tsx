'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { NewsForm } from '@/components/admin/forms/NewsForm';

export default function EditNewsPage() {
  const params = useParams();
  const id = params.id;
  const { data: session } = useSession();
  
  const [data, setData] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
        const res = await fetch(`${apiUrl}/admin/news/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            Accept: 'application/json',
          },
        });
        if (!res.ok) throw new Error('Gagal mengambil data berita.');
        const result = await res.json();
        setData(result);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
      } finally {
        setFetching(false);
      }
    };

    if (session?.accessToken) {
      fetchNews();
    }
  }, [id, session]);

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="text-xs font-semibold text-slate-400">Memuat data berita...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-bold">
        {error}
      </div>
    );
  }

  return <NewsForm isEdit={true} initialData={data} />;
}
