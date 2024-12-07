import { Await, createFileRoute, defer } from "@tanstack/react-router";

import Skills from "../components/homepage/Skills";
import Projects from "../components/homepage/Projects";
import FollowMe from "../components/homepage/FollowMe";
import Hero from "../components/homepage/Hero";

import { getProjectsForHomepage } from "../services/projectApis";
import Loader from "../components/UI/Loader";

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
      <Await promise={homePageProject} fallback={<Loader></Loader>}>
        {(data) => <Projects projects={data} />}
      </Await>

      <div className="divider md:my-20"></div>
      <FollowMe />
    </div>
  );
}
