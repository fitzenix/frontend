"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { LoadingSpinner } from "@/components/common/Loading";
import { MemberCheckInClient } from "@/components/member/MemberCheckInClient";
import { GymLockedPanel } from "@/components/member/GymLockedPanel";
import { DEFAULT_OWNER_PATH, MEMBER_CHECK_IN_PATH } from "@/lib/postLoginPath";

export function MemberCheckInGate() {
  const router = useRouter();
  const {
    user,
    billing,
    gymAccessLocked,
    isAuthenticated,
    loading,
    logout,
    refreshBilling,
  } = useAuth();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      const next = encodeURIComponent(MEMBER_CHECK_IN_PATH);
      router.replace(`/login?mode=login&next=${next}`);
      return;
    }
    if (user && user.role !== "member") {
      router.replace(DEFAULT_OWNER_PATH);
    }
  }, [loading, isAuthenticated, router, user]);

  const onRetry = useCallback(async () => {
    setChecking(true);
    try {
      await refreshBilling();
    } finally {
      setChecking(false);
    }
  }, [refreshBilling]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner label="Checking session" />
      </div>
    );
  }

  if (!isAuthenticated || !user || user.role !== "member") {
    return (
      <p className="text-center text-sm text-text-secondary">
        Redirecting…
      </p>
    );
  }

  // Gym SaaS / trial expired — same lock as mobile GymLockedScreen.
  if (gymAccessLocked) {
    const title =
      billing?.access.reason === "trial_expired" ? "Gym trial ended" : "Gym plan expired";
    return (
      <GymLockedPanel
        title={title}
        message={
          billing?.access.message ||
          "Your gym’s Fitzenix plan is currently expired. Please contact your gym to restore access."
        }
        onRetry={() => void onRetry()}
        onLogout={() => void logout()}
        retrying={checking}
      />
    );
  }

  return <MemberCheckInClient />;
}
