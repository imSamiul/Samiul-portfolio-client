"use client";

import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { ProjectFormValues } from "../../../../types/ProjectType";

type ProjectFormProps = {
  mode: "create" | "edit";
  defaultValues: ProjectFormValues;
  isPending: boolean;
  onSubmit: SubmitHandler<ProjectFormValues>;
};

const TEXT_FIELDS = [
  { name: "title", label: "Project Name:", placeholder: "Enter project name" },
  {
    name: "summary",
    label: "Summary:",
    placeholder: "Say one line about the project",
  },
  {
    name: "frontEndTech",
    label: "Frontend Technologies:",
    placeholder: "Enter frontend technologies (comma-separated)",
  },
  {
    name: "backEndTech",
    label: "Backend Technologies:",
    placeholder: "Enter backend technologies (comma-separated)",
  },
  { name: "liveLink", label: "Live Link:", placeholder: "Enter live link" },
  {
    name: "frontEndRepo",
    label: "Frontend Repo:",
    placeholder: "Enter frontend repo link",
  },
  {
    name: "backEndRepo",
    label: "Backend Repo:",
    placeholder: "Enter backend repo link",
  },
] as const;

function ProjectForm({
  mode,
  defaultValues,
  isPending,
  onSubmit,
}: ProjectFormProps) {
  const isCreate = mode === "create";
  const labels = isCreate
    ? { idle: "Add Project", pending: "Adding Project..." }
    : { idle: "Update", pending: "Updating..." };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProjectFormValues>({ defaultValues });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const selectedImage = watch("image");

  useEffect(() => {
    const file = selectedImage?.[0];
    if (!file) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  return (
    <form
      className="grid gap-1 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {TEXT_FIELDS.map((field) => (
        <div className="form-control" key={field.name}>
          <label className="label" htmlFor={field.name}>
            <span className="label-text">{field.label}</span>
          </label>
          <input
            id={field.name}
            type="text"
            className="input input-bordered"
            placeholder={field.placeholder}
            {...register(field.name, { required: `${field.label} is required` })}
          />
          {errors[field.name] && (
            <p className="text-error mt-1">{errors[field.name]?.message}</p>
          )}
        </div>
      ))}

      <div className="form-control md:col-span-2 lg:col-span-3">
        <label className="label" htmlFor="projectDetails">
          <span className="label-text">Project Details:</span>
        </label>
        <textarea
          id="projectDetails"
          className="textarea textarea-bordered md:h-32"
          placeholder="Enter project details"
          {...register("projectDetails", {
            required: "Project details are required",
          })}
        />
        {errors.projectDetails && (
          <p className="text-error mt-1">{errors.projectDetails.message}</p>
        )}
      </div>

      <div className="form-control justify-center">
        <label className="cursor-pointer label" htmlFor="showOnHomepage">
          <span className="label-text">Show on Homepage:</span>
          <input
            id="showOnHomepage"
            type="checkbox"
            className="toggle toggle-primary"
            {...register("showOnHomepage")}
          />
        </label>
      </div>

      {isCreate && (
        <div className="form-control">
          <label className="label" htmlFor="image">
            <span className="label-text">Image:</span>
          </label>
          <input
            id="image"
            type="file"
            accept="image/png,image/jpeg"
            className="file-input file-input-bordered w-full max-w-xs"
            {...register("image", { required: "An image is required" })}
          />
          {errors.image && (
            <p className="text-error mt-1">{errors.image.message}</p>
          )}
        </div>
      )}
      {imagePreview && (
        <img src={imagePreview} alt="Selected project image" className="mt-3" />
      )}

      <button
        type="submit"
        className="btn btn-primary w-full mt-5 md:col-span-2 lg:col-span-3"
        disabled={isPending}
      >
        {isPending ? labels.pending : labels.idle}
      </button>
    </form>
  );
}

export default ProjectForm;
