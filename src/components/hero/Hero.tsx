import Link from "next/link";
import { getStartingPrice } from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { HeroApps } from "@/components/hero/HeroApps";

const trustPoints = [
  "No Card Required",
  "Cancel Anytime",
  "Setup in 5 Minutes",
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
            Gym management software for Indian gym owners
          </p>

          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.35rem]">
            Gym Management Software
            <br />
            <span className="text-brand">That Runs Your Entire Gym</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-text-secondary sm:text-[17px]">
            Members skip renewals, attendance is a notebook, and staff juggle three apps. FITZENIX on{" "}
            <span className="text-white">fitzenix.app</span> puts members, QR check-in, payments,
            trainers and reports in one gym management platform — so you run the gym, not chase it.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/#pricing">
              <Button size="lg" className="w-full sm:w-auto">
                Try Fitzenix Free
                <Icon name="arrow" className="size-4" />
              </Button>
            </Link>
            <Link href="/gym-management-software">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Why Fitzenix
              </Button>
            </Link>
          </div>

          <p className="mt-3 text-xs text-text-muted">
            14-day free trial · then plans from {formatCurrency(startingPrice)}/month
          </p>

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
