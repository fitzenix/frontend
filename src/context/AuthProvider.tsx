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
import type { AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";
import {
  clearAuthSession,
  getStoredSession,
} from "@/lib/auth-storage";
import {
  fetchMe,
  loginRequest,
  logoutRequest,
  refreshSession,
  registerRequest,
} from "@/lib/api";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      const stored = getStoredSession();
      if (!stored) {
        if (active) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        const me = await fetchMe();
        if (active) setUser(me);
      } catch {
        const refreshed = await refreshSession();
        if (active) setUser(refreshed?.user ?? null);
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
    const session = await loginRequest(payload);
    setUser(session.user);
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const session = await registerRequest(payload);
    setUser(session.user);
  }, []);

  const logout = useCallback(async () => {
    await logoutRequest();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const me = await fetchMe();
    setUser(me);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, loading, login, register, logout, refreshUser],
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
