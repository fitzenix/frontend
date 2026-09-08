import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  image: string;
  title: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function PhoneMockup({
  image,
  title,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 240px, 280px",
}: PhoneMockupProps) {
  return (
    <figure className={cn("phone-frame relative mx-auto w-[220px] sm:w-[260px]", className)}>
      <div className="relative aspect-[9/19] w-full overflow-hidden bg-black">
        <Image
          src={image}
          alt={alt ?? title}
          fill
          sizes={sizes}
          priority={priority}
          quality={85}
          className="object-cover object-top"
        />
      </div>
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  );
}
