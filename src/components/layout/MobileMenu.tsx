"use client";

import Link from "next/link";
import { useEffect } from "react";
import { mainNavigation } from "@/config/navigation";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { isAuthenticated, loading, logout, user } = useAuth();

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
              <p className="px-1 text-sm text-text-secondary">Signed in as {user?.name}</p>
              <Link href="/#pricing" onClick={onClose}>
                <Button fullWidth>Choose a Plan</Button>
              </Link>
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
