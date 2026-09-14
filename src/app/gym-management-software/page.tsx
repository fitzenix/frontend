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

const title = "Gym Management Software India | Member, Attendance & Payments";
const description =
  "Compare FITZENIX gym management software for India: QR attendance, membership billing, owner/trainer/member apps, and plans from ₹499/month after a 14-day free trial.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${siteConfig.name}` },
  description,
  keywords: [
    "gym management software India",
    "gym management app",
    "gym membership software",
    "fitness studio software",
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
            Gym management software built for Indian gym owners
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Searching for a <strong className="font-semibold text-white">gym management app</strong>{" "}
            that handles members, attendance, billing and staff?{" "}
            <strong className="font-semibold text-white">{siteConfig.name}</strong> is an all-in-one
            gym management platform with web + mobile — start free for 14 days, then from{" "}
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
            What a modern gym management system should do
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-text-secondary">
            FITZENIX covers the workflows gym owners search for every day — without stacking five
            tools.
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
            Who FITZENIX is for
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
            Learn more on the{" "}
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
