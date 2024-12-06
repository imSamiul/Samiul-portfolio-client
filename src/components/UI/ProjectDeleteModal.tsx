import { useDeleteProject } from "../../services/mutations/projectMutation";
import { DeleteProjectModalPropsType } from "../../types/ProjectType";

function ProjectDeleteModal({
  modalId,
  title,
  summary,
  image,
  liveLink,
}: DeleteProjectModalPropsType) {
  const toggleModal = (modalId: string, action: "open" | "close") => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (action === "open") modal?.showModal();
    if (action === "close") modal?.close();
  };

  const { mutate, isPending } = useDeleteProject();

  const deleteProjectHandler = () => {
    toggleModal(modalId, "close");
    mutate(modalId);
  };

  return (
    <div>
      <button
        className="btn btn-md btn-outline btn-error "
        onClick={() => toggleModal(modalId, "open")}
      >
        Delete Project
      </button>

      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box  overflow-visible">
          <div className="flex flex-col gap-3 py-3">
            <div className="my-2">
              <img
                src={image ? `data:image/jpeg;base64,${image}` : ""}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className=" md:text-lg ">
                Delete Project : <span className="font-medium">{title}</span>
              </h3>
              <p className="my-2 md:text-lg">
                Summary:
                <span className="font-medium">{summary}</span>
              </p>
              <p className="my-2 md:text-lg">
                Live Link:
                <a className="font-medium " href={liveLink}>
                  {liveLink}
                </a>
              </p>
            </div>
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-error"
              onClick={() => toggleModal(modalId, "close")}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={deleteProjectHandler}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={() => toggleModal(modalId, "close")}>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default ProjectDeleteModal;
