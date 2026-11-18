import type { ReactNode } from "react";

/** Slimmer chrome for authenticated member tools (marketing footer still from root). */
export default function MemberLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-[70vh] bg-background">{children}</div>;
}
