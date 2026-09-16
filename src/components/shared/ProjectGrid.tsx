"use client";

import Image from "next/image";
import Link from "next/link";

import { ProjectType } from "../../../types/ProjectType";
import {
  PROJECT_IMAGE_HEIGHT,
  PROJECT_IMAGE_WIDTH,
} from "../../../utils/projectImage";
import Reveal from "../../shared/motion/Reveal";
import { projectCardVariants } from "../../shared/motion/variants";

const BADGES = [
  { tech: "ReactJS", label: "React", field: "frontEndTech" },
  { tech: "NextJS", label: "NextJS", field: "frontEndTech" },
  { tech: "NodeJS", label: "Node", field: "backEndTech" },
  { tech: "MongoDB", label: "MongoDB", field: "backEndTech" },
] as const;

function ProjectGrid({ projects }: { projects: ProjectType[] }) {
  if (projects.length === 0) {
    return (
      <div className="mt-3 py-2 lg:mt-5">
        <p className="text-center">No projects to show right now.</p>
      </div>
    );
  }

  return (
    <div className="mt-3 py-2 lg:mt-5">
      <div className=" grid  grid-cols-1 md:grid-cols-3 gap-5 ">
        {projects.map((project, index) => (
          <Reveal key={project.id} index={index} variants={projectCardVariants}>
            <div className="card card-compact bg-base-100 h-full shadow-xl rounded-lg ">
              <figure>
                <Image
                  src={project.image!}
                  alt={project.title}
                  width={PROJECT_IMAGE_WIDTH}
                  height={PROJECT_IMAGE_HEIGHT}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{project.title}</h3>
                <p>{project.summary}</p>
                <div className="space-x-2 mt-2 md:mt-5">
                  {BADGES.filter((badge) =>
                    project[badge.field].includes(badge.tech),
                  ).map((badge) => (
                    <div className="badge badge-outline" key={badge.label}>
                      {badge.label}
                    </div>
                  ))}
                </div>
                <div className="card-actions justify-end mt-5">
                  {project.liveLink && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm md:btn-am lg:btn-md  "
                      href={project.liveLink}
                    >
                      Live Site
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="btn btn-secondary btn-sm md:btn-am lg:btn-md text-accent-content "
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default ProjectGrid;
