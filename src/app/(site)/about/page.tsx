import type { Metadata } from "next";

import AboutPage from "../../components/pages/about/AboutPage";
import { siteConfig } from "../../config/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — a MERN stack developer from Bangladesh building scalable, user-friendly web applications with React, Next.js and Node.js.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: `About ${siteConfig.name}, a full-stack MERN developer from Bangladesh.`,
    url: `${siteConfig.url}/about`,
  },
};

export default function Page() {
  return <AboutPage />;
}
