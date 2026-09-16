import { ProjectType } from "../types/ProjectType";
import { siteConfig } from "./site";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: "Samiul Karim Prodhan",
  jobTitle: siteConfig.jobTitle,
  description: siteConfig.description,
  url: siteConfig.url,
  image: siteConfig.ogImage,
  email: `mailto:${siteConfig.email}`,
  nationality: "Bangladeshi",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Daffodil International University",
  },
  knowsAbout: siteConfig.skills,
  sameAs: [
    siteConfig.socials.github,
    siteConfig.socials.linkedin,
    siteConfig.socials.facebook,
  ],
};

export function buildProjectSchema(project: ProjectType) {
  const technologies = [project.frontEndTech, project.backEndTech]
    .flatMap((tech) => (Array.isArray(tech) ? tech : [tech]))
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteConfig.url}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: technologies.join(", "),
  };
}
