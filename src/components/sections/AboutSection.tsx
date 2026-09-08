import { Container } from "@/components/common/Container";

export function AboutSection() {
  return (
    <section id="about" className="section-pad border-y border-border bg-surface/20">
      <Container className="max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">About Us</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Built for gym businesses that want less complexity
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          FITZENIX is a gym-management platform for owners who need member CRM, attendance, billing,
          trainers, and member engagement in one place — on web and mobile.
        </p>
      </Container>
    </section>
  );
}
