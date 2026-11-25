"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { PaidPlanId } from "@/types/pricing";
import { useAuth } from "@/context/AuthProvider";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { LoadingSpinner } from "@/components/common/Loading";

interface CheckoutGateProps {
  planId: PaidPlanId;
}

export function CheckoutGate({ planId }: CheckoutGateProps) {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  const canCheckout =
    user?.role === "gym_owner" || user?.role === "super_admin";

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      const next = encodeURIComponent(`/checkout?plan=${planId}`);
      router.replace(`/login?mode=signup&next=${next}`);
    } else if (user && !user.emailVerified) {
      const next = encodeURIComponent(`/checkout?plan=${planId}`);
      router.replace(`/verify-email?email=${encodeURIComponent(user.email)}&next=${next}`);
    } else if (user && !canCheckout) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, planId, router, user, canCheckout]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner label="Checking login" />
      </div>
    );
  }

  if (!isAuthenticated || (user && !user.emailVerified) || (user && !canCheckout)) {
    return (
      <p className="text-center text-sm text-text-secondary">
        Redirecting…
      </p>
    );
  }

  return <CheckoutForm planId={planId} />;
}
