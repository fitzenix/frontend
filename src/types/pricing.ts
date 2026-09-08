export type CurrencyCode = "INR";

export type PlanId = "basic" | "pro" | "premium";

export interface PricingPlan {
  id: PlanId;
  name: string;
  price: number;
  currency: CurrencyCode;
  period: "month";
  description: string;
  features: string[];
  popular: boolean;
  razorpayPlanId: string;
  ctaText: string;
  memberLimit: string;
}
