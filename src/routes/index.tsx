import { createFileRoute } from "@tanstack/react-router";

import Skills from "../components/homepage/Skills";
import Projects from "../components/homepage/Projects";
import FollowMe from "../components/homepage/FollowMe";
import Hero from "../components/homepage/Hero";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
      <Hero />
      <Skills />
      <Projects />
      <div className="divider md:my-20"></div>
      <FollowMe />
    </div>
  );
}
