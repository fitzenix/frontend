"use client";

import { pricingPlans } from "@/config/pricing";
import { useAuth } from "@/context/AuthProvider";
import { Container } from "@/components/common/Container";
import { PricingCard } from "@/components/pricing/PricingCard";
import { TrialStatusCard } from "@/components/pricing/TrialStatusCard";
import { Icon } from "@/components/common/Icon";

const trustBadges = ["No Setup Fee", "Cancel Anytime", "14-Day Free Trial"] as const;

export function PricingSection() {
  const { isAuthenticated, billing, loading } = useAuth();
  const showLiveStatus = isAuthenticated && Boolean(billing) && !loading;
  const paidPlans = pricingPlans.filter((plan) => !plan.isFreeTrial);
  const trialPlan = pricingPlans.find((plan) => plan.isFreeTrial);

  return (
    <section id="pricing" className="section-pad border-y border-border bg-[#0a0a0a]">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simple pricing. Start small. Grow when you do.
          </h2>
          <p className="mt-3 text-sm font-medium text-text-secondary">
            {showLiveStatus ? (
              <>
                Your gym <span className="text-white">{billing?.gymName}</span> —{" "}
                <span className="text-brand">{billing?.access.message}</span>
              </>
            ) : (
              <>
                Start with a{" "}
                <span className="text-success">14-day free trial</span> — no card required — then
                pick Starter, Growth, or Pro.
              </>
            )}
          </p>
        </div>

        <div
          className={
            showLiveStatus
              ? "mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
              : "mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          }
        >
          {showLiveStatus && billing ? <TrialStatusCard billing={billing} /> : null}
          {!showLiveStatus && trialPlan ? <PricingCard key={trialPlan.id} plan={trialPlan} /> : null}
          {paidPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {trustBadges.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="text-success">
                <Icon name="check" className="size-4" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
