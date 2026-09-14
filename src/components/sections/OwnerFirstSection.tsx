import Image from "next/image";
import Link from "next/link";
import { ownerApp } from "@/config/apps";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";

export function OwnerFirstSection() {
  return (
    <section id="owner" className="section-pad">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative order-2 lg:order-1">
            <div
              className="pointer-events-none absolute -inset-8 rounded-full bg-brand/15 blur-3xl"
              aria-hidden
            />
            <Image
              src={ownerApp.image}
              alt={ownerApp.imageAlt}
              width={1100}
              height={900}
              quality={88}
              sizes="(max-width: 1024px) 90vw, 520px"
              className="relative h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Owner first</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {ownerApp.tagline}
            </h2>
            <p className="mt-4 text-lg font-medium text-white">{ownerApp.description}</p>
            <p className="mt-3 text-base text-text-secondary">
              Check revenue, attendance, memberships and daily activity from your phone.
            </p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {ownerApp.capabilities.map((item) => (
                <li key={item.id} className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="text-brand">
                    <Icon name="check" className="size-4" />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href={ownerApp.ctaHref}>
                <Button>
                  {ownerApp.ctaText}
                  <Icon name="arrow" className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
