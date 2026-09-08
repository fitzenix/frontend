import type { AuthSession, AuthTokens, AuthUser } from "@/types/auth";

const ACCESS_KEY = "fitzenix_access_token";
const REFRESH_KEY = "fitzenix_refresh_token";
const USER_KEY = "fitzenix_user";

export function saveAuthSession(session: AuthSession): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_KEY, session.accessToken);
  localStorage.setItem(REFRESH_KEY, session.refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function getStoredSession(): AuthSession | null {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const user = getStoredUser();
  if (!accessToken || !refreshToken || !user) return null;
  return { accessToken, refreshToken, user };
}

export function updateStoredTokens(tokens: AuthTokens): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
}
