import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

import ProjectDetails from '@/components/pages/projects/ProjectDetails';
import JsonLd from '@/components/shared/JsonLd';
import {
  buildBreadcrumbSchema,
  buildMetadata,
  buildProjectSchema,
} from '@/lib/seo';
import {
  getProjectByIdOnServer,
  getProjectBySlugOnServer,
} from '@/services/apis/projectServerApis';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const OBJECT_ID_PATTERN = /^[0-9a-f]{24}$/i;

/**
 * Project URLs used to be `/projects/<ObjectId>`, and those are indexed and
 * shared, so an id is redirected to the slug rather than answered with a 404.
 */
async function loadProject(slug: string) {
  if (OBJECT_ID_PATTERN.test(slug)) {
    const project = await getProjectByIdOnServer(slug);

    if (!project) {
      notFound();
    }

    permanentRedirect(`/projects/${project.slug}`);
  }

  const project = await getProjectBySlugOnServer(slug);

  if (!project) {
    notFound();
  }

  return project;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  // Resolved here rather than only in the page so the 404 status and the
  // redirect are settled before the response shell is flushed.
  const project = await loadProject(slug);

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    images: [project.image],
  });
}

export default async function Page({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await loadProject(slug);

  return (
    <>
      <ProjectDetails project={project} />
      {/* Structured data goes after the content: Next.js scrolls a new
          route to its first DOM node, and a zero-size <script> first in line
          made it keep the previous page's scroll position instead. */}
      <JsonLd data={buildProjectSchema(project)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
    </>
  );
}
