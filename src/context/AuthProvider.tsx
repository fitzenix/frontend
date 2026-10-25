"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser, LoginPayload, RegisterPayload, RegisterResponse, AuthSession } from "@/types/auth";
import type { BillingStatus } from "@/types/billing";
import {
  clearAuthSession,
  getStoredSession,
} from "@/lib/auth-storage";
import {
  fetchBillingStatus,
  fetchMe,
  loginRequest,
  logoutRequest,
  refreshSession,
  registerRequest,
  verifyOtpRequest,
} from "@/lib/api";
import { Analytics } from "@/lib/analytics";
import { AnalyticsEvents } from "@/lib/analytics/events";

interface AuthContextValue {
  user: AuthUser | null;
  billing: BillingStatus | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<RegisterResponse>;
  verifyEmail: (payload: { email: string; otp: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshBilling: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadBillingSafe(): Promise<BillingStatus | null> {
  try {
    return await fetchBillingStatus();
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [billing, setBilling] = useState<BillingStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      const stored = getStoredSession();
      if (!stored) {
        if (active) {
          setUser(null);
          setBilling(null);
          setLoading(false);
        }
        return;
      }

      try {
        const me = await fetchMe();
        const status = await loadBillingSafe();
        if (active) {
          setUser(me);
          setBilling(status);
        }
      } catch {
        const refreshed = await refreshSession();
        if (active) {
          setUser(refreshed?.user ?? null);
          setBilling(refreshed ? await loadBillingSafe() : null);
        }
        if (!refreshed) clearAuthSession();
      } finally {
        if (active) setLoading(false);
      }
    }

    void bootstrap();
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    void Analytics.logEvent(AnalyticsEvents.LOGIN_STARTED, { method: "password" });
    try {
      const session = await loginRequest(payload);
      setUser(session.user);
      setBilling(await loadBillingSafe());
      void Analytics.setUserId(session.user._id);
      void Analytics.logEvent(AnalyticsEvents.LOGIN_SUCCESS, {
        role: session.user.role,
        method: "password",
      });
    } catch (err) {
      void Analytics.logEvent(AnalyticsEvents.LOGIN_FAILED, {
        reason: err instanceof Error ? err.message.slice(0, 80) : "unknown",
      });
      throw err;
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    void Analytics.logEvent(AnalyticsEvents.SIGNUP_STARTED, { method: "email" });
    try {
      const result = await registerRequest(payload);
      void Analytics.logEvent(AnalyticsEvents.SIGNUP_SUCCESS, {
        method: "email",
        needs_email_verification: 1,
      });
      return result;
    } catch (err) {
      void Analytics.logEvent(AnalyticsEvents.SIGNUP_FAILED, {
        reason: err instanceof Error ? err.message.slice(0, 80) : "unknown",
      });
      throw err;
    }
  }, []);

  const verifyEmail = useCallback(async (payload: { email: string; otp: string }) => {
    void Analytics.logEvent(AnalyticsEvents.EMAIL_VERIFY_STARTED);
    try {
      const session: AuthSession = await verifyOtpRequest({ ...payload, purpose: "verify_email" });
      setUser(session.user);
      setBilling(await loadBillingSafe());
      void Analytics.setUserId(session.user._id);
      void Analytics.logEvent(AnalyticsEvents.EMAIL_VERIFY_SUCCESS, {
        role: session.user.role,
      });
    } catch (err) {
      void Analytics.logEvent(AnalyticsEvents.EMAIL_VERIFY_FAILED, {
        reason: err instanceof Error ? err.message.slice(0, 80) : "unknown",
      });
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    void Analytics.logEvent(AnalyticsEvents.LOGOUT);
    await logoutRequest();
    void Analytics.setUserId(null);
    setUser(null);
    setBilling(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const me = await fetchMe();
    setUser(me);
  }, []);

  const refreshBilling = useCallback(async () => {
    setBilling(await loadBillingSafe());
  }, []);

  const value = useMemo(
    () => ({
      user,
      billing,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      verifyEmail,
      logout,
      refreshUser,
      refreshBilling,
    }),
    [user, billing, loading, login, register, verifyEmail, logout, refreshUser, refreshBilling],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
