import { revalidateTag } from "next/cache";

/**
 * Called by the API after every project write. Project data is cached
 * indefinitely, so without this the site would never pick up a change.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  // Refuse rather than accept: without a secret anyone could flush the cache.
  if (!secret) {
    return Response.json(
      { revalidated: false, message: "Revalidation is not configured" },
      { status: 503 },
    );
  }

  if (request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json(
      { revalidated: false, message: "Invalid secret" },
      { status: 401 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    tags?: unknown;
  } | null;
  const { tags } = body ?? {};

  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string")) {
    return Response.json(
      { revalidated: false, message: "Expected a tags array" },
      { status: 400 },
    );
  }

  // `{ expire: 0 }`, not a stale-while-revalidate profile: the whole point is
  // that the next visit already shows the change. `updateTag` is unavailable
  // here because the caller is a webhook, not a Server Action.
  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 });
  }

  return Response.json({ revalidated: tags });
}
