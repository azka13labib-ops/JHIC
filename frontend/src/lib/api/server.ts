const BASE_URL = process.env.API_URL || 'http://localhost:8000/api'; 

export async function serverFetch<T>(
  endpoint: string,
  options?: { revalidate?: number | false; tags?: string[] }
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: {
      revalidate: options?.revalidate ?? 3600, 
      tags: options?.tags,
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} on ${endpoint}`);
  }
  
  return res.json();
}
