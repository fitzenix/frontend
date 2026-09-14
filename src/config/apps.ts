import type { AppShowcase, EcosystemApp } from "@/types/app";

export const ownerApp: AppShowcase = {
  id: "owner",
  name: "Owner App",
  tagline: "Your gym. At a glance.",
  description:
    "Know what's happening in your gym without being at your desk.",
  capabilities: [
    { id: "attendance", label: "Today's attendance" },
    { id: "members", label: "Active members" },
    { id: "expiring", label: "Expiring memberships" },
    { id: "payments", label: "Pending payments" },
    { id: "revenue", label: "Revenue" },
    { id: "new", label: "New members" },
    { id: "staff", label: "Staff activity" },
    { id: "reports", label: "Business reports" },
  ],
  ctaText: "Explore Owner App",
  ctaHref: "/#pricing",
  image: "/images/hero/hero_mobile.png",
  imageAlt: "FITZENIX Owner dashboard on mobile",
};

export const ecosystemApps: EcosystemApp[] = [
  {
    id: "owner",
    name: "Owner App",
    description: "Run the business.",
    image: "/images/hero/hero_mobile.png",
    imageAlt: "FITZENIX Owner app",
  },
  {
    id: "trainer",
    name: "Trainer App",
    description: "Manage the people.",
    image: "/images/apps/one_platform_mob.png",
    imageAlt: "FITZENIX Trainer app",
  },
  {
    id: "member",
    name: "Member App",
    description: "Improve the experience.",
    image: "/images/apps/one_platform_mob.png",
    imageAlt: "FITZENIX Member app",
  },
];

export const heroSnapshot = {
  label: "Demo snapshot — example metrics",
  title: "This month",
  metrics: [
    { id: "revenue", value: "₹12.48L", label: "Revenue tracked" },
    { id: "members", value: "428", label: "Active members" },
    { id: "attendance", value: "92%", label: "Attendance" },
  ],
} as const;
