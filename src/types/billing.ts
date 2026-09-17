export type GymAccessReason =
  | "ok"
  | "trial"
  | "trial_expired"
  | "plan_expired"
  | "suspended";

export type PaidPlanId = "starter" | "growth" | "pro";

export interface GymAccessState {
  allowed: boolean;
  reason: GymAccessReason;
  plan: PaidPlanId | null;
  features: string[];
  memberLimit: number | null;
  trialEndsAt: string | null;
  planPeriodEnd: string | null;
  daysRemaining: number | null;
  message: string;
}

export interface BillingStatus {
  gymId: string;
  gymName: string;
  access: GymAccessState;
}

export interface BillingCheckoutResult {
  paymentId: string;
  plan: {
    id: PaidPlanId;
    name: string;
    pricePaise: number;
    periodDays: number;
  };
  order: { id: string; amount: number; currency: string };
  keyId: string;
  name: string;
  description: string;
  prefill: { name?: string; email?: string; contact?: string };
  mock?: boolean;
  mockPaymentId?: string;
  mockSignature?: string;
}

export interface BillingVerifyResult {
  access: GymAccessState;
}
