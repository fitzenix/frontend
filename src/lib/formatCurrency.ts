import type { CurrencyCode } from "@/types/pricing";

export function formatCurrency(
  amount: number,
  currency: CurrencyCode = "INR",
  locale = "en-IN",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Razorpay expects amount in the smallest currency unit (paise for INR). */
export function toSmallestCurrencyUnit(amount: number): number {
  return Math.round(amount * 100);
}
