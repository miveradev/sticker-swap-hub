"use client"

import { useTranslations } from "next-intl"

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-card border border-border p-6 rounded flex flex-col gap-2 relative overflow-hidden">
      <span className="font-display text-5xl font-black italic tracking-tight text-primary leading-none">
        {value}
      </span>
      <span className="font-mono text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  )
}

export function Stats() {
  const t = useTranslations("landing.stats")

  return (
    <section className="max-w-7xl mx-auto px-8 flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-3 max-w-2xl">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">{t("title")}</h2>
        <p className="text-base text-muted-foreground leading-relaxed">{t("subtitle")}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard value="980" label={t("stickers")} />
        <StatCard value="48" label={t("teams")} />
        <StatCard value="8" label={t("sections")} />
      </div>
    </section>
  )
}
