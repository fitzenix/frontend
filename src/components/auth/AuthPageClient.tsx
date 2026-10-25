"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { AuthForm } from "@/components/auth/AuthForm";

interface AuthPageClientProps {
  nextPath: string;
  initialMode: "login" | "signup";
}

export function AuthPageClient({ nextPath, initialMode }: AuthPageClientProps) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(nextPath);
    }
  }, [loading, isAuthenticated, nextPath, router]);

  if (isAuthenticated) {
    return null;
  }

  return <AuthForm initialMode={initialMode} nextPath={nextPath} />;
}
