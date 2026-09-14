import type { Feature } from "@/types/feature";
import { Icon } from "@/components/common/Icon";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <article className="rounded-xl border border-border bg-[#121212] p-5 transition-colors hover:border-brand/40">
      <div className="mb-4 text-brand">
        <Icon name={feature.icon} className="size-6" />
      </div>
      <h3 className="text-[15px] font-semibold leading-snug text-white">{feature.title}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">{feature.description}</p>
    </article>
  );
}
