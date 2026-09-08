import { pricingPlans } from "@/config/pricing";
import { Container } from "@/components/common/Container";
import { PricingCard } from "@/components/pricing/PricingCard";

export function PricingSection() {
  return (
    <section id="pricing" className="section-pad border-y border-border bg-[#0a0a0a]">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simple pricing. Start small. Grow when you do.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </Container>
    </section>
  );
}
