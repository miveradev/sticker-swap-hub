import { getTranslations } from "next-intl/server"
import { Card } from "@/components/ui/card"
import type { TopDuplicate } from "@/lib/profile/getProfileData"

interface TopDuplicatesProps {
  duplicates: TopDuplicate[]
}

export async function TopDuplicates({ duplicates }: TopDuplicatesProps) {
  const t = await getTranslations("profile.topDuplicates")

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-end">
        <h2 className="text-lg font-medium tracking-tight text-foreground">{t("title")}</h2>
      </div>
      {duplicates.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">{t("empty")}</p>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
          {duplicates.map((sticker) => (
            <div key={sticker.code} className="relative group cursor-pointer select-none">
              <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-foreground text-background text-[10px] md:text-[12px] w-5 h-5 md:w-6 md:h-6 rounded-full font-bold flex items-center justify-center z-10 transition-transform duration-200 group-hover:scale-125">
                {sticker.count}
              </div>
              <Card className="py-0 gap-0 ring-0 border border-foreground/50 rounded-lg overflow-hidden aspect-square flex flex-col items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <div className="flex flex-col items-center justify-center p-0.5 w-full text-center">
                  <p className="max-[430px]:text-[9px] text-[14px] sm:text-[16px] md:text-[17px] font-bold tracking-tight text-foreground leading-none">{sticker.code}</p>
                  <p className="max-[430px]:text-[5px] text-[8px] sm:text-[12px] md:text-[12px] font-medium text-muted-foreground mt-0.5 px-1 break-words w-full leading-tight">
                    {sticker.name}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
