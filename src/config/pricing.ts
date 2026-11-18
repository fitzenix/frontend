import type { PricingPlan, PlanId, PaidPlanId } from "@/types/pricing";
import { siteConfig } from "@/config/site";

const includedFeatures = [
  "Member Management",
  "Attendance & QR Check-in",
  "Trainer Management",
  "Membership & Plans",
  "Payments & Invoices",
  "Reports & Analytics",
  "Mobile Apps (Owner, Trainer, Member)",
  "Notifications & CRM",
  "Bulk Import",
] as const;

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
    ctaText: "Start 14-Day Free Trial",
    ctaHref: siteConfig.loginUrl,
  },
  {
    id: "starter",
    name: "Starter",
    price: 499,
    currency: "INR",
    period: "month",
    description: "Perfect for small gyms & new studios",
    memberLimit: "Up to 100 Members",
    features: [...includedFeatures],
    popular: false,
    icon: "user",
    limitStyle: "muted",
    ctaStyle: "solid",
    footnote: "No credit card required",
    razorpayPlanId: process.env.RAZORPAY_PLAN_STARTER ?? "plan_starter",
    ctaText: "Start 14-Day Free Trial",
  },
  {
    id: "growth",
    name: "Growth",
    price: 999,
    currency: "INR",
    period: "month",
    description: "Ideal for growing gyms & fitness centers",
    memberLimit: "Up to 500 Members",
    features: [...includedFeatures],
    popular: true,
    icon: "chart",
    limitStyle: "brand",
    ctaStyle: "solid",
    footnote: "No credit card required",
    razorpayPlanId: process.env.RAZORPAY_PLAN_GROWTH ?? "plan_growth",
    ctaText: "Start 14-Day Free Trial",
  },
  {
    id: "pro",
    name: "Pro",
    price: 1999,
    currency: "INR",
    period: "month",
    description: "For established gyms & fitness chains",
    memberLimit: "Unlimited Members",
    features: [...includedFeatures],
    popular: false,
    icon: "crown",
    limitStyle: "infinity",
    ctaStyle: "outline",
    footnote: "No credit card required",
    razorpayPlanId: process.env.RAZORPAY_PLAN_PRO ?? "plan_pro",
    ctaText: "Start 14-Day Free Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 0,
    currency: "INR",
    period: "custom",
    description: "Custom solution for large chains & franchises",
    memberLimit: "Unlimited Members",
    features: [
      "All Pro Features",
      "Dedicated Account Manager",
      "Custom Integrations",
      "Advanced Reports",
      "Priority Support",
      "Onboarding & Training",
    ],
    popular: false,
    isCustom: true,
    icon: "building",
    limitStyle: "muted",
    ctaStyle: "outline",
    priceHeadline: "Custom Pricing",
    priceSubline: "Tailored to your business needs",
    footnote: "Get a personalized quote",
    ctaText: "Contact Sales",
    ctaHref: "/#contact",
  },
];

export function getPlanById(planId: PlanId): PricingPlan | undefined {
  return pricingPlans.find((plan) => plan.id === planId);
}

export function getPaidPlanById(planId: PaidPlanId): PricingPlan | undefined {
  const plan = getPlanById(planId);
  return plan && !plan.isFreeTrial && !plan.isCustom ? plan : undefined;
}

export function isValidPlanId(value: string): value is PlanId {
  return pricingPlans.some((plan) => plan.id === value);
}

export function isPaidPlanId(value: string): value is PaidPlanId {
  const plan = getPlanById(value as PlanId);
  return Boolean(plan && !plan.isFreeTrial && !plan.isCustom);
}

export function getStartingPrice(): number {
  return Math.min(
    ...pricingPlans
      .filter((plan) => !plan.isFreeTrial && !plan.isCustom && plan.price > 0)
      .map((plan) => plan.price),
  );
}
