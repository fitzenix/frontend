import Image from "next/image";

export function HeroApps() {
  return (
    <div className="relative mx-auto w-full max-w-[720px] lg:-mr-4 lg:max-w-none lg:w-[108%] xl:-mr-6 xl:w-[112%]">
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-3xl"
        aria-hidden
      />

      <div className="animate-float relative">
        <Image
          src="/images/hero/hero_mob.png"
          alt="FITZENIX Owner, Trainer and Member mobile apps"
          width={1600}
          height={1200}
          priority
          quality={92}
          sizes="(max-width: 1024px) 96vw, 680px"
          className="relative h-auto w-full scale-[1.06] object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.55)] sm:scale-[1.08] lg:scale-[1.1]"
        />
      </div>
    </div>
  );
}
