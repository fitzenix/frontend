import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";

export function FinalCTA() {
  return (
    <section className="pb-16 pt-4 sm:pb-20">
      <Container>
        <div className="rounded-2xl border border-brand/25 bg-gradient-to-r from-[#1a0508] via-[#16060a] to-[#0c0406] px-6 py-10 sm:px-10 sm:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Ready to spend less time managing your gym?
              </h2>
              <p className="mt-3 text-sm text-text-secondary sm:text-base">
                Start with FITZENIX and manage your gym from one place.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link href="/#pricing">
                <Button size="lg" className="w-full sm:w-auto">
                  Choose Your Plan
                  <Icon name="arrow" className="size-4" />
                </Button>
              </Link>
              <a href={`mailto:${siteConfig.contactEmail}`}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Talk to Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
