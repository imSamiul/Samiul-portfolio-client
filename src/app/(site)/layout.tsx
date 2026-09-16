import type { ReactNode } from 'react';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ScrollProgress from '@/components/shared/motion/ScrollProgress';

/**
 * The public site: navbar, footer and the scroll progress line. The dashboard
 * and the login screen live outside this group and bring their own chrome —
 * an admin screen has no business showing a "Hire me" button.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </>
  );
}
