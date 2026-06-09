"use client"

import { useTranslations } from "next-intl"
import { ArrowLeftRight } from "lucide-react"

function StickerChip({
  code,
  variant,
}: {
  code: string
  variant: "missing" | "duplicate"
}) {
  if (variant === "duplicate") {
    return (
      <span className="bg-primary/15 text-primary font-mono text-xs font-semibold tracking-wide px-2 py-0.5 rounded border border-primary/30">
        {code}
      </span>
    )
  }
  return (
    <span className="bg-muted text-muted-foreground font-mono text-xs font-semibold tracking-wide px-2 py-0.5 rounded border border-border/50">
      {code}
    </span>
  )
}

function CollectorColumn({
  initial,
  name,
  missing,
  duplicates,
  missingLabel,
  duplicatesLabel,
}: {
  initial: string
  name: string
  missing: string[]
  duplicates: string[]
  missingLabel: string
  duplicatesLabel: string
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <div className="w-8 h-8 rounded bg-card border border-primary/30 flex items-center justify-center font-mono text-xs font-bold text-primary">
          {initial}
        </div>
        <span className="font-display text-base font-bold tracking-tight text-foreground">{name}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            {missingLabel}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {missing.map((code) => (
              <StickerChip key={code} code={code} variant="missing" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            {duplicatesLabel}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {duplicates.map((code) => (
              <StickerChip key={code} code={code} variant="duplicate" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TradeRow({
  leftLabel,
  leftCode,
  rightLabel,
  rightCode,
}: {
  leftLabel: string
  leftCode: string
  rightLabel: string
  rightCode: string
}) {
  return (
    <div className="bg-primary/5 border border-primary/15 rounded p-4 flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">
        {leftLabel} <span className="font-mono font-semibold text-foreground">{leftCode}</span>
      </span>
      <ArrowLeftRight className="w-4 h-4 text-primary shrink-0" />
      <span className="text-sm text-muted-foreground">
        {rightLabel} <span className="font-mono font-semibold text-foreground">{rightCode}</span>
      </span>
    </div>
  )
}

export function Comparison() {
  const t = useTranslations("landing.comparison")

  return (
    <div id="comparison" className="w-full max-w-5xl bg-card border border-border rounded p-8 flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CollectorColumn
          initial="M"
          name={t("collectorName", { name: "Mike" })}
          missing={["ESP 5", "ESP 9", "BRA 11"]}
          duplicates={["GER 12", "POR 4"]}
          missingLabel={t("missing")}
          duplicatesLabel={t("duplicates")}
        />
        <CollectorColumn
          initial="A"
          name={t("collectorName", { name: "Alex" })}
          missing={["GER 12", "POR 4"]}
          duplicates={["ESP 5", "BRA 11"]}
          missingLabel={t("missing")}
          duplicatesLabel={t("duplicates")}
        />
      </div>
      <div className="border-t border-border pt-8 flex flex-col gap-4">
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          {t("possibleTrades", { count: 4 })}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TradeRow
            leftLabel={t("gives", { name: "Mike" })}
            leftCode="GER 12"
            rightLabel={t("gets", { name: "Alex" })}
            rightCode="GER 12"
          />
          <TradeRow
            leftLabel={t("gets", { name: "Mike" })}
            leftCode="ESP 5"
            rightLabel={t("gives", { name: "Alex" })}
            rightCode="ESP 5"
          />
        </div>
      </div>
    </div>
  )
}
