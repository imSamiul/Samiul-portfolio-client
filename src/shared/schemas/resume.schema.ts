import { z } from 'zod';

/**
 * What `GET /resume` and `POST /resume` both answer. The Cloudinary public id
 * and version stay on the API side, so the timestamp is all there is.
 */
export const resumeMetaSchema = z.object({ updatedAt: z.iso.datetime() });

export type ResumeMeta = z.infer<typeof resumeMetaSchema>;
