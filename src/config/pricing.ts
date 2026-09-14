import type { PricingPlan, PlanId, PaidPlanId } from "@/types/pricing";
import { siteConfig } from "@/config/site";

/** Single source of truth — matches Fitzenix owner billing plans + 14-day trial. */
export const pricingPlans: PricingPlan[] = [
  {
    id: "trial",
    name: "14-Day Free Trial",
    price: 0,
    currency: "INR",
    period: "trial",
    description: "Try Fitzenix free — no credit card required",
    memberLimit: "Full platform access",
    features: [
      "14 days free access",
      "No credit card required",
      "Owner app & web dashboard",
      "Members, attendance & QR check-in",
      "Upgrade anytime to a paid plan",
    ],
    popular: false,
    isFreeTrial: true,
    ctaText: "Start Free Trial",
    ctaHref: siteConfig.loginUrl,
  },
  {
    id: "starter",
    name: "Starter",
    price: 499,
    currency: "INR",
    period: "month",
    description: "For small gyms getting started",
    memberLimit: "Up to 100 Members",
    features: ["Up to 100 Members", "QR Check-In", "Attendance", "Payments"],
    popular: false,
    razorpayPlanId: process.env.RAZORPAY_PLAN_STARTER ?? "plan_starter",
    ctaText: "Choose Starter",
  },
  {
    id: "growth",
    name: "Growth",
    price: 999,
    currency: "INR",
    period: "month",
    description: "Most popular for growing gyms",
    memberLimit: "Up to 500 Members",
    features: [
      "Up to 500 Members",
      "Owner App",
      "Trainer App",
      "Member App",
      "Reports",
      "CRM",
    ],
    popular: true,
    razorpayPlanId: process.env.RAZORPAY_PLAN_GROWTH ?? "plan_growth",
    ctaText: "Choose Growth",
  },
  {
    id: "pro",
    name: "Pro",
    price: 1999,
    currency: "INR",
    period: "month",
    description: "For established gyms",
    memberLimit: "Unlimited Members",
    features: [
      "Unlimited Members",
      "Multi Staff",
      "Advanced Analytics",
      "Priority Support",
    ],
    popular: false,
    razorpayPlanId: process.env.RAZORPAY_PLAN_PRO ?? "plan_pro",
    ctaText: "Choose Pro",
  },
];

export function getPlanById(planId: PlanId): PricingPlan | undefined {
  return pricingPlans.find((plan) => plan.id === planId);
}

export function getPaidPlanById(planId: PaidPlanId): PricingPlan | undefined {
  const plan = getPlanById(planId);
  return plan && !plan.isFreeTrial ? plan : undefined;
}

export function isValidPlanId(value: string): value is PlanId {
  return pricingPlans.some((plan) => plan.id === value);
}

export function isPaidPlanId(value: string): value is PaidPlanId {
  const plan = getPlanById(value as PlanId);
  return Boolean(plan && !plan.isFreeTrial);
}

export function getStartingPrice(): number {
  return Math.min(
    ...pricingPlans.filter((p) => !p.isFreeTrial).map((plan) => plan.price),
  );
}
