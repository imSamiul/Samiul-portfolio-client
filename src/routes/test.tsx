import { createFileRoute } from "@tanstack/react-router";
import HomepageLoader from "../components/loader/HomepageLoader";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <HomepageLoader />
    </div>
  );
}
