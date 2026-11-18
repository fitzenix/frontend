"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { AuthForm } from "@/components/auth/AuthForm";
import { LoadingSpinner } from "@/components/common/Loading";
import { resolvePostLoginPath } from "@/lib/postLoginPath";

interface AuthPageClientProps {
  nextPath: string;
  initialMode: "login" | "signup";
}

export function AuthPageClient({ nextPath, initialMode }: AuthPageClientProps) {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(resolvePostLoginPath(user, nextPath));
    }
  }, [loading, isAuthenticated, nextPath, router, user]);

  if (isAuthenticated) {
    return null;
  }

  return <AuthForm initialMode={initialMode} nextPath={nextPath} />;
}
