import type { Metadata } from "next";

import LoginForm from "../../components/pages/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function Page({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;

  // Same-site paths only. `?next=https://evil.com` or `?next=//evil.com` would
  // otherwise send the admin off-site holding a fresh session.
  const destination = next && /^\/(?!\/)/.test(next) ? next : "/dashboard";

  return <LoginForm destination={destination} />;
}
