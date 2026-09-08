export interface ValueBlock {
  id: string;
  title: string;
  description: string;
}

export const valueBlocks: ValueBlock[] = [
  {
    id: "members",
    title: "Members",
    description: "Manage members, profiles and memberships.",
  },
  {
    id: "attendance",
    title: "Attendance",
    description: "QR check-in, manual attendance and history.",
  },
  {
    id: "money",
    title: "Money",
    description: "Track payments, subscriptions and pending dues.",
  },
  {
    id: "team",
    title: "Team",
    description: "Manage trainers, staff and daily operations.",
  },
];

export interface FeatureCategory {
  id: string;
  title: string;
  items: string[];
}

export const featureCategories: FeatureCategory[] = [
  {
    id: "run",
    title: "Run your gym",
    items: ["Dashboard", "Members", "Staff", "Gym profile"],
  },
  {
    id: "paid",
    title: "Get paid",
    items: ["Membership plans", "Payments", "Billing", "Pending dues", "Finance reports"],
  },
  {
    id: "track",
    title: "Track your gym",
    items: ["Attendance", "QR check-in", "Reports", "Analytics"],
  },
  {
    id: "engage",
    title: "Keep members engaged",
    items: ["Notifications", "Workout tracking", "Progress", "Trainer interaction"],
  },
];

export interface WhyPoint {
  id: string;
  title: string;
  description: string;
}

export const whyPoints: WhyPoint[] = [
  {
    id: "admin",
    title: "Less admin",
    description: "Spend less time managing spreadsheets and registers.",
  },
  {
    id: "visibility",
    title: "More visibility",
    description: "Know your members, money and attendance instantly.",
  },
  {
    id: "experience",
    title: "Better member experience",
    description: "Give members and trainers dedicated mobile apps.",
  },
  {
    id: "scale",
    title: "Ready to scale",
    description: "Start with a small gym and upgrade as you grow.",
  },
];

export const trustItems = [
  "Secure Payments",
  "Protected Data",
  "Reliable Infrastructure",
  "Regular Updates",
  "Web + Mobile Access",
] as const;

export const ownerCapabilities = [
  "Today's attendance",
  "Active members",
  "Expiring memberships",
  "Pending payments",
  "Revenue",
  "New members",
  "Staff activity",
  "Business reports",
] as const;
