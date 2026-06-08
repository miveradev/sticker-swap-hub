import { getTranslations } from "next-intl/server"
import { ArrowDownLeft, ArrowUpRight, Handshake } from "lucide-react"
import { Card } from "@/components/ui/card"

interface SwapTradeSummaryProps {
  canReceive: number
  canGive: number
  mutual: number
}

export async function SwapTradeSummary({ canReceive, canGive, mutual }: SwapTradeSummaryProps) {
  const t = await getTranslations("swap.summary")

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <Card className="py-0 gap-0 ring-0 border border-border rounded-xl p-4 flex flex-col gap-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
        <div className="flex justify-between items-start">
          <span className="text-xs font-medium text-muted-foreground">{t("canReceive")}</span>
          <ArrowDownLeft className="w-4 h-4 text-muted-foreground" />
        </div>
        <span className="text-3xl font-semibold tracking-tight text-foreground">{canReceive}</span>
        <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          {t("stickersYouNeed")}
        </span>
      </Card>

      <Card className="py-0 gap-0 ring-0 border border-border rounded-xl p-4 flex flex-col gap-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
        <div className="flex justify-between items-start">
          <span className="text-xs font-medium text-muted-foreground">{t("canGive")}</span>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
        </div>
        <span className="text-3xl font-semibold tracking-tight text-foreground">{canGive}</span>
        <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          {t("stickersTheyNeed")}
        </span>
      </Card>

      <Card className="py-0 gap-0 ring-0 border border-foreground/20 rounded-xl p-4 flex flex-col gap-2 bg-muted transition-transform duration-200 hover:scale-105 cursor-pointer">
        <div className="flex justify-between items-start">
          <span className="text-xs font-medium text-foreground">{t("mutual")}</span>
          <Handshake className="w-4 h-4 text-foreground" />
        </div>
        <span className="text-3xl font-semibold tracking-tight text-foreground">{mutual}</span>
        <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          {t("twoWayExchanges")}
        </span>
      </Card>
    </section>
  )
}
