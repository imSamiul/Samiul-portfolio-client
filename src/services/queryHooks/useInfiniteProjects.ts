'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import type { PaginatedProjects } from '@/shared';

import type { ApiRequestError } from '../utils/apiHelper';
import { projectApis } from '../apis/projectApis';
import { queryKeys } from '../apis/queryKeys';

/**
 * The projects page renders its first page on the server, so that page is
 * seeded here rather than refetched: the visitor only pays for what scrolling
 * actually reveals.
 */
export function useInfiniteProjects(firstPage: PaginatedProjects) {
  const { limit } = firstPage.meta;

  const query = useInfiniteQuery({
    queryKey: queryKeys.projects.publicList(limit),
    queryFn: ({ pageParam }) =>
      projectApis.listPage({ page: pageParam, limit }),
    initialPageParam: firstPage.meta.page,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.page + 1 : undefined,
    initialData: { pages: [firstPage], pageParams: [firstPage.meta.page] },
    // The server already fetched this list for the current request; anything
    // shorter turns the first paint into an immediate duplicate round trip.
    staleTime: 5 * 60 * 1000,
  });

  return {
    projects: query.data.pages.flatMap((page) => page.items),
    total: query.data.pages[0]?.meta.total ?? 0,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
    error: query.error as ApiRequestError | null,
  };
}
