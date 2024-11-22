import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/Footer";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div>
      <div className="min-h-screen">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
