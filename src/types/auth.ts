export type UserRole = "gym_owner" | "trainer" | "member" | "admin" | string;

export interface UserPlanInfo {
  id?: string;
  name?: string;
  planId?: string;
  planName?: string;
  plan?: string | UserPlanInfo | null;
  status?: string;
  expiresAt?: string;
  expiryDate?: string;
  endDate?: string;
  currentPeriodEnd?: string;
  trialEndsAt?: string;
  reason?: string;
  daysRemaining?: number | null;
  message?: string;
}

export interface BillingAccess {
  allowed: boolean;
  reason: "ok" | "trial" | "trial_expired" | "plan_expired" | "suspended" | string;
  plan: string | null;
  trialEndsAt: string | null;
  planPeriodEnd: string | null;
  daysRemaining: number | null;
  message: string;
}

export interface BillingStatus {
  gymId: string;
  gymName: string;
  access: BillingAccess;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  gym?: string | null;
  status?: string;
  emailVerified?: boolean;
  plan?: string | UserPlanInfo | null;
  currentPlan?: string | UserPlanInfo | null;
  subscription?: string | UserPlanInfo | null;
  membership?: string | UserPlanInfo | null;
  subscriptionPlan?: string | UserPlanInfo | null;
  planExpiresAt?: string;
  subscriptionStatus?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession extends AuthTokens {
  user: AuthUser;
}

export interface ApiSuccess<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiFailure {
  success: false;
  message?: string;
  error?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  gymName: string;
}
