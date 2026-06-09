import { getTranslations } from "next-intl/server"
import ReactCountryFlag from "react-country-flag"
import type { ComparisonSection } from "@/lib/profile/getCollectionComparison"

interface SwapTradeSectionProps {
  type: "receive" | "give"
  sections: ComparisonSection[]
  compareUsername: string
}

export async function SwapTradeSection({ type, sections, compareUsername }: SwapTradeSectionProps) {
  const t = await getTranslations("swap.sections")

  const totalStickers = sections.reduce((sum, s) => sum + s.stickers.length, 0)

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
          {t(`${type}.title`)}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t.rich(`${type}.description`, {
            username: compareUsername,
            strong: (chunks) => <strong className="text-foreground font-semibold">{chunks}</strong>,
          })}
        </p>
      </div>

      {totalStickers === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">—</p>
      ) : (
        <div className="flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section.id}>
              <div className="flex items-center mb-4 border-b border-border pb-2">
                <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                  {section.countryCode ? (
                    <ReactCountryFlag
                      countryCode={section.countryCode}
                      svg
                      style={{ width: "1.3em", height: "1.3em" }}
                    />
                  ) : (
                    <img
                      src="/wc2026_white.svg"
                      alt=""
                      aria-hidden="true"
                      style={{ width: "1.3em", height: "1.3em" }}
                      className="shrink-0 opacity-75"
                    />
                  )}
                  {section.name}
                </h3>
              </div>

              <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                {section.stickers.map((sticker) => (
                  <div key={sticker.code} className="relative select-none group">
                    <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground font-mono text-[9px] md:text-[11px] w-5 h-5 md:w-6 md:h-6 rounded-full font-bold flex items-center justify-center z-10 transition-transform duration-200 group-hover:scale-125 shadow-[0_0_8px_rgba(163,230,53,0.35)]">
                      {sticker.count}
                    </div>
                    <div className="bg-card border border-border rounded overflow-hidden aspect-square flex flex-col items-center justify-center transition-transform duration-200 group-hover:scale-105">
                      <div className="flex flex-col items-center justify-center p-0.5 w-full text-center select-none">
                        <p className="font-mono max-[430px]:text-[9px] text-[13px] sm:text-[15px] md:text-[16px] font-bold text-foreground leading-none select-none">
                          {sticker.code}
                        </p>
                        <p className="max-[430px]:text-[5px] text-[8px] sm:text-[11px] md:text-[11px] text-muted-foreground mt-0.5 px-1 break-words w-full leading-tight select-none">
                          {sticker.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
