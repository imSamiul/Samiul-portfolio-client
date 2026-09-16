import type { Metadata } from 'next';

import DashboardProjectList from '@/components/pages/dashboard/project/DashboardProjectList';

type ProjectListRouteProps = {
  searchParams: Promise<{ page?: string }>;
};

export const metadata: Metadata = {
  title: 'Project List',
  robots: { index: false, follow: false },
};

export default async function Page({ searchParams }: ProjectListRouteProps) {
  const { page } = await searchParams;

  // The list itself is fetched in the browser, so this only carries which
  // slice to show; the component clamps it against the projects it has.
  return <DashboardProjectList page={Number(page) || 1} />;
}
