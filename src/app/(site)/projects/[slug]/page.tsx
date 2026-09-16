import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import ProjectDetails from "../../../components/pages/projects/ProjectDetails";
import JsonLd from "../../../components/shared/JsonLd";
import { siteConfig } from "../../../config/site";
import { buildProjectSchema } from "../../../config/structuredData";
import {
  getProjectByIdOnServer,
  getProjectBySlugOnServer,
} from "../../../services/projectServerApis";

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

  const canonical = `/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
      url: `${siteConfig.url}${canonical}`,
    },
    twitter: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
    },
  };
}

export default async function Page({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await loadProject(slug);

  return (
    <>
      <JsonLd data={buildProjectSchema(project)} />
      <ProjectDetails project={project} />
    </>
  );
}
