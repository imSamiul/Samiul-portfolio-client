"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import barIcon from "../../assets/bars-solid.svg";

const SIDEBAR_LINKS = [
  { href: "/dashboard/add-project", label: "Add Project" },
  { href: "/dashboard/project-list", label: "Project List" },
  { href: "/dashboard/resume", label: "Resume" },
];

function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        <div className="flex items-center gap-2 p-4 bg-base-100">
          <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden">
            <img src={barIcon.src} alt="Open dashboard menu" className="h-6 w-6" />
          </label>
          <p className="text-lg font-bold">Dashboard</p>
        </div>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-auto lg:w-full p-4">
          {SIDEBAR_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  pathname === link.href ? "bg-primary text-white" : ""
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardShell;
