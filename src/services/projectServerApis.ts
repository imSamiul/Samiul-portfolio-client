import { ApiResponse } from "../types/apiType";
import { ProjectType } from "../types/ProjectType";

const REVALIDATE_SECONDS = 300;

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
      next: { revalidate: REVALIDATE_SECONDS },
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

export async function getProjectByIdOnServer(
  projectId: string,
  options?: { fresh?: boolean },
): Promise<ProjectType | null> {
  const response = await fetch(
    projectApiUrl(`getProjectById/${projectId}`),
    options?.fresh
      ? { cache: "no-store" }
      : { next: { revalidate: REVALIDATE_SECONDS } },
  );

  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(
      `Failed to load project ${projectId}: ${response.status} ${response.statusText}`,
    );
  }

  const body: ApiResponse<ProjectType> = await response.json();
  return body.data;
}
