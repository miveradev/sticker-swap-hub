import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { ArrowLeftRight, ArrowUp, ArrowDown, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TradeOpportunities as TradeOpportunitiesData } from "@/lib/profile/getTradeOpportunities"

interface TradeOpportunitiesProps {
  opportunities: TradeOpportunitiesData
  targetUsername: string
  locale: string
}

export async function TradeOpportunities({ opportunities, targetUsername, locale }: TradeOpportunitiesProps) {
  const t = await getTranslations("profile.tradeOpportunities")

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-lg font-bold tracking-tight text-foreground">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] cursor-default">
          <div className="p-4 flex flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase text-center">{t("canReceive")}</span>
            <div className="flex items-center justify-center gap-3">
              <span className="font-display text-4xl font-black italic text-primary leading-none">{opportunities.canReceiveCount}</span>
              <ArrowUp className="w-5 h-5 text-primary shrink-0" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] cursor-default">
          <div className="p-4 flex flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase text-center">{t("canGive")}</span>
            <div className="flex items-center justify-center gap-3">
              <span className="font-display text-4xl font-black italic text-foreground leading-none">{opportunities.canGiveCount}</span>
              <ArrowDown className="w-5 h-5 text-foreground shrink-0" />
            </div>
          </div>
        </div>

        <div className="bg-primary border border-primary rounded overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] cursor-default">
          <div className="p-4 flex flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-[#0B141C] uppercase text-center">{t("mutual")}</span>
            <div className="flex items-center justify-center gap-3">
              <span className="font-display text-4xl font-black italic text-[#0B141C] leading-none">{opportunities.mutualCount}</span>
              <Handshake className="w-5 h-5 text-[#0B141C] shrink-0" />
            </div>
          </div>
        </div>
      </div>
      <Button
        className="w-full h-auto py-3 text-xs tracking-wide"
        render={<Link href={`/${locale}/swap?user=${targetUsername}`} />}
        nativeButton={false}
      >
        <ArrowLeftRight className="w-3.5 h-3.5" />
        {t("cta")}
      </Button>
    </section>
  )
}
