import type { Metadata } from "next";

import ResumePage from "../../components/pages/resume/ResumePage";
import { siteConfig } from "../../config/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${siteConfig.name} — education, skills and coursework of a MERN stack developer specializing in React, Next.js, Node.js and MongoDB.`,
  alternates: { canonical: "/resume" },
  openGraph: {
    title: `Resume | ${siteConfig.name}`,
    description: `Resume of ${siteConfig.name}, full-stack MERN developer.`,
    url: `${siteConfig.url}/resume`,
  },
};

export default function Page() {
  return <ResumePage />;
}
