import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Smaller mark for tight layouts */
  compact?: boolean;
}

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link
      href="/#home"
      className={cn(
        "relative z-10 inline-flex h-9 w-[168px] shrink-0 items-center justify-start overflow-hidden sm:h-10 sm:w-[188px]",
        compact && "h-8 w-[148px] sm:h-9 sm:w-[168px]",
        className,
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <Image
        src="/images/logo/Fitzenix.png"
        alt={siteConfig.name}
        fill
        priority
        sizes="188px"
        className="object-contain object-left"
      />
    </Link>
  );
}
