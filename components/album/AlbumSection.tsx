"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import ReactCountryFlag from "react-country-flag"
import { StickerCard } from "@/components/album/StickerCard"
import { updateStickerQuantity } from "@/app/actions/stickers"
import type { SectionData } from "@/lib/albums/getAlbum"

interface AlbumSectionProps {
  section: SectionData
  isGuest?: boolean
}

export function AlbumSection({ section, isGuest = false }: AlbumSectionProps) {
  const t = useTranslations("album")
  const [quantities, setQuantities] = useState<Record<string, number>>(
    () => Object.fromEntries(section.stickers.map((s) => [s.code, s.quantity]))
  )

  async function persist(stickerId: string, code: string, newQty: number) {
    const prevQty = quantities[code] ?? 0

    // Optimistic update — instant UI response
    setQuantities((prev) => ({ ...prev, [code]: newQty }))

    const result = await updateStickerQuantity(stickerId, newQty)

    if ("error" in result) {
      // Rollback on failure
      setQuantities((prev) => ({ ...prev, [code]: prevQty }))
      toast.error(t("errorUpdate"))
    }
  }

  function handleAdd(stickerId: string, code: string) {
    void persist(stickerId, code, (quantities[code] ?? 0) + 1)
  }

  function handleRemove(stickerId: string, code: string) {
    void persist(stickerId, code, Math.max(0, (quantities[code] ?? 0) - 1))
  }

  function handleReset(stickerId: string, code: string) {
    void persist(stickerId, code, 0)
  }

  const ownedCount = isGuest ? 0 : Object.values(quantities).filter((q) => q > 0).length
  const total = section.stickers.length

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-4 border-b border-border pb-1">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          {section.countryCode && (
            <ReactCountryFlag
              countryCode={section.countryCode}
              svg
              style={{ width: "1.4em", height: "1.4em" }}
            />
          )}
          {section.name}
        </h2>
        <span className="text-xs text-muted-foreground bg-card border border-border px-3 py-1 rounded-full tabular-nums">
          {ownedCount} / {total}
        </span>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
        {section.stickers.map((sticker) => (
          <StickerCard
            key={sticker.code}
            code={sticker.code}
            name={sticker.name}
            quantity={isGuest ? 0 : quantities[sticker.code]}
            onAdd={() => handleAdd(sticker.id, sticker.code)}
            onRemove={() => handleRemove(sticker.id, sticker.code)}
            onReset={() => handleReset(sticker.id, sticker.code)}
            interactive={!isGuest}
          />
        ))}
      </div>
    </section>
  )
}
