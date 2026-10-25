import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd, ogImagePath } from "@/config/seo";

const title = "Gym Management Solutions | Fitzenix";
const description =
  "Find the right Fitzenix gym management solution for operations, attendance, members, and billing.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/solutions" },
  openGraph: { title, description, url: "/solutions", images: [{ url: ogImagePath, width: 1200, height: 630 }] },
};

const solutions = [
  { title: "Gym management software", description: "Run your gym from one connected owner, trainer, and member platform.", href: "/gym-management-software" },
  { title: "Gym management app", description: "Keep daily gym operations available on web and mobile.", href: "/gym-management-app" },
  { title: "Gym attendance software", description: "Use QR check-in and attendance history to understand gym activity.", href: "/gym-attendance-software" },
  { title: "Gym member management software", description: "Organize member profiles, memberships, renewals, and progress.", href: "/gym-member-management-software" },
  { title: "Gym billing software", description: "Track subscriptions, payments, pending dues, invoices, and revenue.", href: "/gym-billing-software" },
] as const;

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions" }])} />
      <section className="section-pad border-b border-border bg-[#0a0a0a]">
        <Container className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Solutions</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            One system for every part of your gym
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Choose the Fitzenix workflow that matches the way your gym operates today, then connect the rest as you grow.
          </p>
        </Container>
      </section>
      <section className="section-pad">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {solutions.map((solution) => (
              <Link key={solution.href} href={solution.href} className="group border border-border bg-[#111111] p-6 transition-colors hover:border-brand/60">
                <h2 className="font-display text-xl font-bold text-white">{solution.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{solution.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-light">
                  Explore solution <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}