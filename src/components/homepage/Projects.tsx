import { Link } from "@tanstack/react-router";
import { ProjectType } from "../../types/ProjectType";

function Projects({ projects }: { projects: ProjectType[] }) {
  return (
    <div className="my-5 md:my-10">
      <h1 className="text-xl md:text-3xl font-bold font-Montserrat mb-5">
        Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {projects.map((project) => (
          <div
            className="card card-compact bg-base-100  shadow-xl"
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
                <a className="btn btn-primary" href={project.liveLink}>
                  Live Site
                </a>
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: project._id! }}
                  className="btn btn-primary"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
