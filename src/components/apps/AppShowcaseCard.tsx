interface AppShowcaseCardProps {
  name: string;
  description: string;
}

export function AppShowcaseCard({ name, description }: AppShowcaseCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-6 text-center">
      <h3 className="font-display text-lg font-bold tracking-wide text-white">{name}</h3>
      <p className="mt-2 text-sm text-text-secondary">{description}</p>
    </article>
  );
}
