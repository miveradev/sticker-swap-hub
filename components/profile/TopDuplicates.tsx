import { getTranslations } from "next-intl/server"
import type { TopDuplicate } from "@/lib/profile/getProfileData"

interface TopDuplicatesProps {
  duplicates: TopDuplicate[]
}

export async function TopDuplicates({ duplicates }: TopDuplicatesProps) {
  const t = await getTranslations("profile.topDuplicates")

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-end">
        <h2 className="font-display text-lg font-bold tracking-tight text-foreground">{t("title")}</h2>
      </div>
      {duplicates.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">{t("empty")}</p>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
          {duplicates.map((sticker) => (
            <div key={sticker.code} className="relative group cursor-default select-none">
              <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground font-mono text-[9px] md:text-[11px] w-5 h-5 md:w-6 md:h-6 rounded-full font-bold flex items-center justify-center z-10 transition-transform duration-200 group-hover:scale-125 shadow-[0_0_8px_rgba(163,230,53,0.35)]">
                {sticker.count}
              </div>
              <div className="bg-card border border-primary/40 rounded overflow-hidden aspect-square flex flex-col items-center justify-center transition-transform duration-200 group-hover:scale-105"
                style={{ boxShadow: "0 0 10px rgba(163, 230, 53, 0.1)" }}>
                <div className="flex flex-col items-center justify-center p-0.5 w-full text-center">
                  <p className="font-mono max-[430px]:text-[9px] text-[13px] sm:text-[15px] md:text-[16px] font-bold text-foreground leading-none">{sticker.code}</p>
                  <p className="max-[430px]:text-[5px] text-[8px] sm:text-[11px] md:text-[11px] text-muted-foreground mt-0.5 px-1 break-words w-full leading-tight">
                    {sticker.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
