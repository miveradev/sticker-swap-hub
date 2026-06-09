import { getTranslations } from "next-intl/server"
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
        <div
          key={stat.label}
          className="bg-card border border-border rounded overflow-hidden flex flex-col items-center text-center relative"
        >
          <div className="p-4 flex flex-col gap-1 items-center">
            <span className="font-display text-3xl font-black italic text-primary leading-none">
              {stat.value}
            </span>
            <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </section>
  )
}
