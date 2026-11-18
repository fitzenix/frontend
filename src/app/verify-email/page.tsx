import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";

export const metadata: Metadata = {
  title: "Verify your email",
  robots: { index: false, follow: false },
};

interface VerifyEmailPageProps {
  searchParams: Promise<{ email?: string; next?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const params = await searchParams;
  const email = params.email ?? "";
  const next = params.next && params.next.startsWith("/") ? params.next : "/#pricing";

  return (
    <Container className="section-pad">
      <VerifyEmailForm email={email} nextPath={next} />
    </Container>
  );
}