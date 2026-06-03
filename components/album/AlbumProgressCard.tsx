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
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-end mb-4">
        <span className="text-md font-semibold text-muted-foreground uppercase tracking-widest">
          {t("label")}
        </span>
        <span className="text-xl font-bold uppercase tracking-widest text-foreground tabular-nums">
          {percentage}%
        </span>
      </div>

      <div className="w-full bg-muted h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-foreground h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        <span className="font-bold text-foreground">{owned}</span>
        {" "}{t("of")}{" "}
        <span className="font-bold text-foreground">{total}</span>
        {" "}{t("stickersCollected")}{" "}
        {t("youNeed")}{" "}
        <span className="font-medium text-foreground">{remaining}</span>
        {" "}{t("moreToComplete")}
      </p>
    </div>
  )
}
