export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
  // Honeypot: rendered hidden, so only a bot ever fills it in.
  website: string;
};
