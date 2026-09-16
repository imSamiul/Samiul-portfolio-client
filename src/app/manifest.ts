import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.jobTitle}`,
    short_name: 'Samiul',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfcfe',
    theme_color: '#555de3',
    // `src/app/icon.png` is a real 512×512 asset, so there is no generated
    // `icon.tsx`; both would claim the same route.
    icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png' }],
  };
}
