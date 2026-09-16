import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/dashboard/',
        '/login',
        // Any link can pick up tracking or filter params, and each variant is
        // a separate URL to a crawler — an unbounded set pointing at the same
        // page. The canonical tags already name the real one.
        '/*?',
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
