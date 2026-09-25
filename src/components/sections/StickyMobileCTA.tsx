import { DemoRequestTrigger } from "@/components/demo/DemoRequestTrigger";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
      <DemoRequestTrigger fullWidth label="Book a free demo" />
    </div>
  );
}
