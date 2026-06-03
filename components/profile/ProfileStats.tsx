import { getTranslations } from "next-intl/server"
import { Card } from "@/components/ui/card"

export async function ProfileStats() {
  const t = await getTranslations("profile.stats")

  const stats = [
    { value: "85%", label: t("completion") },
    { value: "833", label: t("owned") },
    { value: "142", label: t("duplicates") },
  ]

  return (
    <section className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
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
