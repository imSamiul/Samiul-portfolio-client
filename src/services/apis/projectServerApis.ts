import { z } from 'zod';

import { serverApiUrl } from '@/lib/env';
import {
  projectDetailSchema,
  projectSummaryListSchema,
  type ApiSuccessResponse,
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
async function fetchProjectList(path: string): Promise<ProjectSummary[]> {
  try {
    const response = await fetch(serverApiUrl(`/project/${path}`), {
      next: { revalidate: false, tags: [PROJECTS_TAG] },
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await parseEnvelope(projectSummaryListSchema, response, path);
  } catch (error) {
    console.error(`Failed to load projects from ${path}`, error);
    return [];
  }
}

export function getAllProjectsOnServer(): Promise<ProjectSummary[]> {
  return fetchProjectList('getAllProjects');
}

export function getHomepageProjectsOnServer(): Promise<ProjectSummary[]> {
  return fetchProjectList('getProjectsForHomepage');
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
