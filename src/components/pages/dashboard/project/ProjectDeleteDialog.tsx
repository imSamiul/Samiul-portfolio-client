"use client";

import Image from "next/image";
import { useRef } from "react";

import { useDeleteProject } from "../../../../services/mutations/projectMutation";
import { ProjectType } from "../../../../types/ProjectType";
import {
  PROJECT_IMAGE_HEIGHT,
  PROJECT_IMAGE_WIDTH,
} from "../../../../utils/projectImage";

function ProjectDeleteDialog({ project }: { project: ProjectType }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { mutate, isPending, isError, error } = useDeleteProject();

  function handleDelete() {
    mutate(project.id!, {
      onSuccess: () => dialogRef.current?.close(),
    });
  }

  return (
    <div>
      <button
        className="btn btn-md btn-error text-white "
        onClick={() => dialogRef.current?.showModal()}
      >
        Delete Project
      </button>

      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box  overflow-visible">
          <div className="flex flex-col gap-3 py-3">
            <div className="my-2">
              <Image
                src={project.image!}
                alt={project.title}
                width={PROJECT_IMAGE_WIDTH}
                height={PROJECT_IMAGE_HEIGHT}
                sizes="100vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className=" md:text-lg ">
                Delete Project :{" "}
                <span className="font-medium">{project.title}</span>
              </h3>
              <p className="my-2 md:text-lg">
                Summary:
                <span className="font-medium">{project.summary}</span>
              </p>
              <p className="my-2 md:text-lg">
                Live Link:
                <a className="font-medium " href={project.liveLink}>
                  {project.liveLink}
                </a>
              </p>
            </div>
          </div>

          {isError && (
            <p className="text-error" role="alert">
              {error.message}
            </p>
          )}

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-secondary text-black"
              onClick={() => dialogRef.current?.close()}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default ProjectDeleteDialog;
