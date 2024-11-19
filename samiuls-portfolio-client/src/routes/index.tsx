import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="container mx-auto">
      <div>
        <p>Hello, Myself</p>
        <h1>Md. Bayazid Hossain</h1>
        <h1>I build responsive & eye catching website.</h1>
        <p>
          I'm front-end developer specialized in React.js. The main focus is
          front-end, but at the same time, I try to learn new technology also.
        </p>
        <button>Download Resume</button>
      </div>
    </div>
  );
}
