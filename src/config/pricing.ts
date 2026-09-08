import type { PricingPlan, PlanId } from "@/types/pricing";

/** Single source of truth for SaaS plan pricing and checkout. */
export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 999,
    currency: "INR",
    period: "month",
    description: "For small gyms",
    memberLimit: "Up to 100 members",
    features: [
      "Up to 100 members",
      "Attendance",
      "Memberships",
      "Basic reports",
      "Mobile access",
    ],
    popular: false,
    razorpayPlanId: process.env.RAZORPAY_PLAN_BASIC ?? "plan_basic",
    ctaText: "Choose Basic",
  },
  {
    id: "pro",
    name: "Pro",
    price: 1999,
    currency: "INR",
    period: "month",
    description: "For growing gyms",
    memberLimit: "Up to 500 members",
    features: [
      "Up to 500 members",
      "Advanced reports",
      "Finance & billing",
      "Staff management",
      "All mobile apps",
    ],
    popular: true,
    razorpayPlanId: process.env.RAZORPAY_PLAN_PRO ?? "plan_pro",
    ctaText: "Choose Pro",
  },
  {
    id: "premium",
    name: "Premium",
    price: 3499,
    currency: "INR",
    period: "month",
    description: "For established gyms",
    memberLimit: "Unlimited members",
    features: [
      "Unlimited members",
      "Advanced analytics",
      "Custom reports",
      "AI insights",
      "Priority support",
    ],
    popular: false,
    razorpayPlanId: process.env.RAZORPAY_PLAN_PREMIUM ?? "plan_premium",
    ctaText: "Choose Premium",
  },
];

export function getPlanById(planId: PlanId): PricingPlan | undefined {
  return pricingPlans.find((plan) => plan.id === planId);
}

export function isValidPlanId(value: string): value is PlanId {
  return pricingPlans.some((plan) => plan.id === value);
}

export function getStartingPrice(): number {
  return Math.min(...pricingPlans.map((plan) => plan.price));
}
