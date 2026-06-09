import { getTranslations } from "next-intl/server"
import { ArrowDownLeft, ArrowUpRight, Handshake } from "lucide-react"

interface SwapTradeSummaryProps {
  canReceive: number
  canGive: number
  mutual: number
}

export async function SwapTradeSummary({ canReceive, canGive, mutual }: SwapTradeSummaryProps) {
  const t = await getTranslations("swap.summary")

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="bg-card border border-border rounded overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] cursor-default">
        <div className="h-[2px] w-full bg-primary" />
        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">{t("canReceive")}</span>
            <ArrowDownLeft className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display text-4xl font-black italic text-primary leading-none">{canReceive}</span>
          <span className="font-mono text-[9px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            {t("stickersYouNeed")}
          </span>
        </div>
      </div>

      <div className="bg-card border border-border rounded overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] cursor-default">
        <div className="h-[2px] w-full bg-primary" />
        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">{t("canGive")}</span>
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display text-4xl font-black italic text-primary leading-none">{canGive}</span>
          <span className="font-mono text-[9px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            {t("stickersTheyNeed")}
          </span>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/30 rounded overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] cursor-default">
        <div className="h-[2px] w-full bg-primary" />
        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-primary/80 uppercase">{t("mutual")}</span>
            <Handshake className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display text-4xl font-black italic text-primary leading-none">{mutual}</span>
          <span className="font-mono text-[9px] font-semibold tracking-[0.12em] text-primary/60 uppercase">
            {t("twoWayExchanges")}
          </span>
        </div>
      </div>
    </section>
  )
}
