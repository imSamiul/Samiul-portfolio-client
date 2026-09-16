import { ProjectType } from "../types/ProjectType";

// Dimensions the API resizes every upload to, needed by next/image.
export const PROJECT_IMAGE_WIDTH = 1920;
export const PROJECT_IMAGE_HEIGHT = 1080;

export function projectImageUrl(projectId: string): string {
  return `/api/project-image/${projectId}`;
}

// The API returns two shapes: list endpoints send { data, contentType } while
// the detail endpoint sends a ready-to-use data URI string.
export function getProjectImageSrc(image: ProjectType["image"]): string {
  if (!image) {
    return "";
  }
  if (typeof image === "string") {
    return image;
  }
  if ("data" in image) {
    return `data:${image.contentType};base64,${image.data}`;
  }
  return "";
}
