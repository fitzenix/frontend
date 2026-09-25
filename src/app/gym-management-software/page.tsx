import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import {
  buildBreadcrumbJsonLd,
  buildSoftwareApplicationJsonLd,
  ogImagePath,
} from "@/config/seo";
import { getStartingPrice } from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";

const title = "Gym Management Software for Gym Owners | FITZENIX";
const description =
  "Fitzenix is a mobile-first gym management SaaS platform for gym owners, trainers, and members. Manage members, memberships, attendance, trainers, subscriptions, payments, invoices, and reports from one platform.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "gym management software",
    "gym management SaaS",
    "gym management app",
    "gym membership software",
    "QR gym check-in",
    "gym billing software",
  ],
  alternates: { canonical: "/gym-management-software" },
  openGraph: {
    title,
    description,
    url: "/gym-management-software",
    images: [{ url: ogImagePath, width: 1200, height: 630 }],
  },
};

const pillars = [
  {
    title: "Member management",
    body: "Add members, track memberships, renewals and profiles without spreadsheets.",
  },
  {
    title: "QR attendance",
    body: "Members check in with QR. Owners see who is in the gym and attendance history.",
  },
  {
    title: "Payments & dues",
    body: "Track subscriptions, pending dues and revenue from one owner dashboard.",
  },
  {
    title: "Owner, trainer & member apps",
    body: "Run operations on web and mobile — staff and members stay on the same system.",
  },
] as const;

const whoFor = [
  "Small and mid-size gyms",
  "Fitness studios and boutique gyms",
  "Owners replacing notebooks and WhatsApp renewals",
  "Teams that need trainer + member apps",
] as const;

export default function GymManagementSoftwarePage() {
  const startingPrice = getStartingPrice();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildSoftwareApplicationJsonLd(),
      buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Gym Management Software", path: "/gym-management-software" },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="section-pad border-b border-border bg-[#0a0a0a]">
        <Container className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
            Gym management software
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Gym Management Software for Gym Owners
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            <strong className="font-semibold text-white">Fitzenix</strong> gives gym owners, trainers,
            and members one place for members, memberships, QR attendance, trainers, subscriptions,
            payments, invoices, and reports. Use the owner web dashboard and mobile apps to run daily
            gym operations — start free for 14 days, then from{" "}
            {formatCurrency(startingPrice)}/month.
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
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Manage the workflows behind your gym
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-text-secondary">
            Fitzenix connects the owner view with the attendance, membership, payment, and app
            experiences used by your team and members.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {pillars.map((item) => (
              <article key={item.title} className="border-l-2 border-brand/60 pl-4">
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad border-y border-border bg-[#0a0a0a]">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            A shared system for gym teams
          </h2>
          <ul className="mt-6 space-y-3">
            {whoFor.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                <span className="mt-0.5 text-success">
                  <Icon name="check" className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-text-secondary">
            Explore the dedicated workflows for{" "}
            <Link href="/gym-attendance-software" className="text-brand-light hover:underline">
              attendance management
            </Link>,{" "}
            <Link href="/gym-member-management-software" className="text-brand-light hover:underline">
              member management
            </Link>, and{" "}
            <Link href="/gym-billing-software" className="text-brand-light hover:underline">
              gym billing
            </Link>. Learn more on the{" "}
            <Link href="/" className="text-brand-light hover:underline">
              FITZENIX home page
            </Link>{" "}
            or jump to{" "}
            <Link href="/#faq" className="text-brand-light hover:underline">
              FAQ
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
