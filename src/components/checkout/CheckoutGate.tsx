"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { PlanId } from "@/types/pricing";
import { useAuth } from "@/context/AuthProvider";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { LoadingSpinner } from "@/components/common/Loading";

interface CheckoutGateProps {
  planId: PlanId;
}

export function CheckoutGate({ planId }: CheckoutGateProps) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      const next = encodeURIComponent(`/checkout?plan=${planId}`);
      router.replace(`/login?mode=signup&next=${next}`);
    }
  }, [loading, isAuthenticated, planId, router]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner label="Checking login" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <p className="text-center text-sm text-text-secondary">
        Redirecting to login / sign up before checkout…
      </p>
    );
  }

  return <CheckoutForm planId={planId} />;
}
