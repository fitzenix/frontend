import { pricingPlans } from "@/config/pricing";
import { Container } from "@/components/common/Container";
import { PricingCard } from "@/components/pricing/PricingCard";
import { Icon } from "@/components/common/Icon";

const trustBadges = ["No Setup Fee", "Cancel Anytime", "14-Day Free Trial"] as const;

export function PricingSection() {
  return (
    <section id="pricing" className="section-pad border-y border-border bg-[#0a0a0a]">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simple pricing. Start small. Grow when you do.
          </h2>
          <p className="mt-3 text-sm font-medium text-text-secondary">
            Start with a{" "}
            <span className="text-success">14-day free trial</span> — no card required — then
            pick Starter, Growth, or Pro.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {pricingPlans.map((plan) => (
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
