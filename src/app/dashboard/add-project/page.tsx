import type { Metadata } from 'next';

import AddProject from '@/components/pages/dashboard/project/AddProject';

export const metadata: Metadata = {
  title: 'Add Project',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AddProject />;
}
