import { z } from 'zod';

import { serverApiUrl } from '@/lib/env';
import {
  paginatedProjectsSchema,
  projectDetailSchema,
  projectSummaryListSchema,
  PROJECTS_PAGE_SIZE,
  type ApiSuccessResponse,
  type PaginatedProjects,
  type ProjectDetail,
  type ProjectSummary,
} from '@/shared';

/**
 * Every project fetch carries this tag, and the API calls `/api/revalidate`
 * after each write — so the data is cached indefinitely rather than on an
 * interval. Keep the tag names in step with the API's `revalidateWeb.ts`.
 */
const PROJECTS_TAG = 'projects';

/**
 * Validating here means a backend contract change shows up in the server log
 * with the offending field name, rather than as a render crash on a public page.
 */
async function parseEnvelope<TSchema extends z.ZodType>(
  schema: TSchema,
  response: Response,
  path: string,
): Promise<z.output<TSchema>> {
  const body = (await response.json()) as ApiSuccessResponse<unknown>;
  const parsed = schema.safeParse(body.data);

  if (!parsed.success) {
    throw new Error(
      `Unexpected payload from ${path}: ${z.prettifyError(parsed.error)}`,
    );
  }

  return parsed.data;
}

// Public pages must still render (with their headings, name and structured
// data) when the API is unreachable, so a failed list request degrades to empty.
async function fetchList<TSchema extends z.ZodType>(
  schema: TSchema,
  path: string,
  fallback: z.output<TSchema>,
): Promise<z.output<TSchema>> {
  try {
    const response = await fetch(serverApiUrl(`/project/${path}`), {
      next: { revalidate: false, tags: [PROJECTS_TAG] },
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await parseEnvelope(schema, response, path);
  } catch (error) {
    console.error(`Failed to load projects from ${path}`, error);
    return fallback;
  }
}

const EMPTY_PAGE: PaginatedProjects = {
  items: [],
  meta: {
    page: 1,
    limit: PROJECTS_PAGE_SIZE,
    total: 0,
    totalPages: 1,
    hasMore: false,
  },
};

/**
 * One page of the public list. The projects route renders page one on the
 * server and the client takes over from `meta.page + 1` as the visitor scrolls.
 */
export function getAllProjectsOnServer({
  page,
  limit,
}: { page?: number; limit?: number } = {}): Promise<PaginatedProjects> {
  const query = new URLSearchParams({
    page: String(page ?? 1),
    limit: String(limit ?? PROJECTS_PAGE_SIZE),
  });

  return fetchList(
    paginatedProjectsSchema,
    `getAllProjects?${query}`,
    EMPTY_PAGE,
  );
}

/** Curated and short by definition, so this one is not paginated. */
export function getHomepageProjectsOnServer(): Promise<ProjectSummary[]> {
  return fetchList(projectSummaryListSchema, 'getProjectsForHomepage', []);
}

async function fetchProject(
  path: string,
  options?: { fresh?: boolean; tags?: string[] },
): Promise<ProjectDetail | null> {
  const response = await fetch(
    serverApiUrl(`/project/${path}`),
    options?.fresh
      ? { cache: 'no-store' }
      : {
          next: { revalidate: false, tags: options?.tags ?? [PROJECTS_TAG] },
        },
  );

  // 404 is "no such project"; 422 is a param that could never name one, which
  // the slug route sees for anything that is not URL safe.
  if (response.status === 404 || response.status === 422) {
    return null;
  }
  if (!response.ok) {
    throw new Error(
      `Failed to load ${path}: ${response.status} ${response.statusText}`,
    );
  }

  return parseEnvelope(projectDetailSchema, response, path);
}

/** Ids are the dashboard's handle on a project; the public site uses slugs. */
export function getProjectByIdOnServer(
  projectId: string,
  options?: { fresh?: boolean },
): Promise<ProjectDetail | null> {
  return fetchProject(`getProjectById/${projectId}`, options);
}

export function getProjectBySlugOnServer(
  slug: string,
): Promise<ProjectDetail | null> {
  // Tagged twice, so a write can drop one project's page or every list.
  return fetchProject(`getProjectBySlug/${slug}`, {
    tags: [PROJECTS_TAG, `project:${slug}`],
  });
}
