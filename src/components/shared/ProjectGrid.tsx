import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';

import type { ProjectSummary } from '@/shared';
import { cn } from '@/lib/utils';
import {
  PROJECT_IMAGE_HEIGHT,
  PROJECT_IMAGE_WIDTH,
} from '@/utils/projectImage';
import Reveal from '@/components/shared/motion/Reveal';
import TechBadge from '@/components/shared/TechBadge';

const MAX_BADGES = 4;

/**
 * The whole card is one link to the project page (a stretched pseudo-element
 * over the article), and the live/repo icons sit above it with their own
 * stacking context — nested anchors are invalid HTML, so the small links are
 * siblings of the big one, not children.
 */
function ProjectCard({
  project,
  featured = false,
  priority = false,
}: {
  project: ProjectSummary;
  featured?: boolean;
  /** First card on a page is the LCP image; load it eagerly. */
  priority?: boolean;
}) {
  const badges = [...project.frontEndTech, ...project.backEndTech].slice(
    0,
    featured ? MAX_BADGES + 2 : MAX_BADGES,
  );
  const repo = project.frontEndRepo ?? project.backEndRepo;

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10',
        featured && 'md:grid md:grid-cols-[1.3fr_1fr]',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          featured ? 'aspect-16/10 md:aspect-auto md:h-full' : 'aspect-16/10',
        )}
      >
        <Image
          src={project.image}
          alt={project.title}
          width={PROJECT_IMAGE_WIDTH}
          height={PROJECT_IMAGE_HEIGHT}
          sizes={
            featured
              ? '(max-width: 768px) 100vw, 60vw'
              : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
          }
          priority={priority}
          className="size-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={cn('font-semibold', featured ? 'text-2xl' : 'text-lg')}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </Link>
          </h3>
          <ArrowUpRightIcon
            aria-hidden="true"
            className="mt-1 size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
          />
        </div>
        <p
          className={cn(
            'mt-2 text-pretty text-muted-foreground',
            featured ? 'text-base' : 'line-clamp-3 text-sm',
          )}
        >
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {badges.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </div>

        {(project.liveLink || repo) && (
          <div className="relative z-10 mt-auto flex items-center gap-4 pt-5 text-sm font-medium">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
              >
                Live site
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            )}
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaGithub className="size-3.5" />
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function ProjectGrid({
  projects,
  featured = false,
  className,
}: {
  projects: ProjectSummary[];
  /** Render the first project as a wide two-column card. */
  featured?: boolean;
  className?: string;
}) {
  if (projects.length === 0) {
    return (
      <div
        className={cn(
          'rounded-2xl border border-dashed p-10 text-center text-muted-foreground',
          className,
        )}
      >
        <p>No projects to show right now.</p>
      </div>
    );
  }

  const [first, ...rest] = projects;
  const grid = featured ? rest : projects;

  return (
    <div className={cn('grid gap-5', className)}>
      {featured && (
        <Reveal variant="scale">
          <ProjectCard project={first} featured priority />
        </Reveal>
      )}
      {grid.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((project, index) => (
            <Reveal
              key={project.id}
              index={index}
              variant="up"
              className="h-full"
            >
              <ProjectCard
                project={project}
                priority={!featured && index < 3}
              />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectGrid;
