import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: "brand" | "neutral" | "success";
}

export function Badge({ children, className, tone = "brand" }: BadgeProps) {
  const tones = {
    brand: "border-brand/30 bg-brand/10 text-brand-light",
    neutral: "border-border bg-surface text-text-secondary",
    success: "border-success/30 bg-success/10 text-success",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.08em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
