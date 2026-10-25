"use client";

import type { PricingPlan } from "@/types/pricing";
import { pricingPlans } from "@/config/pricing";
import { useAuth } from "@/context/AuthProvider";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PricingGlyph, type PricingGlyphName } from "@/components/pricing/PricingGlyph";

const trustItems: { icon: PricingGlyphName; label: string }[] = [
  { icon: "grid", label: "All Features Included" },
  { icon: "users", label: "Flexible Member Limits" },
  { icon: "shield", label: "No Setup Fee" },
  { icon: "clock", label: "14-Day Free Trial" },
];

const highlights: { icon: PricingGlyphName; title: string; text: string }[] = [
  { icon: "phone", title: "Powerful Mobile Apps", text: "Owner | Trainer | Member" },
  { icon: "cloud", title: "Cloud Based & Secure", text: "Access from anywhere" },
  { icon: "nodes", title: "Easy Setup", text: "Get started in minutes" },
  { icon: "headset", title: "Dedicated Support", text: "We're here to help" },
];

function cardHref(plan: PricingPlan, isAuthenticated: boolean): string {
  if (plan.isCustom) return plan.ctaHref ?? "/#contact";
  if (!isAuthenticated) return "/login?mode=signup";
  if (plan.ctaHref) return plan.ctaHref;
  return `/checkout?plan=${plan.id}`;
}

export function PricingSection() {
  const { isAuthenticated, billing, loading } = useAuth();
  const showLiveStatus = isAuthenticated && Boolean(billing) && !loading;
  const cards = pricingPlans.filter((plan) => !plan.isFreeTrial);

  return (
    <section id="pricing" className="section-pad relative overflow-hidden border-y border-white/5 bg-[#050506]">
      <div
        className="pointer-events-none absolute -right-16 top-0 h-[460px] w-[680px] bg-[radial-gradient(ellipse_at_center,rgba(160,8,24,0.55),transparent_68%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Pricing</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Simple Plans. <span className="text-brand">Complete</span> Gym Management.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-text-secondary sm:text-base">
            Get all features in every plan. Just choose the right size for your gym.
          </p>
          {showLiveStatus && billing ? (
            <p className="mt-3 text-sm font-medium text-text-secondary">
              Your gym <span className="text-white">{billing.gymName}</span> —{" "}
              <span className="text-brand">{billing.access.message}</span>
            </p>
          ) : null}
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {trustItems.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5 text-sm text-white/90">
              <span className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-brand">
                <PricingGlyph name={item.icon} className="size-[18px]" />
              </span>
              {item.label}
            </li>
          ))}
        </ul>

        <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {cards.map((plan) => (
            <PricingCard key={plan.id} plan={plan} href={cardHref(plan, isAuthenticated)} />
          ))}
        </div>

        <div className="mt-8 grid overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c10] sm:grid-cols-2 xl:grid-cols-4 xl:divide-x xl:divide-white/10">
          {highlights.map((item) => (
            <div key={item.title} className="flex items-center gap-3 px-5 py-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/80">
                <PricingGlyph name={item.icon} className="size-[18px]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
