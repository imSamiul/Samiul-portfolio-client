import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  GlobeIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { FaGithub } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import remarkGfm from 'remark-gfm';

import type { ProjectDetail } from '@/shared';
import {
  PROJECT_IMAGE_HEIGHT,
  PROJECT_IMAGE_WIDTH,
} from '@/utils/projectImage';
import ContactCta from '@/components/shared/ContactCta';
import Reveal from '@/components/shared/motion/Reveal';
import TechBadge from '@/components/shared/TechBadge';
import { Button } from '@/components/ui/button';

const EXTERNAL_LINKS: {
  field: 'liveLink' | 'frontEndRepo' | 'backEndRepo';
  label: string;
  Icon: IconType;
}[] = [
  { field: 'liveLink', label: 'Live site', Icon: GlobeIcon },
  { field: 'frontEndRepo', label: 'Frontend repo', Icon: FaGithub },
  { field: 'backEndRepo', label: 'Backend repo', Icon: FaGithub },
];

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
});

// The heading lives here so a frontend-only project does not render a
// "Backend" heading with nothing under it.
function TechSection({
  heading,
  technologies,
}: {
  heading: string;
  technologies: string[];
}) {
  if (technologies.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="eyebrow">{heading}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {technologies.map((tech) => (
          <li key={tech}>
            <TechBadge>{tech}</TechBadge>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectDetails({ project }: { project: ProjectDetail }) {
  const links = EXTERNAL_LINKS.filter(({ field }) => project[field]);

  return (
    <>
      <article className="container-page pt-8 pb-16 md:pt-12 md:pb-24">
        <Reveal variant="fade">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            All projects
          </Link>
        </Reveal>

        <Reveal className="mt-6 max-w-3xl">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-pretty text-muted-foreground sm:text-xl">
            {project.summary}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {links.map(({ field, label, Icon }) => (
              <Button
                asChild
                key={field}
                variant={field === 'liveLink' ? 'default' : 'outline'}
              >
                <a
                  href={project[field]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                  {label}
                  <ArrowUpRightIcon className="size-3.5 opacity-70" />
                </a>
              </Button>
            ))}
          </div>
        </Reveal>

        <Reveal variant="scale" className="mt-10">
          <div className="overflow-hidden rounded-2xl border bg-card shadow-xl shadow-primary/10">
            <Image
              src={project.image}
              alt={project.title}
              width={PROJECT_IMAGE_WIDTH}
              height={PROJECT_IMAGE_HEIGHT}
              sizes="(max-width: 1152px) 100vw, 1152px"
              priority
              className="aspect-video w-full object-cover object-top"
            />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
          <Reveal className="min-w-0">
            <h2 className="text-2xl font-semibold">About the project</h2>
            <div className="prose prose-neutral dark:prose-invert mt-4 max-w-none prose-headings:scroll-mt-24 prose-a:text-primary">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.projectDetails}
              </ReactMarkdown>
            </div>
          </Reveal>

          <Reveal
            variant="right"
            as="aside"
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="space-y-6 rounded-2xl border bg-card p-6">
              <TechSection
                heading="Frontend"
                technologies={project.frontEndTech}
              />
              <TechSection
                heading="Backend"
                technologies={project.backEndTech}
              />
              <div>
                <p className="eyebrow">Last updated</p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium">
                  <CalendarIcon className="size-4 text-primary" />
                  <time dateTime={project.updatedAt}>
                    {dateFormatter.format(new Date(project.updatedAt))}
                  </time>
                </p>
              </div>
              {links.length > 0 && (
                <div>
                  <p className="eyebrow">Links</p>
                  <ul className="mt-2 space-y-1.5">
                    {links.map(({ field, label, Icon }) => (
                      <li key={field}>
                        <a
                          href={project[field]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                          <Icon className="size-4" />
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </article>
      <ContactCta />
    </>
  );
}

export default ProjectDetails;
