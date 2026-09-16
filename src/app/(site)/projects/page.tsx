import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProjectsPage from '@/components/pages/projects/ProjectsPage';
import JsonLd from '@/components/shared/JsonLd';
import {
  buildBreadcrumbSchema,
  buildMetadata,
  buildProjectListSchema,
} from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { getAllProjectsOnServer } from '@/services/apis/projectServerApis';

type ProjectsRouteProps = {
  searchParams: Promise<{ page?: string }>;
};

const description = `Full-stack web projects built by ${siteConfig.name} with React, Next.js, Node.js, Express and MongoDB.`;

/** Anything that is not a whole page number is answered with page one. */
function parsePage(value: string | undefined) {
  const page = Number(value ?? 1);

  return Number.isInteger(page) && page >= 1 ? page : 1;
}

export async function generateMetadata({
  searchParams,
}: ProjectsRouteProps): Promise<Metadata> {
  const page = parsePage((await searchParams).page);

  // Each page canonicalises to itself: pointing them all at /projects would
  // tell Google the later pages are duplicates and drop them from the index.
  return buildMetadata({
    title: page > 1 ? `Projects – Page ${page}` : 'Projects',
    description,
    path: page > 1 ? `/projects?page=${page}` : '/projects',
  });
}

export default async function Page({ searchParams }: ProjectsRouteProps) {
  const page = parsePage((await searchParams).page);
  const projectsPage = await getAllProjectsOnServer({ page });

  // A page past the end is not a real URL. Without this it would answer 200
  // with an empty grid, for as many ?page= values as a crawler cares to try.
  if (page > projectsPage.meta.totalPages) {
    notFound();
  }

  return (
    <>
      <ProjectsPage projectsPage={projectsPage} />
      {/* Structured data goes after the content: Next.js scrolls a new
          route to its first DOM node, and a zero-size <script> first in line
          made it keep the previous page's scroll position instead.
          Each page describes its own items; the sitemap lists every project,
          so a crawler reaches the rest either way. */}
      <JsonLd data={buildProjectListSchema(projectsPage.items)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />
    </>
  );
}
