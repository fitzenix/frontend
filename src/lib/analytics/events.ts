/**
 * Canonical web Analytics event names — aligned with Fitzenix mobile app.
 */
export const AnalyticsEvents = {
  LOGIN_STARTED: "login_started",
  LOGIN_SUCCESS: "login_success",
  LOGIN_FAILED: "login_failed",
  SIGNUP_STARTED: "signup_started",
  SIGNUP_SUCCESS: "signup_success",
  SIGNUP_FAILED: "signup_failed",
  EMAIL_VERIFY_STARTED: "email_verify_started",
  EMAIL_VERIFY_SUCCESS: "email_verify_success",
  EMAIL_VERIFY_FAILED: "email_verify_failed",
  LOGOUT: "logout",
  CHECKOUT_STARTED: "checkout_started",
  PAYMENT_INITIATED: "payment_initiated",
  PAYMENT_SUCCESS: "payment_success",
  PAYMENT_FAILED: "payment_failed",
  PAYMENT_CANCELLED: "payment_cancelled",
} as const;

export type AnalyticsEventName = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];
