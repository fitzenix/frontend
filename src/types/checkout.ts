import type { PaidPlanId } from "@/types/pricing";

export interface CheckoutFormValues {
  gymName: string;
  ownerName: string;
  email: string;
  phone: string;
  planId: PaidPlanId;
}

export interface CheckoutFormErrors {
  gymName?: string;
  ownerName?: string;
  email?: string;
  phone?: string;
}
