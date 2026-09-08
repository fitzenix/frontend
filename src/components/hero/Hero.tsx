import Link from "next/link";
import { getStartingPrice } from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { HeroApps } from "@/components/hero/HeroApps";

const trustPoints = [
  "Web + Mobile Access",
  "Secure Payments",
  "No Setup Fee",
] as const;

export function Hero() {
  const startingPrice = getStartingPrice();

  return (
    <section id="home" className="relative overflow-x-clip bg-background">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(217,4,41,0.14),transparent_50%)]"
        aria-hidden
      />

      <Container className="relative grid items-center gap-12 pb-16 pt-10 lg:grid-cols-[1fr_1.05fr] lg:gap-8 lg:pb-24 lg:pt-14">
        <div className="animate-fade-up max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Built for gym owners
          </p>

          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.35rem]">
            Run Your Gym.
            <br />
            <span className="text-brand">Everything in One Place.</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-text-secondary sm:text-[17px]">
            Members, attendance, memberships, payments, staff and reports — manage your gym from one
            simple platform.
          </p>

          <p className="mt-6 font-display text-2xl font-bold text-white sm:text-3xl">
            Plans from {formatCurrency(startingPrice)}
            <span className="text-lg font-medium text-text-muted">/month</span>
          </p>
          <p className="mt-2 text-sm text-text-muted">
            No setup fee • Web + Mobile Apps • Start anytime
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#pricing">
              <Button size="lg" className="w-full sm:w-auto">
                Choose Your Plan
                <Icon name="arrow" className="size-4" />
              </Button>
            </Link>
            <Link href="/#product">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </div>

          <ul className="mt-7 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5">
            {trustPoints.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                <span className="text-success">
                  <Icon name="check" className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <HeroApps />
      </Container>
    </section>
  );
}
