export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: FeatureIconName;
}

export type FeatureIconName =
  | "members"
  | "attendance"
  | "finance"
  | "plans"
  | "trainers"
  | "reports"
  | "notifications"
  | "mobile";
