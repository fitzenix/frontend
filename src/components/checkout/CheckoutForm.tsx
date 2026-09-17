"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PaidPlanId } from "@/types/pricing";
import type { CheckoutFormErrors, CheckoutFormValues } from "@/types/checkout";
import { getPaidPlanById } from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";
import { RAZORPAY_SCRIPT_URL } from "@/lib/constants";
import { billingCheckoutRequest, billingVerifyRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/common/Button";
import { Analytics } from "@/lib/analytics";
import { AnalyticsEvents } from "@/lib/analytics/events";
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
  planId: PaidPlanId;
}

export function CheckoutForm({ planId }: CheckoutFormProps) {
  const router = useRouter();
  const { user, billing, refreshBilling } = useAuth();
  const plan = useMemo(() => getPaidPlanById(planId), [planId]);
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
      gymName: prev.gymName || billing?.gymName || "",
      ownerName: prev.ownerName || user.name || "",
      email: prev.email || user.email || "",
      phone: prev.phone || user.phone || "",
    }));
  }, [user, billing]);

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
    void Analytics.logEvent(AnalyticsEvents.CHECKOUT_STARTED, {
      plan_id: planId,
      plan_name: plan.name,
      value: plan.price,
      currency: plan.currency,
    });
    try {
      // Backend billing creates the order and activates the gym plan after verify.
      const checkout = await billingCheckoutRequest(planId);

      const goSuccess = async (paymentId: string, orderId: string, daysRemaining?: number | null) => {
        void Analytics.logEvent(AnalyticsEvents.PAYMENT_SUCCESS, {
          plan_id: planId,
          plan_name: plan.name,
          value: plan.price,
          currency: plan.currency,
          payment_id: paymentId,
        });
        await refreshBilling();
        const params = new URLSearchParams({
          plan: plan.name,
          amount: String(plan.price),
          paymentId,
          orderId,
          gym: values.gymName || billing?.gymName || "",
          days: String(daysRemaining ?? ""),
        });
        router.push(`/payment/success?${params.toString()}`);
      };

      // Local/dev mock gateway — same path as the Fitzenix owner app.
      if (checkout.mock && checkout.mockPaymentId && checkout.mockSignature) {
        void Analytics.logEvent(AnalyticsEvents.PAYMENT_INITIATED, {
          plan_id: planId,
          method: "mock",
        });
        const verified = await billingVerifyRequest({
          orderId: checkout.order.id,
          paymentId: checkout.mockPaymentId,
          signature: checkout.mockSignature,
        });
        await goSuccess(checkout.mockPaymentId, checkout.order.id, verified.access.daysRemaining);
        setLoading(false);
        return;
      }

      if (!checkout.keyId || checkout.keyId.includes("xxxx")) {
        throw new Error(
          "Razorpay is not configured on the API. Set valid RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET, then restart the API.",
        );
      }

      const ready = await loadRazorpayScript();
      if (!ready || !window.Razorpay) {
        throw new Error("Could not load Razorpay checkout. Check your network and try again.");
      }

      void Analytics.logEvent(AnalyticsEvents.PAYMENT_INITIATED, {
        plan_id: planId,
        method: "razorpay",
      });

      const razorpay = new window.Razorpay({
        key: checkout.keyId,
        amount: checkout.order.amount,
        currency: checkout.order.currency,
        name: checkout.name || "FITZENIX",
        description: checkout.description || `${plan.name} plan`,
        order_id: checkout.order.id,
        prefill: {
          name: values.ownerName || checkout.prefill.name,
          email: values.email || checkout.prefill.email,
          contact: values.phone || checkout.prefill.contact,
        },
        theme: { color: "#D90429" },
        handler: async (response) => {
          try {
            const verified = await billingVerifyRequest({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            await goSuccess(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              verified.access.daysRemaining,
            );
          } catch (err) {
            void Analytics.logEvent(AnalyticsEvents.PAYMENT_FAILED, {
              plan_id: planId,
              stage: "verify",
            });
            setFormError(err instanceof Error ? err.message : "Payment verification failed.");
            router.push("/payment/failure");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            void Analytics.logEvent(AnalyticsEvents.PAYMENT_CANCELLED, { plan_id: planId });
            setLoading(false);
            setFormError("Payment was cancelled. You can try again.");
          },
        },
      });

      razorpay.open();
    } catch (err) {
      setLoading(false);
      void Analytics.logEvent(AnalyticsEvents.PAYMENT_FAILED, {
        plan_id: planId,
        stage: "checkout",
        reason: err instanceof Error ? err.message.slice(0, 80) : "unknown",
      });
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
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
              autoComplete="tel"
              inputMode="numeric"
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

        <p className="mt-6 text-xs leading-relaxed text-text-muted">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-brand-light hover:underline">
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-brand-light hover:underline">
            Privacy Policy
          </Link>
          . Card, UPI and bank details are collected only on Razorpay&apos;s secure checkout.
        </p>

        <div className="mt-4">
          <Button fullWidth size="lg" loading={loading} onClick={startPayment}>
            Continue to Pay · {formatCurrency(plan.price)}
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
