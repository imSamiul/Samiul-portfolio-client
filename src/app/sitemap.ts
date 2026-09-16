import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { getAllProjectsOnServer } from '@/services/apis/projectServerApis';

/**
 * The project list is fetched with the `projects` cache tag, which the API
 * invalidates on publish, so this does not need a timer of its own. The daily
 * floor is only a backstop in case a revalidation webhook is ever missed.
 */
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjectsOnServer();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: 'monthly', priority: 1 },
    {
      url: absoluteUrl('/about'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/resume'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/projects'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
