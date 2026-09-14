import { heroSnapshot } from "@/config/apps";

export function OwnerSnapshot() {
  return (
    <aside
      className="w-full max-w-[280px] rounded-2xl border border-border bg-[#111111]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-sm"
      aria-label="Example owner dashboard metrics"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
        {heroSnapshot.title}
      </p>
      <p className="mt-1 text-[11px] text-text-muted">{heroSnapshot.label}</p>

      <dl className="mt-4 space-y-3">
        {heroSnapshot.metrics.map((metric) => (
          <div key={metric.id} className="flex items-end justify-between gap-3">
            <div>
              <dt className="text-xs text-text-secondary">{metric.label}</dt>
              <dd className="mt-0.5 font-display text-xl font-bold text-white">{metric.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </aside>
  );
}
