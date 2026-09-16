import { ProjectType } from "../../../types/ProjectType";
import ProjectGrid from "./ProjectGrid";

function ProjectsPage({ projects }: { projects: ProjectType[] }) {
  return (
    <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
      <div className="sticky top-0   py-2 ">
        <h1 className="text-center text-3xl font-bold mb-5">Projects</h1>
      </div>
      <div className="py-4 md:py-8">
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}

export default ProjectsPage;
