import type { Metadata } from "next";

import LoginForm from "../../components/pages/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LoginForm />;
}
