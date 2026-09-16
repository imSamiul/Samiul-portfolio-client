'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="container-page my-16 text-center">
      <h1 className="mb-3 text-2xl font-bold md:text-3xl">
        Something went wrong
      </h1>
      <p className="mb-5">{error.message}</p>
      <Button onClick={() => retry()}>Try again</Button>
    </div>
  );
}
