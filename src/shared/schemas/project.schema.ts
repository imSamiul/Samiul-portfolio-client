import { z } from 'zod';

import {
  isoDateTimeSchema,
  objectIdSchema,
  SLUG_PATTERN,
  slugSchema,
} from './common.schema';

export const projectStatusSchema = z.enum(['draft', 'published']);

export type ProjectStatus = z.infer<typeof projectStatusSchema>;

/**
 * The API's `toProjectSummary` DTO. List endpoints project `projectDetails`
 * away, so a summary is everything a card needs and nothing more. The optional
 * links are genuinely absent rather than `''` — the serializer drops blanks.
 */
export const projectSummarySchema = z.object({
  id: objectIdSchema,
  title: z.string(),
  slug: slugSchema,
  status: projectStatusSchema,
  order: z.number().int(),
  summary: z.string(),
  frontEndTech: z.array(z.string()),
  backEndTech: z.array(z.string()),
  liveLink: z.string().optional(),
  frontEndRepo: z.string().optional(),
  backEndRepo: z.string().optional(),
  showOnHomepage: z.boolean(),
  image: z.string(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

export type ProjectSummary = z.infer<typeof projectSummarySchema>;

/** `toProjectDetail` — the single-project endpoints, which add the long copy. */
export const projectDetailSchema = projectSummarySchema.extend({
  projectDetails: z.string(),
});

export type ProjectDetail = z.infer<typeof projectDetailSchema>;

export const projectSummaryListSchema = z.array(projectSummarySchema);

/**
 * Dashboard form. This is not the server's create/update schema: those parse
 * multipart text (JSON-encoded tech lists, `"true"` booleans) while the form
 * holds what the inputs actually produce. The limits are mirrored so the user
 * sees an error before the round trip, not a 422 afterwards.
 */
export const projectFormSchema = z.object({
  title: z.string().trim().min(1, 'Give the project a title'),
  // Blank means "derive it from the title" on create, "leave it alone" on edit.
  slug: z
    .string()
    .trim()
    .refine(
      (value) => value === '' || SLUG_PATTERN.test(value.toLowerCase()),
      'Use lowercase letters, numbers and single dashes',
    ),
  status: projectStatusSchema,
  // The number input is registered with `valueAsNumber`, so this is already a
  // number by the time the resolver sees it.
  order: z.number('Order has to be a number').int('Use a whole number'),
  summary: z.string().trim().min(1, 'Write a one-line summary'),
  // Comma-separated in the input; `splitTechList` turns it into the array the
  // API wants. A project always has a frontend; it may have no backend.
  frontEndTech: z.string().trim().min(1, 'List at least one frontend tool'),
  backEndTech: z.string().trim(),
  liveLink: z.string().trim(),
  frontEndRepo: z.string().trim(),
  backEndRepo: z.string().trim(),
  projectDetails: z.string().trim().min(1, 'Write the project details'),
  showOnHomepage: z.boolean(),
  image: z.custom<FileList>().optional(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

/**
 * Create needs the image; edit keeps whatever is already in Cloudinary, so the
 * file input is not even rendered there.
 */
export const projectCreateFormSchema = projectFormSchema.extend({
  image: z
    .custom<FileList>()
    .refine((files) => (files?.length ?? 0) > 0, 'An image is required'),
});

/**
 * The JSON body `PATCH /updateProject/:id` takes. Unlike create, which arrives
 * as multipart text, this sends real arrays and booleans. The API leaves a
 * missing key untouched, so every field is optional.
 */
export const updateProjectPayloadSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  status: projectStatusSchema.optional(),
  order: z.number().int().optional(),
  summary: z.string().optional(),
  frontEndTech: z.array(z.string()).optional(),
  backEndTech: z.array(z.string()).optional(),
  liveLink: z.string().optional(),
  frontEndRepo: z.string().optional(),
  backEndRepo: z.string().optional(),
  projectDetails: z.string().optional(),
  showOnHomepage: z.boolean().optional(),
});

export type UpdateProjectPayload = z.infer<typeof updateProjectPayloadSchema>;
