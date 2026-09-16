import type { ProjectSummary } from '@/shared';
import ContactCta from '@/components/shared/ContactCta';
import ProjectGrid from '@/components/shared/ProjectGrid';
import SectionHeading from '@/components/shared/SectionHeading';

function ProjectsPage({ projects }: { projects: ProjectSummary[] }) {
  return (
    <>
      <section className="container-page pt-12 pb-16 md:pt-20 md:pb-24">
        <SectionHeading
          as="h1"
          eyebrow={`${projects.length} ${projects.length === 1 ? 'project' : 'projects'}`}
          title="Projects"
          description="Everything I have shipped that is worth your time — each one has a live deployment and, where the client allowed it, public source."
        />
        <ProjectGrid projects={projects} className="mt-12" />
      </section>
      <ContactCta />
    </>
  );
}

export default ProjectsPage;
