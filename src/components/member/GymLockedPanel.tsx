"use client";

import { Button } from "@/components/common/Button";

type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onLogout?: () => void;
  retrying?: boolean;
};

/** Web equivalent of mobile GymLockedScreen — gym SaaS plan expired. */
export function GymLockedPanel({
  title = "Gym plan expired",
  message = "Your gym’s Fitzenix plan is currently expired. Please contact your gym to restore access. You’ll be able to use the app again once they renew.",
  onRetry,
  onLogout,
  retrying,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-border bg-[#111111] px-6 py-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Fitzenix</p>
        <h1 className="mt-3 font-display text-2xl font-extrabold text-white">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{message}</p>
        <div className="mt-6 flex flex-col gap-3">
          {onRetry ? (
            <Button fullWidth variant="secondary" loading={retrying} onClick={onRetry}>
              Check again
            </Button>
          ) : null}
          {onLogout ? (
            <Button fullWidth onClick={onLogout}>
              Sign out
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
