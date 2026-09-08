import { NextResponse } from "next/server";
import { getPlanById } from "@/config/pricing";
import { RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS } from "@/lib/constants";
import { rateLimit } from "@/lib/rateLimit";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { verifyPaymentSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const limited = rateLimit(`verify:${ip}`, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS);
    if (!limited.success) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    const body: unknown = await request.json();
    const parsed = verifyPaymentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid payment details." },
        { status: 400 },
      );
    }

    const plan = getPlanById(parsed.data.planId);
    if (!plan) {
      return NextResponse.json(
        { success: false, message: "Invalid plan selected." },
        { status: 400 },
      );
    }

    const valid = verifyRazorpaySignature({
      orderId: parsed.data.razorpay_order_id,
      paymentId: parsed.data.razorpay_payment_id,
      signature: parsed.data.razorpay_signature,
    });

    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed." },
        { status: 400 },
      );
    }

    // Amount is always derived from server-side plan config — never from the client.
    return NextResponse.json({
      success: true,
      planId: plan.id,
      planName: plan.name,
      amount: plan.price,
      currency: plan.currency,
      orderId: parsed.data.razorpay_order_id,
      paymentId: parsed.data.razorpay_payment_id,
    });
  } catch (error) {
    console.error("[payment/verify]", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
