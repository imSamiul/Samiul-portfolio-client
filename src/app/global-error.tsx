'use client';

// This boundary replaces the root layout when it fires, so it has to bring its
// own <html>, <body> and stylesheet — nothing from layout.tsx applies here.
import './globals.css';

import { Button } from '@/components/ui/button';
import { fontVariables } from '@/lib/fonts';

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    // No ThemeProvider here — this boundary replaces the root layout, so it
    // renders in the default light theme whatever the user picked.
    <html lang="en" className={fontVariables}>
      <body className="font-sans">
        <div className="container-page my-16 text-center">
          <h1 className="mb-3 text-2xl font-bold md:text-3xl">
            Something went wrong
          </h1>
          <p className="mb-5">
            The page could not be loaded. Trying again often fixes it.
          </p>
          {/* Server-side errors arrive redacted, so the digest is the only way
              to line this up with the API logs. */}
          {error.digest && (
            <p className="mb-5 text-sm opacity-70">Reference: {error.digest}</p>
          )}
          <Button onClick={() => retry()}>Try again</Button>
        </div>
      </body>
    </html>
  );
}
