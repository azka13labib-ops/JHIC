'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { StudentWorkForm } from '@/components/admin/forms/StudentWorkForm';

export default function EditStudentWorkPage() {
  const params = useParams();
  const id = params.id;
  const { data: session } = useSession();
  
  interface StudentWorkData {
    id?: number;
    title?: string;
    description?: string;
    student_name?: string;
    image_path?: string;
    image?: string;
  }
  const [data, setData] = useState<StudentWorkData | undefined>(undefined);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentWork = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
        const res = await fetch(`${apiUrl}/admin/student-works/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            Accept: 'application/json',
          },
        });
        if (!res.ok) throw new Error('Gagal mengambil data karya siswa.');
        
        const result = await res.json();
        setData(result);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setFetching(false);
      }
    };

    if (session?.accessToken) {
      fetchStudentWork();
    }
  }, [id, session]);

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        <span className="text-xs font-semibold text-slate-400">Memuat data karya...</span>
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

  return <StudentWorkForm isEdit={true} initialData={data} />;
}
