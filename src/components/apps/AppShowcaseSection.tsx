import Image from "next/image";
import Link from "next/link";
import type { AppShowcase } from "@/types/app";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { cn } from "@/lib/utils";

interface AppShowcaseSectionProps {
  app: AppShowcase;
  reverse?: boolean;
  id?: string;
}

export function AppShowcaseSection({ app, reverse = false, id }: AppShowcaseSectionProps) {
  return (
    <section id={id} className="section-pad">
      <Container>
        <div
          className={cn(
            "grid items-center gap-10 lg:grid-cols-2 lg:gap-14",
            reverse && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div className="relative mx-auto w-full max-w-md">
            <div
              className="pointer-events-none absolute -inset-6 rounded-full bg-brand/10 blur-3xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-3">
              <Image
                src={app.image}
                alt={app.imageAlt}
                width={900}
                height={1100}
                quality={85}
                sizes="(max-width: 1024px) 90vw, 420px"
                className="h-auto w-full rounded-xl object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-light">
              {app.name}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {app.tagline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">{app.description}</p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {app.capabilities.map((item) => (
                <li key={item.id} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="mt-0.5 text-brand">
                    <Icon name="check" className="size-4" />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href={app.ctaHref}>
                <Button>{app.ctaText}</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
