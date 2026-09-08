import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleAs: TitleTag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-light">
          {eyebrow}
        </p>
      ) : null}
      <TitleTag className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </TitleTag>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
