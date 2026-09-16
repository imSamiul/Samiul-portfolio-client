import type { Metadata } from "next";

import ResumeUpload from "../../../components/pages/dashboard/resume/ResumeUpload";

export const metadata: Metadata = {
  title: "Resume",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ResumeUpload />;
}
