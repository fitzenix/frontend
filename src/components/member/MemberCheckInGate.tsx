"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { LoadingSpinner } from "@/components/common/Loading";
import { MemberCheckInClient } from "@/components/member/MemberCheckInClient";
import { DEFAULT_OWNER_PATH, MEMBER_CHECK_IN_PATH } from "@/lib/postLoginPath";

export function MemberCheckInGate() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

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

  return <MemberCheckInClient />;
}
