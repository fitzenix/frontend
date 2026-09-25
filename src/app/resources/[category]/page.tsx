import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceCategoryView } from "@/components/resources/ResourceViews";
import { getResourceCategory, resourceCategories } from "@/config/resources";
import { absoluteUrl, ogImagePath } from "@/config/seo";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return resourceCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getResourceCategory(slug);
  if (!category) return {};

  const title = `${category.title} | FITZENIX`;
  return {
    title: { absolute: title },
    description: category.description,
    alternates: { canonical: absoluteUrl(`/resources/${category.slug}`) },
    openGraph: {
      title,
      description: category.description,
      url: absoluteUrl(`/resources/${category.slug}`),
      images: [{ url: ogImagePath, width: 1200, height: 630 }],
    },
  };
}

export default async function ResourceCategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getResourceCategory(slug);
  if (!category) notFound();

  return <ResourceCategoryView category={category} />;
}