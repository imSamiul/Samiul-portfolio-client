import { createFileRoute } from "@tanstack/react-router";
import { useGetProjectById } from "../../services/queries/projectQueries";

import { LuBadgeCheck } from "react-icons/lu";
import Loader from "../../components/UI/Loader";
import UpReveal from "../../components/motion/UpReveal";

export const Route = createFileRoute("/projects/$projectId")({
  component: RouteComponent,
});

function RouteComponent() {
  const projectId = Route.useParams().projectId;
  const { data: project, isLoading, isError } = useGetProjectById(projectId);

  if (isLoading) {
    return <Loader className="h-screen" />;
  }
  if (!project || isError) {
    return <div>Error</div>;
  }
  const upRevealVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <UpReveal variants={upRevealVariants}>
      <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
        <div>
          <img
            src={
              project.image && typeof project.image === "string"
                ? project.image
                : ""
            }
            alt={project.title}
            className="w-full h-52 md:h-80 lg:h-96 object-cover rounded-xl"
          />
        </div>

        <div className="my-5">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-Montserrat mb-2 ">
            {project.title}
          </h1>
          <p className="mb-4 text-sm md:text-base lg:text-lg text-accent">
            {project.summary}
          </p>
          <h3 className="text-base md:text-xl lg:text-2xl font-bold ">
            Details
          </h3>
          <p className="text-sm md:text-base lg:text-lg   leading-6">
            {project.projectDetails}
          </p>
          <h3 className="text-base md:text-xl lg:text-2xl font-bold  my-2">
            Front-End Technologies
          </h3>
          {Array.isArray(project.frontEndTech) &&
            project.frontEndTech.map((tech, index) => (
              <div className="flex items-center gap-2 px-2" key={index}>
                <LuBadgeCheck />
                <span className="text-sm md:text-base lg:text-lg">{tech}</span>
              </div>
            ))}
          <h3 className="text-base md:text-xl lg:text-2xl font-bold  my-2">
            Back-End Technologies
          </h3>
          {Array.isArray(project.backEndTech) &&
            project.backEndTech.map((tech, index) => (
              <div className="flex items-center gap-2 px-2" key={index}>
                <LuBadgeCheck />
                <span className="text-sm md:text-base lg:text-lg">{tech}</span>
              </div>
            ))}
          <div className="my-4 flex gap-2 md:gap-5 flex-wrap">
            <a
              href={project.liveLink}
              className="btn btn-sm md:btn-md  btn-outline "
            >
              Live Site
            </a>
            <a
              href={project.frontEndRepo}
              className="btn btn-sm md:btn-md  btn-outline btn-primary"
            >
              Frontend Repo
            </a>
            <a
              href={project.backEndRepo}
              className="btn btn-sm md:btn-md  btn-outline btn-secondary"
            >
              Backend Repo
            </a>
          </div>
        </div>
      </div>
    </UpReveal>
  );
}
