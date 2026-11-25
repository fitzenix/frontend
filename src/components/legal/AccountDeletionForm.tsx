"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  fetchAccountDeletionStatus,
  requestAccountDeletion,
  verifyAccountDeletion,
  type AccountDeletionRole,
  type AccountDeletionStatus,
} from "@/lib/api";
import { SITE_WORDMARK_SRC } from "@/components/common/Logo";
import { siteConfig } from "@/config/site";

const STATUS_COPY: Record<AccountDeletionStatus, string> = {
  pending_verification: "Waiting for identity verification.",
  processing: "Your verified request is being processed.",
  awaiting_support_review: "Your request is verified and is awaiting support review. Gym ownership transfer or closure must be resolved before deletion.",
  completed: "Your account deletion has been completed.",
  failed: "This request could not be completed. Submit a new request or contact support.",
};

export function AccountDeletionForm() {
  const [identity, setIdentity] = useState("");
  const [role, setRole] = useState<AccountDeletionRole>("member");
  const [gymName, setGymName] = useState("");
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [code, setCode] = useState("");
  const [requestId, setRequestId] = useState("");
  const [trackingToken, setTrackingToken] = useState("");
  const [status, setStatus] = useState<AccountDeletionStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const needsGymName = role !== "member";
  const isPendingVerification = requestId && status === "pending_verification";

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const result = await requestAccountDeletion({
        identity: identity.trim(),
        role,
        ...(needsGymName && gymName.trim() ? { gymName: gymName.trim() } : {}),
        ...(reason.trim() ? { reason: reason.trim() } : {}),
      });
      setRequestId(result.requestId);
      setTrackingToken(result.trackingToken);
      setStatus(result.status);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to submit your request. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const result = await verifyAccountDeletion({ requestId, code });
      setStatus(result.status);
      setCode("");
    } catch (verifyError) {
      setError(verifyError instanceof Error ? verifyError.message : "The code could not be verified. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function refreshStatus() {
    if (!requestId || !trackingToken) return;
    setError("");
    setBusy(true);
    try {
      const result = await fetchAccountDeletionStatus({ requestId, trackingToken });
      setStatus(result.status);
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : "Unable to retrieve request status.");
    } finally {
      setBusy(false);
    }
  }

  async function resendCode() {
    setError("");
    setBusy(true);
    try {
      const result = await requestAccountDeletion({
        identity: identity.trim(),
        role,
        ...(needsGymName && gymName.trim() ? { gymName: gymName.trim() } : {}),
        ...(reason.trim() ? { reason: reason.trim() } : {}),
      });
      setRequestId(result.requestId);
      setTrackingToken(result.trackingToken);
      setStatus(result.status);
      setCode("");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to resend the verification code.");
    } finally {
      setBusy(false);
    }
  }

  function startOver() {
    setRequestId("");
    setTrackingToken("");
    setStatus(null);
    setCode("");
    setError("");
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <header className="mb-8">
        <Image
          src={SITE_WORDMARK_SRC}
          alt="FITZENIX"
          width={500}
          height={116}
          priority
          className="mb-8 h-9 w-auto object-contain object-left"
        />
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand">Account & privacy</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Delete Your Fitzenix Account
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-text-secondary">
          Submit a request without opening or reinstalling the app. We verify requests using a one-time code sent to the email address registered to the account. If you enter a mobile number, the code is still sent to the account email.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8" aria-labelledby="request-heading">
        <h2 id="request-heading" className="text-xl font-semibold text-text-primary">Request account deletion</h2>
        {!requestId ? (
          <form onSubmit={submitRequest} className="mt-6 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-text-primary">Registered email address or mobile number</span>
              <input
                autoComplete="off"
                required
                maxLength={254}
                value={identity}
                onChange={(event) => setIdentity(event.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-text-primary">Account role</span>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value as AccountDeletionRole)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              >
                <option value="gym_owner">Gym Owner</option>
                <option value="trainer_staff">Trainer/Staff</option>
                <option value="member">Member</option>
              </select>
            </label>

            {needsGymName && (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-text-primary">Gym name</span>
                <input
                  required={role === "gym_owner"}
                  maxLength={160}
                  value={gymName}
                  onChange={(event) => setGymName(event.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </label>
            )}

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-text-primary">Reason for deletion <span className="font-normal text-text-muted">(optional)</span></span>
              <textarea
                maxLength={1000}
                rows={3}
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </label>

            <label className="flex items-start gap-3 text-sm leading-6 text-text-secondary">
              <input
                type="checkbox"
                required
                checked={confirmed}
                onChange={(event) => setConfirmed(event.target.checked)}
                className="mt-1 h-4 w-4 accent-brand"
              />
              <span>I understand deletion removes my account and associated personal data where legally permitted, and I may lose access to my profile, fitness history, and account services. Gym-owner requests require a support-reviewed gym ownership transfer or closure first.</span>
            </label>

            {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
            <button
              type="submit"
              disabled={busy || !confirmed}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-5 py-3 font-semibold text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {busy ? "Submitting…" : "Submit deletion request"}
            </button>
            <p className="text-sm text-text-muted">For privacy, the response does not confirm whether an account exists. If account details match, verification instructions are sent to its registered email.</p>
          </form>
        ) : (
          <div className="mt-6 space-y-5" aria-live="polite">
            {isPendingVerification ? (
              <>
                <p className="text-sm leading-6 text-text-secondary">If the details match an account, a one-time code has been sent to its registered email. Check your inbox and spam folder.</p>
                <form onSubmit={submitCode} className="space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-text-primary">Six-digit verification code</span>
                    <input
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="[0-9]{6}"
                      minLength={6}
                      maxLength={6}
                      required
                      value={code}
                      onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 tracking-[0.3em] text-text-primary outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 sm:max-w-xs"
                    />
                  </label>
                  {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
                  <button type="submit" disabled={busy || code.length !== 6} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 py-3 font-semibold text-white disabled:opacity-60">
                    {busy ? "Verifying…" : "Verify and continue"}
                  </button>
                  <button type="button" onClick={resendCode} disabled={busy} className="ml-3 min-h-12 rounded-xl border border-border px-4 py-3 font-semibold text-text-primary disabled:opacity-60">
                    Resend code
                  </button>
                </form>
              </>
            ) : (
              <>
                <p className="rounded-xl bg-background px-4 py-4 text-text-primary">{status ? STATUS_COPY[status] : "Request received."}</p>
                {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
                {status !== "completed" && status !== "failed" && (
                  <button type="button" onClick={refreshStatus} disabled={busy} className="rounded-xl border border-border px-4 py-3 font-semibold text-text-primary disabled:opacity-60">
                    {busy ? "Checking…" : "Check request status"}
                  </button>
                )}
                {status === "failed" && (
                  <button type="button" onClick={startOver} className="rounded-xl border border-border px-4 py-3 font-semibold text-text-primary">
                    Start a new request
                  </button>
                )}
                <p className="text-sm text-text-muted">Keep this browser tab open to check your request status. For assistance, email <a className="font-medium text-brand underline" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.</p>
              </>
            )}
          </div>
        )}
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-surface p-5 sm:p-8" aria-labelledby="data-heading">
        <h2 id="data-heading" className="text-xl font-semibold text-text-primary">What happens to your data</h2>
        <div className="mt-4 space-y-4 text-sm leading-6 text-text-secondary">
          <p>After identity verification and any required gym-owner review, we remove or anonymize personal profile information, profile images, attendance and fitness records, user-authored social content, messages and account notification data from Fitzenix systems. Access credentials and active sessions are revoked as part of processing.</p>
          <p>Payment, invoice, and other financial/business records may be retained when necessary for applicable legal, tax, accounting, fraud-prevention, or dispute purposes. Minimal request status and review details may also be retained to document the outcome and protect service security. We remove or minimize personal details from records where feasible. Gym business records and other users’ accounts are not automatically deleted by an individual account request. Payment and infrastructure providers may retain records under their own legal obligations and policies.</p>
          <p><strong className="text-text-primary">Retention periods:</strong> Fitzenix has not yet approved a numeric retention schedule for these retained records. Applicable retention periods must be confirmed by Fitzenix’s legal and business owners before production release; we will not publish an invented duration. Contact <a className="font-medium text-brand underline" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> for current handling information.</p>
        </div>
      </section>

      <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Related policies">
        <Link href="/privacy" className="font-medium text-brand underline">Privacy Policy</Link>
        <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-brand underline">Contact support</a>
      </nav>
    </main>
  );
}
