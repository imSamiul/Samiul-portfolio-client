"use client";

import { useRouter } from "next/navigation";

import { useUpdateProject } from "../../../../services/mutations/projectMutation";
import { ProjectFormValues, ProjectType } from "../../../../types/ProjectType";
import { joinTechList, splitTechList } from "../../../../utils/techList";
import Toast from "../../../ui/Toast";
import ProjectForm from "./ProjectForm";

function EditProject({ project }: { project: ProjectType }) {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useUpdateProject();

  const defaultValues: ProjectFormValues = {
    title: project.title,
    slug: project.slug,
    status: project.status,
    order: project.order,
    summary: project.summary,
    frontEndTech: joinTechList(project.frontEndTech),
    backEndTech: joinTechList(project.backEndTech),
    liveLink: project.liveLink ?? "",
    frontEndRepo: project.frontEndRepo ?? "",
    backEndRepo: project.backEndRepo ?? "",
    projectDetails: project.projectDetails ?? "",
    showOnHomepage: project.showOnHomepage ?? false,
  };

  function handleUpdate(values: ProjectFormValues) {
    mutate(
      {
        projectId: project.id!,
        formData: {
          title: values.title,
          slug: values.slug,
          status: values.status,
          order: values.order,
          summary: values.summary,
          liveLink: values.liveLink,
          frontEndRepo: values.frontEndRepo,
          backEndRepo: values.backEndRepo,
          projectDetails: values.projectDetails,
          showOnHomepage: values.showOnHomepage,
          frontEndTech: splitTechList(values.frontEndTech),
          backEndTech: splitTechList(values.backEndTech),
        },
      },
      { onSuccess: () => router.push("/dashboard/project-list") },
    );
  }

  return (
    <div className="container mx-auto p-5">
      {isError && <Toast message={error.message} variant="error" />}
      <h1 className="text-2xl font-bold text-center mb-5">Edit Project</h1>
      <ProjectForm
        mode="edit"
        defaultValues={defaultValues}
        isPending={isPending}
        onSubmit={handleUpdate}
      />
    </div>
  );
}

export default EditProject;
