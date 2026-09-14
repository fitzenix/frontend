import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { AuthPageClient } from "@/components/auth/AuthPageClient";

export const metadata: Metadata = {
  title: "Login / Sign up",
  description: "Login or create your FITZENIX gym owner account before checkout.",
  robots: { index: false, follow: false },
};

interface LoginPageProps {
  searchParams: Promise<{ next?: string; mode?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = params.next && params.next.startsWith("/") ? params.next : "/#pricing";
  const mode = params.mode === "signup" ? "signup" : "login";

  return (
    <Container className="section-pad">
      <AuthPageClient nextPath={nextPath} initialMode={mode} />
    </Container>
  );
}
