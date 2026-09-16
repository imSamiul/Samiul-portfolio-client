import { z } from 'zod';

/** Limits mirror the API's `contactMessageSchema`, so a valid form never 422s. */
export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'That name looks too short')
    .max(80, 'Please keep your name under 80 characters'),
  email: z.string().trim().pipe(z.email('Enter a valid email address')),
  message: z
    .string()
    .trim()
    .min(20, 'Please write at least 20 characters')
    .max(2000, 'Please keep it under 2000 characters'),
  /**
   * Honeypot. The form renders it hidden, so a real visitor always leaves it
   * blank. The API answers 200 and drops anything that fills it in, which tells
   * the bot nothing.
   */
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactMessageSchema>;
