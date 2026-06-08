import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { ArrowLeftRight } from "lucide-react"
import { Card } from "@/components/ui/card"
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
        <h2 className="text-lg font-medium tracking-tight text-foreground">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <Card
            key={item.label}
            className="py-0 gap-0 ring-0 border border-border rounded-xl items-center justify-center text-center p-4"
          >
            <span className="text-xl font-semibold tracking-tight text-foreground">
              {item.value}
            </span>
            <span className="text-xs font-medium tracking-wide text-muted-foreground">
              {item.label}
            </span>
          </Card>
        ))}
      </div>
      <Button
        className="w-full rounded-lg py-3 px-4 text-xs font-bold tracking-wide h-auto"
        render={<Link href={`/${locale}/swap?user=${targetUsername}`} />}
        nativeButton={false}
      >
        <ArrowLeftRight className="w-3.5 h-3.5" />
        {t("cta")}
      </Button>
    </section>
  )
}
