import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Wide wordmark — used in navbar, footer, and site chrome. */
export const SITE_WORDMARK_SRC = "/images/logo/Fitzenix.png";

/** Square F mark — used for favicon / Google SERP (see layout metadata + JSON-LD). */
export const SITE_MARK_SRC = "/images/logo/fitzenix-mark.png";

interface LogoProps {
  className?: string;
  /** Smaller mark for tight layouts */
  compact?: boolean;
}

/**
 * Site wordmark (Fitzenix.png) for navbar / footer / body chrome.
 * Favicon + Google search list icon use the square F mark separately.
 */
export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link
      href="/#home"
      className={cn(
        "relative z-10 inline-flex h-9 w-[168px] shrink-0 items-center justify-start sm:h-10 sm:w-[196px]",
        compact && "h-8 w-[148px] sm:h-9 sm:w-[168px]",
        className,
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <Image
        src={SITE_WORDMARK_SRC}
        alt={siteConfig.name}
        width={500}
        height={116}
        priority
        sizes="196px"
        className="h-full w-auto object-contain object-left"
      />
    </Link>
  );
}
