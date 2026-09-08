import type { PlanId } from "@/types/pricing";

export interface CheckoutFormValues {
  gymName: string;
  ownerName: string;
  email: string;
  phone: string;
  planId: PlanId;
}

export interface CheckoutFormErrors {
  gymName?: string;
  ownerName?: string;
  email?: string;
  phone?: string;
}
