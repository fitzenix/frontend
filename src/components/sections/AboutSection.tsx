import { Container } from "@/components/common/Container";

export function AboutSection() {
  return (
    <section id="about" className="section-pad border-y border-border bg-surface/20">
      <Container className="max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">About Fitzenix</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Mobile-first gym management for fitness businesses
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          Fitzenix is a fitness technology product focused on mobile-first gym management SaaS. It
          helps gym owners, trainers, and members manage memberships, attendance, payments, and
          everyday gym operations from one platform.
        </p>
      </Container>
    </section>
  );
}
