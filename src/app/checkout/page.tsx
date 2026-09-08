import type { Metadata } from "next";
import Link from "next/link";
import { isValidPlanId } from "@/config/pricing";
import type { PlanId } from "@/types/pricing";
import { Container } from "@/components/common/Container";
import { CheckoutGate } from "@/components/checkout/CheckoutGate";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Login required. Complete your FITZENIX plan purchase.",
  robots: { index: false, follow: false },
};

interface CheckoutPageProps {
  searchParams: Promise<{ plan?: string }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  const planParam = params.plan ?? "pro";
  const planId: PlanId = isValidPlanId(planParam) ? planParam : "pro";

  return (
    <Container className="section-pad max-w-5xl">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Checkout</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-white">Complete your purchase</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Login / sign up → confirm details → Razorpay → workspace ready.{" "}
          <Link href="/#pricing" className="text-brand-light hover:underline">
            Change plan
          </Link>
        </p>
      </div>
      <CheckoutGate planId={planId} />
    </Container>
  );
}
