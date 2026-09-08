"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PlanId } from "@/types/pricing";
import type { CreateOrderResponse, VerifyPaymentResponse } from "@/types/payment";
import type { CheckoutFormErrors, CheckoutFormValues } from "@/types/checkout";
import { getPlanById } from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";
import { RAZORPAY_SCRIPT_URL } from "@/lib/constants";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/common/Button";
import "@/types/razorpay";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_SCRIPT_URL}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function validate(values: CheckoutFormValues): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {};
  if (!values.gymName.trim()) errors.gymName = "Gym name is required";
  if (!values.ownerName.trim()) errors.ownerName = "Owner name is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email";
  }
  if (values.phone.trim() && !/^[6-9]\d{9}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid 10-digit Indian mobile number";
  }
  return errors;
}

interface CheckoutFormProps {
  planId: PlanId;
}

export function CheckoutForm({ planId }: CheckoutFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const plan = useMemo(() => getPlanById(planId), [planId]);
  const [values, setValues] = useState<CheckoutFormValues>({
    gymName: "",
    ownerName: "",
    email: "",
    phone: "",
    planId,
  });
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setValues((prev) => ({
      ...prev,
      ownerName: prev.ownerName || user.name || "",
      email: prev.email || user.email || "",
      phone: prev.phone || user.phone || "",
    }));
  }, [user]);

  if (!plan) {
    return (
      <p className="text-sm text-text-secondary">
        Invalid plan selected.{" "}
        <a href="/#pricing" className="text-brand-light hover:underline">
          Return to pricing
        </a>
      </p>
    );
  }

  const onChange = (field: keyof CheckoutFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const startPayment = async () => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setFormError(null);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const orderData = (await orderRes.json()) as CreateOrderResponse | { message?: string };
      if (!orderRes.ok || !("orderId" in orderData)) {
        throw new Error("order_failed");
      }

      const ready = await loadRazorpayScript();
      if (!ready || !window.Razorpay) throw new Error("script_failed");

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "FITZENIX",
        description: `${orderData.planName} plan`,
        order_id: orderData.orderId,
        prefill: {
          name: values.ownerName,
          email: values.email,
          contact: values.phone || undefined,
        },
        theme: { color: "#D90429" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, planId }),
            });
            const verifyData = (await verifyRes.json()) as
              | VerifyPaymentResponse
              | { message?: string };

            if (!verifyRes.ok || !("success" in verifyData) || !verifyData.success) {
              router.push("/payment/failure");
              return;
            }

            const params = new URLSearchParams({
              plan: verifyData.planName,
              amount: String(verifyData.amount),
              paymentId: verifyData.paymentId,
              orderId: verifyData.orderId,
              gym: values.gymName,
            });
            router.push(`/payment/success?${params.toString()}`);
          } catch {
            router.push("/payment/failure");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setFormError("Payment was cancelled. You can try again.");
          },
        },
      });

      razorpay.open();
    } catch {
      setLoading(false);
      setFormError("Something went wrong. Please try again.");
    }
  };

  const fieldClass =
    "mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-text-muted focus:border-brand/60";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border border-border bg-[#111111] p-6">
        <h2 className="font-display text-xl font-bold text-white">Confirm details</h2>
        <p className="mt-2 text-sm text-text-secondary">
          You&apos;re logged in as <span className="text-white">{user?.email}</span>. Confirm gym
          details, then pay securely with Razorpay.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-text-secondary sm:col-span-2">
            Gym name
            <input
              className={fieldClass}
              value={values.gymName}
              onChange={(event) => onChange("gymName", event.target.value)}
              autoComplete="organization"
              required
            />
            {errors.gymName ? (
              <span className="mt-1 block text-xs text-danger">{errors.gymName}</span>
            ) : null}
          </label>

          <label className="block text-sm text-text-secondary">
            Owner name
            <input
              className={fieldClass}
              value={values.ownerName}
              onChange={(event) => onChange("ownerName", event.target.value)}
              autoComplete="name"
              required
            />
            {errors.ownerName ? (
              <span className="mt-1 block text-xs text-danger">{errors.ownerName}</span>
            ) : null}
          </label>

          <label className="block text-sm text-text-secondary">
            Phone
            <input
              className={fieldClass}
              value={values.phone}
              onChange={(event) => onChange("phone", event.target.value)}
              inputMode="numeric"
              autoComplete="tel"
            />
            {errors.phone ? <span className="mt-1 block text-xs text-danger">{errors.phone}</span> : null}
          </label>

          <label className="block text-sm text-text-secondary sm:col-span-2">
            Email
            <input
              className={fieldClass}
              type="email"
              value={values.email}
              onChange={(event) => onChange("email", event.target.value)}
              autoComplete="email"
              required
            />
            {errors.email ? <span className="mt-1 block text-xs text-danger">{errors.email}</span> : null}
          </label>
        </div>

        {formError ? <p className="mt-4 text-sm text-danger">{formError}</p> : null}

        <div className="mt-6">
          <Button fullWidth size="lg" loading={loading} onClick={startPayment}>
            Continue to Pay
          </Button>
        </div>
      </div>

      <aside className="h-fit rounded-2xl border border-border bg-[#111111] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
          Selected plan
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold text-white">{plan.name}</h3>
        <p className="mt-1 text-sm text-text-secondary">{plan.description}</p>
        <p className="mt-4 font-display text-3xl font-bold text-white">
          {formatCurrency(plan.price, plan.currency)}
          <span className="ml-1 text-base font-medium text-text-muted">/month</span>
        </p>
        <ul className="mt-5 space-y-2 text-sm text-text-secondary">
          {plan.features.map((feature) => (
            <li key={feature}>• {feature}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
