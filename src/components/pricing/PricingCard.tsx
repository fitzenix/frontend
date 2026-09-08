import Link from "next/link";
import type { PricingPlan } from "@/types/pricing";
import { formatCurrency } from "@/lib/formatCurrency";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-[#111111] p-6",
        plan.popular ? "border-brand shadow-[0_0_36px_rgba(217,4,41,0.16)]" : "border-border",
      )}
    >
      {plan.popular ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          Most Popular
        </span>
      ) : null}

      <div>
        <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
        <p className="mt-1 text-sm text-text-secondary">{plan.description}</p>
        <p className="mt-5 font-display text-4xl font-bold text-white">
          {formatCurrency(plan.price, plan.currency)}
          <span className="ml-1 text-base font-medium text-text-muted">/month</span>
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
            <span className="mt-0.5 text-success">
              <Icon name="check" className="size-4" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link href={`/checkout?plan=${plan.id}`}>
          <Button
            fullWidth
            variant={plan.popular ? "primary" : "outline"}
            className={cn(
              !plan.popular && "border-brand/50 text-brand-light hover:border-brand hover:text-white",
            )}
          >
            {plan.ctaText}
          </Button>
        </Link>
      </div>
    </article>
  );
}
