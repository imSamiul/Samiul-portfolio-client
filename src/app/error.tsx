"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto my-10 px-5 md:px-10 text-center">
      <h1 className="text-2xl md:text-3xl font-bold font-Montserrat mb-3">
        Something went wrong
      </h1>
      <p className="mb-5">{error.message}</p>
      <button className="btn btn-primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
