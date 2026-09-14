import Link from "next/link";
import type { VerifyPaymentResponse } from "@/types/payment";
import { siteConfig } from "@/config/site";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/common/Button";

interface PaymentSuccessProps {
  data: VerifyPaymentResponse;
  onClose: () => void;
}

export function PaymentSuccess({ data, onClose }: PaymentSuccessProps) {
  return (
    <div>
      <p className="text-sm leading-relaxed text-text-secondary">
        Welcome to FITZENIX. Your plan has been activated successfully.
      </p>

      <dl className="mt-5 space-y-3 rounded-xl border border-border bg-background p-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Plan</dt>
          <dd className="font-medium text-white">{data.planName}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Amount</dt>
          <dd className="font-medium text-white">
            {formatCurrency(data.amount, data.currency as "INR")}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Payment ID</dt>
          <dd className="truncate font-mono text-xs text-text-secondary">{data.paymentId}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Order ID</dt>
          <dd className="truncate font-mono text-xs text-text-secondary">{data.orderId}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-3">
        <Link href={siteConfig.continueUrl} onClick={onClose}>
          <Button fullWidth>Continue to FITZENIX</Button>
        </Link>
        <Link href={siteConfig.appDownloadUrl} onClick={onClose}>
          <Button variant="outline" fullWidth>
            Download Mobile App
          </Button>
        </Link>
      </div>
    </div>
  );
}
