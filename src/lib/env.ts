/**
 * Public env vars are inlined at build time, so every read happens here through
 * a literal `process.env.X` and the fallbacks live in one place.
 *
 * Browser code only ever sees NEXT_PUBLIC_*. `API_BASE_URL` is server-only: it
 * is what Server Components and the sitemap use to reach Express directly.
 */
export const API_PREFIX = '/api/v1';

export const env = {
  /** Browser → API. Used by dashboard mutations and the resume download. */
  apiBaseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:5000',
} as const;

/** Browser URL builder. */
export const apiUrl = (path: string) => `${env.apiBaseUrl}${API_PREFIX}${path}`;

/**
 * Server-to-server origin. RSC and the sitemap talk to Express directly, and a
 * missing value has to fail loudly rather than silently render empty pages.
 */
export function serverApiUrl(path: string) {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error('API_BASE_URL is not set');
  }

  return `${baseUrl}${API_PREFIX}${path}`;
}
