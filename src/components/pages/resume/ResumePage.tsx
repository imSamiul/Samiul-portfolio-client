import { DownloadIcon, MailIcon, MapPinIcon } from 'lucide-react';

import { courses, EDUCATION, RELEVANT_COURSES } from '@/lib/resumeData';
import { siteConfig } from '@/lib/site';
import { RESUME_DOWNLOAD_URL } from '@/services/apis/resumeApis';
import ContactCta from '@/components/shared/ContactCta';
import Reveal from '@/components/shared/motion/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import Timeline from '@/components/shared/Timeline';
import { buttonVariants } from '@/components/ui/button';
import ResumeSkills from './ResumeSkills';

const SECTIONS = [
  { id: 'summary', label: 'Summary' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'courses', label: 'Coursework' },
  { id: 'reference', label: 'Reference' },
];

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  year: 'numeric',
});

function ResumeSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28">
      <SectionHeading
        eyebrow={eyebrow}
        title={<span id={`${id}-heading`}>{title}</span>}
      />
      <div className="mt-8">{children}</div>
    </section>
  );
}

/**
 * `resumeUpdatedAt` is the API's timestamp for the PDF, or `null` when none
 * is stored — in which case the download button is not rendered at all.
 */
function ResumePage({ resumeUpdatedAt }: { resumeUpdatedAt: string | null }) {
  return (
    <>
      <div className="container-page pt-12 md:pt-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            as="h1"
            eyebrow="Resume"
            title={siteConfig.name}
            description={
              <span className="flex flex-wrap gap-x-5 gap-y-1 text-base">
                <span className="inline-flex items-center gap-1.5">
                  <MapPinIcon className="size-4 text-primary" />
                  {siteConfig.location}
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
                >
                  <MailIcon className="size-4 text-primary" />
                  {siteConfig.email}
                </a>
              </span>
            }
          />
          {resumeUpdatedAt && (
            <Reveal variant="right" className="shrink-0">
              {/* A plain anchor: the API answers with a redirect to the PDF. */}
              <a
                href={RESUME_DOWNLOAD_URL}
                className={buttonVariants({
                  size: 'lg',
                  className: 'h-11 px-6',
                })}
              >
                <DownloadIcon />
                Download PDF
              </a>
              <p className="mt-2 font-mono text-xs text-muted-foreground lg:text-right">
                Updated {dateFormatter.format(new Date(resumeUpdatedAt))}
              </p>
            </Reveal>
          )}
        </div>

        {/* Section jump list. Anchor links only — `scroll-padding-top` in the
            global CSS lands them below the sticky navbar without any JS. */}
        <nav
          aria-label="Resume sections"
          className="sticky top-16 z-30 -mx-4 mt-10 border-y bg-background/80 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          <ul className="flex gap-1 overflow-x-auto">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-block rounded-full px-3.5 py-1.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-3xl space-y-20 py-16 md:space-y-24 md:py-20">
          <ResumeSection id="summary" eyebrow="Profile" title="Summary">
            <Reveal>
              <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
                Full-stack web developer specializing in the MERN stack and
                Next.js. I build scalable, user-friendly applications with a
                frontend-first mindset and a solid grounding in debugging and
                analytical problem-solving. Graduated in Computer Science and
                Engineering in 2024; currently{' '}
                {siteConfig.openToWork
                  ? 'open to full-stack and frontend roles.'
                  : 'building things.'}
              </p>
            </Reveal>
          </ResumeSection>

          <ResumeSection id="skills" eyebrow="Skills" title="What I work with">
            <ResumeSkills />
          </ResumeSection>

          <ResumeSection
            id="education"
            eyebrow="Education"
            title="Where I studied"
          >
            <Timeline
              items={EDUCATION.map((entry) => ({
                period: entry.period,
                title: entry.institution,
                description: entry.detail,
              }))}
            />
          </ResumeSection>

          <ResumeSection
            id="courses"
            eyebrow="Coursework"
            title="Relevant courses"
          >
            <Reveal>
              <ul className="grid gap-2 sm:grid-cols-2">
                {RELEVANT_COURSES.map((course) => (
                  <li
                    key={course.courseCode}
                    className="flex items-baseline gap-3 rounded-lg border bg-card px-4 py-2.5 text-sm"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      {course.courseCode}
                    </span>
                    {course.courseName}
                  </li>
                ))}
              </ul>
              <details className="group mt-4">
                <summary className="cursor-pointer text-sm font-medium text-primary underline-offset-4 hover:underline">
                  <span className="group-open:hidden">
                    Show all {courses.length} courses
                  </span>
                  <span className="hidden group-open:inline">Show fewer</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {courses.map((course, index) => (
                    <span key={course.courseCode}>
                      <span className="font-mono text-xs">
                        {course.courseCode}
                      </span>{' '}
                      {course.courseName}
                      {index !== courses.length - 1 && ' · '}
                    </span>
                  ))}
                </p>
              </details>
            </Reveal>
          </ResumeSection>

          <ResumeSection id="reference" eyebrow="Reference" title="References">
            <Reveal>
              <p className="text-muted-foreground">Available upon request.</p>
            </Reveal>
          </ResumeSection>
        </div>
      </div>
      <ContactCta />
    </>
  );
}

export default ResumePage;
