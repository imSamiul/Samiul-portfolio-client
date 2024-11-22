import { createFileRoute } from "@tanstack/react-router";

import Hero from "../components/homepage/hero";
import Skills from "../components/homepage/Skills";
import Projects from "../components/homepage/Projects";
import FollowMe from "../components/homepage/FollowMe";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="container mx-auto my-3 md:my-10 px-5">
      <Hero />
      <Skills />
      <Projects />
      <div className="divider md:my-20"></div>
      <FollowMe />
    </div>
  );
}
