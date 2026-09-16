import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container mx-auto my-10 px-5 md:px-10 text-center">
      <h1 className="text-2xl md:text-3xl font-bold font-Montserrat mb-3">
        Page not found
      </h1>
      <p className="mb-5">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link className="btn btn-primary" href="/">
        Back to homepage
      </Link>
    </div>
  );
}
