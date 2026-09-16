import type { Metadata } from 'next';

import ResumePage from '@/components/pages/resume/ResumePage';
import JsonLd from '@/components/shared/JsonLd';
import { buildBreadcrumbSchema, buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { getResumeMetaOnServer } from '@/services/apis/resumeServerApis';

export const metadata: Metadata = buildMetadata({
  title: 'Resume',
  description: `Resume of ${siteConfig.name} — education, skills and coursework of a MERN stack developer specializing in React, Next.js, Node.js and MongoDB.`,
  path: '/resume',
});

export default async function Page() {
  const resume = await getResumeMetaOnServer();

  return (
    <>
      <ResumePage resumeUpdatedAt={resume?.updatedAt ?? null} />
      {/* Structured data goes after the content: Next.js scrolls a new
          route to its first DOM node, and a zero-size <script> first in line
          made it keep the previous page's scroll position instead. */}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Resume', path: '/resume' },
        ])}
      />
    </>
  );
}
