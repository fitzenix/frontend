export type CurrencyCode = "INR";

export type PaidPlanId = "starter" | "growth" | "pro";

/** Paid plans + marketing-only free trial card */
export type PlanId = "trial" | PaidPlanId;

export interface PricingPlan {
  id: PlanId;
  name: string;
  price: number;
  currency: CurrencyCode;
  period: "month" | "trial";
  description: string;
  features: string[];
  popular: boolean;
  /** Shown on card (e.g. "No card required") */
  badge?: string;
  /** Free trial — no Razorpay checkout */
  isFreeTrial?: boolean;
  razorpayPlanId?: string;
  ctaText: string;
  /** Override default /checkout?plan= link */
  ctaHref?: string;
  memberLimit: string;
}
