import type {
  ApiFailure,
  ApiSuccess,
  AuthSession,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";
import {
  clearAuthSession,
  getAccessToken,
  getRefreshToken,
  saveAuthSession,
  updateStoredTokens,
} from "@/lib/auth-storage";

/**
 * Base URL resolution — mirrors Fitzenix/src/api/client.ts
 * NEXT_PUBLIC_USE_REMOTE_API=true  → production (api.fitzenix.app)
 * NEXT_PUBLIC_USE_REMOTE_API=false → local :4000
 * NEXT_PUBLIC_API_URL (optional)   → full override of the origin
 */
const USE_REMOTE_API = process.env.NEXT_PUBLIC_USE_REMOTE_API !== "false";
const REMOTE_API_ORIGIN =
  process.env.NEXT_PUBLIC_REMOTE_API_URL?.replace(/\/$/, "") ??
  "https://api.fitzenix.app";
const LOCAL_API_ORIGIN =
  process.env.NEXT_PUBLIC_LOCAL_API_URL?.replace(/\/$/, "") ?? "http://localhost:4000";
const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX ?? "/api/v1";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  (USE_REMOTE_API ? REMOTE_API_ORIGIN : LOCAL_API_ORIGIN);

/** Origin only (no `/api/v1`) — media / static assets. */
export function apiOrigin(): string {
  return API_ORIGIN;
}

/** Full API base including `/api/v1` (same shape as mobile API_BASE_URL). */
export function getApiBaseUrl(): string {
  const prefix = API_PREFIX.startsWith("/") ? API_PREFIX : `/${API_PREFIX}`;
  return `${API_ORIGIN}${prefix}`;
}

async function parseJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
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
    const message =
      ("message" in payload && payload.message) ||
      ("error" in payload && payload.error) ||
      "Something went wrong. Please try again.";
    throw new Error(message);
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

export async function registerRequest(payload: RegisterPayload): Promise<AuthSession> {
  const data = await request<{
    user: AuthUser;
    gym: unknown;
    accessToken: string;
    refreshToken: string;
  }>("/auth/register", {
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

export async function fetchMe(): Promise<AuthUser> {
  return request<AuthUser>("/auth/me", { method: "GET" }, true);
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
