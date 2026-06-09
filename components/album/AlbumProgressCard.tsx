"use client"

import { useTranslations } from "next-intl"

interface AlbumProgressCardProps {
  owned: number
  total: number
}

export function AlbumProgressCard({ owned, total }: AlbumProgressCardProps) {
  const t = useTranslations("album.progress")
  const percentage = total > 0 ? Math.round((owned / total) * 100) : 0
  const remaining = total - owned

  return (
    <div className="bg-card border border-border rounded p-6">
      <div className="flex justify-between items-end mb-4">
        <span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
          {t("label")}
        </span>
        <span className="font-display text-3xl font-black italic text-primary leading-none tabular-nums">
          {percentage}%
        </span>
      </div>

      <div className="w-full bg-muted/60 h-1.5 rounded-full overflow-hidden mb-6">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percentage}%`,
            background: "#A3E635",
            boxShadow: "0 0 8px rgba(163, 230, 53, 0.5)",
          }}
        />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        <span className="font-semibold text-foreground">{owned}</span>
        {" "}{t("of")}{" "}
        <span className="font-semibold text-foreground">{total}</span>
        {" "}{t("stickersCollected")}{" "}
        {t("youNeed")}{" "}
        <span className="font-semibold text-primary">{remaining}</span>
        {" "}{t("moreToComplete")}
      </p>
    </div>
  )
}
