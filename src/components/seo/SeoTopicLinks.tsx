import Link from "next/link";
import { Container } from "@/components/common/Container";
import { seoLandingPages } from "@/config/seo";

/** Crawlable hub so Google can discover every gym-software topic from the homepage. */
export function SeoTopicLinks() {
  return (
    <section className="section-pad border-t border-border" aria-labelledby="seo-topics">
      <Container>
        <h2
          id="seo-topics"
          className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          Gym software topics
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
          FITZENIX is gym management software for Indian gym owners. These pages explain members,
          attendance, billing, apps and CRM on fitzenix.app.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {seoLandingPages.map((page) => (
            <li key={page.slug}>
              <Link
                href={`/${page.slug}`}
                className="block h-full rounded-xl border border-border px-4 py-3 transition-colors hover:border-brand/50"
              >
                <span className="block text-sm font-semibold text-white">{page.breadcrumb}</span>
                <span className="mt-1 block text-xs leading-relaxed text-text-muted">{page.h1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
