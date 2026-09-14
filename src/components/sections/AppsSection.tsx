import Image from "next/image";
import { ecosystemApps } from "@/config/apps";
import { Container } from "@/components/common/Container";

export function AppsSection() {
  return (
    <section id="apps" className="section-pad border-y border-border bg-[#0a0a0a]">
      <Container>
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Apps</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            One platform.
            <br />
            Three experiences.
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-background/40 p-3 sm:p-5">
          <Image
            src="/images/apps/one_platform_mob.png"
            alt="FITZENIX Owner, Trainer and Member mobile apps"
            width={1600}
            height={1000}
            quality={88}
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="h-auto w-full rounded-xl"
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ecosystemApps.map((app) => (
            <article
              key={app.id}
              className="rounded-xl border border-border bg-[#111111] p-6"
            >
              <h3 className="font-display text-lg font-bold text-white">{app.name}</h3>
              <p className="mt-2 text-sm text-text-secondary">{app.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
