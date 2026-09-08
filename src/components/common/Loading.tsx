import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  label?: string;
}

export function LoadingSpinner({ className, label = "Loading" }: LoadingSpinnerProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 text-text-secondary", className)} role="status">
      <span
        className="size-4 animate-spin rounded-full border-2 border-white/20 border-t-brand"
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-surface-elevated", className)}
      aria-hidden
    />
  );
}
