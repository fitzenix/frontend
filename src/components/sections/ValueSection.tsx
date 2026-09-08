import { valueBlocks } from "@/config/features";
import { Container } from "@/components/common/Container";

export function ValueSection() {
  return (
    <section id="product" className="border-y border-border bg-[#0a0a0a] py-14 sm:py-16">
      <Container>
        <h2 className="max-w-xl font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          One platform. One login. Your entire gym.
        </h2>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {valueBlocks.map((block) => (
            <article
              key={block.id}
              className="rounded-xl border border-border bg-[#111111] p-5"
            >
              <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-brand">
                {block.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {block.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
