import type { Metadata } from "next";

import HomePage from "../components/pages/home/HomePage";
import JsonLd from "../components/shared/JsonLd";
import { personSchema } from "../config/structuredData";
import { getHomepageProjectsOnServer } from "../services/projectServerApis";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Page() {
  const projects = await getHomepageProjectsOnServer();

  return (
    <>
      <JsonLd data={personSchema} />
      <HomePage projects={projects} />
    </>
  );
}
