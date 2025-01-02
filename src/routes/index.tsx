import { Await, createFileRoute, defer } from "@tanstack/react-router";

import Skills from "../components/homepage/Skills";

import FollowMe from "../components/homepage/FollowMe";
import Hero from "../components/homepage/Hero";

import { getProjectsForHomepage } from "../services/projectApis";

import CardLoader from "../components/UI/CardLoader";
import Reveal from "../components/motion/Reveal";
import { headingVariants } from "../components/motion/Variants";
import Projects from "../components/homepage/Projects";

export const Route = createFileRoute("/")({
  loader: async () => {
    const data = getProjectsForHomepage();
    return {
      homePageProject: defer(data),
    };
  },
  component: Home,
});

function Home() {
  const { homePageProject } = Route.useLoaderData();

  return (
    <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
      <Hero />

      <Skills />
      <div className="py-4 md:py-8">
        <Reveal variants={headingVariants}>
          <h1 className="text-2xl md:text-3xl  font-semibold  font-Montserrat mb-8">
            Projects
          </h1>
        </Reveal>
        <Await promise={homePageProject} fallback={<CardLoader />}>
          {(data) => <Projects projects={data} />}
        </Await>
      </div>

      <div className="divider md:my-20"></div>
      <FollowMe />
    </div>
  );
}
