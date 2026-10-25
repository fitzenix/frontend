"use client";

import Link from "next/link";
import type { PricingPlan } from "@/types/pricing";
import { formatCurrency } from "@/lib/formatCurrency";
import { Icon } from "@/components/common/Icon";
import { PricingGlyph } from "@/components/pricing/PricingGlyph";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthProvider";
import { getPlanStatus } from "@/lib/plan-status";

interface PricingCardProps {
  plan: PricingPlan;
  href: string;
}

export function PricingCard({ plan, href }: PricingCardProps) {
  const isCustom = plan.isCustom === true;
  const solid = plan.ctaStyle === "solid";

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-[22px] border bg-[#0c0d12] px-5 pb-5 pt-6",
        plan.popular
          ? "border-brand shadow-[0_0_0_1px_rgba(217,4,41,0.55),0_0_42px_rgba(217,4,41,0.32)]"
          : "border-white/10",
      )}
    >
      {plan.popular ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_18px_rgba(217,4,41,0.45)]">
          Most Popular
        </span>
      ) : null}

      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white">
          <PricingGlyph name={plan.icon ?? "user"} className="size-5" />
        </span>
        <div className="min-w-0 pt-0.5">
          <h3 className="font-display text-[1.35rem] font-bold leading-none text-white">{plan.name}</h3>
          <p className="mt-1.5 text-[13px] leading-snug text-text-secondary">{plan.description}</p>
        </div>
      </div>

      <div className="mt-6">
        {isCustom ? (
          <>
            <p className="font-display text-[1.7rem] font-bold leading-tight tracking-tight text-white">
              {plan.priceHeadline ?? "Custom Pricing"}
            </p>
            {plan.priceSubline ? (
              <p className="mt-1 text-sm text-text-secondary">{plan.priceSubline}</p>
            ) : null}
          </>
        ) : (
          <p className="font-display text-[2.65rem] font-bold leading-none tracking-tight text-white">
            {formatCurrency(plan.price, plan.currency)}
            <span className="ml-1 text-base font-medium text-text-muted">/{plan.period}</span>
          </p>
        )}
      </div>

      <span
        className={cn(
          "mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
          plan.limitStyle === "brand"
            ? "border-brand/90 bg-brand/10 text-white"
            : "border-white/15 text-white/85",
        )}
      >
        {plan.limitStyle === "infinity" ? (
          <PricingGlyph name="infinity" className="size-3.5" />
        ) : null}
        {plan.memberLimit}
      </span>

      <ul className="mt-5 flex-1 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-[13px] leading-snug text-white/85">
            <span className="mt-0.5 text-brand">
              <Icon name="check" className="size-3.5" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link
          href={href}
          className={cn(
            "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors",
            solid
              ? "bg-brand text-white shadow-[0_8px_22px_rgba(217,4,41,0.32)] hover:bg-brand-light"
              : "border border-white/15 bg-transparent text-white hover:border-white/40 hover:bg-white/[0.04]",
          )}
        >
          {isCustom ? <PricingGlyph name="headset" className="size-4" /> : null}
          {plan.ctaText}
          <Icon name="arrow" className="size-4" />
        </Link>
        {plan.footnote ? (
          <p className="mt-3 text-center text-xs text-text-muted">{plan.footnote}</p>
        ) : null}
      </div>
    </article>
  );
}
