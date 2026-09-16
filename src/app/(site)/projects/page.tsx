import type { Metadata } from 'next';

import ProjectsPage from '@/components/pages/projects/ProjectsPage';
import JsonLd from '@/components/shared/JsonLd';
import {
  buildBreadcrumbSchema,
  buildMetadata,
  buildProjectListSchema,
} from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { getAllProjectsOnServer } from '@/services/apis/projectServerApis';

export const metadata: Metadata = buildMetadata({
  title: 'Projects',
  description: `Full-stack web projects built by ${siteConfig.name} with React, Next.js, Node.js, Express and MongoDB.`,
  path: '/projects',
});

export default async function Page() {
  const firstPage = await getAllProjectsOnServer();

  return (
    <>
      <ProjectsPage firstPage={firstPage} />
      {/* Structured data goes after the content: Next.js scrolls a new
          route to its first DOM node, and a zero-size <script> first in line
          made it keep the previous page's scroll position instead.
          Only the first page is described — the rest arrives on scroll, and a
          crawler follows the per-project URLs from the sitemap anyway. */}
      <JsonLd data={buildProjectListSchema(firstPage.items)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />
    </>
  );
}
