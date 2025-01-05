import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProjectType } from "../../../types/ProjectType";

import { useUpdateProject } from "../../../services/mutations/projectMutation";
import { getProjectById } from "../../../services/projectApis";

export const Route = createFileRoute("/dashboard/editProject/$projectId")({
  loader: async ({ params: { projectId } }) => getProjectById(projectId),
  errorComponent: () => <div>Error</div>,
  notFoundComponent: () => <div>Not Found</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const projectId = Route.useParams().projectId;
  const project = Route.useLoaderData();

  const [formValues, setFormValues] = useState<ProjectType>({
    title: project.title,
    summary: project.summary,
    frontEndTech: project.frontEndTech.join(", "),
    backEndTech: project.backEndTech.join(", "),
    liveLink: project.liveLink,
    frontEndRepo: project.frontEndRepo,
    backEndRepo: project.backEndRepo,
    projectDetails: project.projectDetails,
    showOnHomepage: project.showOnHomepage,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const { mutate } = useUpdateProject();

  function onInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormError(null);
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }
  function onCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setFormError(null);
    setFormValues((prev) => ({ ...prev, [name]: checked }));
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !formValues.title ||
      !formValues.summary ||
      !formValues.projectDetails ||
      !formValues.frontEndTech ||
      !formValues.backEndTech ||
      !formValues.liveLink ||
      !formValues.frontEndRepo ||
      !formValues.backEndRepo
    ) {
      setFormError("Please fill all the fields");
      return;
    }
    // Ensure both fields are arrays
    const transformedFormValues = {
      ...formValues,
      frontEndTech: Array.isArray(formValues.frontEndTech)
        ? formValues.frontEndTech
        : formValues.frontEndTech.split(",").map((tech) => tech.trim()),
      backEndTech: Array.isArray(formValues.backEndTech)
        ? formValues.backEndTech
        : formValues.backEndTech.split(",").map((tech) => tech.trim()),
    };

    mutate({ projectId, formData: transformedFormValues });
  }

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-5">Edit Project</h2>
      <form
        className="grid gap-1 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        onSubmit={handleSubmit}
      >
        {/* Project Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Project Name:</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Enter project name"
            name="title"
            value={formValues.title}
            onChange={onInputChange}
          />
        </div>

        {/* One Line Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Summary:</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Say one line about the project"
            name="summary"
            value={formValues.summary}
            onChange={onInputChange}
          />
        </div>

        {/* Frontend Technologies */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Frontend Technologies:</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Enter frontend technologies (comma-separated)"
            name="frontEndTech"
            value={formValues.frontEndTech}
            onChange={onInputChange}
          />
        </div>

        {/* Backend Technologies */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Backend Technologies:</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Enter backend technologies (comma-separated)"
            name="backEndTech"
            value={formValues.backEndTech}
            onChange={onInputChange}
          />
        </div>

        {/* Live Link */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Live Link:</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Enter live link"
            name="liveLink"
            value={formValues.liveLink}
            onChange={onInputChange}
          />
        </div>

        {/* Frontend Repo */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Frontend Repo:</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Enter frontend repo link"
            name="frontEndRepo"
            value={formValues.frontEndRepo}
            onChange={onInputChange}
          />
        </div>

        {/* Backend Repo */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Backend Repo:</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Enter backend repo link"
            name="backEndRepo"
            value={formValues.backEndRepo}
            onChange={onInputChange}
          />
        </div>

        {/* Project Details */}
        <div className="form-control md:col-span-2 lg:col-span-3">
          <label className="label">
            <span className="label-text">Project Details:</span>
          </label>
          <textarea
            className="textarea textarea-bordered md:h-32"
            placeholder="Enter project details"
            name="projectDetails"
            value={formValues.projectDetails}
            onChange={onInputChange}
          />
        </div>

        {/* Show on Homepage */}
        <div className="form-control justify-center">
          <label className="cursor-pointer label">
            <span className="label-text">Show on Homepage:</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              name="showOnHomepage"
              checked={formValues.showOnHomepage}
              onChange={onCheckboxChange}
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-5 md:col-span-2 lg:col-span-3"
          //   disabled={isPending}
        >
          Update
        </button>
      </form>
      {formError && <div className="alert alert-error mt-5">{formError}</div>}
    </div>
  );
}
