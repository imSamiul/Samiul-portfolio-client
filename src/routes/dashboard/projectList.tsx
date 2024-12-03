import { createFileRoute } from "@tanstack/react-router";
import { useGetAllProjects } from "../../services/quries/projectQuries";
import { ProjectType } from "../../types/ProjectType";
import { useUpdateShowOnHomePage } from "../../services/mutations/projectMutation";
import Loader from "../../components/UI/Loader";

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
                    <button className="btn btn-sm btn-outline">Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline btn-error">
                      Delete
                    </button>
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
