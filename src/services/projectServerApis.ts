import { ProjectType } from "../types/ProjectType";

const REVALIDATE_SECONDS = 300;

function projectApiUrl(path: string): string {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not set");
  }
  return `${baseUrl}/api/project/${path}`;
}

// Every project carries its image as ~750KB of base64. Anything handed to a
// client component ends up in the RSC payload inside the HTML, so the image is
// stripped here and served separately by /api/project-image.
function withoutImage(project: ProjectType): ProjectType {
  return { ...project, image: undefined };
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
    const projects: ProjectType[] = await response.json();
    return projects.map(withoutImage);
  } catch (error) {
    console.error(`Failed to load projects from ${path}`, error);
    return [];
  }
}

async function fetchProject(
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
  return response.json();
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
  const project = await fetchProject(projectId, options);
  return project ? withoutImage(project) : null;
}

export async function getProjectImageOnServer(
  projectId: string,
): Promise<ProjectType["image"]> {
  const project = await fetchProject(projectId);
  return project?.image;
}
