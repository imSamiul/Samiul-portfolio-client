import type { Metadata } from "next";

import DashboardProjectList from "../../../components/pages/dashboard/project/DashboardProjectList";

export const metadata: Metadata = {
  title: "Project List",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DashboardProjectList />;
}
