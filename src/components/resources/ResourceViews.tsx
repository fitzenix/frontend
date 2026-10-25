import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  absoluteUrl,
} from "@/config/seo";
import {
  type ResourceArticle,
  type ResourceCategory,
  getCategoryArticles,
  getResourceCategory,
} from "@/config/resources";

function ResourceLinkList({ links }: { links: readonly { label: string; href: string; description: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="group border border-border bg-[#111111] p-5 transition-colors hover:border-brand/60"
        >
          <h3 className="font-display text-lg font-semibold text-white">{link.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{link.description}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-light">
            Explore <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function ResourceHubView({ categories }: { categories: readonly ResourceCategory[] }) {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }])} />
      <section className="section-pad border-b border-border bg-[#0a0a0a]">
        <Container className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">FITZENIX resources</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Practical resources for running a modern gym
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Clear guidance for gym owners and teams managing members, attendance, memberships, trainers, payments, and fitness business operations.
          </p>
        </Container>
      </section>
      <section className="section-pad">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.slug} href={`/resources/${category.slug}`} className="group border border-border bg-[#111111] p-6 transition-colors hover:border-brand/60">
                <h2 className="font-display text-xl font-bold text-white">{category.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{category.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-light">
                  Browse topic <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export function ResourceCategoryView({ category }: { category: ResourceCategory }) {
  const articles = getCategoryArticles(category.slug);
  const relatedCategories = category.relatedCategories
    .map((slug) => getResourceCategory(slug))
    .filter((item): item is ResourceCategory => Boolean(item));

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: category.title, path: `/resources/${category.slug}` },
        ])}
      />
      <section className="section-pad border-b border-border bg-[#0a0a0a]">
        <Container className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">FITZENIX resources</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">{category.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">{category.intro}</p>
        </Container>
      </section>
      <section className="section-pad">
        <Container>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Useful starting points</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {category.guidance.map((item) => (
              <article key={item} className="border-l-2 border-brand/60 pl-4">
                <p className="text-sm leading-relaxed text-text-secondary">{item}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section-pad border-y border-border bg-[#0a0a0a]">
        <Container>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Explore this topic</h2>
          <div className="mt-8">
            <ResourceLinkList links={category.resources} />
          </div>
          {articles.length > 0 ? (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Guides from FITZENIX</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {articles.map((article) => (
                  <Link key={article.slug} href={`/resources/${category.slug}/${article.slug}`} className="border border-border bg-background/50 p-5 transition-colors hover:border-brand/60">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">{article.readTime}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-white">{article.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{article.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </section>
      <section className="section-pad">
        <Container>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Related resources</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {relatedCategories.map((related) => (
              <Link key={related.slug} href={`/resources/${related.slug}`} className="border border-border p-5 transition-colors hover:border-brand/60">
                <h3 className="font-display text-lg font-semibold text-white">{related.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{related.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export function ResourceArticleView({ article }: { article: ResourceArticle }) {
  const category = getResourceCategory(article.category);
  const path = `/resources/${article.category}/${article.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            buildArticleJsonLd({
              title: article.title,
              description: article.description,
              path,
              publishedAt: article.publishedAt,
              modifiedAt: article.modifiedAt,
            }),
            buildBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Resources", path: "/resources" },
              { name: category?.title ?? "Resources", path: `/resources/${article.category}` },
              { name: article.title, path },
            ]),
          ],
        }}
      />
      <article>
        <header className="section-pad border-b border-border bg-[#0a0a0a]">
          <Container className="max-w-3xl">
            <Link href={`/resources/${article.category}`} className="text-xs font-bold uppercase tracking-[0.14em] text-brand hover:text-brand-light">
              {category?.title ?? "FITZENIX resources"}
            </Link>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">{article.title}</h1>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">{article.description}</p>
            <p className="mt-5 text-xs text-text-muted">
              Published {article.publishedAt} · Updated {article.modifiedAt} · {article.readTime} · By FITZENIX
            </p>
          </Container>
        </header>
        <section className="section-pad">
          <Container className="max-w-3xl">
            <div className="space-y-10">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{section.heading}</h2>
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-text-secondary">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-text-secondary">
                      {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </Container>
        </section>
        <section className="section-pad border-y border-border bg-[#0a0a0a]">
          <Container className="max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Continue exploring</h2>
            <div className="mt-8">
              <ResourceLinkList links={article.relatedLinks} />
            </div>
            <p className="mt-8 text-sm text-text-secondary">
              FITZENIX is gym management software for owners, trainers, and members. Learn more at <Link href={absoluteUrl("/gym-management-software")} className="text-brand-light hover:underline">FITZENIX gym management software</Link> or review <Link href="/pricing" className="text-brand-light hover:underline">pricing and the 14-day trial</Link>.
            </p>
          </Container>
        </section>
      </article>
    </>
  );
}