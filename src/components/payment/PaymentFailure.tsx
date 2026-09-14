import Link from "next/link";
import { Button } from "@/components/common/Button";

interface PaymentFailureProps {
  onRetry: () => void;
  onClose: () => void;
}

export function PaymentFailure({ onRetry, onClose }: PaymentFailureProps) {
  return (
    <div>
      <p className="text-sm leading-relaxed text-text-secondary">
        Your payment was not successful. You can try again or return to pricing.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <Button fullWidth onClick={onRetry}>
          Try Again
        </Button>
        <Link href="/#pricing" onClick={onClose}>
          <Button variant="outline" fullWidth>
            Return to Pricing
          </Button>
        </Link>
      </div>
    </div>
  );
}
