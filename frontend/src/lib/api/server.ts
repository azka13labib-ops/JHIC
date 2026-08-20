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
  options?: { revalidate?: number | false; tags?: string[] }
): Promise<T> {
  const fetchOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const nextOptions: any = {};
  if (options?.revalidate !== undefined) {
    nextOptions.revalidate = options.revalidate;
  } else {
    fetchOptions.cache = 'no-store';
  }

  if (options?.tags) {
    nextOptions.tags = options.tags;
  }

  if (Object.keys(nextOptions).length > 0) {
    (fetchOptions as any).next = nextOptions;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);
  
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} on ${endpoint}`);
  }
  
  return res.json();
}
