import { createFileRoute, Link } from "@tanstack/react-router";
import { useGetAllProjects } from "../../services/queries/projectQueries";
import { ProjectType } from "../../types/ProjectType";
import { useUpdateShowOnHomePage } from "../../services/mutations/projectMutation";
import Loader from "../../components/UI/Loader";
import ProjectDeleteModal from "../../components/UI/ProjectDeleteModal";

export const Route = createFileRoute("/dashboard/projectList")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useGetAllProjects();
  const { mutate, isPending } = useUpdateShowOnHomePage();

  if (isPending) {
    return <Loader className="h-screen" />;
  }
  if (isLoading) {
    return <Loader className="h-screen" />;
  }

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-5">Project List</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="text-base">Title</th>
              <th className="text-base">Live Link</th>
              <th className="text-base text-center">Show on homepage</th>
              <th className="text-base">Edit</th>
              <th className="text-base">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((project: ProjectType, index: number) => {
              return (
                <tr key={project._id} className="hover">
                  <th>{index + 1}</th>
                  <td>{project.title}</td>
                  <td>{project.liveLink}</td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="toggle toggle-sm"
                      defaultChecked={project.showOnHomepage}
                      onChange={() => {
                        mutate(project._id!);
                      }}
                    />
                  </td>
                  <td>
                    <div>
                      <Link
                        to="/dashboard/editProject/$projectId"
                        params={{ projectId: project._id! }}
                        className="btn btn-md btn-outline"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                  <td>
                    <ProjectDeleteModal
                      modalId={project._id!}
                      title={project.title}
                      summary={project.summary}
                      image={
                        project.image && typeof project.image === "string"
                          ? project.image
                          : null
                      }
                      liveLink={project.liveLink}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
