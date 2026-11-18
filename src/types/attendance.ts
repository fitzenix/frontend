export type AttendanceSession = "AM" | "PM";
export type AttendanceSource = "self" | "staff" | "qr";
export type AttendanceStatusValue = "checked_in" | "checked_out";

export interface AttendanceRecord {
  _id: string;
  gym: string;
  member: string;
  checkInAt: string;
  checkOutAt: string | null;
  status: AttendanceStatusValue;
  source: AttendanceSource;
  session: AttendanceSession;
  durationMinutes: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AttendanceStatusInfo {
  open: AttendanceRecord | null;
  todayCount: number;
  allowTwoSessions: boolean;
  maxSessions: 1 | 2;
  currentSession: AttendanceSession;
  canCheckIn: boolean;
  canCheckOut: boolean;
  membershipActive?: boolean;
  membershipEndsAt?: string | null;
  blockedReason: string | null;
}

export interface MemberGymSummary {
  _id: string;
  name: string;
  logoUrl?: string | null;
  address?: {
    line1?: string;
    city?: string;
    state?: string;
  } | null;
}

export interface MemberMyPlan {
  hasPlan: boolean;
  subscriptionId: string | null;
  status: string | null;
  planName: string | null;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
  daysRemaining: number | null;
  pricePaise: number | null;
  durationDays: number | null;
  trainerIncluded: boolean;
  autoRenew: boolean;
  features: string[];
}
