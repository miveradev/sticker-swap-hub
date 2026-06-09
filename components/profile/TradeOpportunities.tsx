import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TradeOpportunities as TradeOpportunitiesData } from "@/lib/profile/getTradeOpportunities"

interface TradeOpportunitiesProps {
  opportunities: TradeOpportunitiesData
  targetUsername: string
  locale: string
}

export async function TradeOpportunities({ opportunities, targetUsername, locale }: TradeOpportunitiesProps) {
  const t = await getTranslations("profile.tradeOpportunities")

  const items = [
    { value: String(opportunities.canReceiveCount), label: t("canReceive") },
    { value: String(opportunities.canGiveCount), label: t("canGive") },
    { value: String(opportunities.mutualCount), label: t("mutual") },
  ]

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-lg font-bold tracking-tight text-foreground">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-card border border-border rounded overflow-hidden flex flex-col items-center text-center relative"
          >
            <div className="h-[2px] w-full bg-primary" />
            <div className="p-4 flex flex-col gap-1 items-center">
              <span className="font-display text-2xl font-black italic text-primary leading-none">
                {item.value}
              </span>
              <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                {item.label}
              </span>
            </div>
          </div>
        ))}
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
