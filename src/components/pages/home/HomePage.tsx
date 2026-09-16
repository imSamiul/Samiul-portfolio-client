import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import type { ProjectSummary } from '@/shared';
import ContactCta from '@/components/shared/ContactCta';
import ProjectGrid from '@/components/shared/ProjectGrid';
import SectionHeading from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import Hero from './Hero';
import HowIWork from './HowIWork';
import Skills, { SkillMarquee } from './Skills';

function HomePage({
  projects,
  hasResume,
}: {
  projects: ProjectSummary[];
  hasResume: boolean;
}) {
  return (
    <>
      <Hero hasResume={hasResume} />
      <SkillMarquee />

      <Skills />

      <section
        aria-labelledby="projects-heading"
        className="border-y bg-muted/40"
      >
        <div className="container-page section-y">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Selected work"
              title={<span id="projects-heading">Projects</span>}
              description="Full-stack apps with a live deployment and public source. The first one is the deepest."
            />
            <Button
              asChild
              variant="ghost"
              className="group self-start sm:self-auto"
            >
              <Link href="/projects">
                All projects
                <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
          <ProjectGrid projects={projects} featured className="mt-10" />
        </div>
      </section>

      <HowIWork />
      <ContactCta />
    </>
  );
}

export default HomePage;
