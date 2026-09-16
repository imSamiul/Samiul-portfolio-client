import type { MetadataRoute } from "next";

import { siteConfig } from "../config/site";
import { getAllProjectsOnServer } from "../services/projectServerApis";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjectsOnServer();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/about`, changeFrequency: "yearly", priority: 0.8 },
    {
      url: `${siteConfig.url}/resume`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/projects`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project._id}`,
    lastModified: project.updatedAt ? new Date(project.updatedAt) : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
