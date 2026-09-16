import { ApiResponse } from "../types/apiType";
import { ProjectType } from "../types/ProjectType";

/**
 * Every project fetch carries this tag, and the API calls `/api/revalidate`
 * after each write — so the data is cached indefinitely rather than on an
 * interval. Keep the tag names in step with the API's `revalidateWeb.ts`.
 */
const PROJECTS_TAG = "projects";

function projectApiUrl(path: string): string {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not set");
  }
  return `${baseUrl}/api/v1/project/${path}`;
}

// Public pages must still render (with their headings, name and structured
// data) when the API is unreachable, so a failed list request degrades to empty.
async function fetchProjectList(path: string): Promise<ProjectType[]> {
  try {
    const response = await fetch(projectApiUrl(path), {
      next: { revalidate: false, tags: [PROJECTS_TAG] },
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const body: ApiResponse<ProjectType[]> = await response.json();
    return body.data;
  } catch (error) {
    console.error(`Failed to load projects from ${path}`, error);
    return [];
  }
}

export function getAllProjectsOnServer(): Promise<ProjectType[]> {
  return fetchProjectList("getAllProjects");
}

export function getHomepageProjectsOnServer(): Promise<ProjectType[]> {
  return fetchProjectList("getProjectsForHomepage");
}

async function fetchProject(
  path: string,
  options?: { fresh?: boolean; tags?: string[] },
): Promise<ProjectType | null> {
  const response = await fetch(
    projectApiUrl(path),
    options?.fresh
      ? { cache: "no-store" }
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

  const body: ApiResponse<ProjectType> = await response.json();
  return body.data;
}

/** Ids are the dashboard's handle on a project; the public site uses slugs. */
export function getProjectByIdOnServer(
  projectId: string,
  options?: { fresh?: boolean },
): Promise<ProjectType | null> {
  return fetchProject(`getProjectById/${projectId}`, options);
}

export function getProjectBySlugOnServer(
  slug: string,
): Promise<ProjectType | null> {
  // Tagged twice, so a write can drop one project's page or every list.
  return fetchProject(`getProjectBySlug/${slug}`, {
    tags: [PROJECTS_TAG, `project:${slug}`],
  });
}
