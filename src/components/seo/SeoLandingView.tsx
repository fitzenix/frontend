import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbJsonLd, buildSoftwareApplicationJsonLd } from "@/config/seo";
import { getStartingPrice } from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";

export interface SeoLandingData {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  features: readonly { title: string; body: string }[];
  audience: string;
  relatedPath: string;
  relatedLabel: string;
}

export function SeoLandingView({ data }: { data: SeoLandingData }) {
  const startingPrice = getStartingPrice();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}${data.path}#webpage`,
        url: `${siteConfig.url}${data.path}`,
        name: data.title,
        description: data.description,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
      },
      buildSoftwareApplicationJsonLd(),
      buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: data.eyebrow, path: data.path },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="section-pad border-b border-border bg-[#0a0a0a]">
        <Container className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">{data.eyebrow}</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {data.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {data.description} Start with a 14-day free trial, then plans from {formatCurrency(startingPrice)}/month.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#pricing">
              <Button size="lg">
                View pricing
                <Icon name="arrow" className="size-4" />
              </Button>
            </Link>
            <Link href={siteConfig.loginUrl}>
              <Button size="lg" variant="outline">Start free trial</Button>
            </Link>
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Everything you need to run a {data.eyebrow.toLowerCase()}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {data.features.map((feature) => (
              <article key={feature.title} className="border-l-2 border-brand/60 pl-4">
                <h3 className="font-display text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{feature.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad border-y border-border bg-[#0a0a0a]">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Built for {data.audience}</h2>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            FITZENIX brings members, attendance, plans, payments, trainers and reports into one gym management platform for Indian fitness businesses.
          </p>
          <p className="mt-6 text-sm text-text-secondary">
            Explore <Link href={data.relatedPath} className="text-brand-light hover:underline">{data.relatedLabel}</Link> or read the <Link href="/#faq" className="text-brand-light hover:underline">FITZENIX FAQ</Link>.
          </p>
        </Container>
      </section>
    </>
  );
}
