"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  attendanceCheckInRequest,
  attendanceCheckOutRequest,
  fetchAttendanceStatus,
  fetchMyGym,
  fetchMyPlan,
} from "@/lib/api";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/common/Button";
import { LoadingSpinner } from "@/components/common/Loading";
import {
  AttendanceConfirmSheet,
  type AttendanceSheetMode,
} from "@/components/member/AttendanceConfirmSheet";
import type { AttendanceRecord, AttendanceStatusInfo, MemberGymSummary, MemberMyPlan } from "@/types/attendance";

function formatClock(iso?: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDuration(minutes: number | null | undefined): string {
  if (minutes == null) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function MemberCheckInClient() {
  const { user, logout } = useAuth();
  const [status, setStatus] = useState<AttendanceStatusInfo | null>(null);
  const [gym, setGym] = useState<MemberGymSummary | null>(null);
  const [plan, setPlan] = useState<MemberMyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<AttendanceSheetMode>("checkin");
  const [confirming, setConfirming] = useState(false);
  const [success, setSuccess] = useState<{
    mode: AttendanceSheetMode;
    record: AttendanceRecord;
  } | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const [nextStatus, nextGym, nextPlan] = await Promise.all([
        fetchAttendanceStatus(),
        fetchMyGym().catch(() => null),
        fetchMyPlan().catch(() => null),
      ]);
      setStatus(nextStatus);
      setGym(nextGym);
      setPlan(nextPlan);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load attendance status.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const isCheckedIn = Boolean(status?.open);
  const checkedInAt = useMemo(
    () => (status?.open?.checkInAt ? new Date(status.open.checkInAt) : null),
    [status?.open?.checkInAt],
  );

  const openSheet = (mode: AttendanceSheetMode) => {
    setSuccess(null);
    setSheetMode(mode);
    setSheetOpen(true);
  };

  const onPrimary = () => {
    if (!status) return;
    if (status.canCheckOut) {
      openSheet("checkout");
      return;
    }
    if (status.canCheckIn) {
      openSheet("checkin");
      return;
    }
    setError(status.blockedReason || "Check-in is not available right now.");
  };

  const onConfirm = async () => {
    setConfirming(true);
    setError(null);
    try {
      const record =
        sheetMode === "checkin"
          ? await attendanceCheckInRequest("self")
          : await attendanceCheckOutRequest("self");
      setSheetOpen(false);
      setSuccess({ mode: sheetMode, record });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not complete attendance.");
    } finally {
      setConfirming(false);
    }
  };

  if (loading && !status) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner label="Loading check-in" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Fitzenix</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold text-white">
            {isCheckedIn ? "Ready to check out?" : "Gym check-in"}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            {gym?.name ? `At ${gym.name}` : "Confirm attendance for today’s session"}
          </p>
        </div>
        <Button size="sm" variant="ghost" onClick={() => void logout()}>
          Logout
        </Button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-[#111111]">
        <div
          className={
            isCheckedIn
              ? "bg-gradient-to-br from-brand to-[#8f031c] px-5 py-6"
              : "bg-gradient-to-br from-emerald-600 to-green-800 px-5 py-6"
          }
        >
          <p className="text-sm font-semibold text-white/80">
            {status?.currentSession ?? "AM"} session
          </p>
          <p className="mt-2 font-display text-2xl font-extrabold text-white">
            {isCheckedIn ? "You're checked in" : "Not checked in yet"}
          </p>
          <p className="mt-1 text-sm text-white/80">
            {isCheckedIn
              ? `Since ${formatClock(status?.open?.checkInAt)}`
              : plan?.planName
                ? plan.planName
                : "Tap below to confirm check-in"}
          </p>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center gap-3 rounded-2xl bg-[#1a1a1a] p-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/20 text-base font-bold text-brand">
              {(user?.name ?? "M")
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() ?? "")
                .join("")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">{user?.name}</p>
              <p className="truncate text-xs text-text-muted">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-[#1a1a1a] px-3.5 py-3">
              <p className="text-[11px] text-text-muted">Today</p>
              <p className="mt-1 font-semibold text-white">
                {status?.todayCount ?? 0}/{status?.maxSessions ?? 1} sessions
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] px-3.5 py-3">
              <p className="text-[11px] text-text-muted">Membership</p>
              <p className="mt-1 font-semibold text-white">
                {plan?.daysRemaining != null
                  ? `${plan.daysRemaining} days left`
                  : status?.membershipActive
                    ? "Active"
                    : "Check plan"}
              </p>
            </div>
          </div>

          {error ? (
            <p className="rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
              {error}
            </p>
          ) : null}

          {success ? (
            <div className="rounded-xl border border-success/30 bg-success/10 px-3 py-3 text-sm text-success">
              {success.mode === "checkin"
                ? `Checked in at ${formatClock(success.record.checkInAt)}`
                : `Checked out${
                    success.record.durationMinutes != null
                      ? ` · ${formatDuration(success.record.durationMinutes)}`
                      : ""
                  }`}
            </div>
          ) : null}

          <Button
            fullWidth
            size="lg"
            loading={loading}
            disabled={!status || (!status.canCheckIn && !status.canCheckOut)}
            onClick={onPrimary}
            className={
              isCheckedIn
                ? "bg-gradient-to-br from-[#FF4B4F] to-brand"
                : "bg-gradient-to-br from-emerald-500 to-green-600 shadow-[0_0_24px_rgba(34,197,94,0.25)]"
            }
          >
            {isCheckedIn ? "Check out" : "Check in"}
          </Button>

          {!status?.canCheckIn && !status?.canCheckOut && status?.blockedReason ? (
            <p className="text-center text-xs text-text-muted">{status.blockedReason}</p>
          ) : (
            <p className="text-center text-xs text-text-muted">
              Confirmation opens in a bottom sheet — same flow as the Fitzenix app.
            </p>
          )}

          <button
            type="button"
            className="w-full text-center text-xs font-semibold text-text-secondary hover:text-white"
            onClick={() => void load()}
          >
            Refresh status
          </button>
        </div>
      </div>

      <AttendanceConfirmSheet
        open={sheetOpen}
        mode={sheetMode}
        memberName={user?.name ?? "Member"}
        gymName={gym?.name}
        planName={plan?.planName}
        session={status?.currentSession ?? "AM"}
        checkedInAt={checkedInAt}
        loading={confirming}
        onConfirm={() => void onConfirm()}
        onClose={() => {
          if (!confirming) setSheetOpen(false);
        }}
      />
    </div>
  );
}
