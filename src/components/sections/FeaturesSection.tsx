"use client";

import { useState } from "react";
import { featureCategories } from "@/config/features";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { cn } from "@/lib/utils";

export function FeaturesSection() {
  const [activeId, setActiveId] = useState(featureCategories[0]?.id ?? "run");
  const active = featureCategories.find((category) => category.id === activeId) ?? featureCategories[0];

  return (
    <section id="features" className="section-pad">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Features</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built around the problems gym owners solve every day.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible" role="tablist">
            {featureCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={category.id === activeId}
                onClick={() => setActiveId(category.id)}
                className={cn(
                  "shrink-0 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors",
                  category.id === activeId
                    ? "border-brand/50 bg-brand/10 text-white"
                    : "border-border bg-[#111111] text-text-secondary hover:text-white",
                )}
              >
                {category.title}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            className="rounded-2xl border border-border bg-[#111111] p-6 sm:p-8"
          >
            <h3 className="font-display text-2xl font-bold text-white">{active.title}</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {active.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-border/80 bg-background/50 px-4 py-3 text-sm text-text-secondary"
                >
                  <span className="text-brand">
                    <Icon name="check" className="size-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
