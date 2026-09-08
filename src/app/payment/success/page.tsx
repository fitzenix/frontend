import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";

export const metadata: Metadata = {
  title: "Welcome to FITZENIX",
  robots: { index: false, follow: false },
};

interface SuccessPageProps {
  searchParams: Promise<{
    plan?: string;
    amount?: string;
    paymentId?: string;
    orderId?: string;
    gym?: string;
  }>;
}

export default async function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const amount = Number(params.amount ?? 0);

  return (
    <Container className="section-pad max-w-lg text-center">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Payment successful</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-white">Welcome to FITZENIX</h1>
      <p className="mt-3 text-text-secondary">Your gym workspace is ready.</p>

      <dl className="mt-8 space-y-3 rounded-2xl border border-border bg-[#111111] p-5 text-left text-sm">
        {params.gym ? (
          <div className="flex justify-between gap-4">
            <dt className="text-text-muted">Gym</dt>
            <dd className="font-medium text-white">{params.gym}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Plan</dt>
          <dd className="font-medium text-white">{params.plan ?? "—"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Amount</dt>
          <dd className="font-medium text-white">
            {amount > 0 ? formatCurrency(amount) : "—"}
          </dd>
        </div>
        {params.paymentId ? (
          <div className="flex justify-between gap-4">
            <dt className="text-text-muted">Payment ID</dt>
            <dd className="truncate font-mono text-xs text-text-secondary">{params.paymentId}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-8 flex flex-col gap-3">
        <a href={siteConfig.continueUrl}>
          <Button fullWidth>Open Owner App</Button>
        </a>
        <Link href={siteConfig.appDownloadUrl}>
          <Button variant="outline" fullWidth>
            Download Mobile App
          </Button>
        </Link>
        <p className="text-xs text-text-muted">
          Next: sign in with your email, add your first members, and set up QR attendance.
        </p>
      </div>
    </Container>
  );
}
