import { describe, expect, it } from 'vitest';

import {
  projectDetailSchema,
  projectFormSchema,
  projectSummarySchema,
} from './project.schema';

/**
 * A real `toProjectSummary` payload, copied from the API's list response. The
 * optional links are left out here because the serializer drops blanks — a
 * frontend-only or undeployed project arrives exactly like this.
 */
const summary = {
  id: '68c1f4a9b3d2e14c7a091f33',
  title: 'Bari Vara',
  slug: 'bari-vara',
  status: 'published',
  order: 0,
  summary: 'A flat booking platform.',
  frontEndTech: ['Next.js', 'Tailwind'],
  backEndTech: ['Express', 'MongoDB'],
  showOnHomepage: true,
  image: 'https://res.cloudinary.com/demo/image/upload/v1/bari.webp',
  createdAt: '2026-09-01T10:00:00.000Z',
  updatedAt: '2026-09-02T10:00:00.000Z',
};

describe('projectSummarySchema', () => {
  it('accepts a list payload with the optional links omitted', () => {
    expect(projectSummarySchema.parse(summary).liveLink).toBeUndefined();
  });

  it('keeps a live link when the project has one', () => {
    const parsed = projectSummarySchema.parse({
      ...summary,
      liveLink: 'https://bari-vara.example',
    });

    expect(parsed.liveLink).toBe('https://bari-vara.example');
  });

  it('rejects a timestamp that is not an ISO string', () => {
    // The type used to say `Date`; the wire format is a string. Guarding this
    // stops `new Date(...)` from quietly producing an Invalid Date.
    const result = projectSummarySchema.safeParse({
      ...summary,
      createdAt: 1757000000000,
    });

    expect(result.success).toBe(false);
  });

  it('rejects a slug that could not appear in a URL', () => {
    const result = projectSummarySchema.safeParse({
      ...summary,
      slug: 'Bari Vara',
    });

    expect(result.success).toBe(false);
  });

  it('rejects a summary that is missing the image the cards render', () => {
    // `image` used to be optional here, which cost four `!` assertions.
    const result = projectSummarySchema.safeParse({
      ...summary,
      image: undefined,
    });

    expect(result.success).toBe(false);
  });
});

describe('projectDetailSchema', () => {
  it('needs the long copy that only the single-project endpoint returns', () => {
    expect(projectDetailSchema.safeParse(summary).success).toBe(false);
    expect(
      projectDetailSchema.safeParse({ ...summary, projectDetails: 'Long copy' })
        .success,
    ).toBe(true);
  });
});

describe('projectFormSchema', () => {
  const form = {
    title: 'Bari Vara',
    slug: '',
    status: 'draft' as const,
    order: 0,
    summary: 'A flat booking platform.',
    frontEndTech: 'Next.js, Tailwind',
    backEndTech: '',
    liveLink: '',
    frontEndRepo: '',
    backEndRepo: '',
    projectDetails: 'Long copy',
    showOnHomepage: false,
  };

  it('treats a blank slug as "derive it from the title"', () => {
    expect(projectFormSchema.safeParse(form).success).toBe(true);
  });

  it('rejects a slug that is not URL safe, since it becomes a public URL', () => {
    expect(
      projectFormSchema.safeParse({ ...form, slug: 'Bari Vara' }).success,
    ).toBe(false);
  });

  it('allows a project with no backend at all', () => {
    expect(
      projectFormSchema.safeParse({ ...form, backEndTech: '' }).success,
    ).toBe(true);
  });

  it('still requires at least one frontend tool', () => {
    expect(
      projectFormSchema.safeParse({ ...form, frontEndTech: '  ' }).success,
    ).toBe(false);
  });
});
