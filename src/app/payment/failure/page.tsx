import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";

export const metadata: Metadata = {
  title: "Payment Failed",
  robots: { index: false, follow: false },
};

export default function PaymentFailurePage() {
  return (
    <Container className="section-pad max-w-lg text-center">
      <h1 className="font-display text-3xl font-bold text-white">Payment wasn&apos;t completed</h1>
      <p className="mt-4 text-text-secondary">
        Your payment was not successful. You can try again from the pricing page.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/#pricing">
          <Button>Return to Pricing</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    </Container>
  );
}
