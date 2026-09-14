export type AppRole = "owner" | "trainer" | "member";

export interface AppCapability {
  id: string;
  label: string;
}

export interface AppShowcase {
  id: AppRole;
  name: string;
  tagline: string;
  description: string;
  capabilities: AppCapability[];
  ctaText: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
}

export interface EcosystemApp {
  id: AppRole;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}
