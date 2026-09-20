"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mainNavigation } from "@/config/navigation";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Logo } from "@/components/common/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { PricingLink } from "@/components/layout/PricingLink";
import { getPlanStatus } from "@/lib/plan-status";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, loading, logout } = useAuth();
  const planStatus = getPlanStatus(user);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 overflow-hidden border-b transition-colors duration-300",
          scrolled
            ? "border-border/80 bg-background/95 backdrop-blur-md"
            : "border-transparent bg-background/80 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[68px] sm:px-6 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {loading ? null : isAuthenticated ? (
              <>
                <div className="max-w-[190px] text-right">
                  <p className="truncate text-sm text-text-secondary">{user?.name}</p>
                  {planStatus.expired ? (
                    <p className="text-xs font-semibold text-danger">Plan expired</p>
                  ) : planStatus.name ? (
                    <p className="truncate text-xs text-text-muted">
                      {planStatus.name}
                      {planStatus.daysRemaining !== null
                        ? ` · ${planStatus.daysRemaining} ${planStatus.daysRemaining === 1 ? "day" : "days"} left`
                        : null}
                  </p>
                  ) : (
                    <p className="text-xs text-text-muted">No active plan</p>
                  )}
                </div>
                <PricingLink>
                  <Button size="sm" variant="outline">
                    {planStatus.expired ? "Purchase a Plan" : "Choose a Plan"}
                  </Button>
                </PricingLink>
                <Button size="sm" variant="ghost" onClick={() => void logout()}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button size="sm">Login / Sign up</Button>
              </Link>
            )}
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-white lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
