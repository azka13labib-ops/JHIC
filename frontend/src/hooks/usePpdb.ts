import { useState, useCallback } from 'react';
import apiClient from '@/lib/api/client';

interface PpdbFormData {
  full_name: string;
  nisn: string;
  date_of_birth: string;
  gender: 'L' | 'P';
  address: string;
  previous_school: string;
  major_choice: string;
  phone?: string;
  email?: string;
  parent_name?: string;
  parent_phone?: string;
}

interface PpdbStatus {
  registration_number: string;
  full_name: string;
  major_choice: string;
  status: 'pending' | 'verified' | 'accepted' | 'rejected';
  notes?: string;
  created_at: string;
}

interface UsePpdbReturn {
  status: PpdbStatus | null;
  loading: boolean;
  error: string | null;
  submitRegistration: (data: PpdbFormData) => Promise<{ registration_number: string } | null>;
  checkStatus: (query: string) => Promise<void>;
}

export function usePpdb(): UsePpdbReturn {
  const [status, setStatus] = useState<PpdbStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRegistration = useCallback(async (data: PpdbFormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.post<{ registration_number: string }>('/ppdb/submit', data);
      return res.data;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengirim pendaftaran.';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkStatus = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const res = await apiClient.get<{ data: PpdbStatus }>('/ppdb/check-status', { params: { q: query } });
      setStatus(res.data.data);
    } catch {
      setError('Data tidak ditemukan. Pastikan nomor pendaftaran atau NISN sudah benar.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { status, loading, error, submitRegistration, checkStatus };
}
