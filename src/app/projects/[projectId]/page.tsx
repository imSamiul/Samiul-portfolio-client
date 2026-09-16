import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectDetails from "../../../components/pages/projects/ProjectDetails";
import JsonLd from "../../../components/shared/JsonLd";
import { siteConfig } from "../../../config/site";
import { buildProjectSchema } from "../../../config/structuredData";
import { getProjectByIdOnServer } from "../../../services/projectServerApis";

type ProjectPageProps = {
  params: Promise<{ projectId: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = await getProjectByIdOnServer(projectId);

  // Raised here rather than only in the page so the 404 status is set before
  // the response shell is flushed.
  if (!project) {
    notFound();
  }

  const canonical = `/projects/${projectId}`;

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
  const { projectId } = await params;
  const project = await getProjectByIdOnServer(projectId);

  if (!project) {
    notFound();
  }

  return (
    <>
      <JsonLd data={buildProjectSchema(project)} />
      <ProjectDetails project={project} />
    </>
  );
}
