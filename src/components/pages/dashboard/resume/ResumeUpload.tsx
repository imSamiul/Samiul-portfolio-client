"use client";

import { useForm } from "react-hook-form";

import { useUploadResume } from "../../../../services/mutations/resumeMutation";
import { RESUME_DOWNLOAD_URL } from "../../../../services/resumeApis";
import Toast from "../../../ui/Toast";

type ResumeUploadValues = {
  resume: FileList;
};

function ResumeUpload() {
  const { mutate, isPending, isError, error, isSuccess } = useUploadResume();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResumeUploadValues>();

  function handleUpload(values: ResumeUploadValues) {
    const file = values.resume[0];
    if (!file) {
      return;
    }

    mutate(file, { onSuccess: () => reset() });
  }

  return (
    <div className="container mx-auto p-5">
      {isError && <Toast message={error.message} variant="error" />}
      {isSuccess && <Toast message="Resume updated" variant="success" />}

      <h1 className="text-2xl font-bold text-center mb-5">Resume</h1>

      <p className="mb-5">
        The site serves whatever is uploaded here.{" "}
        <a
          className="link"
          href={RESUME_DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download the current one
        </a>{" "}
        to check it before replacing it.
      </p>

      <form className="grid gap-4 max-w-md" onSubmit={handleSubmit(handleUpload)}>
        <div className="form-control">
          <label className="label" htmlFor="resume">
            <span className="label-text">Replace with a PDF (max 5 MB):</span>
          </label>
          <input
            id="resume"
            type="file"
            accept="application/pdf"
            className="file-input file-input-bordered w-full"
            {...register("resume", { required: "Choose a PDF to upload" })}
          />
          {errors.resume && (
            <p className="text-error mt-1">{errors.resume.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isPending}
        >
          {isPending ? "Uploading..." : "Upload resume"}
        </button>
      </form>
    </div>
  );
}

export default ResumeUpload;
