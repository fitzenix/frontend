export type CurrencyCode = "INR";

export type PaidPlanId = "starter" | "growth" | "pro";

/** Paid plans, marketing trial, and contact-sales enterprise card */
export type PlanId = "trial" | "enterprise" | PaidPlanId;

export type PricingCardIcon = "user" | "chart" | "crown" | "building";

export type PricingCtaStyle = "solid" | "outline";

export type PricingLimitStyle = "muted" | "brand" | "infinity";

export interface PricingPlan {
  id: PlanId;
  name: string;
  price: number;
  currency: CurrencyCode;
  period: "month" | "trial" | "custom";
  description: string;
  features: string[];
  popular: boolean;
  /** Shown on card (e.g. "No card required") */
  badge?: string;
  /** Free trial — no Razorpay checkout */
  isFreeTrial?: boolean;
  /** Contact-sales card — not a Razorpay plan */
  isCustom?: boolean;
  razorpayPlanId?: string;
  ctaText: string;
  /** Override default /checkout?plan= link */
  ctaHref?: string;
  ctaStyle?: PricingCtaStyle;
  /** Small line under the button */
  footnote?: string;
  memberLimit: string;
  icon?: PricingCardIcon;
  limitStyle?: PricingLimitStyle;
  /** Replaces the numeric price (enterprise) */
  priceHeadline?: string;
  priceSubline?: string;
}
