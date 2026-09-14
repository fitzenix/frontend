import Link from "next/link";
import { Container } from "@/components/common/Container";
import { legalLastUpdated } from "@/config/legal";
import type { LegalSection } from "@/config/legal";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LegalPageProps {
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
  active: "privacy" | "terms";
}

const tabs = [
  { id: "privacy" as const, label: "Privacy Policy", href: "/privacy" },
  { id: "terms" as const, label: "Terms & Conditions", href: "/terms" },
];

export function LegalPage({ title, description, intro, sections, active }: LegalPageProps) {
  return (
    <Container className="section-pad max-w-5xl">
      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-semibold transition-colors",
              active === tab.id
                ? "bg-brand text-white"
                : "border border-border bg-[#111111] text-text-secondary hover:text-white",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Legal</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-text-muted">Last updated: {legalLastUpdated}</p>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">{description}</p>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">{intro}</p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav
          aria-label="On this page"
          className="hidden lg:block lg:sticky lg:top-24 lg:self-start"
        >
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
            On this page
          </p>
          <ul className="mt-3 space-y-2 border-l border-border pl-3">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="block text-xs leading-snug text-text-secondary transition-colors hover:text-white"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="font-display text-xl font-bold text-white">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="mt-3 text-sm leading-relaxed text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-text-secondary">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <div className="rounded-2xl border border-border bg-[#111111] p-5">
            <p className="text-sm font-semibold text-white">Payment safety reminder</p>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              FITZENIX checkout uses Razorpay. We never ask for OTP, CVV, UPI PIN, or full card
              numbers by email or phone. Transactional receipts may arrive via Zoho ZeptoMail from
              our official domain. Business address: {siteConfig.address.line}.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <Link href={active === "privacy" ? "/terms" : "/privacy"} className="text-brand-light hover:underline">
                {active === "privacy" ? "Read Terms & Conditions" : "Read Privacy Policy"}
              </Link>
              <Link href="/#pricing" className="text-brand-light hover:underline">
                Back to pricing
              </Link>
              <Link href="/" className="text-brand-light hover:underline">
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
