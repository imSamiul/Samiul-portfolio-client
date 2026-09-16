import type { MetadataRoute } from 'next';

import type { ProjectSummary } from '@/shared';
import { absoluteUrl } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { getAllProjectsOnServer } from '@/services/apis/projectServerApis';

/**
 * The project list is fetched with the `projects` cache tag, which the API
 * invalidates on publish, so this does not need a timer of its own. The daily
 * floor is only a backstop in case a revalidation webhook is ever missed.
 */
export const revalidate = 86400;

/**
 * The list endpoint is paginated, and a sitemap that stops at page one would
 * quietly drop projects as the collection grows — so this walks every page.
 */
async function getEveryProject() {
  const projects: ProjectSummary[] = [];
  let page = 1;

  for (;;) {
    const { items, meta } = await getAllProjectsOnServer({ page, limit: 50 });

    projects.push(...items);

    if (!meta.hasMore) {
      return projects;
    }

    page += 1;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getEveryProject();

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
