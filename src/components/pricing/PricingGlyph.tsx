import { cn } from "@/lib/utils";

export type PricingGlyphName =
  | "grid"
  | "users"
  | "shield"
  | "clock"
  | "user"
  | "chart"
  | "crown"
  | "building"
  | "infinity"
  | "phone"
  | "cloud"
  | "nodes"
  | "headset";

interface PricingGlyphProps {
  name: PricingGlyphName;
  className?: string;
}

export function PricingGlyph({ name, className }: PricingGlyphProps) {
  const common = cn("size-5 shrink-0", className);

  switch (name) {
    case "grid":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M3.5 19c.6-2.6 2.7-4 5.5-4s4.9 1.4 5.5 4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="17" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M16.2 15c2 .3 3.4 1.4 4.3 4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path
            d="M12 3.5 19 6.2v5.3c0 4.2-2.8 7.2-7 8.9-4.2-1.7-7-4.7-7-8.9V6.2L12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="m8.8 12 2.1 2.1 4.3-4.4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M12 8v4.2l2.8 1.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "user":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M5.5 19.2c.8-3 3-4.7 6.5-4.7s5.7 1.7 6.5 4.7"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path
            d="M4 19h16M7 16l3.2-3.4 2.6 2.2L17 9"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.2 9H17v2.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "crown":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path
            d="m4 16 1.6-8 4.2 3.4L12 6l2.2 5.4L18.4 8 20 16H4Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path d="M5 19h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "building":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path
            d="M5 20V6.5L12 4l7 2.5V20"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path d="M9 20v-4h6v4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path
            d="M9 9h.01M12 9h.01M15 9h.01M9 12.5h.01M12 12.5h.01M15 12.5h.01"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "infinity":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path
            d="M8.2 15.2c-2.2 0-3.7-1.6-3.7-3.2s1.5-3.2 3.7-3.2c2.6 0 3.6 3.2 3.8 3.2s1.2-3.2 3.8-3.2c2.2 0 3.7 1.6 3.7 3.2s-1.5 3.2-3.7 3.2c-2.6 0-3.6-3.2-3.8-3.2s-1.2 3.2-3.8 3.2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M11 17.5h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path
            d="M7.5 17.5h9.2a3.3 3.3 0 0 0 .4-6.6 4.6 4.6 0 0 0-8.8-1.3A3.2 3.2 0 0 0 7.5 17.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "nodes":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <circle cx="7" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="17" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="17" cy="17" r="2.2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="m9 11.2 6-3.2M9 12.8l6 3.2"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "headset":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path
            d="M5 13v-1a7 7 0 0 1 14 0v1"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M5 13.2h2.2A1.3 1.3 0 0 1 8.5 14.5v2.2A1.3 1.3 0 0 1 7.2 18H5.8A1.3 1.3 0 0 1 4.5 16.7v-2.2c0-.7.6-1.3 1.3-1.3h.2ZM19 13.2h-2.2a1.3 1.3 0 0 0-1.3 1.3v2.2c0 .7.6 1.3 1.3 1.3h1.4c.7 0 1.3-.6 1.3-1.3v-2.2c0-.7-.6-1.3-1.3-1.3H19Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M19 18.2c0 1.4-1.4 2.3-3.2 2.3H12"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}
