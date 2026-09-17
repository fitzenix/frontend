"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/common/Button";

interface VerifyEmailFormProps {
  email: string;
  nextPath: string;
}

export function VerifyEmailForm({ email, nextPath }: VerifyEmailFormProps) {
  const router = useRouter();
  const { verifyEmail } = useAuth();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await verifyEmail({ email: email.trim(), otp });
      router.replace(nextPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to verify this code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-[#111111] p-6 sm:p-8">
      <h1 className="font-display text-2xl font-bold text-white">Verify your email</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Enter the 6-digit code sent to <span className="text-white">{email}</span> to continue to checkout.
      </p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block text-sm text-text-secondary">
          Verification code
          <input
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-center text-lg tracking-[0.3em] text-white outline-none focus:border-brand/60"
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            required
          />
        </label>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <Button type="submit" fullWidth size="lg" loading={loading} disabled={otp.length !== 6}>
          Verify and continue
        </Button>
      </form>
    </div>
  );
}