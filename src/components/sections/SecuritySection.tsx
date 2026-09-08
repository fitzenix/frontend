import { trustItems } from "@/config/features";
import { Container } from "@/components/common/Container";

export function SecuritySection() {
  return (
    <section className="border-y border-border bg-[#0a0a0a] py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {trustItems.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-[#111111] px-4 py-2 text-xs font-medium text-text-secondary sm:text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
