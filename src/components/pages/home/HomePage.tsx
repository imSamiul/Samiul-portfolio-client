import { ProjectType } from "../../../types/ProjectType";
import ProjectGrid from "../projects/ProjectGrid";
import Reveal from "../../shared/motion/Reveal";
import { headingVariants } from "../../shared/motion/variants";
import FollowMe from "./FollowMe";
import Hero from "./Hero";
import Skills from "./Skills";

function HomePage({ projects }: { projects: ProjectType[] }) {
  return (
    <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
      <Hero />

      <Skills />
      <div className="py-4 md:py-8">
        <Reveal variants={headingVariants} margin="-10% 0px -20% 0px">
          <h2 className="text-2xl md:text-3xl  font-semibold  font-Montserrat mb-8">
            Projects
          </h2>
        </Reveal>
        <ProjectGrid projects={projects} />
      </div>

      <div className="divider md:my-20"></div>
      <FollowMe />
    </div>
  );
}

export default HomePage;
