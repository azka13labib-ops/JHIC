import { z } from 'zod';

const isServer = typeof window === 'undefined';

// Gunakan URL internal Docker untuk komunikasi antar container di server,
// fallback ke public URL untuk client-side.
let BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

if (isServer) {
  // Gunakan internal URL jika di-define di environment (untuk Docker), jika tidak fallback ke public URL / localhost
  BASE_URL = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
  console.log("SERVER FETCH BASE_URL ACTIVE:", BASE_URL);
}

export async function serverFetch<T>(
  endpoint: string,
  options?: { revalidate?: number | false; tags?: string[]; schema?: z.ZodSchema<T> }
): Promise<T> {
  const fetchOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const nextOptions: Record<string, unknown> = {};
  if (options?.revalidate !== undefined) {
    nextOptions.revalidate = options.revalidate;
  } else {
    fetchOptions.cache = 'no-store';
  }

  if (options?.tags) {
    nextOptions.tags = options.tags;
  }

  if (Object.keys(nextOptions).length > 0) {
    (fetchOptions as RequestInit & { next?: Record<string, unknown> }).next = nextOptions;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);
  
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} on ${endpoint}`);
  }
  
  const data = await res.json();
  
  if (options?.schema) {
    try {
      return options.schema.parse(data);
    } catch (err) {
      console.error(`Schema validation failed for ${endpoint}:`, err);
      // Depending on strictness, we might throw here, but for now we'll just log and return data
      // to avoid breaking legacy code that hasn't fully conformed to schemas yet.
      return data as T;
    }
  }

  return data as T;
}
