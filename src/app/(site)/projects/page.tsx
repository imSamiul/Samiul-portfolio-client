import type { Metadata } from "next";

import ProjectsPage from "../../components/pages/projects/ProjectsPage";
import { siteConfig } from "../../config/site";
import { getAllProjectsOnServer } from "../../services/projectServerApis";

export const metadata: Metadata = {
  title: "Projects",
  description: `Full-stack web projects built by ${siteConfig.name} with React, Next.js, Node.js, Express and MongoDB.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description: `Full-stack web projects built by ${siteConfig.name}.`,
    url: `${siteConfig.url}/projects`,
  },
};

export default async function Page() {
  const projects = await getAllProjectsOnServer();

  return <ProjectsPage projects={projects} />;
}
