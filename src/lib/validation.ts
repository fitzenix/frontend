import { z } from "zod";

/** Paid checkout only — trial is not a Razorpay plan */
export const planIdSchema = z.enum(["starter", "growth", "pro"]);

export const createOrderSchema = z.object({
  planId: planIdSchema,
});

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  planId: planIdSchema,
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
