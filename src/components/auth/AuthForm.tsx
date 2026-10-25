"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "signup";

interface AuthFormProps {
  initialMode?: AuthMode;
  nextPath?: string;
}

export function AuthForm({ initialMode = "login", nextPath = "/#pricing" }: AuthFormProps) {
  const router = useRouter();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [gymName, setGymName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const fieldClass =
    "mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-text-muted focus:border-brand/60";

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "login") {
        await login({ email: email.trim(), password });
        router.replace(nextPath);
      } else {
        const result = await register({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
          gymName: gymName.trim(),
        });
        const next = encodeURIComponent(nextPath);
        router.replace(`/verify-email?email=${encodeURIComponent(result.email)}&next=${next}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-[#111111] p-6 sm:p-8">
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-background p-1">
        <button
          type="button"
          className={cn(
            "rounded-lg py-2.5 text-sm font-semibold transition-colors",
            mode === "login" ? "bg-brand text-white" : "text-text-secondary hover:text-white",
          )}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={cn(
            "rounded-lg py-2.5 text-sm font-semibold transition-colors",
            mode === "signup" ? "bg-brand text-white" : "text-text-secondary hover:text-white",
          )}
          onClick={() => setMode("signup")}
        >
          Sign up
        </button>
      </div>

      <h1 className="font-display text-2xl font-bold text-white">
        {mode === "login" ? "Welcome back" : "Create your gym account"}
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        {mode === "login"
          ? "Login to continue to plan checkout."
          : "Sign up as a gym owner, then choose your plan."}
      </p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        {mode === "signup" ? (
          <>
            <label className="block text-sm text-text-secondary">
              Owner name
              <input
                className={fieldClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                minLength={2}
              />
            </label>
            <label className="block text-sm text-text-secondary">
              Gym name
              <input
                className={fieldClass}
                value={gymName}
                onChange={(e) => setGymName(e.target.value)}
                autoComplete="organization"
                required
                minLength={2}
              />
            </label>
            <label className="block text-sm text-text-secondary">
              Phone (optional)
              <input
                className={fieldClass}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </label>
          </>
        ) : null}

        <label className="block text-sm text-text-secondary">
          Email
          <input
            className={fieldClass}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>

        <label className="block text-sm text-text-secondary">
          Password
          <input
            className={fieldClass}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            minLength={mode === "signup" ? 8 : 1}
          />
        </label>

        {error ? <p className="text-sm text-danger">{error}</p> : null}

        <Button type="submit" fullWidth size="lg" loading={loading}>
          {mode === "login" ? "Login" : "Create account"}
        </Button>
      </form>
    </div>
  );
}
