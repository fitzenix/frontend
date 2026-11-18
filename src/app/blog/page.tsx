import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd, ogImagePath } from "@/config/seo";

const title = "Gym Management Resources | FITZENIX Blog";
const description =
  "Practical gym management resources from FITZENIX for members, attendance, memberships, payments, and daily gym operations.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title, description, url: "/blog", images: [{ url: ogImagePath, width: 1200, height: 630 }] },
};

const plannedTopics = [
  "What is gym management software?",
  "How to manage gym members digitally",
  "Gym attendance management guide",
  "Gym billing software for Indian gyms",
  "Gym management software vs Excel",
] as const;

export default function BlogPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <section className="section-pad border-b border-border bg-[#0a0a0a]">
        <Container className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">FITZENIX resources</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Practical guidance for running a modern gym
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            We are preparing useful guides for gym owners and teams covering member management, attendance, memberships, payments, and everyday operations.
          </p>
          <p className="mt-5 text-sm text-text-secondary">
            Browse the current <Link href="/resources" className="text-brand-light hover:underline">FITZENIX resource hub</Link> for practical topic guides.
          </p>
        </Container>
      </section>
      <section className="section-pad">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Upcoming topics</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {plannedTopics.map((topic) => (
              <li key={topic} className="border border-border bg-[#111111] p-5 text-sm text-text-secondary">
                {topic}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}