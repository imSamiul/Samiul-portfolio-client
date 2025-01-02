import { Await, createFileRoute, defer } from "@tanstack/react-router";

import Skills from "../components/homepage/Skills";
import Projects from "../components/homepage/Projects";
import FollowMe from "../components/homepage/FollowMe";
import Hero from "../components/homepage/Hero";

import { getProjectsForHomepage } from "../services/projectApis";

import CardLoader from "../components/UI/CardLoader";
import Reveal from "../components/motion/Reveal";
import HomepageLoader from "../components/loader/HomepageLoader";
import { useEffect, useState } from "react";
import { use } from "motion/react-client";

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
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <HomepageLoader />
      <Reveal>
        <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
          <Hero />
          <Skills />
          <div className="py-4 md:py-8">
            <h1 className="text-2xl md:text-3xl  font-semibold  font-Montserrat mb-8">
              Projects
            </h1>
            <Await promise={homePageProject} fallback={<CardLoader />}>
              {(data) => <Projects projects={data} />}
            </Await>
          </div>

          <div className="divider md:my-20"></div>
          <FollowMe />
        </div>
      </Reveal>
    </div>
  );
}
