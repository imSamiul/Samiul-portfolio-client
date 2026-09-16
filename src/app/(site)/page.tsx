import type { Metadata } from 'next';

import HomePage from '@/components/pages/home/HomePage';
import JsonLd from '@/components/shared/JsonLd';
import { personSchema, websiteSchema } from '@/lib/seo';
import { getHomepageProjectsOnServer } from '@/services/apis/projectServerApis';
import { getResumeMetaOnServer } from '@/services/apis/resumeServerApis';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default async function Page() {
  const [projects, resume] = await Promise.all([
    getHomepageProjectsOnServer(),
    getResumeMetaOnServer(),
  ]);

  return (
    <>
      <HomePage projects={projects} hasResume={resume !== null} />
      {/* Structured data goes after the content: Next.js scrolls a new
          route to its first DOM node, and a zero-size <script> first in line
          made it keep the previous page's scroll position instead. */}
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
    </>
  );
}
