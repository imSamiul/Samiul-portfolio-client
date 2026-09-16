"use client";

import Link from "next/link";

import {
  useUpdateShowOnHomePage,
  useUpdateStatus,
} from "../../../../services/mutations/projectMutation";
import { useGetAllProjectsForDashboard } from "../../../../services/queries/projectQueries";
import Loader from "../../../ui/Loader";
import ProjectDeleteDialog from "./ProjectDeleteDialog";

function DashboardProjectList() {
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = useGetAllProjectsForDashboard();
  const { mutate: toggleShowOnHomepage, isPending: isTogglePending } =
    useUpdateShowOnHomePage();
  const { mutate: togglePublished, isPending: isPublishPending } =
    useUpdateStatus();

  if (isLoading) {
    return <Loader className="h-screen" />;
  }

  if (isError) {
    return (
      <div className="container mx-auto p-5">
        <div className="alert alert-error" role="alert">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Project List</h1>
      {!projects || projects.length === 0 ? (
        <p className="text-center">No projects yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th className="text-base">Title</th>
                <th className="text-base">Live Link</th>
                <th className="text-base text-center">Published</th>
                <th className="text-base text-center">Order</th>
                <th className="text-base text-center">Show on homepage</th>
                <th className="text-base">Edit</th>
                <th className="text-base">Delete</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project.id} className="hover">
                  <th>{index + 1}</th>
                  <td>{project.title}</td>
                  <td>{project.liveLink ?? "—"}</td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="toggle toggle-sm toggle-success"
                      aria-label={`Publish ${project.title}`}
                      checked={project.status === "published"}
                      disabled={isPublishPending}
                      onChange={() => togglePublished(project.id!)}
                    />
                  </td>
                  <td className="text-center">{project.order}</td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="toggle toggle-sm toggle-primary"
                      aria-label={`Show ${project.title} on the homepage`}
                      checked={project.showOnHomepage ?? false}
                      disabled={isTogglePending}
                      onChange={() => toggleShowOnHomepage(project.id!)}
                    />
                  </td>
                  <td>
                    <Link
                      href={`/dashboard/edit-project/${project.id}`}
                      className="btn btn-md btn-secondary text-black"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <ProjectDeleteDialog project={project} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DashboardProjectList;
