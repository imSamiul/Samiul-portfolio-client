import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/Footer";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContextType } from "../contexts/AuthContext";
import HomepageLoader from "../components/loader/HomepageLoader";
import { AnimatePresence } from "motion/react";

interface MyRouterContextType {
  auth: AuthContextType;
}

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

export const Route = createRootRouteWithContext<MyRouterContextType>()({
  component: RootComponent,
});

function RootComponent() {
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <AnimatePresence mode="wait">
        {showLoader ? (
          <HomepageLoader key="loader" />
        ) : (
          <div>
            <div className="min-h-screen">
              <Navbar />
              <Outlet />
            </div>
            <Footer />
            <TanStackRouterDevtools position="bottom-left" />
            <ReactQueryDevtools initialIsOpen={false} position="bottom" />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
