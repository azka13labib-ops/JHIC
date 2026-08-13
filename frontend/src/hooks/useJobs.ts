import { useState, useCallback } from 'react';
import apiClient from '@/lib/api/client';
import type { Vacancy } from '@/types';

interface UseJobsReturn {
  jobs: Vacancy[];
  loading: boolean;
  error: string | null;
  fetchJobs: (params?: { type?: string; search?: string }) => Promise<void>;
}

export function useJobs(): UseJobsReturn {
  const [jobs, setJobs] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async (params?: { type?: string; search?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get<{ data: Vacancy[] }>('/jobs', { params });
      setJobs(res.data.data ?? []);
    } catch {
      setError('Gagal memuat lowongan.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { jobs, loading, error, fetchJobs };
}
