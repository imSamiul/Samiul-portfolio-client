import type { Metadata } from 'next';
import Link from 'next/link';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

// The global 404 renders inside the root layout only, so it has to bring the
// site chrome itself — it is not inside the (site) route group.
export default function NotFound() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container-page flex flex-1 flex-col items-center justify-center py-24 text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-3 max-w-md text-pretty text-muted-foreground">
            The page you are looking for does not exist or has been moved.
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Back to homepage</Link>
          </Button>
        </main>
      </div>
      <Footer />
    </>
  );
}
