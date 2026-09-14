import Link from "next/link";
import { Button } from "@/components/common/Button";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
      <Link href="/#pricing" className="block">
        <Button fullWidth>Choose Your Plan</Button>
      </Link>
    </div>
  );
}
