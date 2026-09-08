import type { PlanId } from "./pricing";

export interface CreateOrderRequest {
  planId: PlanId;
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  planId: PlanId;
  planName: string;
  keyId: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  planId: PlanId;
}

export interface VerifyPaymentResponse {
  success: boolean;
  planId: PlanId;
  planName: string;
  amount: number;
  currency: string;
  orderId: string;
  paymentId: string;
}

export interface PaymentErrorResponse {
  success: false;
  message: string;
}

export type CheckoutStatus = "idle" | "confirming" | "processing" | "success" | "failure";
