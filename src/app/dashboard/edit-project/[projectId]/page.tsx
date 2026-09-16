import type { Metadata } from "next";
import { notFound } from "next/navigation";

import EditProject from "../../../../components/pages/dashboard/project/EditProject";
import { getProjectByIdOnServer } from "../../../../services/projectServerApis";

export const metadata: Metadata = {
  title: "Edit Project",
  robots: { index: false, follow: false },
};

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProjectByIdOnServer(projectId, { fresh: true });

  if (!project) {
    notFound();
  }

  return <EditProject project={project} />;
}
