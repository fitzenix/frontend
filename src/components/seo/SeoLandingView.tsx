import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { siteConfig } from "@/config/site";
import { relatedSeoPages, type SeoLandingPage } from "@/config/seo";
import { getStartingPrice } from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";

interface SeoLandingViewProps {
  page: SeoLandingPage;
}

export function SeoLandingView({ page }: SeoLandingViewProps) {
  const startingPrice = getStartingPrice();
  const related = relatedSeoPages(page.slug);

  return (
    <>
      <section className="section-pad border-b border-border bg-[#0a0a0a]">
        <Container className="max-w-3xl">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white" aria-current="page">
                {page.breadcrumb}
              </li>
            </ol>
          </nav>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-brand">
            Gym management software · fitzenix.app
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">{page.intro}</p>
          <p className="mt-3 text-sm text-text-muted">
            Official product:{" "}
            <strong className="font-semibold text-white">www.fitzenix.app</strong> — gym management
            SaaS for owners. Not a clothing or lifestyle store.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#pricing">
              <Button size="lg">
                View pricing
                <Icon name="arrow" className="size-4" />
              </Button>
            </Link>
            <Link href={siteConfig.loginUrl}>
              <Button size="lg" variant="outline">
                Start free trial
              </Button>
            </Link>
          </div>
          <p className="mt-3 text-xs text-text-muted">
            14-day free trial · then from {formatCurrency(startingPrice)}/month
          </p>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            What this covers in FITZENIX
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {page.highlights.map((item) => (
              <article key={item.title} className="border-l-2 border-brand/60 pl-4">
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {page.sections.map((section) => (
        <section key={section.heading} className="section-pad border-t border-border">
          <Container className="max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-sm leading-relaxed text-text-secondary">
                {paragraph}
              </p>
            ))}
          </Container>
        </section>
      ))}

      <section className="section-pad border-y border-border bg-[#0a0a0a]">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Who this is for</h2>
          <ul className="mt-6 space-y-3">
            {page.audience.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                <span className="mt-0.5 text-success">
                  <Icon name="check" className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-pad" aria-labelledby="landing-faq">
        <Container className="max-w-3xl">
          <h2 id="landing-faq" className="font-display text-2xl font-bold text-white sm:text-3xl">
            {page.slug === "about-fitzenix"
              ? "Common questions"
              : `Questions about ${page.breadcrumb.toLowerCase()}`}
          </h2>
          <dl className="mt-8 divide-y divide-border border-y border-border">
            {page.faqs.map((item) => (
              <div key={item.question} className="py-5">
                <dt>
                  <h3 className="font-display text-base font-semibold text-white">{item.question}</h3>
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-secondary">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="section-pad border-t border-border bg-[#0a0a0a]">
        <Container>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            More FITZENIX guides
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/${item.slug}`}
                  className="block rounded-xl border border-border px-4 py-3 text-sm text-text-secondary transition-colors hover:border-brand/50 hover:text-white"
                >
                  <span className="font-semibold text-white">{item.breadcrumb}</span>
                  <span className="mt-1 block text-text-muted">{item.h1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
