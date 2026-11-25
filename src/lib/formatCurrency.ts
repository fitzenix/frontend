import type { CurrencyCode } from "@/types/pricing";

/**
 * Deterministic currency formatting for SSR + client hydration.
 * Avoids `Intl` currency-style mismatches (e.g. `₹499` vs `₹ 499`).
 */
export function formatCurrency(
  amount: number,
  currency: CurrencyCode = "INR",
  locale = "en-IN",
): string {
  const number = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    useGrouping: true,
  }).format(Math.round(amount));

  switch (currency) {
    case "INR":
      return `₹${number}`;
    default:
      return `${currency} ${number}`;
  }
}

/** Razorpay expects amount in the smallest currency unit (paise for INR). */
export function toSmallestCurrencyUnit(amount: number): number {
  return Math.round(amount * 100);
}
