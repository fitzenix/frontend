"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { requestOtpRequest } from "@/lib/api";
import { Button } from "@/components/common/Button";

const RESEND_COOLDOWN_SECONDS = 60;

interface VerifyEmailFormProps {
  email: string;
  nextPath: string;
}

export function VerifyEmailForm({ email, nextPath }: VerifyEmailFormProps) {
  const router = useRouter();
  const { verifyEmail } = useAuth();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  /** Starts at 60s — user just received OTP from signup. */
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setInfo(null);
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

  const onResend = useCallback(async () => {
    if (!email.trim() || cooldown > 0 || resending) return;
    setError(null);
    setInfo(null);
    setResending(true);
    try {
      await requestOtpRequest({ email: email.trim(), purpose: "verify_email" });
      setOtp("");
      setInfo("A new verification code was sent to your email.");
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resend the code. Try again.");
    } finally {
      setResending(false);
    }
  }, [email, cooldown, resending]);

  const canResend = Boolean(email.trim()) && cooldown === 0 && !resending && !loading;

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-[#111111] p-6 sm:p-8">
      <h1 className="font-display text-2xl font-bold text-white">Verify your email</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Enter the 6-digit code sent to <span className="text-white">{email || "your email"}</span>.
        If the code expired, request a new one below.
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
        {info ? <p className="text-sm text-success">{info}</p> : null}
        <Button type="submit" fullWidth size="lg" loading={loading} disabled={otp.length !== 6}>
          Verify and continue
        </Button>
      </form>

      <div className="mt-5 border-t border-border pt-5 text-center">
        <p className="text-sm text-text-muted">Didn&apos;t get the code, or did it expire?</p>
        <Button
          type="button"
          variant="outline"
          fullWidth
          size="md"
          className="mt-3"
          loading={resending}
          disabled={!canResend}
          onClick={() => void onResend()}
        >
          {cooldown > 0 ? `Resend email in ${cooldown}s` : "Resend verification email"}
        </Button>
      </div>
    </div>
  );
}
