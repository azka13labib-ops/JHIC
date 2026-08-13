import { useState, useCallback } from 'react';
import apiClient from '@/lib/api/client';
import type { Product } from '@/types';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (params?: { category?: string; search?: string }) => Promise<void>;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (params?: { category?: string; search?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get<{ data: Product[] }>('/products', { params });
      setProducts(res.data.data ?? []);
    } catch {
      setError('Gagal memuat produk.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { products, loading, error, fetchProducts };
}
