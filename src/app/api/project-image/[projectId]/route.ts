import { getProjectByIdOnServer } from "../../../../services/projectServerApis";
import { getProjectImageSrc } from "../../../../utils/projectImage";

const DATA_URI_PATTERN = /^data:([^;]+);base64,(.+)$/;

// The API only ships project images as base64 inside the project JSON. Serving
// them from here keeps the multi-megabyte payload out of the rendered HTML and
// lets next/image resize and re-encode them.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ projectId: string }> },
) {
  const { projectId } = await params;
  const project = await getProjectByIdOnServer(projectId);

  if (!project) {
    return new Response("Project not found", { status: 404 });
  }

  const match = DATA_URI_PATTERN.exec(getProjectImageSrc(project.image));
  if (!match) {
    return new Response("Project has no image", { status: 404 });
  }

  const [, contentType, base64Data] = match;

  return new Response(Buffer.from(base64Data, "base64"), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
