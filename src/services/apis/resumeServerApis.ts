import { serverApiUrl } from '@/lib/env';
import {
  resumeMetaSchema,
  type ApiSuccessResponse,
  type ResumeMeta,
} from '@/shared';

/** Dropped by the API's `revalidateResume()` after an upload. */
const RESUME_TAG = 'resume';

/**
 * The public download is a plain anchor, so the page has to know up front
 * whether a resume exists — otherwise the visitor opens a new tab onto the
 * API's error envelope. `null` means nothing is uploaded yet.
 */
export async function getResumeMetaOnServer(): Promise<ResumeMeta | null> {
  try {
    const response = await fetch(serverApiUrl('/resume'), {
      next: { revalidate: false, tags: [RESUME_TAG] },
    });

    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const body = (await response.json()) as ApiSuccessResponse<unknown>;
    const parsed = resumeMetaSchema.safeParse(body.data);

    return parsed.success ? parsed.data : null;
  } catch (error) {
    // Hiding the link is the safe degradation: the homepage still renders, and
    // a visitor never sees a broken download.
    console.error('Failed to load the resume metadata', error);
    return null;
  }
}
