"use client";

import Link from "next/link";
import type { PricingPlan } from "@/types/pricing";
import { formatCurrency } from "@/lib/formatCurrency";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthProvider";
import { getPlanStatus } from "@/lib/plan-status";

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  const isTrial = plan.isFreeTrial === true;
  const { user, loading, isAuthenticated } = useAuth();
  const planStatus = getPlanStatus(user);
  const subscription =
    user?.subscription && typeof user.subscription === "object" ? user.subscription : null;
  const trialReason = subscription?.reason;
  const trialActive = isTrial && isAuthenticated && trialReason === "trial";
  const trialExpired = isTrial && isAuthenticated && trialReason === "trial_expired";
  const otherPlanActive = isTrial && isAuthenticated && trialReason === "ok";
  const href = isTrial && !isAuthenticated
    ? "/login?mode=signup&next=%2F%23pricing"
    : plan.ctaHref ?? `/checkout?plan=${plan.id}`;
  const showPopular = plan.popular && !isTrial;

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-[#111111] p-6",
        showPopular && "border-brand shadow-[0_0_36px_rgba(217,4,41,0.16)]",
        isTrial && "border-success/40 shadow-[0_0_28px_rgba(34,197,94,0.08)]",
        !showPopular && !isTrial && "border-border",
      )}
    >
      {showPopular ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          Most Popular
        </span>
      ) : null}

      <div>
        <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
        <p className="mt-1 text-sm text-text-secondary">{plan.description}</p>
        <p className="mt-5 font-display text-4xl font-bold text-white">
          {isTrial ? (
            <>
              Free
              <span className="ml-1 text-base font-medium text-text-muted">/14 days</span>
            </>
          ) : (
            <>
              {formatCurrency(plan.price, plan.currency)}
              <span className="ml-1 text-base font-medium text-text-muted">/month</span>
            </>
          )}
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
            <span className={cn("mt-0.5", isTrial ? "text-success" : "text-success")}>
              <Icon name="check" className="size-4" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        {isTrial && loading ? (
          <Button fullWidth disabled variant="outline">
            Checking trial status...
          </Button>
        ) : trialActive ? (
          <div className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-success/30 bg-success/10 px-4 text-sm font-semibold text-success">
            <Icon name="check" className="size-4" />
            {planStatus.daysRemaining === null
              ? "Free trial active"
              : `${planStatus.daysRemaining} ${planStatus.daysRemaining === 1 ? "day" : "days"} remaining`}
          </div>
        ) : trialExpired ? (
          <div className="flex min-h-11 items-center justify-center rounded-xl border border-danger/30 bg-danger/10 px-4 text-sm font-semibold text-danger">
            Free trial expired
          </div>
        ) : otherPlanActive ? (
          <div className="flex min-h-11 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-semibold text-text-secondary">
            Plan already active
          </div>
        ) : isTrial && isAuthenticated ? (
          <div className="flex min-h-11 items-center justify-center rounded-xl border border-border bg-background px-4 text-center text-sm font-medium text-text-secondary">
            Trial status unavailable
          </div>
        ) : (
          <Link href={href}>
            <Button
              fullWidth
              variant={showPopular ? "primary" : isTrial ? "primary" : "outline"}
              className={cn(
                isTrial && "bg-success hover:bg-success/90",
                !showPopular &&
                  !isTrial &&
                  "border-brand/50 text-brand-light hover:border-brand hover:text-white",
              )}
            >
              {plan.ctaText}
            </Button>
          </Link>
        )}
      </div>
    </article>
  );
}
