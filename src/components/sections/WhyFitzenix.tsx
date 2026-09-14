import { whyPoints } from "@/config/features";
import { Container } from "@/components/common/Container";

export function WhyFitzenix() {
  return (
    <section id="why" className="section-pad">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Why FITZENIX</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built around the way gym owners actually work.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {whyPoints.map((point) => (
            <article
              key={point.id}
              className="rounded-2xl border border-border bg-[#111111] p-6"
            >
              <h3 className="text-lg font-semibold text-white">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{point.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
