import { Container } from "@/components/common/Container";

const trustStats = [
  { label: "Built for modern gyms", value: "Owner + Trainer + Member" },
  { label: "Members managed", value: "Scalable CRM", note: "Placeholder capacity" },
  { label: "Platform reliability", value: "99.9%*", note: "Target uptime" },
  { label: "Payments", value: "Secure checkout" },
] as const;

export function TrustSection() {
  return (
    <section aria-label="Trust indicators" className="border-y border-border bg-surface/40">
      <Container className="py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustStats.map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <p className="text-sm font-semibold text-white">{item.value}</p>
              <p className="mt-1 text-xs text-text-muted">{item.label}</p>
              {"note" in item && item.note ? (
                <p className="mt-1 text-[11px] text-text-muted/80">{item.note}</p>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
