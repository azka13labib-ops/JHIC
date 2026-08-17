/**
 * Site URL configuration for Public Website and Admin Control Panel.
 * Uses environment variables or NODE_ENV to ensure identical SSR & client hydration values.
 */

export const PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://smaspgri1lumajang.sch.id');

export const CP_SITE_URL =
  process.env.NEXT_PUBLIC_CP_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'http://cp.localhost:3000'
    : 'https://cp.smaspgri1lumajang.sch.id');

/**
 * Returns a full URL pointing to the public website.
 * @param path e.g. '/berita/prestasi-juara-1' or ''
 */
export function getPublicUrl(path: string = ''): string {
  if (!path) return PUBLIC_SITE_URL;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${PUBLIC_SITE_URL}${cleanPath}`;
}

/**
 * Returns a full URL pointing to the Admin Control Panel subdomain.
 * @param path e.g. '/dashboard' or '/login'
 */
export function getCpUrl(path: string = ''): string {
  if (!path) return CP_SITE_URL;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${CP_SITE_URL}${cleanPath}`;
}
