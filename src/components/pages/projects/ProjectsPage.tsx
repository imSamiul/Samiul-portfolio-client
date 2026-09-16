import type { PaginatedProjects } from '@/shared';
import ContactCta from '@/components/shared/ContactCta';
import Pagination from '@/components/shared/Pagination';
import ProjectGrid from '@/components/shared/ProjectGrid';
import SectionHeading from '@/components/shared/SectionHeading';

function ProjectsPage({ projectsPage }: { projectsPage: PaginatedProjects }) {
  const { items, meta } = projectsPage;

  return (
    <>
      <section className="container-page pt-12 pb-16 md:pt-20 md:pb-24">
        <SectionHeading
          as="h1"
          eyebrow={`${meta.total} ${meta.total === 1 ? 'project' : 'projects'}`}
          title="Projects"
          description="Everything I have shipped that is worth your time — each one has a live deployment and, where the client allowed it, public source."
        />
        <ProjectGrid projects={items} className="mt-12" />
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          basePath="/projects"
          total={meta.total}
          pageSize={meta.limit}
          className="mt-12"
        />
      </section>
      <ContactCta />
    </>
  );
}

export default ProjectsPage;
