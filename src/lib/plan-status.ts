import type { AuthUser, UserPlanInfo } from "@/types/auth";

export interface PlanStatus {
  name: string | null;
  daysRemaining: number | null;
  expired: boolean;
}

const planNames: Record<string, string> = {
  starter: "Starter",
  growth: "Growth",
  pro: "Pro",
};

const expiryKeys = [
  "expiresAt",
  "expiryDate",
  "endDate",
  "currentPeriodEnd",
  "trialEndsAt",
] as const;

function asPlanInfo(value: string | UserPlanInfo | null | undefined): UserPlanInfo | null {
  if (!value) return null;
  return typeof value === "string" ? { name: value } : value;
}

function getPlanInfo(user: AuthUser): UserPlanInfo | null {
  const source =
    user.subscription ??
    user.membership ??
    user.subscriptionPlan ??
    user.currentPlan ??
    user.plan;
  const info = asPlanInfo(source);
  if (!info) {
    if (!user.planExpiresAt && !user.subscriptionStatus) return null;
    return {
      expiresAt: user.planExpiresAt,
      status: user.subscriptionStatus,
    };
  }

  const nestedPlan = asPlanInfo(info.plan);
  return {
    ...(nestedPlan ?? {}),
    ...info,
    expiresAt: info.expiresAt ?? user.planExpiresAt,
    status: info.status ?? user.subscriptionStatus,
  };
}

function getExpiryDate(plan: UserPlanInfo): Date | null {
  for (const key of expiryKeys) {
    const value = plan[key];
    if (!value) continue;
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date;
  }
  return null;
}

export function getPlanStatus(user: AuthUser | null): PlanStatus {
  if (!user) return { name: null, daysRemaining: null, expired: false };

  const plan = getPlanInfo(user);
  if (!plan) return { name: null, daysRemaining: null, expired: false };

  const rawName = plan.name ?? plan.planName ?? plan.planId ?? plan.id ?? null;
  const name = rawName
    ? planNames[rawName.toLowerCase()] ?? rawName
    : plan.reason?.includes("trial")
      ? "14-Day Free Trial"
      : null;
  const expiryDate = getExpiryDate(plan);
  const status = (plan.status ?? user.status)?.toLowerCase();

  if (
    status === "expired" ||
    status === "inactive" ||
    status === "cancelled" ||
    plan.reason === "trial_expired" ||
    plan.reason === "plan_expired" ||
    plan.reason === "suspended"
  ) {
    return { name, daysRemaining: 0, expired: true };
  }

  if (typeof plan.daysRemaining === "number") {
    return {
      name,
      daysRemaining: Math.max(0, plan.daysRemaining),
      expired: plan.daysRemaining <= 0,
    };
  }

  if (!expiryDate) return { name, daysRemaining: null, expired: false };

  const millisecondsRemaining = expiryDate.getTime() - Date.now();
  const daysRemaining = Math.max(0, Math.ceil(millisecondsRemaining / 86_400_000));

  return {
    name,
    daysRemaining,
    expired: daysRemaining === 0,
  };
}