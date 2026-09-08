import { NextResponse } from "next/server";
import { createRazorpayOrder, getRazorpayKeyId } from "@/lib/razorpay";
import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS } from "@/lib/constants";
import { createOrderSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const limited = rateLimit(`create-order:${ip}`, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS);
    if (!limited.success) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    const body: unknown = await request.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid plan selected." },
        { status: 400 },
      );
    }

    const { order, plan, amount } = await createRazorpayOrder(parsed.data.planId);

    return NextResponse.json({
      orderId: order.id,
      amount,
      currency: plan.currency,
      planId: plan.id,
      planName: plan.name,
      keyId: getRazorpayKeyId(),
    });
  } catch (error) {
    console.error("[payment/create-order]", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
