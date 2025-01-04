import { Link } from "@tanstack/react-router";
import { ProjectType } from "../../types/ProjectType";
import OneByOneReveal from "../motion/OneByOneReveal";

const projectVariants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      delay: index * 0.1,
    },
  }),
};

function Projects({ projects }: { projects: ProjectType[] }) {
  return (
    <div className="mt-3 py-2 lg:mt-5">
      {projects.length === 0 ? (
        <p className="text-center">No projects found</p>
      ) : (
        <div className=" grid bg-base-100 grid-cols-1 md:grid-cols-3 gap-5 ">
          {projects.map((project, index) => (
            <OneByOneReveal
              key={project._id}
              index={index}
              variants={projectVariants}
            >
              <div
                className="card card-compact bg-primary  dark:bg-inherit shadow-xl rounded-lg z-0"
                key={project._id}
              >
                <figure>
                  <img
                    src={
                      project.image && "data" in project.image
                        ? `data:image/jpeg;base64,${project.image?.data}`
                        : ""
                    }
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{project.title}</h2>
                  <p>{project.summary}</p>
                  <div className="card-actions justify-end mt-5">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm md:btn-am lg:btn-md  "
                      href={project.liveLink}
                    >
                      Live Site
                    </a>
                    <Link
                      to="/projects/$projectId"
                      params={{ projectId: project._id! }}
                      className="btn btn-secondary btn-sm md:btn-am lg:btn-md text-accent-content "
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </OneByOneReveal>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
