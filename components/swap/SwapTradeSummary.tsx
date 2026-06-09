import { getTranslations } from "next-intl/server"
import { ArrowUp, ArrowDown, Handshake } from "lucide-react"

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
        <div className="p-4 flex flex-col gap-3">
          <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase text-center">{t("canReceive")}</span>
          <div className="flex items-center justify-center gap-3">
            <span className="font-display text-4xl font-black italic text-primary leading-none">{canReceive}</span>
            <ArrowUp className="w-5 h-5 text-primary shrink-0" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] cursor-default">
        <div className="p-4 flex flex-col gap-3">
          <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase text-center">{t("canGive")}</span>
          <div className="flex items-center justify-center gap-3">
            <span className="font-display text-4xl font-black italic text-foreground leading-none">{canGive}</span>
            <ArrowDown className="w-5 h-5 text-foreground shrink-0" />
          </div>
        </div>
      </div>

      <div className="bg-primary border border-primary rounded overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] cursor-default">
        <div className="p-4 flex flex-col gap-3">
          <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-[#0B141C] uppercase text-center">{t("mutual")}</span>
          <div className="flex items-center justify-center gap-3">
            <span className="font-display text-4xl font-black italic text-[#0B141C] leading-none">{mutual}</span>
            <Handshake className="w-5 h-5 text-[#0B141C] shrink-0" />
          </div>
        </div>
      </div>
    </section>
  )
}
