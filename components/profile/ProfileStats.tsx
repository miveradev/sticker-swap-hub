import { getTranslations } from "next-intl/server"
import { Card } from "@/components/ui/card"
import type { ProfileStats as ProfileStatsData } from "@/lib/profile/getProfileData"

interface ProfileStatsProps {
  stats: ProfileStatsData
}

export async function ProfileStats({ stats }: ProfileStatsProps) {
  const t = await getTranslations("profile.stats")

  const items = [
    { value: `${stats.completion}%`, label: t("completion") },
    { value: String(stats.owned), label: t("owned") },
    { value: String(stats.duplicates), label: t("duplicates") },
  ]

  return (
    <section className="grid grid-cols-3 gap-3">
      {items.map((stat) => (
        <Card
          key={stat.label}
          className="py-0 gap-0 ring-0 border border-border rounded-xl items-center justify-center text-center p-4"
        >
          <span className="text-xl font-semibold tracking-tight text-foreground">
            {stat.value}
          </span>
          <span className="text-xs font-medium tracking-wide text-muted-foreground">
            {stat.label}
          </span>
        </Card>
      ))}
    </section>
  )
}
