import { createFileRoute } from "@tanstack/react-router";
import { useGetAllProjects } from "../../services/queries/projectQueries";
import Projects from "../../components/homepage/Projects";
import CardLoader from "../../components/UI/CardLoader";

export const Route = createFileRoute("/projects/allProjects")({
  component: AllProjectsComponent,
});

function AllProjectsComponent() {
  const { data, isLoading } = useGetAllProjects();

  if (isLoading) {
    return (
      <div>
        <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
          <div className="sticky top-0 bg-white  py-2 ">
            <h1 className="text-center text-3xl font-bold mb-5 text-primary">
              Projects
            </h1>
          </div>
          <div className="py-4 md:py-8">
            <CardLoader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
      <div className="sticky top-0 bg-white  py-2 ">
        <h1 className="text-center text-3xl font-bold mb-5">Projects</h1>
      </div>
      <div className="py-4 md:py-8">
        <Projects projects={data} />
      </div>
    </div>
  );
}
