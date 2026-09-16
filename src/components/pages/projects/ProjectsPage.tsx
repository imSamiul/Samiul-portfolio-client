import type { PaginatedProjects } from '@/shared';
import ContactCta from '@/components/shared/ContactCta';
import SectionHeading from '@/components/shared/SectionHeading';
import ProjectList from './ProjectList';

function ProjectsPage({ firstPage }: { firstPage: PaginatedProjects }) {
  const { total } = firstPage.meta;

  return (
    <>
      <section className="container-page pt-12 pb-16 md:pt-20 md:pb-24">
        <SectionHeading
          as="h1"
          eyebrow={`${total} ${total === 1 ? 'project' : 'projects'}`}
          title="Projects"
          description="Everything I have shipped that is worth your time — each one has a live deployment and, where the client allowed it, public source."
        />
        <ProjectList firstPage={firstPage} />
      </section>
      <ContactCta />
    </>
  );
}

export default ProjectsPage;
