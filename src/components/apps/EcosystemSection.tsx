import Image from "next/image";
import { ecosystemApps } from "@/config/apps";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";

const roleIcons = {
  owner: "reports" as const,
  trainer: "trainers" as const,
  member: "members" as const,
};

export function EcosystemSection() {
  return (
    <section id="apps" className="section-pad">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative order-2 lg:order-1">
            <div
              className="pointer-events-none absolute -inset-8 rounded-full bg-brand/15 blur-3xl"
              aria-hidden
            />
            <Image
              src="/images/apps/one_platform_mob.png"
              alt="FITZENIX Owner, Member, and Trainer mobile apps"
              width={1400}
              height={1000}
              quality={90}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="relative h-auto w-full drop-shadow-[0_24px_50px_rgba(0,0,0,0.45)]"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
              Built for Everyone
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              One Platform.
              <br />
              Three Powerful Apps.
            </h2>

            <ul className="mt-8 space-y-5">
              {ecosystemApps.map((app) => (
                <li key={app.id} className="flex items-start gap-4">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                    <Icon name={roleIcons[app.id]} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{app.name}</h3>
                    <p className="mt-1 text-sm text-text-secondary">{app.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.appDownloadUrl}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-black px-4 text-left text-white transition-colors hover:border-white/30"
                aria-label="Get it on Google Play"
              >
                <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="currentColor">
                  <path d="M3.6 2.3c-.3.2-.6.6-.6 1.1v17.2c0 .5.3.9.6 1.1l9.7-9.7L3.6 2.3zm12.2 7.1-2.2-2.2 2.5-2.5 3.5 2-3.8 2.7zm-3.5 3.5 2.2-2.2 3.8 2.7-3.5 2-2.5-2.5zm-1.3-1.3L3.8 20.8c.2 0 .3.1.5.1.2 0 .4-.1.6-.2l9.2-5.3-2.1-2.1zM13.8 3.6 4.9 8.9l7.3 7.3 2.1-2.1-3.8-2.7 3.3-3.3z" />
                </svg>
                <span className="leading-tight">
                  <span className="block text-[10px] uppercase tracking-wide text-white/70">
                    Get it on
                  </span>
                  <span className="block text-sm font-semibold">Google Play</span>
                </span>
              </a>
              <a
                href={siteConfig.appDownloadUrl}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-black px-4 text-left text-white transition-colors hover:border-white/30"
                aria-label="Download on the App Store"
              >
                <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="currentColor">
                  <path d="M16.4 12.8c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.1-2.3 1.1-2.4-.1 0-2.2-.8-2.2-3.7zM14.3 6.5c.6-.7 1-1.7.9-2.7-0.9.1-1.9.6-2.5 1.3-.6.6-1.1 1.6-1 2.6 1 .1 1.9-.5 2.6-1.2z" />
                </svg>
                <span className="leading-tight">
                  <span className="block text-[10px] uppercase tracking-wide text-white/70">
                    Download on the
                  </span>
                  <span className="block text-sm font-semibold">App Store</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
