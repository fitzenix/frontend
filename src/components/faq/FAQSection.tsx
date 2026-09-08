import { faqItems } from "@/config/faq";
import { Container } from "@/components/common/Container";
import { FAQItem } from "@/components/faq/FAQItem";

export function FAQSection() {
  return (
    <section id="faq" className="section-pad">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Practical answers for gym owners
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-[#111111] px-5 sm:px-6">
          {faqItems.map((item) => (
            <FAQItem key={item.id} question={item.question} answer={item.answer} />
          ))}
        </div>
      </Container>
    </section>
  );
}
