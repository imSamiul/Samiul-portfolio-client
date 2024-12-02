import { createFileRoute } from "@tanstack/react-router";

import { useCreateNewProject } from "../../services/mutation/projectMutation";
import { useState } from "react";
import { ProjectType } from "../../types/ProjectType";

export const Route = createFileRoute("/dashboard/addProject")({
  component: AddProjectForm,
});

const initialValues = {
  title: "",
  summary: "",
  frontEndTech: "",
  backEndTech: "",
  liveLink: "",
  frontEndRepo: "",
  backEndRepo: "",
  projectDetails: "",
  showOnHomepage: false,
  image: null,
};

function AddProjectForm() {
  const [formValues, setFormValues] = useState<ProjectType>(initialValues);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const { mutate, isPending } = useCreateNewProject();

  function onInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormError(null);
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFormError(null);
    if (file) {
      setFormValues((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
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
      !formValues.image ||
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

    const formData = new FormData();

    Object.entries(transformedFormValues).forEach(([key, value]) => {
      if (value !== null) {
        // Convert arrays to JSON for FormData
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string | Blob);
        }
      }
    });

    // Debugging FormData (Optional)
    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    mutate(formData);
    setFormValues(initialValues);
  }

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-5">Add Project</h2>
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

        {/* Image */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image:</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            name="image"
            onChange={onFileChange}
          />
        </div>
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-3" />
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-5 md:col-span-2 lg:col-span-3"
          disabled={isPending}
        >
          {isPending ? "Adding Project..." : "Add Project"}
        </button>
      </form>
      {formError && <div className="alert alert-error mt-5">{formError}</div>}
    </div>
  );
}

export default AddProjectForm;
