import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd, ogImagePath } from "@/config/seo";
import { siteConfig } from "@/config/site";

const title = "Contact Fitzenix | Gym Management Software";
const description =
  "Contact Fitzenix for gym management software questions, support, billing, and partnership enquiries.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact", images: [{ url: ogImagePath, width: 1200, height: 630 }] },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <section className="section-pad border-b border-border bg-[#0a0a0a]">
        <Container className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Contact Fitzenix</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Let&apos;s talk about your gym
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Have a question about plans, setup, billing, or the Fitzenix apps? Our team can help.
          </p>
        </Container>
      </section>
      <section className="section-pad">
        <Container className="grid max-w-4xl gap-5 sm:grid-cols-2">
          <a href={`mailto:${siteConfig.contactEmail}`} className="border border-border bg-[#111111] p-6 transition-colors hover:border-brand/60">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">General enquiries</p>
            <h2 className="mt-3 font-display text-xl font-bold text-white">{siteConfig.contactEmail}</h2>
            <p className="mt-2 text-sm text-text-secondary">Plans, demos, partnerships, and product questions.</p>
          </a>
          <a href={`mailto:${siteConfig.supportEmail}`} className="border border-border bg-[#111111] p-6 transition-colors hover:border-brand/60">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Customer support</p>
            <h2 className="mt-3 font-display text-xl font-bold text-white">{siteConfig.supportEmail}</h2>
            <p className="mt-2 text-sm text-text-secondary">Account, payment, and technical support.</p>
          </a>
          <div className="border border-border bg-[#111111] p-6 sm:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Business address</p>
            <p className="mt-3 text-base text-white">{siteConfig.address.line}</p>
          </div>
        </Container>
      </section>
    </>
  );
}