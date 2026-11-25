import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceArticleView } from "@/components/resources/ResourceViews";
import { getResourceArticle, resourceArticles } from "@/config/resources";
import { absoluteUrl, ogImagePath } from "@/config/seo";

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return resourceArticles.map((article) => ({ category: article.category, slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getResourceArticle(category, slug);
  if (!article) return {};

  const path = `/resources/${article.category}/${article.slug}`;
  return {
    title: { absolute: `${article.title} | FITZENIX` },
    description: article.description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: absoluteUrl(path),
      siteName: "FITZENIX",
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt,
      authors: ["FITZENIX"],
      images: [{ url: ogImagePath, width: 1200, height: 630 }],
    },
  };
}

export default async function ResourceArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;
  const article = getResourceArticle(category, slug);
  if (!article) notFound();

  return <ResourceArticleView article={article} />;
}