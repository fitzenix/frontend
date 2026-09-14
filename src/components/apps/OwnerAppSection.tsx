import { ownerApp } from "@/config/apps";
import { AppShowcaseSection } from "@/components/apps/AppShowcaseSection";

export function OwnerAppSection() {
  return <AppShowcaseSection app={ownerApp} id="owner-app" />;
}

export function TrainerAppSection() {
  return (
    <AppShowcaseSection
      app={{
        ...ownerApp,
        id: "trainer",
        name: "Trainer App",
        tagline: "Manage the people.",
        description: "Manage workouts and members.",
        ctaText: "Explore Trainer App",
        image: "/images/apps/one_platform_mob.png",
        imageAlt: "FITZENIX Trainer app",
      }}
      reverse
      id="trainer-app"
    />
  );
}

export function MemberAppSection() {
  return (
    <AppShowcaseSection
      app={{
        ...ownerApp,
        id: "member",
        name: "Member App",
        tagline: "Improve the experience.",
        description: "Track workouts and fitness progress.",
        ctaText: "Explore Member App",
        image: "/images/apps/one_platform_mob.png",
        imageAlt: "FITZENIX Member app",
      }}
      id="member-app"
    />
  );
}
