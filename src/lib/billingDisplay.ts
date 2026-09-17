import { getPaidPlanById } from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";
import type { BillingStatus } from "@/types/billing";

export function planDisplayName(status: BillingStatus | null): string {
  if (!status) return "No plan";
  const { access } = status;
  if (access.reason === "trial") return "Free Trial";
  if (access.plan) {
    return getPaidPlanById(access.plan)?.name ?? access.plan;
  }
  if (access.reason === "trial_expired") return "Trial ended";
  if (access.reason === "plan_expired") return "Plan expired";
  return "Inactive";
}

export function planPriceLabel(status: BillingStatus | null): string | null {
  if (!status?.access.plan) return status?.access.reason === "trial" ? "Free" : null;
  const plan = getPaidPlanById(status.access.plan);
  return plan ? `${formatCurrency(plan.price)}/mo` : null;
}

export function remainingDaysLabel(status: BillingStatus | null): string | null {
  if (!status) return null;
  const days = status.access.daysRemaining;
  if (days == null) return null;
  if (days <= 0) return "Expired";
  if (days === 1) return "1 day left";
  return `${days} days left`;
}

export function expiresOnLabel(status: BillingStatus | null): string | null {
  if (!status) return null;
  const iso =
    status.access.reason === "trial"
      ? status.access.trialEndsAt
      : status.access.planPeriodEnd;
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
