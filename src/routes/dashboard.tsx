import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import barIcon from "../assets/bars-solid.svg";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: DashBoard,
});

function DashBoard() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        <div className="flex items-center gap-2 p-4 bg-base-100">
          <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden">
            <img src={barIcon} alt="Description" className="h-6 w-6" />
          </label>
          <h2 className="text-lg font-bold">Dashboard</h2>
        </div>
        {/* Page content here */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-auto lg:w-full p-4">
          {/* Sidebar content here */}
          <li>
            <Link
              to="/dashboard/addProject"
              activeProps={{ className: "bg-primary text-white" }}
            >
              Add Project
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/projectList"
              activeProps={{ className: "bg-primary text-white" }}
            >
              Project List
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
