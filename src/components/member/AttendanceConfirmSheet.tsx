"use client";

import { useEffect } from "react";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";
import type { AttendanceSession } from "@/types/attendance";

export type AttendanceSheetMode = "checkin" | "checkout";

export interface AttendanceConfirmSheetProps {
  open: boolean;
  mode: AttendanceSheetMode;
  memberName: string;
  gymName?: string | null;
  planName?: string | null;
  session: AttendanceSession;
  checkedInAt?: Date | null;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function durationLabel(from: Date, to: Date): string {
  const mins = Math.max(0, Math.round((to.getTime() - from.getTime()) / 60_000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-3.5 py-2.5">
      <span className="flex-1 text-xs text-text-muted">{label}</span>
      <span className="max-w-[55%] truncate text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

export function AttendanceConfirmSheet({
  open,
  mode,
  memberName,
  gymName,
  planName,
  session,
  checkedInAt,
  loading = false,
  onConfirm,
  onClose,
}: AttendanceConfirmSheetProps) {
  const isCheckIn = mode === "checkin";
  const now = new Date();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, loading, onClose]);

  if (!open) return null;

  const liveDuration =
    !isCheckIn && checkedInAt ? durationLabel(checkedInAt, now) : null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label="Close confirmation"
        disabled={loading}
        onClick={() => {
          if (!loading) onClose();
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="attendance-sheet-title"
        className={cn(
          "relative z-10 w-full max-w-md overflow-hidden rounded-t-3xl border border-border bg-[#121212] shadow-2xl",
          "sm:rounded-3xl",
          "animate-in slide-in-from-bottom duration-300",
        )}
      >
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-border sm:hidden" />

        <div className="px-5 pb-6 pt-4">
          <div className="mb-4 flex items-start gap-3">
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl",
                isCheckIn ? "bg-success/15 text-success" : "bg-brand/15 text-brand",
              )}
            >
              <span className="text-lg" aria-hidden>
                {isCheckIn ? "↓" : "↑"}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 id="attendance-sheet-title" className="font-display text-lg font-extrabold text-white">
                {isCheckIn ? "Confirm Check-in" : "Confirm Check-out"}
              </h2>
              <p className="text-xs text-text-muted">Verify your details before confirming</p>
            </div>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg bg-white/5 text-text-secondary hover:text-white disabled:opacity-50"
              aria-label="Close"
              disabled={loading}
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div className="mb-3 flex items-center gap-3 rounded-2xl bg-[#1a1a1a] p-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/20 text-base font-bold text-brand">
              {memberName
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() ?? "")
                .join("") || "M"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">{memberName}</p>
              {planName ? <p className="truncate text-xs text-text-muted">{planName}</p> : null}
            </div>
            <span className="rounded-full bg-teal-400/15 px-2.5 py-1 text-[11px] font-bold text-teal-300">
              {session} session
            </span>
          </div>

          <div className="mb-5 rounded-2xl bg-[#1a1a1a] py-1">
            {gymName ? <InfoRow label="Gym" value={gymName} /> : null}
            <InfoRow label="Date" value={formatDate(now)} />
            <InfoRow
              label={isCheckIn ? "Check-in time" : "Check-out time"}
              value={formatTime(now)}
            />
            {!isCheckIn && checkedInAt ? (
              <InfoRow label="Checked in at" value={formatTime(checkedInAt)} />
            ) : null}
            {liveDuration ? <InfoRow label="Duration" value={liveDuration} /> : null}
          </div>

          <Button
            fullWidth
            size="lg"
            loading={loading}
            onClick={onConfirm}
            className={cn(
              isCheckIn
                ? "bg-gradient-to-br from-emerald-500 to-green-600 shadow-[0_0_24px_rgba(34,197,94,0.28)] hover:from-emerald-400 hover:to-green-500"
                : "bg-gradient-to-br from-[#FF4B4F] to-brand shadow-[0_0_24px_rgba(217,4,41,0.28)] hover:from-[#ff6367] hover:to-brand-light",
            )}
          >
            {isCheckIn ? "Confirm Check-in" : "Confirm Check-out"}
          </Button>

          <button
            type="button"
            className="mt-3 w-full py-2 text-sm font-semibold text-text-secondary transition-colors hover:text-white disabled:opacity-50"
            disabled={loading}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
