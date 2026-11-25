import Link from "next/link";
import {
  footerCompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-[#050505]">
      <Container className="section-pad !pb-8 !pt-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
              Gym management software and app for Indian gym owners on{" "}
              <span className="text-white">www.fitzenix.app</span> — members, QR attendance,
              payments, trainers and reports. Not a shopping store.
            </p>
            <p className="mt-4 text-sm text-text-muted">
              <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-white">
                {siteConfig.supportEmail}
              </a>
            </p>
            <p className="mt-2 text-sm text-text-muted">{siteConfig.address.line}</p>
          </div>

          <FooterColumn title="Product" links={footerProductLinks} />
          <FooterColumn title="Company" links={footerCompanyLinks} />
          <FooterColumn title="Support" links={footerSupportLinks} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted">
            Secure checkout via Razorpay · Receipts via Zoho ZeptoMail ·{" "}
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            {" · "}
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </p>
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
