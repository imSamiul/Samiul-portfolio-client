"use client";

import { useRouter } from "next/navigation";

import { useCreateNewProject } from "../../../../services/mutations/projectMutation";
import { ProjectFormValues } from "../../../../types/ProjectType";
import { splitTechList } from "../../../../utils/techList";
import Toast from "../../../ui/Toast";
import ProjectForm from "./ProjectForm";

const EMPTY_PROJECT: ProjectFormValues = {
  title: "",
  summary: "",
  frontEndTech: "",
  backEndTech: "",
  liveLink: "",
  frontEndRepo: "",
  backEndRepo: "",
  projectDetails: "",
  showOnHomepage: false,
};

function AddProject() {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useCreateNewProject();

  function handleCreate(values: ProjectFormValues) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("summary", values.summary);
    formData.append("liveLink", values.liveLink);
    formData.append("frontEndRepo", values.frontEndRepo);
    formData.append("backEndRepo", values.backEndRepo);
    formData.append("projectDetails", values.projectDetails);
    formData.append("showOnHomepage", String(values.showOnHomepage));
    formData.append(
      "frontEndTech",
      JSON.stringify(splitTechList(values.frontEndTech)),
    );
    formData.append(
      "backEndTech",
      JSON.stringify(splitTechList(values.backEndTech)),
    );
    if (values.image?.[0]) {
      formData.append("image", values.image[0]);
    }

    mutate(formData, {
      onSuccess: () => router.push("/dashboard/project-list"),
    });
  }

  return (
    <div className="container mx-auto p-5">
      {isError && <Toast message={error.message} variant="error" />}
      <h1 className="text-2xl font-bold text-center mb-5">Add Project</h1>
      <ProjectForm
        mode="create"
        defaultValues={EMPTY_PROJECT}
        isPending={isPending}
        onSubmit={handleCreate}
      />
    </div>
  );
}

export default AddProject;
