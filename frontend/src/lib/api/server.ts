const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'; 

export async function serverFetch<T>(
  endpoint: string,
  options?: { revalidate?: number | false; tags?: string[] }
): Promise<T> {
  const fetchOptions: RequestInit = {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  if (options?.tags) {
    (fetchOptions as any).next = { tags: options.tags };
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);
  
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} on ${endpoint}`);
  }
  
  return res.json();
}
