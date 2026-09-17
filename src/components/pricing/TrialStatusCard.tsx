"use client";

import Link from "next/link";
import type { BillingStatus } from "@/types/billing";
import { expiresOnLabel, remainingDaysLabel } from "@/lib/billingDisplay";
import { getPaidPlanById } from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/common/Button";

interface TrialStatusCardProps {
  billing: BillingStatus;
}

export function TrialStatusCard({ billing }: TrialStatusCardProps) {
  const { access, gymName } = billing;
  const daysLeft = remainingDaysLabel(billing);
  const expiresOn = expiresOnLabel(billing);
  const paidPlan = access.plan ? getPaidPlanById(access.plan) : undefined;

  if (access.reason === "trial") {
    return (
      <article className="relative flex h-full flex-col rounded-2xl border border-success/40 bg-[#111111] p-6 shadow-[0_0_28px_rgba(34,197,94,0.08)]">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-success px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          Your current plan
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-white">Free Trial</h3>
          <p className="mt-1 text-sm text-text-secondary">{gymName}</p>
          <p className="mt-5 font-display text-4xl font-bold text-white">
            {access.daysRemaining ?? 0}
            <span className="ml-1 text-base font-medium text-text-muted">days left</span>
          </p>
          {expiresOn ? (
            <p className="mt-2 text-sm text-text-secondary">
              Trial expires on <span className="text-white">{expiresOn}</span>
            </p>
          ) : null}
        </div>
        <ul className="mt-6 flex-1 space-y-2.5 text-sm text-text-secondary">
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 text-success">
              <Icon name="check" className="size-4" />
            </span>
            {daysLeft ?? "Active free trial"}
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 text-success">
              <Icon name="check" className="size-4" />
            </span>
            Full platform access during trial
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 text-success">
              <Icon name="check" className="size-4" />
            </span>
            Upgrade anytime to Starter, Growth or Pro
          </li>
        </ul>
        <div className="mt-8">
          <Link href="/checkout?plan=growth">
            <Button fullWidth className="bg-success hover:bg-success/90">
              Upgrade now
            </Button>
          </Link>
        </div>
      </article>
    );
  }

  if (paidPlan && access.allowed) {
    return (
      <article className="relative flex h-full flex-col rounded-2xl border border-brand bg-[#111111] p-6 shadow-[0_0_36px_rgba(217,4,41,0.16)]">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          Active plan
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-white">{paidPlan.name}</h3>
          <p className="mt-1 text-sm text-text-secondary">{gymName}</p>
          <p className="mt-5 font-display text-4xl font-bold text-white">
            {formatCurrency(paidPlan.price)}
            <span className="ml-1 text-base font-medium text-text-muted">/month</span>
          </p>
          {expiresOn ? (
            <p className="mt-2 text-sm text-text-secondary">
              Renews / expires on <span className="text-white">{expiresOn}</span>
              {daysLeft ? ` · ${daysLeft}` : ""}
            </p>
          ) : null}
        </div>
        <ul className="mt-6 flex-1 space-y-2.5">
          {paidPlan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
              <span className="mt-0.5 text-success">
                <Icon name="check" className="size-4" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link href={`/checkout?plan=${paidPlan.id}`}>
            <Button fullWidth>Renew / change plan</Button>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-border bg-[#111111] p-6">
      <div>
        <h3 className="font-display text-xl font-bold text-white">Plan inactive</h3>
        <p className="mt-1 text-sm text-text-secondary">{access.message}</p>
      </div>
      <div className="mt-8">
        <Link href="/checkout?plan=growth">
          <Button fullWidth>Choose a plan</Button>
        </Link>
      </div>
    </article>
  );
}
