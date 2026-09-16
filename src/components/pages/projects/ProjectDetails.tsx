"use client";

import Image from "next/image";
import { LuBadgeCheck } from "react-icons/lu";

import { ProjectType } from "../../../types/ProjectType";
import {
  PROJECT_IMAGE_HEIGHT,
  PROJECT_IMAGE_WIDTH,
} from "../../../utils/projectImage";
import Reveal from "../../shared/motion/Reveal";
import { bottomRevealVariants } from "../../shared/motion/variants";

// The heading lives here so a frontend-only project does not render a
// "Back-End Technologies" heading with nothing under it.
function TechSection({
  heading,
  technologies,
}: {
  heading: string;
  technologies: string[] | string;
}) {
  const items = (
    Array.isArray(technologies) ? technologies : [technologies]
  ).filter(Boolean);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="text-base md:text-xl lg:text-2xl font-bold  my-2">
        {heading}
      </h2>
      {items.map((tech) => (
        <div className="flex items-center gap-2 px-2" key={tech}>
          <LuBadgeCheck />
          <span className="text-sm md:text-base lg:text-lg">{tech}</span>
        </div>
      ))}
    </>
  );
}

function ProjectDetails({ project }: { project: ProjectType }) {
  return (
    <Reveal variants={bottomRevealVariants}>
      <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
        <div>
          <Image
            src={project.image!}
            alt={project.title}
            width={PROJECT_IMAGE_WIDTH}
            height={PROJECT_IMAGE_HEIGHT}
            sizes="100vw"
            priority
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
          <h2 className="text-base md:text-xl lg:text-2xl font-bold ">
            Details
          </h2>
          <p className="text-sm md:text-base lg:text-lg   leading-6">
            {project.projectDetails}
          </p>
          <TechSection
            heading="Front-End Technologies"
            technologies={project.frontEndTech}
          />
          <TechSection
            heading="Back-End Technologies"
            technologies={project.backEndTech}
          />
          <div className="my-4 flex gap-2 md:gap-5 flex-wrap">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm md:btn-md  btn-outline "
              >
                Live Site
              </a>
            )}
            {project.frontEndRepo && (
              <a
                href={project.frontEndRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm md:btn-md  btn-outline btn-primary"
              >
                Frontend Repo
              </a>
            )}
            {project.backEndRepo && (
              <a
                href={project.backEndRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm md:btn-md  btn-outline btn-secondary"
              >
                Backend Repo
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default ProjectDetails;
