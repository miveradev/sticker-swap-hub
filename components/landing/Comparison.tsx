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
      <span className="bg-muted text-foreground text-xs font-medium tracking-wide px-2 py-1 rounded border border-border">
        {code}
      </span>
    )
  }
  return (
    <span className="bg-muted text-muted-foreground text-xs font-medium tracking-wide px-2 py-1 rounded">
      {code}
    </span>
  )
}

function CollectorColumn({
  initial,
  name,
  missing,
  duplicates,
}: {
  initial: string
  name: string
  missing: string[]
  duplicates: string[]
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-muted pb-2">
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground">
          {initial}
        </div>
        <span className="text-lg font-medium tracking-tight text-foreground">{name}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
            Missing
          </span>
          <div className="flex flex-wrap gap-1">
            {missing.map((code) => (
              <StickerChip key={code} code={code} variant="missing" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
            Duplicates
          </span>
          <div className="flex flex-wrap gap-1">
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
    <div className="bg-background border border-muted rounded p-4 flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">
        {leftLabel} <span className="text-foreground font-medium">{leftCode}</span>
      </span>
      <ArrowLeftRight className="w-4 h-4 text-muted-foreground shrink-0" />
      <span className="text-sm text-muted-foreground">
        {rightLabel} <span className="text-foreground font-medium">{rightCode}</span>
      </span>
    </div>
  )
}

export function Comparison() {
  return (
    <div className="w-full max-w-5xl mt-12 bg-card border border-border rounded-lg p-8 flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CollectorColumn
          initial="M"
          name="Mike's Collection"
          missing={["ESP 5", "ESP 9", "BRA 11"]}
          duplicates={["GER 12", "POR 4"]}
        />
        <CollectorColumn
          initial="A"
          name="Alex's Collection"
          missing={["GER 12", "POR 4"]}
          duplicates={["ESP 5", "BRA 11"]}
        />
      </div>
      <div className="border-t border-muted pt-8 flex flex-col gap-4">
        <span className="text-lg font-medium tracking-tight text-foreground">Possible Trades (4)</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TradeRow
            leftLabel="Mike gives"
            leftCode="GER 12"
            rightLabel="Alex gets"
            rightCode="GER 12"
          />
          <TradeRow
            leftLabel="Mike gets"
            leftCode="ESP 5"
            rightLabel="Alex gives"
            rightCode="ESP 5"
          />
        </div>
      </div>
    </div>
  )
}
