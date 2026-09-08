import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Choose your plan",
    description: "Pick Basic, Pro, or Premium based on your gym size and needs.",
  },
  {
    number: "02",
    title: "Set up your gym",
    description: "Add members, plans, trainers, and get QR attendance ready.",
  },
  {
    number: "03",
    title: "Start managing your gym",
    description: "Track check-ins, payments, and daily operations from one platform.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="section-pad">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Up and running in three steps"
          description="A simple path from plan selection to day-to-day gym management."
        />

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <span className="font-display text-3xl font-bold text-brand">{step.number}</span>
              <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
