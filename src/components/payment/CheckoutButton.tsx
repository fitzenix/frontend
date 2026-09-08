"use client";

import { useCallback, useState } from "react";
import type { PlanId } from "@/types/pricing";
import type { CreateOrderResponse, VerifyPaymentResponse } from "@/types/payment";
import { getPlanById } from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";
import { RAZORPAY_SCRIPT_URL } from "@/lib/constants";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { PaymentSuccess } from "@/components/payment/PaymentSuccess";
import { PaymentFailure } from "@/components/payment/PaymentFailure";
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

interface CheckoutButtonProps {
  planId: PlanId;
  label: string;
  className?: string;
  variant?: "primary" | "outline";
}

export function CheckoutButton({
  planId,
  label,
  className,
  variant = "primary",
}: CheckoutButtonProps) {
  const plan = getPlanById(planId);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<VerifyPaymentResponse | null>(null);
  const [failed, setFailed] = useState(false);

  const startCheckout = useCallback(async () => {
    if (!plan) return;

    setLoading(true);
    setFailed(false);

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

      const scriptReady = await loadRazorpayScript();
      if (!scriptReady || !window.Razorpay) {
        throw new Error("script_failed");
      }

      setConfirmOpen(false);

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "FITZENIX",
        description: `${orderData.planName} plan`,
        order_id: orderData.orderId,
        theme: { color: "#D90429" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                planId,
              }),
            });

            const verifyData = (await verifyRes.json()) as
              | VerifyPaymentResponse
              | { message?: string };

            if (!verifyRes.ok || !("success" in verifyData) || !verifyData.success) {
              setFailed(true);
              return;
            }

            setSuccess(verifyData);
          } catch {
            setFailed(true);
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setFailed(true);
          },
        },
      });

      razorpay.open();
    } catch {
      setLoading(false);
      setConfirmOpen(false);
      setFailed(true);
    }
  }, [plan, planId]);

  if (!plan) return null;

  return (
    <>
      <Button
        className={className}
        variant={variant}
        fullWidth
        onClick={() => {
          setFailed(false);
          setConfirmOpen(true);
        }}
      >
        {label}
      </Button>

      <Modal
        open={confirmOpen}
        onClose={() => {
          if (!loading) setConfirmOpen(false);
        }}
        title="Confirm checkout"
      >
        <p className="text-sm text-text-secondary">
          You are purchasing the <span className="text-white">{plan.name}</span> plan for{" "}
          <span className="text-white">{formatCurrency(plan.price, plan.currency)}</span> / month.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            fullWidth
            disabled={loading}
            onClick={() => setConfirmOpen(false)}
          >
            Cancel
          </Button>
          <Button fullWidth loading={loading} onClick={startCheckout}>
            Continue to Pay
          </Button>
        </div>
      </Modal>

      <Modal open={Boolean(success)} onClose={() => setSuccess(null)} title="Payment Successful">
        {success ? <PaymentSuccess data={success} onClose={() => setSuccess(null)} /> : null}
      </Modal>

      <Modal open={failed && !success} onClose={() => setFailed(false)} title="Payment wasn't completed">
        <PaymentFailure
          onRetry={() => {
            setFailed(false);
            setConfirmOpen(true);
          }}
          onClose={() => setFailed(false)}
        />
      </Modal>
    </>
  );
}
