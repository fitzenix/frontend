export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

/**
 * Keep social URLs empty until official profiles are ready.
 * Footer only renders links with a real href.
 */
export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE ?? "",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? "",
  },
];

export const activeSocialLinks = socialLinks.filter((link) => Boolean(link.href));
