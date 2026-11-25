"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

interface PricingLinkProps {
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
}

export function PricingLink({ children, className, onNavigate }: PricingLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    if (window.location.pathname !== "/") return;

    event.preventDefault();
    window.history.pushState(null, "", "/#pricing");
    requestAnimationFrame(() => {
      document.getElementById("pricing")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <Link href="/#pricing" className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}