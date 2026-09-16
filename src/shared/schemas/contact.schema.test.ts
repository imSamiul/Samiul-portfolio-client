import { describe, expect, it } from 'vitest';

import { contactMessageSchema } from './contact.schema';

const message = {
  name: 'Samiul',
  email: 'hello@example.com',
  message: 'I would like to talk about a project with you.',
  website: '',
};

describe('contactMessageSchema', () => {
  it('accepts a filled-in form', () => {
    expect(contactMessageSchema.safeParse(message).success).toBe(true);
  });

  // These two limits are the drift the API used to catch on its own, leaving
  // the visitor with a bare "Validation failed".
  it('rejects a name over the API\u2019s 80 character limit', () => {
    const result = contactMessageSchema.safeParse({
      ...message,
      name: 'a'.repeat(81),
    });

    expect(result.success).toBe(false);
  });

  it('rejects a message over the API\u2019s 2000 character limit', () => {
    const result = contactMessageSchema.safeParse({
      ...message,
      message: 'a'.repeat(2001),
    });

    expect(result.success).toBe(false);
  });

  it('rejects a message too short to be worth emailing', () => {
    expect(
      contactMessageSchema.safeParse({ ...message, message: 'hi' }).success,
    ).toBe(false);
  });
});
