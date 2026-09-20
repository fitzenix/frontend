"use client";

import Link from "next/link";
import { useEffect } from "react";
import { mainNavigation } from "@/config/navigation";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";
import { getPlanStatus } from "@/lib/plan-status";
import { PricingLink } from "@/components/layout/PricingLink";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { isAuthenticated, loading, logout, user } = useAuth();
  const planStatus = getPlanStatus(user);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        className={cn(
          "absolute inset-0 bg-black/70 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        aria-label="Close menu overlay"
        onClick={onClose}
      />

      <div
        className={cn(
          "absolute inset-x-0 top-16 border-b border-border bg-background px-4 py-6 transition-all duration-300 sm:top-[68px] sm:px-6",
          open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile primary">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-xl px-3 py-3 text-base font-medium text-text-secondary transition-colors hover:bg-surface hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-col gap-3">
          {loading ? null : isAuthenticated ? (
            <>
              <div className="px-1 text-sm text-text-secondary">
                <p>Signed in as {user?.name}</p>
                {planStatus.expired ? (
                  <p className="mt-1 font-semibold text-danger">Your plan has expired</p>
                ) : planStatus.name ? (
                  <p className="mt-1 text-xs text-text-muted">
                    {planStatus.name}
                    {planStatus.daysRemaining !== null
                      ? ` · ${planStatus.daysRemaining} ${planStatus.daysRemaining === 1 ? "day" : "days"} left`
                      : null}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-text-muted">No active plan</p>
                )}
              </div>
              <PricingLink onNavigate={onClose}>
                <Button fullWidth>{planStatus.expired ? "Purchase a Plan" : "Choose a Plan"}</Button>
              </PricingLink>
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  void logout();
                  onClose();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login" onClick={onClose}>
              <Button fullWidth>Login / Sign up</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
