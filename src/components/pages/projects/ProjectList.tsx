'use client';

import { useEffect, useRef } from 'react';

import type { PaginatedProjects } from '@/shared';
import { useInfiniteProjects } from '@/services/queryHooks/useInfiniteProjects';
import { Button } from '@/components/ui/button';
import ProjectGrid from '@/components/shared/ProjectGrid';

function ProjectList({ firstPage }: { firstPage: PaginatedProjects }) {
  const { projects, hasNextPage, isFetchingNextPage, fetchNextPage, error } =
    useInfiniteProjects(firstPage);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinel.current;

    if (!node || !hasNextPage) {
      return;
    }

    // Loads the next page before the visitor reaches the end of this one, so
    // scrolling stays continuous instead of stopping at a spinner.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void fetchNextPage();
        }
      },
      { rootMargin: '400px' },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <>
      <ProjectGrid projects={projects} className="mt-12" />

      {error && (
        <p className="mt-8 text-center text-destructive">{error.message}</p>
      )}

      {/* A real button, not just a sentinel: it is the keyboard path to the
          next page, and the retry when a fetch failed. */}
      {hasNextPage && (
        <div ref={sentinel} className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={() => void fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more projects'}
          </Button>
        </div>
      )}
    </>
  );
}

export default ProjectList;
