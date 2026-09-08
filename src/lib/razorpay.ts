import crypto from "crypto";
import Razorpay from "razorpay";
import { getPlanById } from "@/config/pricing";
import { toSmallestCurrencyUnit } from "@/lib/formatCurrency";
import type { PlanId } from "@/types/pricing";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getRazorpayKeyId(): string {
  return requireEnv("NEXT_PUBLIC_RAZORPAY_KEY_ID");
}

export function getRazorpayClient(): Razorpay {
  return new Razorpay({
    key_id: getRazorpayKeyId(),
    key_secret: requireEnv("RAZORPAY_KEY_SECRET"),
  });
}

export async function createRazorpayOrder(planId: PlanId) {
  const plan = getPlanById(planId);
  if (!plan) {
    throw new Error("Invalid plan");
  }

  const amount = toSmallestCurrencyUnit(plan.price);
  const client = getRazorpayClient();

  const order = await client.orders.create({
    amount,
    currency: plan.currency,
    receipt: `fitzenix_${planId}_${Date.now()}`,
    notes: {
      planId: plan.id,
      planName: plan.name,
    },
  });

  return {
    order,
    plan,
    amount,
  };
}

export function verifyRazorpaySignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const secret = requireEnv("RAZORPAY_KEY_SECRET");
  const payload = `${params.orderId}|${params.paymentId}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  const expectedBuffer = Buffer.from(expected, "utf8");
  const signatureBuffer = Buffer.from(params.signature, "utf8");

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}
