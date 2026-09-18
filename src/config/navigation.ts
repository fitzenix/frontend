export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: "Product", href: "/#product" },
  { label: "Features", href: "/#features" },
  { label: "Apps", href: "/#apps" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export const footerProductLinks: NavItem[] = [
  { label: "Features", href: "/#features" },
  { label: "Owner App", href: "/#owner" },
  { label: "Trainer App", href: "/#apps" },
  { label: "Member App", href: "/#apps" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Gym Management App", href: "/gym-management-app" },
];

export const footerCompanyLinks: NavItem[] = [
  { label: "About FITZENIX", href: "/about-fitzenix" },
  { label: "Gym Management Software", href: "/gym-management-software" },
  { label: "Member Management", href: "/gym-member-management-software" },
  { label: "Attendance Software", href: "/gym-attendance-software" },
  { label: "Contact", href: "/#contact" },
];

export const footerSupportLinks: NavItem[] = [
  { label: "FAQ", href: "/#faq" },
  { label: "Help", href: `mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@fitzenix.app"}` },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];
