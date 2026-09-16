import type { Metadata } from 'next';

import type { ProjectDetail, ProjectSummary } from '@/shared';

import { siteConfig } from './site';

/** Search engines and crawlers need absolute URLs; the app routes on paths. */
export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

/**
 * Meta descriptions are cut off around 160 characters, and a hard cut mid-word
 * reads as broken, so the break falls on the last space before the limit.
 */
export function truncate(text: string, limit = 160) {
  const collapsed = text.replace(/\s+/g, ' ').trim();

  if (collapsed.length <= limit) {
    return collapsed;
  }

  const clipped = collapsed.slice(0, limit - 1);
  const lastSpace = clipped.lastIndexOf(' ');

  return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).trimEnd()}…`;
}

/**
 * One place that knows a page's title, description and canonical belong
 * together — each route used to spell the same three values into `openGraph`
 * and `twitter` by hand, and they drifted.
 */
export function buildMetadata({
  title,
  description,
  path,
  images,
}: {
  title: string;
  description: string;
  path: string;
  images?: string[];
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const summary = truncate(description);

  return {
    title,
    description: summary,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: summary,
      url: absoluteUrl(path),
      ...(images ? { images } : {}),
    },
    twitter: {
      title: fullTitle,
      description: summary,
      ...(images ? { images } : {}),
    },
  };
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': absoluteUrl('/#person'),
  name: siteConfig.name,
  givenName: 'Samiul Karim',
  familyName: 'Prodhan',
  // Every spelling the web already knows him by, so a branded search on any
  // of them can be tied back to this one entity.
  alternateName: [
    'Samiul Karim Prodhan',
    'Samiul Karim',
    'Samiul Karim Shrabon',
    'imSamiul',
  ],
  jobTitle: siteConfig.jobTitle,
  description: siteConfig.description,
  url: siteConfig.url,
  image: siteConfig.ogImage,
  email: `mailto:${siteConfig.email}`,
  nationality: 'Bangladeshi',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: siteConfig.jobTitle,
    skills: siteConfig.skills.join(', '),
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Daffodil International University',
  },
  knowsAbout: siteConfig.skills,
  sameAs: [
    siteConfig.socials.github,
    siteConfig.socials.linkedin,
    siteConfig.socials.facebook,
  ],
};

/**
 * Google's "profile page" markup: tells it the About page is *about* the
 * Person above, which is what a branded search needs to show the right card.
 */
export const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': absoluteUrl('/about#profile'),
  url: absoluteUrl('/about'),
  name: `About ${siteConfig.name}`,
  mainEntity: { '@id': absoluteUrl('/#person') },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: 'en',
  publisher: { '@id': absoluteUrl('/#person') },
};

export function buildProjectSchema(project: ProjectSummary | ProjectDetail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: project.image,
    dateModified: project.updatedAt,
    author: { '@id': absoluteUrl('/#person') },
    keywords: [...project.frontEndTech, ...project.backEndTech].join(', '),
  };
}

/** The projects index as an ordered list, so each entry is a known item. */
export function buildProjectListSchema(projects: ProjectSummary[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Projects by ${siteConfig.name}`,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/projects/${project.slug}`),
      name: project.title,
    })),
  };
}

/**
 * Tells search engines where a page sits, so a project result can show
 * "Projects › <title>" instead of a bare URL.
 */
export function buildBreadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
