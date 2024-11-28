import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";

export const Route = createFileRoute("/dashboard/addProject")({
  component: AddProjectForm,
});

function AddProjectForm() {
  const [formData, setFormData] = useState({
    projectName: "",
    oneLineDescription: "",
    liveLink: "",
    frontendTechnologies: "" as string, // String input to be split
    backendTechnologies: "" as string, // String input to be split
    frontendRepo: "",
    backendRepo: "",
    projectDetails: "",
    showOnHomepage: false,
  });
  const [image, setImage] = useState("");
  const [formErrors, setFormErrors] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
    if (!e.target.files) return;
    setImage(URL.createObjectURL(e.target.files[0]));
  }
  function onToggleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, showOnHomepage: e.target.checked });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for empty fields
    if (
      !formData.projectName ||
      !formData.oneLineDescription ||
      !formData.liveLink ||
      !formData.frontendTechnologies ||
      !formData.backendTechnologies ||
      !formData.frontendRepo ||
      !formData.backendRepo ||
      !formData.projectDetails
    ) {
      setFormErrors("Please fill all the fields");
      return;
    }

    // Split technologies by commas and trim extra spaces
    const frontendTechArray = formData.frontendTechnologies
      .split(",")
      .map((tech) => tech.trim());
    const backendTechArray = formData.backendTechnologies
      .split(",")
      .map((tech) => tech.trim());

    const projectData = {
      ...formData,
      frontendTechnologies: frontendTechArray,
      backendTechnologies: backendTechArray,
      image,
    };

    console.log("Form submitted:", projectData);
    // Submit projectData to backend
  };

  return (
    <div className="container mx-auto p-5 ">
      <h2 className="text-2xl font-bold text-center mb-5">Add Project</h2>
      <form
        onSubmit={handleSubmit}
        className="grid gap-1 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Project Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Project Name:</span>
          </label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Enter project name"
          />
        </div>

        {/* One Line Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Summary:</span>
          </label>
          <input
            type="text"
            name="oneLineDescription"
            value={formData.oneLineDescription}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Say one line about the project"
          />
        </div>

        {/* Frontend Technologies */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Frontend Technologies:</span>
          </label>
          <input
            type="text"
            name="frontendTechnologies"
            value={formData.frontendTechnologies}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Enter frontend technologies (comma-separated)"
          />
        </div>

        {/* Backend Technologies */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Backend Technologies</span>
          </label>
          <input
            type="text"
            name="backendTechnologies"
            value={formData.backendTechnologies}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Enter backend technologies (comma-separated)"
          />
        </div>

        {/* Live Link */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Live Link:</span>
          </label>
          <input
            type="text"
            name="liveLink"
            value={formData.liveLink}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Enter live link"
          />
        </div>

        {/* Frontend Repo */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Frontend Repo:</span>
          </label>
          <input
            type="text"
            name="frontendRepo"
            value={formData.frontendRepo}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Enter frontend repo link"
          />
        </div>

        {/* Backend Repo */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Backend Repo:</span>
          </label>
          <input
            type="text"
            name="backendRepo"
            value={formData.backendRepo}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Enter backend repo link"
          />
        </div>

        {/* Project Details */}
        <div className="form-control md:col-span-2 lg:col-span-3">
          <label className="label">
            <span className="label-text">Project Details:</span>
          </label>
          <textarea
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            className="textarea textarea-bordered md:h-32"
            placeholder="Enter project details"
          />
        </div>

        {/* Show on Homepage */}
        <div className="form-control justify-center">
          <label className="cursor-pointer label">
            <span className="label-text">Show on Homepage:</span>
            <input
              type="checkbox"
              name="showOnHomepage"
              checked={formData.showOnHomepage}
              onChange={onToggleChange}
              className="toggle toggle-primary"
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
            name="image"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
        {image && <img src={image} alt="Project" />}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-5 md:col-span-2 lg:col-span-3"
        >
          Add Project
        </button>
        {formErrors && (
          <p className="text-red-500 text-sm mt-2">{formErrors}</p>
        )}
      </form>
    </div>
  );
}

export default AddProjectForm;
