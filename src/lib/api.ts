import type {
  ApiFailure,
  ApiSuccess,
  AuthSession,
  AuthUser,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
} from "@/types/auth";
import type {
  BillingCheckoutResult,
  BillingStatus,
  BillingVerifyResult,
  PaidPlanId,
} from "@/types/billing";
import {
  clearAuthSession,
  getAccessToken,
  getRefreshToken,
  saveAuthSession,
  updateStoredTokens,
} from "@/lib/auth-storage";

/**
 * Base URL resolution — mirrors Fitzenix/src/config/api.ts
 *
 * Health: https://api.fitzenix.app/health
 * App:    https://api.fitzenix.app/api/v1/...
 *
 * Local CORS bypass: NEXT_PUBLIC_USE_API_PROXY=true → /backend-api/* rewrite
 */
const USE_REMOTE_API = process.env.NEXT_PUBLIC_USE_REMOTE_API !== "false";
const USE_API_PROXY = process.env.NEXT_PUBLIC_USE_API_PROXY === "true";
const REMOTE_API_ORIGIN =
  process.env.NEXT_PUBLIC_REMOTE_API_URL?.replace(/\/$/, "") ??
  process.env.REMOTE_API_URL?.replace(/\/$/, "") ??
  "https://api.fitzenix.app";
const LOCAL_API_ORIGIN =
  process.env.NEXT_PUBLIC_LOCAL_API_URL?.replace(/\/$/, "") ??
  "http://localhost:4000";
const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX ?? "/api/v1";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  (USE_REMOTE_API ? REMOTE_API_ORIGIN : LOCAL_API_ORIGIN);

/** Origin only (no `/api/v1`) — media / static assets. */
export function apiOrigin(): string {
  if (USE_API_PROXY && typeof window !== "undefined") {
    return "/backend-api";
  }
  return API_ORIGIN;
}

/** Full API base including `/api/v1`. */
export function getApiBaseUrl(): string {
  const prefix = API_PREFIX.startsWith("/") ? API_PREFIX : `/${API_PREFIX}`;
  if (USE_API_PROXY && typeof window !== "undefined") {
    return `/backend-api${prefix}`;
  }
  return `${API_ORIGIN}${prefix}`;
}

async function parseJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

function errorMessage(payload: ApiFailure | ApiSuccess<unknown>): string {
  if (!("success" in payload) || payload.success === true) {
    return "Something went wrong. Please try again.";
  }
  const errField = payload.error;
  if (typeof errField === "object" && errField) {
    const base = errField.message?.trim();
    const details = errField.details;
    if (Array.isArray(details) && details.length > 0) {
      const first = details[0] as { path?: string; message?: string };
      const detail =
        typeof first?.message === "string"
          ? first.path
            ? `${first.path}: ${first.message}`
            : first.message
          : null;
      if (detail) return base ? `${base} (${detail})` : detail;
    }
    if (base) return base;
  }
  if (typeof errField === "string") return errField;
  if (typeof payload.message === "string") return payload.message;
  return "Something went wrong. Please try again.";
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  withAuth = false,
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  if (withAuth) {
    const token = getAccessToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });

  const payload = await parseJson<ApiSuccess<T> | ApiFailure>(response);

  if (!response.ok || !("success" in payload) || payload.success !== true) {
    throw new Error(errorMessage(payload));
  }

  return payload.data;
}

export async function loginRequest(payload: LoginPayload): Promise<AuthSession> {
  const data = await request<AuthSession>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  saveAuthSession(data);
  return data;
}

/** Signup — no tokens until email OTP is verified. */
export async function registerRequest(payload: RegisterPayload): Promise<RegisterResponse> {
  return request<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** Verify email OTP and create a session (tokens returned by backend). */
export async function verifyOtpRequest(payload: {
  email: string;
  otp: string;
  purpose: "verify_email";
}): Promise<AuthSession> {
  const data = await request<{
    verified: true;
    emailVerified: true;
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  }>("/auth/otp/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const session: AuthSession = {
    user: data.user,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
  saveAuthSession(session);
  return session;
}

/** Resend OTP email (verify_email / login / reset). */
export async function requestOtpRequest(payload: {
  email: string;
  purpose: "verify_email" | "login" | "reset";
}): Promise<{ sent: true }> {
  return request<{ sent: true }>("/auth/otp/request", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchMe(): Promise<AuthUser> {
  return request<AuthUser>("/auth/me", { method: "GET" }, true);
}

export async function fetchBillingStatus(): Promise<BillingStatus> {
  return request<BillingStatus>("/billing/status", { method: "GET" }, true);
}

export async function billingCheckoutRequest(plan: PaidPlanId): Promise<BillingCheckoutResult> {
  return request<BillingCheckoutResult>(
    "/billing/checkout",
    {
      method: "POST",
      body: JSON.stringify({ plan }),
    },
    true,
  );
}

export async function billingVerifyRequest(payload: {
  orderId: string;
  paymentId: string;
  signature: string;
}): Promise<BillingVerifyResult> {
  return request<BillingVerifyResult>(
    "/billing/verify",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    true,
  );
}

export async function refreshSession(): Promise<AuthSession | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const data = await request<{
      user: AuthUser;
      accessToken: string;
      refreshToken: string;
    }>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
    const session: AuthSession = {
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
    saveAuthSession(session);
    return session;
  } catch {
    clearAuthSession();
    return null;
  }
}

export async function logoutRequest(): Promise<void> {
  const refreshToken = getRefreshToken();
  try {
    await request("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken: refreshToken ?? undefined }),
    });
  } catch {
    // Always clear local session even if API logout fails.
  } finally {
    clearAuthSession();
  }
}

export function getBearerToken(): string | null {
  return getAccessToken();
}

export { updateStoredTokens };
