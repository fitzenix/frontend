import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { siteConfig } from "@/config/site";
import type { SeoLandingPage } from "@/config/seo";
import { getStartingPrice } from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";

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
  "Small and mid-size gyms in India",
  "Fitness studios and boutique gyms",
  "Owners replacing notebooks and WhatsApp renewals",
  "Teams that need trainer + member apps",
] as const;

interface SeoLandingViewProps {
  page: SeoLandingPage;
}

export function SeoLandingView({ page }: SeoLandingViewProps) {
  const startingPrice = getStartingPrice();

  return (
    <>
      <section className="section-pad border-b border-border bg-[#0a0a0a]">
        <Container className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
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
            What FITZENIX gym management software includes
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-text-secondary">
            One platform for the workflows gym owners search for every day — members, attendance,
            billing and apps.
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
            Explore{" "}
            <Link href="/" className="text-brand-light hover:underline">
              FITZENIX home
            </Link>
            ,{" "}
            <Link href="/gym-management-software" className="text-brand-light hover:underline">
              gym management software
            </Link>
            , or{" "}
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
