import type { Metadata } from 'next';

import AboutPage from '@/components/pages/about/AboutPage';
import JsonLd from '@/components/shared/JsonLd';
import {
  buildBreadcrumbSchema,
  buildMetadata,
  profilePageSchema,
} from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: `About ${siteConfig.name} — a MERN stack developer from Bangladesh building scalable, user-friendly web applications with React, Next.js and Node.js.`,
  path: '/about',
});

export default function Page() {
  return (
    <>
      <AboutPage />
      {/* Structured data goes after the content: Next.js scrolls a new
          route to its first DOM node, and a zero-size <script> first in line
          made it keep the previous page's scroll position instead. */}
      <JsonLd data={profilePageSchema} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
    </>
  );
}
