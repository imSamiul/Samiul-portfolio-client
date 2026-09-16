import { z } from 'zod';

/**
 * These mirror `samiuls-portfolio-server/src/shared/schemas/` by hand. There is
 * no shared package, so a contract change has to be applied on both sides —
 * see the "Contract safety" section of skills.md.
 */

export const OBJECT_ID_PATTERN = /^[0-9a-f]{24}$/i;

/** Lowercase words joined by single dashes — no leading, trailing or doubled. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const objectIdSchema = z.string().regex(OBJECT_ID_PATTERN, 'Invalid id');

export const slugSchema = z.string().regex(SLUG_PATTERN, 'Invalid slug');

/**
 * Mongoose serialises timestamps to ISO strings over the wire. Keeping them as
 * strings here stops `new Date(...)` from silently producing `Invalid Date`
 * further down.
 */
export const isoDateTimeSchema = z.iso.datetime();

/**
 * Mirrors the API's default `limit`, so the first client-side page continues
 * exactly where the server-rendered one stopped.
 */
export const PROJECTS_PAGE_SIZE = 9;

/** What every paginated list sends alongside its items. */
export const paginationMetaSchema = z.object({
  page: z.number().int(),
  limit: z.number().int(),
  total: z.number().int(),
  totalPages: z.number().int(),
  hasMore: z.boolean(),
});

export type PaginationMeta = z.infer<typeof paginationMetaSchema>;

/** `{ field, message }` pairs the API sends with a 422 so a form can place them. */
export const fieldIssueSchema = z.object({
  field: z.string(),
  message: z.string(),
});

export type FieldIssue = z.infer<typeof fieldIssueSchema>;
