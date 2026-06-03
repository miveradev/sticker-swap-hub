import { getTranslations } from "next-intl/server"
import { Card } from "@/components/ui/card"

const duplicates = [
  { code: "ESP10", player: "L. Yamal", count: 3 },
  { code: "ARG5", player: "L. Messi", count: 2 },
  { code: "FRA12", player: "K. Mbappe", count: 5 },
  { code: "GER2", player: "J. Musiala", count: 2 },
] as const

export async function TopDuplicates() {
  const t = await getTranslations("profile.topDuplicates")

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-end">
        <h2 className="text-lg font-medium tracking-tight text-foreground">{t("title")}</h2>
        <a
          href="#"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {t("viewAll")}
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {duplicates.map((sticker) => (
          <Card
            key={sticker.code}
            className="py-0 gap-0 ring-0 border border-border rounded-lg overflow-hidden relative flex-col items-center justify-center"
          >
            <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm border border-border text-foreground text-[10px] font-semibold tracking-widest px-2 py-0.5 rounded-full">
              x{sticker.count}
            </div>
            <div className="flex flex-col items-center justify-center py-6 w-full text-center">
              <p className="text-xl font-bold tracking-tight text-foreground">{sticker.code}</p>
              <p className="text-xs font-medium tracking-wide text-muted-foreground">
                {sticker.player}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
